"use client"

import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, ThumbsUp } from "lucide-react"
import { mockInsightsData } from "@/lib/mock-insights-data"

export default function HighHelpfulnessArticles() {
  const { theme } = useTheme()

  // Get high helpfulness articles
  const highHelpfulnessArticles = mockInsightsData.highHelpfulnessArticles.slice(0, 5)

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

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className={`divide-y ${borderColor}`}>
      {highHelpfulnessArticles.map((article, index) => (
        <div key={index} className={`px-6 py-4 ${hoverBgColor} cursor-pointer`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className={`font-medium ${textColor}`}>{article.title}</h4>
              <div className="flex items-center mt-1 space-x-2">
                <Badge className={getDepartmentColor(article.department)}>{article.department}</Badge>
                <span className={`text-xs ${secondaryTextColor}`}>By {article.author}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                <span className={`text-sm font-medium ${textColor}`}>{article.helpfulnessRating}%</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 text-blue-500 mr-1" />
                <span className={`text-sm ${secondaryTextColor}`}>{article.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex mr-2">{renderStars(article.rating)}</div>
            <span className={`text-sm font-medium ${textColor}`}>{article.rating.toFixed(1)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
