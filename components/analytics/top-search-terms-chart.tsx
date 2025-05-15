"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockAnalyticsData } from "@/lib/mock-analytics-data"

export default function TopSearchTermsChart() {
  const { theme } = useTheme()

  // Get top search terms data
  const data = mockAnalyticsData.topSearchTerms.map((item) => ({
    name: item.term,
    searches: item.searches,
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#e9ecef"} />
          <XAxis
            type="number"
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
              borderColor: theme === "dark" ? "#374151" : "#e9ecef",
              color: theme === "dark" ? "#fff" : "#4a5568",
            }}
          />
          <Bar dataKey="searches" fill={theme === "dark" ? "#8b5cf6" : "#7c5cfc"} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
