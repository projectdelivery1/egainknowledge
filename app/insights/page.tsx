"use client"

import { useState } from "react"
import Header from "@/components/header"
import ContentInsightsDashboard from "@/components/content-insights-dashboard"

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header showFilters={false} />
      <div className="flex-1 overflow-auto">
        <ContentInsightsDashboard timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>
    </div>
  )
}
