"use client"

import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Archive, Pencil } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockInsightsData } from "@/lib/mock-insights-data"

interface IdleContentProps {
  timeRange: string
}

export default function IdleContent({ timeRange }: IdleContentProps) {
  const { theme } = useTheme()
  const { toast } = useToast()

  // Get idle content based on time range
  const idleContent = mockInsightsData.idleContent.slice(0, 5)

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

  // Handle archive content
  const handleArchive = (title: string) => {
    // Function now does nothing when clicked
    console.log(`Archiving: ${title}`)
  }

  // Handle update content
  const handleUpdate = (title: string) => {
    // Function now does nothing when clicked
    console.log(`Updating: ${title}`)
  }

  return (
    <div className={`divide-y ${borderColor}`}>
      {idleContent.map((content, index) => (
        <div key={index} className={`px-6 py-4 ${hoverBgColor}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className={`font-medium ${textColor}`}>{content.title}</h4>
              <div className="flex items-center mt-1 space-x-2">
                <Badge className={getDepartmentColor(content.department)}>{content.department}</Badge>
                <span className={`text-xs ${secondaryTextColor}`}>By {content.author}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-1" />
              <span className={`text-sm ${secondaryTextColor}`}>Last updated: {content.lastUpdated}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className={`text-sm text-red-500 flex items-center`}>
              <Clock className="h-4 w-4 mr-1" />
              No views for {content.daysWithoutViews} days
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-300" : ""}`}
                onClick={() => handleArchive(content.title)}
              >
                <Archive className="h-3.5 w-3.5" />
                Archive
              </Button>
              <Button variant="default" size="sm" className="gap-1" onClick={() => handleUpdate(content.title)}>
                <Pencil className="h-3.5 w-3.5" />
                Update
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
