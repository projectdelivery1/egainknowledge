"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { mockAnalyticsData } from "@/lib/mock-analytics-data"

interface UsageOverTimeChartProps {
  timeRange?: string
}

export default function UsageOverTimeChart({ timeRange = "30" }: UsageOverTimeChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Get data based on time range
  const data = mockAnalyticsData.usageOverTime.labels.map((month, index) => ({
    name: month,
    Views: mockAnalyticsData.usageOverTime.views[index],
    Users: mockAnalyticsData.usageOverTime.users[index],
  }))

  // Adjust data based on time range
  const adjustedData = (() => {
    if (timeRange === "7") {
      return data.slice(-2).flatMap((item) => [
        { name: `${item.name} W1`, Views: Math.round(item.Views * 0.25), Users: Math.round(item.Users * 0.25) },
        { name: `${item.name} W2`, Views: Math.round(item.Views * 0.25), Users: Math.round(item.Users * 0.25) },
      ])
    } else if (timeRange === "30") {
      return data.slice(-3)
    } else if (timeRange === "90") {
      return data.slice(-6)
    } else {
      return data
    }
  })()

  return (
    <div className="h-80 usage-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={adjustedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e9ecef"} />
          <XAxis
            dataKey="name"
            tick={{ fill: isDark ? "#9ca3af" : "#718096" }}
            stroke={isDark ? "#4b5563" : "#cbd5e0"}
          />
          <YAxis
            tick={{ fill: isDark ? "#9ca3af" : "#718096" }}
            stroke={isDark ? "#4b5563" : "#cbd5e0"}
            tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#fff",
              borderColor: isDark ? "#374151" : "#e9ecef",
              color: isDark ? "#fff" : "#4a5568",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="Views" stroke="#7c5cfc" strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Users" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
