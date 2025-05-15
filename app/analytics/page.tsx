"use client"

import Header from "@/components/header"
import KnowledgeAnalytics from "@/components/knowledge-analytics"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header showFilters={false} />
      <div className="flex-1 p-6 overflow-auto">
        <KnowledgeAnalytics />
      </div>
    </div>
  )
}
