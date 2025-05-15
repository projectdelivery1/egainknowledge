"use client"

import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, FileWarning, Pencil, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockInsightsData } from "@/lib/mock-insights-data"

export default function ContentToImprove() {
  const { theme } = useTheme()
  const { toast } = useToast()

  // Get content to improve
  const contentToImprove = mockInsightsData.contentToImprove.slice(0, 5)

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

  // Get quality score color
  const getQualityScoreColor = (score: number) => {
    if (score < 60) return "text-red-500"
    if (score < 75) return "text-amber-500"
    return "text-green-500"
  }

  // Get progress color
  const getProgressColor = (score: number) => {
    if (score < 60) return "bg-red-500"
    if (score < 75) return "bg-amber-500"
    return "bg-green-500"
  }

  // Get issue badge color
  const getIssueBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      outdated: theme === "dark" ? "bg-amber-900/30 text-amber-300" : "bg-amber-100 text-amber-800",
      grammar: theme === "dark" ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-800",
      incomplete: theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800",
    }
    return colors[type] || (theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800")
  }

  // Handle improve content
  const handleImprove = (title: string) => {
    // Function now does nothing when clicked
    console.log(`Improving: ${title}`)
  }

  return (
    <div className={`divide-y ${borderColor}`}>
      {contentToImprove.map((content, index) => (
        <div key={index} className={`px-6 py-4 ${hoverBgColor}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className={`font-medium ${textColor}`}>{content.title}</h4>
              <div className="flex items-center mt-1 space-x-2">
                <Badge className={getDepartmentColor(content.department)}>{content.department}</Badge>
                <span className={`text-xs ${secondaryTextColor}`}>By {content.author}</span>
                <span className={`text-xs ${secondaryTextColor} flex items-center`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {content.lastUpdated}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium mr-2 ${getQualityScoreColor(content.qualityScore)}`}>
                {content.qualityScore}%
              </span>
              <div className="w-16">
                <Progress value={content.qualityScore} className={`h-2 ${getProgressColor(content.qualityScore)}`} />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className={`text-sm ${secondaryTextColor}`}>{content.issueDescription}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2">
              {content.issues.map((issue, i) => (
                <Badge key={i} className={getIssueBadgeColor(issue.type)} variant="outline">
                  <FileWarning className="h-3 w-3 mr-1" />
                  {issue.count} {issue.type}
                </Badge>
              ))}
            </div>
            <Button variant="default" size="sm" className="gap-1" onClick={() => handleImprove(content.title)}>
              <Pencil className="h-3.5 w-3.5" />
              Improve
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
