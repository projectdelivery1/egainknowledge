"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"
import { useTheme } from "next-themes"

import TopSearchTermsChart from "@/components/analytics/top-search-terms-chart"
import UserEngagementChart from "@/components/analytics/user-engagement-chart"
import DepartmentDistributionChart from "@/components/analytics/department-distribution-chart"
import DeviceBreakdownChart from "@/components/analytics/device-breakdown-chart"
import SearchSuccessRateChart from "@/components/analytics/search-success-rate-chart"
import UsageOverTimeChart from "@/components/analytics/usage-over-time-chart"

export default function KnowledgeAnalytics() {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme } = useTheme()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Performance Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Comprehensive analytics for your knowledge base content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Last 30 days</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Views</CardTitle>
            <CardDescription>All content views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24,892</div>
            <p className="text-xs text-green-600 dark:text-green-400">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Helpfulness</CardTitle>
            <CardDescription>User ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-green-600 dark:text-green-400">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Search Success Rate</CardTitle>
            <CardDescription>Successful searches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs text-green-600 dark:text-green-400">+5.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="search">Search Analytics</TabsTrigger>
          <TabsTrigger value="users">User Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Usage Over Time</CardTitle>
                <CardDescription>Daily views and interactions</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <UsageOverTimeChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Content by department</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <DepartmentDistributionChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Search Terms</CardTitle>
                <CardDescription>Most frequent searches</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <TopSearchTermsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Views by content type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <UserEngagementChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Access by device type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <DeviceBreakdownChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Success Rate</CardTitle>
                <CardDescription>Successful vs. failed searches</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <SearchSuccessRateChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Search Terms</CardTitle>
                <CardDescription>Most frequent searches</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <TopSearchTermsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Engagement metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <UserEngagementChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Access by device type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <DeviceBreakdownChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
