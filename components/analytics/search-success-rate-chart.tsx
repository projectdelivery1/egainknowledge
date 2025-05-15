"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { mockAnalyticsData } from "@/lib/mock-analytics-data"

interface SearchSuccessRateChartProps {
  timeRange: string
}

export default function SearchSuccessRateChart({ timeRange }: SearchSuccessRateChartProps) {
  const { theme } = useTheme()

  // Get search success rate data
  const data = mockAnalyticsData.searchSuccessRate30Days

  // Generate more data points based on time range
  const generateData = () => {
    if (timeRange === "7") {
      return data.slice(-3)
    } else if (timeRange === "30") {
      return data
    } else if (timeRange === "90") {
      // Generate 3 months of data
      const threeMonthsData = []
      for (let i = 0; i < 12; i++) {
        const month = i < 4 ? "Aug" : i < 8 ? "Sep" : "Oct"
        const day = ((i % 4) + 1) * 7
        const baseRate = 70 + Math.floor(Math.random() * 15)
        threeMonthsData.push({
          date: `${month} ${day}`,
          rate: baseRate,
        })
      }
      return threeMonthsData.concat(data)
    } else {
      // Generate 12 months of data
      const yearData = []
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      for (let i = 0; i < 12; i++) {
        const baseRate = 65 + Math.floor((i / 12) * 20) + Math.floor(Math.random() * 5)
        yearData.push({
          date: months[i],
          rate: baseRate,
        })
      }
      return yearData
    }
  }

  const chartData = generateData()

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#e9ecef"} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: theme === "dark" ? "#9ca3af" : "#718096" }}
            stroke={theme === "dark" ? "#4b5563" : "#cbd5e0"}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
              borderColor: theme === "dark" ? "#374151" : "#e9ecef",
              color: theme === "dark" ? "#fff" : "#4a5568",
            }}
            formatter={(value: any) => [`${value}%`, "Success Rate"]}
          />
          <ReferenceLine
            y={80}
            label={{
              value: "Target (80%)",
              position: "insideBottomRight",
              fill: theme === "dark" ? "#9ca3af" : "#718096",
            }}
            stroke={theme === "dark" ? "#f59e0b" : "#f59e0b"}
            strokeDasharray="3 3"
          />
          <Line type="monotone" dataKey="rate" stroke="#7c5cfc" strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
