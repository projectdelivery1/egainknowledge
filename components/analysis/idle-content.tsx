"use client"

import { ExternalLink, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockGraphData } from "@/lib/mock-data"

interface IdleContentProps {
  timeRange: string
}

export default function IdleContent({ timeRange }: IdleContentProps) {
  // Filter nodes with low views
  const idleNodes = [...mockGraphData.nodes]
    .filter((node) => node.analytics.views < 500)
    .sort((a, b) => a.analytics.views - b.analytics.views)
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {idleNodes.map((node) => (
        <div key={node.id} className="flex items-start justify-between p-3 border rounded-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">{node.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{node.department}</span>
              <span>•</span>
              <span>Last updated: {node.updatedAt}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {node.analytics.views} views
              </Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {node.analytics.helpfulness}% helpful
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
