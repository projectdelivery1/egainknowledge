"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockGraphData } from "@/lib/mock-data"

interface HighHelpfulnessArticlesProps {
  timeRange: string
}

export default function HighHelpfulnessArticles({ timeRange }: HighHelpfulnessArticlesProps) {
  // Sort nodes by helpfulness (highest first)
  const sortedNodes = [...mockGraphData.nodes]
    .sort((a, b) => b.analytics.helpfulness - a.analytics.helpfulness)
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {sortedNodes.map((node, index) => (
        <div key={node.id} className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-700">{index + 1}.</span>
              <span className="font-medium text-gray-800 truncate max-w-[200px]">{node.title}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={node.analytics.helpfulness} className="h-2 flex-1" indicatorClassName="bg-green-500" />
            <span className="text-sm font-medium min-w-[60px] text-right">{node.analytics.helpfulness}%</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{node.department}</span>
            <span>{node.analytics.views} views</span>
          </div>
        </div>
      ))}
    </div>
  )
}
