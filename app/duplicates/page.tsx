"use client"

import Header from "@/components/header"
import DuplicateDetection from "@/components/duplicate-detection"

export default function DuplicatesPage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header showFilters={false} />
      <div className="flex-1 p-6 overflow-auto">
        <DuplicateDetection />
      </div>
    </div>
  )
}
