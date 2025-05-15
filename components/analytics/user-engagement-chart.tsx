"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { mockAnalyticsData } from "@/lib/mock-analytics-data"

export default function UserEngagementChart() {
  const { theme } = useTheme()

  // Get user engagement data
  const data = mockAnalyticsData.userEngagement.labels.map((week, index) => ({
    name: week,
    "Helpful Ratings (%)": mockAnalyticsData.userEngagement.helpfulRatings[index],
    "Comments per Doc": mockAnalyticsData.userEngagement.commentsPerDoc[index],
    "Shares per Doc": mockAnalyticsData.userEngagement.sharesPerDoc[index],
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#e9ecef"} />
          <XAxis
            dataKey="name"
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 5]}
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
              borderColor: theme === "dark" ? "#374151" : "#e9ecef",
              color: theme === "dark" ? "#fff" : "#4a5568",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Helpful Ratings (%)"
            stroke="#7c5cfc"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Comments per Doc"
            stroke="#10b981"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Shares per Doc"
            stroke="#f59e0b"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
