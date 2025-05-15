"use client"

import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"
import { mockInsightsData } from "@/lib/mock-insights-data"

export default function ContentFreshness() {
  const { theme } = useTheme()
  const freshness = mockInsightsData.contentFreshness

  // Theme-based styling
  const textColor = theme === "dark" ? "text-white" : "text-[#4a5568]"
  const secondaryTextColor = theme === "dark" ? "text-gray-400" : "text-[#718096]"

  // Get progress color based on age
  const getProgressColor = (category: string) => {
    const colors: Record<string, string> = {
      thisYear: theme === "dark" ? "bg-green-500" : "bg-green-500",
      lastYear: theme === "dark" ? "bg-blue-500" : "bg-blue-500",
      twoYearsAgo: theme === "dark" ? "bg-yellow-500" : "bg-yellow-500",
      threeYearsAgo: theme === "dark" ? "bg-orange-500" : "bg-orange-500",
      fourPlusYearsAgo: theme === "dark" ? "bg-red-500" : "bg-red-500",
    }
    return colors[category] || (theme === "dark" ? "bg-gray-600" : "bg-gray-400")
  }

  // Get label based on category
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      thisYear: "This year",
      lastYear: "Last year",
      twoYearsAgo: "2 years ago",
      threeYearsAgo: "3 years ago",
      fourPlusYearsAgo: "4+ years ago",
    }
    return labels[category] || category
  }

  // Categories to display
  const categories = ["thisYear", "lastYear", "twoYearsAgo", "threeYearsAgo", "fourPlusYearsAgo"]

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const value = freshness[category as keyof typeof freshness] as number
        const percentage = (value / freshness.total) * 100

        return (
          <div key={category} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${textColor}`}>{getCategoryLabel(category)}</span>
              <span className={`text-sm font-medium ${textColor}`}>
                {value} articles ({percentage.toFixed(0)}%)
              </span>
            </div>
            <Progress value={percentage} className={`h-2 ${getProgressColor(category)}`} />
          </div>
        )
      })}
    </div>
  )
}
