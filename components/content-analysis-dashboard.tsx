"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, PieChart, TrendingUp, AlertCircle, FileText, ThumbsUp, Clock, Download, Filter } from "lucide-react"
import MostReadArticles from "@/components/analysis/most-read-articles"
import IdleContent from "@/components/analysis/idle-content"
import ZeroResultSearches from "@/components/analysis/zero-result-searches"
import ContentToImprove from "@/components/analysis/content-to-improve"
import FreshnessDistribution from "@/components/analysis/freshness-distribution"
import HighHelpfulnessArticles from "@/components/analysis/high-helpfulness-articles"
import { useToast } from "@/hooks/use-toast"

export default function ContentAnalysisDashboard() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("30d")

  const handleExport = () => {
    toast({
      title: "Report Exported",
      description: "Content analysis report has been exported to CSV",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Analysis Dashboard</h1>
          <p className="text-gray-500">Comprehensive analysis of your knowledge base content</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={timeRange === "7d" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setTimeRange("7d")}
            >
              7D
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setTimeRange("30d")}
            >
              30D
            </Button>
            <Button
              variant={timeRange === "90d" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setTimeRange("90d")}
            >
              90D
            </Button>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Documents</CardDescription>
            <CardTitle className="text-2xl">156</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Outdated Content</CardDescription>
            <CardTitle className="text-2xl">23</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-red-600 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>14.7% of total content</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Helpfulness</CardDescription>
            <CardTitle className="text-2xl">78%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600 flex items-center">
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span>+5% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Content Age</CardDescription>
            <CardTitle className="text-2xl">67 days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>+12 days from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content-health">Content Health</TabsTrigger>
          <TabsTrigger value="search-analysis">Search Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-blue-600" />
                      Most Read Articles
                    </CardTitle>
                    <CardDescription>Top performing content by views</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <MostReadArticles timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                      High Helpfulness Articles
                    </CardTitle>
                    <CardDescription>Content with highest helpfulness ratings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <HighHelpfulnessArticles timeRange={timeRange} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Idle Content
                  </CardTitle>
                  <CardDescription>Content with zero or minimal views</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <IdleContent timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content-health" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-purple-600" />
                      Freshness Distribution
                    </CardTitle>
                    <CardDescription>Content age distribution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <FreshnessDistribution />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-red-600" />
                      Content to Improve
                    </CardTitle>
                    <CardDescription>Content with grammar errors or outdated terms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ContentToImprove />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Content Quality Issues
                  </CardTitle>
                  <CardDescription>Content with structural or quality problems</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">Missing Headers</h3>
                    <p className="text-sm text-gray-500">12 documents have inadequate heading structure</p>
                  </div>
                  <Button size="sm">View All</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">Outdated Screenshots</h3>
                    <p className="text-sm text-gray-500">8 documents contain outdated UI screenshots</p>
                  </div>
                  <Button size="sm">View All</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">Broken Links</h3>
                    <p className="text-sm text-gray-500">5 documents contain broken internal links</p>
                  </div>
                  <Button size="sm">View All</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">Low Readability</h3>
                    <p className="text-sm text-gray-500">7 documents have poor readability scores</p>
                  </div>
                  <Button size="sm">View All</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search-analysis" className="mt-0 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Zero Result Searches
                  </CardTitle>
                  <CardDescription>Search terms that returned no results</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ZeroResultSearches timeRange={timeRange} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Trending Search Terms
                    </CardTitle>
                    <CardDescription>Most popular search queries</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-700">1.</span>
                      <span>remote work policy</span>
                    </div>
                    <div className="text-sm text-green-600">425 searches</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-700">2.</span>
                      <span>data security best practices</span>
                    </div>
                    <div className="text-sm text-green-600">387 searches</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-700">3.</span>
                      <span>customer support escalation</span>
                    </div>
                    <div className="text-sm text-green-600">342 searches</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-700">4.</span>
                      <span>product roadmap 2023</span>
                    </div>
                    <div className="text-sm text-green-600">298 searches</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-700">5.</span>
                      <span>performance review templates</span>
                    </div>
                    <div className="text-sm text-green-600">276 searches</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      Low Relevance Searches
                    </CardTitle>
                    <CardDescription>Searches with poor result quality</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>onboarding checklist</span>
                    </div>
                    <div className="text-sm text-amber-600">45% relevance</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>benefits enrollment</span>
                    </div>
                    <div className="text-sm text-amber-600">52% relevance</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>product pricing tiers</span>
                    </div>
                    <div className="text-sm text-amber-600">48% relevance</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>security compliance requirements</span>
                    </div>
                    <div className="text-sm text-amber-600">55% relevance</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>sales presentation templates</span>
                    </div>
                    <div className="text-sm text-amber-600">40% relevance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
