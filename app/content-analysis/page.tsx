"use client"

import Header from "@/components/header"
import ContentAnalysisDashboard from "@/components/content-analysis-dashboard"

export default function ContentAnalysisPage() {
  return (
    <main className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <ContentAnalysisDashboard />
        </div>
      </div>
    </main>
  )
}
