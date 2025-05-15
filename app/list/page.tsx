"use client"

import Header from "@/components/header"
import KnowledgeListView from "@/components/knowledge-list-view"

export default function ListPage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header showFilters={false} />
      <div className="flex-1 p-6 overflow-auto">
        <KnowledgeListView />
      </div>
    </div>
  )
}
