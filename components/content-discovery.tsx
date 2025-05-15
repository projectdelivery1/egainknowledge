"use client"

import { useState } from "react"
import { ExternalLink, Bookmark, BookmarkPlus, ThumbsUp, Eye, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { mockGraphData } from "@/lib/mock-data"
import type { Node } from "@/lib/types"

interface ContentDiscoveryProps {
  type: "trending" | "recommended" | "recent"
}

export default function ContentDiscovery({ type }: ContentDiscoveryProps) {
  const { toast } = useToast()
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])

  // Sort and filter nodes based on type
  const getFilteredNodes = (): Node[] => {
    const nodes = [...mockGraphData.nodes]

    if (type === "trending") {
      // Sort by views (highest first)
      return nodes.sort((a, b) => b.analytics.views - a.analytics.views).slice(0, 6)
    } else if (type === "recommended") {
      // Sort by helpfulness (highest first)
      return nodes.sort((a, b) => b.analytics.helpfulness - a.analytics.helpfulness).slice(0, 6)
    } else {
      // Sort by recently updated status
      return nodes.filter((node) => node.status === "recently-updated" || node.status === "high-performing").slice(0, 6)
    }
  }

  const filteredNodes = getFilteredNodes()

  const toggleBookmark = (nodeId: string) => {
    setBookmarkedItems((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]))

    toast({
      title: bookmarkedItems.includes(nodeId) ? "Bookmark Removed" : "Bookmark Added",
      description: bookmarkedItems.includes(nodeId)
        ? "Document removed from your bookmarks"
        : "Document added to your bookmarks",
    })
  }

  const handleOpenDocument = (node: Node) => {
    toast({
      title: "Opening Document",
      description: `Opening "${node.title}"`,
    })
  }

  // Get department color
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "HR":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Support":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "IT":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "Sales":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Marketing":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high-performing":
        return "bg-green-100 text-green-800 border-green-200"
      case "recently-updated":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low-performing":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "outdated":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredNodes.map((node) => (
        <Card key={node.id} className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge variant="outline" className={getDepartmentColor(node.department)}>
                {node.department}
              </Badge>
              <Badge variant="outline" className={getStatusBadge(node.status)}>
                {node.status.replace(/-/g, " ")}
              </Badge>
            </div>
            <CardTitle className="text-lg mt-2">{node.title}</CardTitle>
            <CardDescription className="line-clamp-2">{node.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="h-4 w-4" />
                <span>{node.author}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Updated: {node.updatedAt}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{node.analytics.views}</span>
                </div>

                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{node.analytics.helpfulness}%</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {node.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-2 border-t">
            <Button variant="ghost" size="sm" className="text-gray-600" onClick={() => toggleBookmark(node.id)}>
              {bookmarkedItems.includes(node.id) ? (
                <Bookmark className="h-4 w-4 mr-1" />
              ) : (
                <BookmarkPlus className="h-4 w-4 mr-1" />
              )}
              {bookmarkedItems.includes(node.id) ? "Bookmarked" : "Bookmark"}
            </Button>

            <Button variant="default" size="sm" className="gap-1" onClick={() => handleOpenDocument(node)}>
              <ExternalLink className="h-4 w-4" />
              Open
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
