"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  RefreshCw,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  Clock,
  ThumbsUp,
  Eye,
  ArrowUpRight,
} from "lucide-react"
import TopViewedArticles from "@/components/insights/top-viewed-articles"
import IdleContent from "@/components/insights/idle-content"
import ZeroResultSearches from "@/components/insights/zero-result-searches"
import ContentToImprove from "@/components/insights/content-to-improve"
import ContentFreshness from "@/components/insights/content-freshness"
import HighHelpfulnessArticles from "@/components/insights/high-helpfulness-articles"
import { mockInsightsData } from "@/lib/mock-insights-data"

interface ContentInsightsDashboardProps {
  timeRange: string
  setTimeRange: (range: string) => void
}

export default function ContentInsightsDashboard({
  timeRange = "30",
  setTimeRange = (value: string) => console.log(`Time range changed to ${value}`),
}: ContentInsightsDashboardProps) {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Determine theme-based styling
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-[#f6f8fc]"
  const textColor = theme === "dark" ? "text-white" : "text-[#4a5568]"
  const secondaryTextColor = theme === "dark" ? "text-gray-400" : "text-[#718096]"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"
  const cardBgColor = theme === "dark" ? "bg-gray-800" : "bg-white"
  const cardHeaderBgColor = theme === "dark" ? "bg-gray-800" : "bg-[#f8fafc]"

  // Handle time range change
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    // Toast removed
  }

  // Update the handleRefresh function to actually show animation and toast
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate data refresh with a delay
    setTimeout(() => {
      setIsRefreshing(false)
      // Toast removed
    }, 1000)
  }

  // Update the handleExport function to show toast
  const handleExport = () => {
    // Toast removed

    // Simulate export completion
    setTimeout(() => {
      // Toast removed
    }, 1500)
  }

  // Add this function to handle "View Details" button clicks
  const handleViewDetails = (section: string) => {
    // Toast removed
  }

  // Add this function to handle "View All" button clicks
  const handleViewAll = (section: string) => {
    // Toast removed
  }

  return (
    <div className={`flex-1 overflow-auto p-6 ${bgColor}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textColor}`}>Content Insights Dashboard</h1>
          <p className={`${secondaryTextColor}`}>Analytics and insights to help improve your knowledge base</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Calendar className={`mr-2 h-4 w-4 ${secondaryTextColor}`} />
            <Tabs defaultValue={timeRange} onValueChange={handleTimeRangeChange}>
              <TabsList className={theme === "dark" ? "bg-gray-800" : "bg-[#ebeef5]"}>
                <TabsTrigger value="7">7 days</TabsTrigger>
                <TabsTrigger value="30">30 days</TabsTrigger>
                <TabsTrigger value="90">90 days</TabsTrigger>
                <TabsTrigger value="365">1 year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Button
            variant="outline"
            size="sm"
            className={`gap-1 ${theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-300" : ""}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={`gap-1 ${theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-300" : ""}`}
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${secondaryTextColor}`}>Total Views</p>
                <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>
                  {mockInsightsData.totalViews.toLocaleString()}
                </h3>
                <p className={`text-sm mt-1 text-green-500 flex items-center`}>
                  <TrendingUp className="h-3 w-3 mr-1" />+{mockInsightsData.viewsIncrease}% from last period
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"}`}>
                <Eye className={`h-5 w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${secondaryTextColor}`}>Avg. Helpfulness</p>
                <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>{mockInsightsData.avgHelpfulness}%</h3>
                <p className={`text-sm mt-1 text-green-500 flex items-center`}>
                  <TrendingUp className="h-3 w-3 mr-1" />+{mockInsightsData.helpfulnessIncrease}% from last period
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"}`}>
                <ThumbsUp className={`h-5 w-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${secondaryTextColor}`}>Zero Result Searches</p>
                <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>{mockInsightsData.zeroResultSearches.length}</h3>
                <p className={`text-sm mt-1 text-red-500 flex items-center`}>
                  <TrendingUp className="h-3 w-3 mr-1" />+{mockInsightsData.zeroResultsIncrease}% from last period
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === "dark" ? "bg-red-900/30" : "bg-red-100"}`}>
                <Search className={`h-5 w-5 ${theme === "dark" ? "text-red-400" : "text-red-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${secondaryTextColor}`}>Content Freshness</p>
                <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>{mockInsightsData.avgFreshness}%</h3>
                <p className={`text-sm mt-1 text-red-500 flex items-center`}>
                  <TrendingDown className="h-3 w-3 mr-1" />-{mockInsightsData.freshnessDecrease}% from last period
                </p>
              </div>
              <div className={`p-3 rounded-full ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"}`}>
                <Clock className={`h-5 w-5 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Viewed Articles */}
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardHeader className={`${cardHeaderBgColor} ${borderColor} px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-lg ${textColor}`}>
                  <span className="mr-2">📈</span> Top Viewed Articles
                </CardTitle>
                <CardDescription>Most popular content in your knowledge base</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700" : "text-blue-600 hover:text-blue-700"}`}
                onClick={() => handleViewAll("top articles")}
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <TopViewedArticles timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Idle Content */}
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardHeader className={`${cardHeaderBgColor} ${borderColor} px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-lg ${textColor}`}>
                  <span className="mr-2">💤</span> Idle Content
                </CardTitle>
                <CardDescription>Articles with zero views in the last {timeRange} days</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700" : "text-blue-600 hover:text-blue-700"}`}
                onClick={() => handleViewAll("idle content")}
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <IdleContent timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Zero Result Searches */}
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardHeader className={`${cardHeaderBgColor} ${borderColor} px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-lg ${textColor}`}>
                  <span className="mr-2">❌</span> Zero Result Searches
                </CardTitle>
                <CardDescription>Search terms that returned no results</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700" : "text-blue-600 hover:text-blue-700"}`}
                onClick={() => handleViewAll("zero result searches")}
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ZeroResultSearches timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Content to Improve */}
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardHeader className={`${cardHeaderBgColor} ${borderColor} px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-lg ${textColor}`}>
                  <span className="mr-2">🛠</span> Content to Improve
                </CardTitle>
                <CardDescription>Articles with quality issues that need attention</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700" : "text-blue-600 hover:text-blue-700"}`}
                onClick={() => handleViewAll("content to improve")}
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ContentToImprove />
          </CardContent>
        </Card>

        {/* Content Freshness */}
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardHeader className={`${cardHeaderBgColor} ${borderColor} px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-lg ${textColor}`}>
                  <span className="mr-2">🕒</span> Content Freshness
                </CardTitle>
                <CardDescription>Distribution of content by last update date</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700" : "text-blue-600 hover:text-blue-700"}`}
                onClick={() => handleViewDetails("content freshness")}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ContentFreshness />
          </CardContent>
        </Card>

        {/* High Helpfulness Articles */}
        <Card className={`${cardBgColor} ${borderColor}`}>
          <CardHeader className={`${cardHeaderBgColor} ${borderColor} px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className={`text-lg ${textColor}`}>
                  <span className="mr-2">✅</span> High Helpfulness Articles
                </CardTitle>
                <CardDescription>Articles with the highest helpfulness ratings</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700" : "text-blue-600 hover:text-blue-700"}`}
                onClick={() => handleViewAll("high helpfulness articles")}
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <HighHelpfulnessArticles />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
