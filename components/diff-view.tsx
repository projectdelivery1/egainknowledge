"use client"

import { useEffect, useState } from "react"
import { diffWords } from "diff"
import { useTheme } from "next-themes"

interface DiffViewProps {
  sourceContent: string
  targetContent: string
  sourceTitle: string
  targetTitle: string
  sourceDepartment?: string
  targetDepartment?: string
}

export default function DiffView({
  sourceContent,
  targetContent,
  sourceTitle,
  targetTitle,
  sourceDepartment = "HR",
  targetDepartment = "HR",
}: DiffViewProps) {
  const [diffResult, setDiffResult] = useState<any[]>([])
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Get department color
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "HR":
        return isDark ? "bg-purple-600" : "bg-[#a29bfe]"
      case "Support":
        return isDark ? "bg-blue-500" : "bg-[#74b9ff]"
      case "IT":
        return isDark ? "bg-teal-500" : "bg-[#81ecec]"
      case "Sales":
        return isDark ? "bg-amber-400" : "bg-[#ffeaa7]"
      case "Marketing":
        return isDark ? "bg-rose-500" : "bg-[#ff9ff3]"
      case "Finance":
        return isDark ? "bg-green-500" : "bg-[#55efc4]"
      default:
        return isDark ? "bg-purple-600" : "bg-[#a29bfe]"
    }
  }

  useEffect(() => {
    // Calculate diff between the two contents
    const differences = diffWords(sourceContent, targetContent)
    setDiffResult(differences)
  }, [sourceContent, targetContent])

  return (
    <div className={`p-4 h-full overflow-auto ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-4 h-4 rounded-full ${getDepartmentColor(sourceDepartment)}`}></div>
          <h3 className={`font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>{sourceTitle}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${getDepartmentColor(targetDepartment)}`}></div>
          <h3 className={`font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>{targetTitle}</h3>
        </div>
      </div>

      <div
        className={`border rounded-md p-4 ${isDark ? "border-slate-800 bg-slate-900" : "border-[#e5e7eb] bg-[#f9fafb]"}`}
      >
        <div className="flex flex-wrap">
          {diffResult.map((part, index) => {
            // Determine styling based on whether text was added, removed, or unchanged
            let className = isDark ? "text-slate-300" : "text-[#4a5568]" // unchanged
            if (part.added) {
              className = isDark
                ? "bg-green-950 text-green-200 px-1 rounded"
                : "bg-[#ecfdf5] text-[#2d3748] px-1 rounded"
            } else if (part.removed) {
              className = isDark
                ? "bg-red-950 text-red-200 px-1 rounded line-through"
                : "bg-[#fff5f5] text-[#2d3748] px-1 rounded line-through"
            }

            return (
              <span key={index} className={className}>
                {part.value}
              </span>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded ${isDark ? "bg-red-950" : "bg-[#fff5f5]"}`}></span>
          <span className={`text-xs ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Removed text</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded ${isDark ? "bg-green-950" : "bg-[#ecfdf5]"}`}></span>
          <span className={`text-xs ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Added text</span>
        </div>
      </div>
    </div>
  )
}
