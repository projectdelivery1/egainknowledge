"use client"

import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { mockInsightsData } from "@/lib/mock-insights-data"
import { Eye, ThumbsUp } from "lucide-react"

interface TopViewedArticlesProps {
  timeRange: string
}

export default function TopViewedArticles({ timeRange }: TopViewedArticlesProps) {
  const { theme } = useTheme()

  // Get top viewed articles based on time range
  const topArticles = mockInsightsData.topViewedArticles.slice(0, 5)

  // Theme-based styling
  const textColor = theme === "dark" ? "text-white" : "text-[#4a5568]"
  const secondaryTextColor = theme === "dark" ? "text-gray-400" : "text-[#718096]"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-[#f8fafc]"

  // Department badge colors
  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      HR: theme === "dark" ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-800",
      Support: theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800",
      Sales: theme === "dark" ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-800",
      IT: theme === "dark" ? "bg-orange-900/30 text-orange-300" : "bg-orange-100 text-orange-800",
    }
    return colors[department] || (theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800")
  }

  return (
    <div className={`divide-y ${borderColor}`}>
      {topArticles.map((article, index) => (
        <div key={index} className={`px-6 py-4 ${hoverBgColor} cursor-pointer`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className={`font-medium ${textColor}`}>{article.title}</h4>
              <div className="flex items-center mt-1 space-x-2">
                <Badge className={getDepartmentColor(article.department)}>{article.department}</Badge>
                <span className={`text-xs ${secondaryTextColor}`}>By {article.author}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 text-blue-500 mr-1" />
                <span className={`text-sm font-medium ${textColor}`}>{article.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                <span className={`text-sm font-medium ${textColor}`}>{article.helpfulnessRating}%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
