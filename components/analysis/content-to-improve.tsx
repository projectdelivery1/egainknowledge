"use client"

import { FileEdit, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for content with grammar errors or outdated terms
const mockContentToImprove = [
  {
    title: "Employee Onboarding Process",
    department: "HR",
    issues: [
      { type: "grammar", count: 5, description: "Grammar errors in section 3" },
      { type: "outdated", count: 2, description: "References to old software versions" },
    ],
    lastUpdated: "3 months ago",
  },
  {
    title: "Network Configuration Guide",
    department: "IT",
    issues: [
      { type: "outdated", count: 8, description: "Contains outdated network protocols" },
      { type: "grammar", count: 3, description: "Sentence structure issues" },
    ],
    lastUpdated: "6 months ago",
  },
  {
    title: "Product Pricing Guide",
    department: "Sales",
    issues: [
      { type: "outdated", count: 4, description: "Contains old pricing tiers" },
      { type: "grammar", count: 1, description: "Formatting inconsistencies" },
    ],
    lastUpdated: "2 months ago",
  },
  {
    title: "Customer FAQ",
    department: "Support",
    issues: [
      { type: "grammar", count: 7, description: "Multiple typos and grammar errors" },
      { type: "outdated", count: 3, description: "References to discontinued features" },
    ],
    lastUpdated: "4 months ago",
  },
]

export default function ContentToImprove() {
  return (
    <div className="space-y-4">
      {mockContentToImprove.map((item, index) => (
        <div key={index} className="flex items-start justify-between p-3 border rounded-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">{item.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{item.department}</span>
              <span>•</span>
              <span>Last updated: {item.lastUpdated}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-sm mt-1">
              {item.issues.map((issue, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={
                    issue.type === "grammar"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {issue.type === "grammar" ? "Grammar" : "Outdated"}: {issue.count} issues
                </Badge>
              ))}
            </div>
          </div>
          <Button size="sm" className="gap-1 bg-amber-600 hover:bg-amber-700">
            <FileEdit className="h-4 w-4" />
            Improve
          </Button>
        </div>
      ))}
    </div>
  )
}
