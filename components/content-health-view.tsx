"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  CheckCircle,
  XCircle,
  Edit,
  AlertTriangle,
  ArrowUpRight,
  ImageIcon,
  Link,
  FileText,
  Type,
  List,
  Calendar,
  ThumbsUp,
  Eye,
  Search,
  BarChart2,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockGraphData } from "@/lib/mock-data"
import type { Node } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface ContentHealthViewProps {
  document: Node
  onDocumentChange: (documentId: string) => void
}

export default function ContentHealthView({ document, onDocumentChange }: ContentHealthViewProps) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSuggestions, setExpandedSuggestions] = useState<string[]>([])

  // Calculate overall content score (0-100)
  const contentScore = Math.round(
    (document.analytics.helpfulness +
      document.analytics.searchRelevance +
      document.analytics.freshness +
      document.analytics.completeness +
      document.analytics.accuracy) /
      5,
  )

  // Generate AI suggestions based on document metrics
  const aiSuggestions = [
    {
      id: "title-keywords",
      type: "improvement",
      title: "Add keywords to title",
      description:
        "Adding relevant keywords to the title will improve search visibility. Consider including terms like 'guide', 'how-to', or specific product names.",
      impact: "medium",
      effort: "low",
    },
    {
      id: "update-images",
      type: "improvement",
      title: "Update visuals",
      description:
        "The document would benefit from updated screenshots or diagrams. Current visuals are outdated or missing context.",
      impact: "high",
      effort: "medium",
    },
    {
      id: "add-links",
      type: "improvement",
      title: "Add internal links",
      description: "Connect this document to related content by adding 3-5 internal links to other relevant documents.",
      impact: "medium",
      effort: "low",
    },
    {
      id: "structure-headings",
      type: "critical",
      title: "Improve document structure",
      description:
        "The document lacks clear headings and subheadings. Add a logical structure with H2 and H3 headings to improve readability and navigation.",
      impact: "high",
      effort: "medium",
    },
    {
      id: "update-terminology",
      type: "warning",
      title: "Update terminology",
      description:
        "Some terms used in this document are outdated. Update terminology to match current product naming and industry standards.",
      impact: "medium",
      effort: "medium",
    },
  ]

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  // Get progress color based on value
  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-green-500"
    if (value >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Handle suggestion actions
  const handleSuggestionAction = (suggestionId: string, action: "accept" | "ignore" | "edit") => {
    const suggestion = aiSuggestions.find((s) => s.id === suggestionId)

    if (!suggestion) return

    const actionMessages = {
      accept: `Accepted suggestion: ${suggestion.title}`,
      ignore: `Ignored suggestion: ${suggestion.title}`,
      edit: `Editing suggestion: ${suggestion.title}`,
    }

    toast({
      title:
        action === "accept" ? "Suggestion Accepted" : action === "ignore" ? "Suggestion Ignored" : "Editing Suggestion",
      description: actionMessages[action],
      variant: action === "accept" ? "success" : action === "ignore" ? "default" : "default",
    })
  }

  // Toggle expanded suggestion
  const toggleExpandSuggestion = (suggestionId: string) => {
    setExpandedSuggestions((prev) =>
      prev.includes(suggestionId) ? prev.filter((id) => id !== suggestionId) : [...prev, suggestionId],
    )
  }

  // Get suggestion icon based on type
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "improvement":
        return <ArrowUpRight className="h-5 w-5 text-blue-500" />
      default:
        return <ArrowUpRight className="h-5 w-5 text-blue-500" />
    }
  }

  // Get suggestion icon based on id
  const getSuggestionTypeIcon = (id: string) => {
    switch (id) {
      case "title-keywords":
        return <Type className="h-4 w-4 text-gray-500" />
      case "update-images":
        return <ImageIcon className="h-4 w-4 text-gray-500" />
      case "add-links":
        return <Link className="h-4 w-4 text-gray-500" />
      case "structure-headings":
        return <List className="h-4 w-4 text-gray-500" />
      case "update-terminology":
        return <FileText className="h-4 w-4 text-gray-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left column - Document selector and content score */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Document Selection</CardTitle>
            <CardDescription>Select a document to view its health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <select
                className="w-full p-2 pr-8 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={document.id}
                onChange={(e) => onDocumentChange(e.target.value)}
              >
                {mockGraphData.nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Content Health Score</CardTitle>
            <CardDescription>Overall quality assessment</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-36 h-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(contentScore)}`}>{contentScore}</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={contentScore >= 90 ? "#10b981" : contentScore >= 70 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="10"
                    strokeDasharray={`${contentScore * 2.83} 283`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Helpfulness</span>
                  <span>{document.analytics.helpfulness}%</span>
                </div>
                <Progress
                  value={document.analytics.helpfulness}
                  className="h-2"
                  indicatorClassName={getProgressColor(document.analytics.helpfulness)}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Search Relevance</span>
                  <span>{document.analytics.searchRelevance}%</span>
                </div>
                <Progress
                  value={document.analytics.searchRelevance}
                  className="h-2"
                  indicatorClassName={getProgressColor(document.analytics.searchRelevance)}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Freshness</span>
                  <span>{document.analytics.freshness}%</span>
                </div>
                <Progress
                  value={document.analytics.freshness}
                  className="h-2"
                  indicatorClassName={getProgressColor(document.analytics.freshness)}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Completeness</span>
                  <span>{document.analytics.completeness}%</span>
                </div>
                <Progress
                  value={document.analytics.completeness}
                  className="h-2"
                  indicatorClassName={getProgressColor(document.analytics.completeness)}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Accuracy</span>
                  <span>{document.analytics.accuracy}%</span>
                </div>
                <Progress
                  value={document.analytics.accuracy}
                  className="h-2"
                  indicatorClassName={getProgressColor(document.analytics.accuracy)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Document Metadata</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Created: {document.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Updated: {document.updatedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Views: {document.analytics.views}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Helpfulness: {document.analytics.helpfulness}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Search Relevance: {document.analytics.searchRelevance}%</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Status: {document.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right columns - AI suggestions and content details */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">AI Improvement Suggestions</CardTitle>
                <CardDescription>Actionable recommendations to improve content quality</CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {aiSuggestions.length} Suggestions
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border border-gray-200">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {getSuggestionIcon(suggestion.type)}
                        <div>
                          <CardTitle className="text-base font-medium">{suggestion.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {getSuggestionTypeIcon(suggestion.id)}
                            <span className="text-xs text-gray-500">
                              {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} impact •{" "}
                              {suggestion.effort.charAt(0).toUpperCase() + suggestion.effort.slice(1)} effort
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleExpandSuggestion(suggestion.id)}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedSuggestions.includes(suggestion.id) ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedSuggestions.includes(suggestion.id) && (
                    <>
                      <CardContent className="px-4 py-2">
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </CardContent>
                      <CardFooter className="px-4 py-2 flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-700"
                          onClick={() => handleSuggestionAction(suggestion.id, "ignore")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Ignore
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-700"
                          onClick={() => handleSuggestionAction(suggestion.id, "edit")}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleSuggestionAction(suggestion.id, "accept")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                      </CardFooter>
                    </>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content Preview</TabsTrigger>
                <TabsTrigger value="related">Related Documents</TabsTrigger>
                <TabsTrigger value="history">Version History</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-4">
                <div className="p-2">
                  <h3 className="text-lg font-semibold mb-2">{document.title}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      {document.department}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      {document.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{document.content}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {document.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="related" className="mt-4">
                <div className="p-2 space-y-3">
                  {document.relatedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 border rounded-md">
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.department}
                          </Badge>
                          <span className="text-xs text-gray-500">Similarity: {doc.similarity}%</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <div className="p-2 space-y-3">
                  <div className="flex items-start gap-3 p-2 border rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Current Version</h4>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Updated on {document.updatedAt} by {document.author}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      View
                    </Button>
                  </div>
                  <div className="flex items-start gap-3 p-2 border rounded-md">
                    <div className="flex-1">
                      <h4 className="font-medium">Previous Version</h4>
                      <p className="text-sm text-gray-500">Updated 30 days ago by {document.author}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      View
                    </Button>
                  </div>
                  <div className="flex items-start gap-3 p-2 border rounded-md">
                    <div className="flex-1">
                      <h4 className="font-medium">Initial Version</h4>
                      <p className="text-sm text-gray-500">
                        Created on {document.createdAt} by {document.author}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      View
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
