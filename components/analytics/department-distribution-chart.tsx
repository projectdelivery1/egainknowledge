"use client"

import { useTheme } from "next-themes"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { mockAnalyticsData } from "@/lib/mock-analytics-data"

export default function DepartmentDistributionChart() {
  const { theme } = useTheme()

  // Get department distribution data and ensure it's in the right format
  const rawData = mockAnalyticsData.departmentDistribution

  // Convert data to array format if it's an object
  const data = Array.isArray(rawData) ? rawData : Object.entries(rawData).map(([name, value]) => ({ name, value }))

  // Colors for the pie chart
  const COLORS =
    theme === "dark"
      ? ["#8b5cf6", "#60a5fa", "#5eead4", "#fde68a", "#f87171"]
      : ["#7c5cfc", "#3b82f6", "#14b8a6", "#f59e0b", "#ef4444"]

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-md shadow-md ${
            theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{payload[0].name}</p>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
