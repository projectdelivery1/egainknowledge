"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ZeroResultSearchesProps {
  timeRange: string
}

// Mock data for zero result searches
const mockZeroResultSearches = [
  {
    term: "VPN for Mac",
    searchVolume: 245,
    lastSearched: "2 hours ago",
    trend: "up",
    trendPercentage: 15,
  },
  {
    term: "Password reset mobile app",
    searchVolume: 189,
    lastSearched: "30 minutes ago",
    trend: "up",
    trendPercentage: 28,
  },
  {
    term: "Team calendar sharing",
    searchVolume: 156,
    lastSearched: "1 hour ago",
    trend: "stable",
    trendPercentage: 0,
  },
  {
    term: "Expense report approval workflow",
    searchVolume: 132,
    lastSearched: "3 hours ago",
    trend: "up",
    trendPercentage: 12,
  },
  {
    term: "Remote desktop troubleshooting",
    searchVolume: 118,
    lastSearched: "45 minutes ago",
    trend: "down",
    trendPercentage: 5,
  },
]

export default function ZeroResultSearches({ timeRange }: ZeroResultSearchesProps) {
  return (
    <div className="space-y-4">
      {mockZeroResultSearches.map((item, index) => (
        <div key={index} className="flex items-start justify-between p-3 border rounded-md">
          <div className="space-y-1">
            <h3 className="font-medium">{item.term}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{item.searchVolume} searches</span>
              <span>•</span>
              <span>Last searched: {item.lastSearched}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                No Results
              </Badge>
              {item.trend === "up" && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Trending +{item.trendPercentage}%
                </Badge>
              )}
            </div>
          </div>
          <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      ))}
    </div>
  )
}
