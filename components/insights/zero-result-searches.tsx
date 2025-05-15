"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockInsightsData } from "@/lib/mock-insights-data"

interface ZeroResultSearchesProps {
  timeRange: string
}

export default function ZeroResultSearches({ timeRange }: ZeroResultSearchesProps) {
  const { theme } = useTheme()
  const { toast } = useToast()

  // Get zero result searches based on time range
  const zeroResultSearches = mockInsightsData.zeroResultSearches.slice(0, 5)

  // Theme-based styling
  const textColor = theme === "dark" ? "text-white" : "text-[#4a5568]"
  const secondaryTextColor = theme === "dark" ? "text-gray-400" : "text-[#718096]"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-[#f8fafc]"

  // Update the handleCreateContent function to be more interactive
  const handleCreateContent = (searchTerm: string) => {
    // Function now does nothing when clicked
    console.log(`Creating content for: ${searchTerm}`)
  }

  // Update the handleAddSynonym function to be more interactive
  const handleAddSynonym = (searchTerm: string) => {
    // Function now does nothing when clicked
    console.log(`Adding synonym for: ${searchTerm}`)
  }

  return (
    <div className={`divide-y ${borderColor}`}>
      {zeroResultSearches.map((search, index) => (
        <div key={index} className={`px-6 py-4 ${hoverBgColor}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start">
              <Search className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className={`font-medium ${textColor}`}>"{search.term}"</h4>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className={
                      theme === "dark"
                        ? "bg-gray-800 text-gray-300 border-gray-700"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }
                  >
                    {search.searches} searches
                  </Badge>

                  <div
                    className={`ml-3 text-xs flex items-center ${
                      search.trend === "up" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {search.trend === "up" ? (
                      <>
                        <TrendingUp className="h-3 w-3 mr-1" />+{search.trendPercentage}%
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 mr-1" />-{search.trendPercentage}%
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-sm ${secondaryTextColor}`}>Last search: {search.lastSearched}</div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className={`text-sm ${secondaryTextColor}`}>Suggested action: {search.suggestedAction}</div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-300" : ""}`}
                onClick={() => handleAddSynonym(search.term)}
              >
                <Search className="h-3.5 w-3.5" />
                Add Synonym
              </Button>
              <Button variant="default" size="sm" className="gap-1" onClick={() => handleCreateContent(search.term)}>
                <Plus className="h-3.5 w-3.5" />
                Create Content
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
