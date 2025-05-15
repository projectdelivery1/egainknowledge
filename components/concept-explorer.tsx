"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Search, Maximize2, Minimize2, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { mockKnowledgeItems, mockGraphData, knowledgeClusters } from "@/lib/mock-data"
import type { KnowledgeItem } from "@/lib/types"
import ArticleDetailPanel from "./article-detail-panel"
import ArticleComparison from "./article-comparison"

interface ConceptExplorerProps {
  initialLayout?: "force" | "radial"
}

export default function ConceptExplorer({ initialLayout = "force" }: ConceptExplorerProps) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [layout, setLayout] = useState<"force" | "radial">(initialLayout)
  const [density, setDensity] = useState(50)
  const [showLabels, setShowLabels] = useState(true)
  const [colorByDepartment, setColorByDepartment] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeItem | null>(null)
  const [comparisonArticles, setComparisonArticles] = useState<KnowledgeItem[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeTab, setActiveTab] = useState("graph")
  const [graphData, setGraphData] = useState(mockGraphData)
  const [articles, setArticles] = useState<KnowledgeItem[]>(mockKnowledgeItems)
  const [filteredArticles, setFilteredArticles] = useState<KnowledgeItem[]>(mockKnowledgeItems)
  const [clusters, setClusters] = useState(knowledgeClusters)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)

  // Filter articles based on search query, department, and status
  useEffect(() => {
    let filtered = articles

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter((article) => article.department === selectedDepartment)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((article) => article.status === selectedStatus)
    }

    if (selectedCluster) {
      const cluster = clusters.find((c) => c.id === selectedCluster)
      if (cluster) {
        filtered = filtered.filter((article) => cluster.items.includes(article.id))
      }
    }

    setFilteredArticles(filtered)
  }, [searchQuery, selectedDepartment, selectedStatus, selectedCluster, articles, clusters])

  // Handle article selection for detail view
  const handleArticleSelect = (article: KnowledgeItem) => {
    setSelectedArticle(article)
    setComparisonArticles([])
  }

  // Handle article selection for comparison
  const handleCompareSelect = (article: KnowledgeItem) => {
    setComparisonArticles((prev) => {
      // If already selected, remove it
      if (prev.some((a) => a.id === article.id)) {
        return prev.filter((a) => a.id === article.id)
      }

      // If we already have 2 articles, replace the second one
      if (prev.length === 2) {
        return [prev[0], article]
      }

      // Otherwise add it
      return [...prev, article]
    })
  }

  // Clear comparison selection
  const handleClearComparison = () => {
    setComparisonArticles([])
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Adjust zoom level
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  // Reset zoom level
  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  // Handle cluster selection
  const handleClusterSelect = (clusterId: string) => {
    setSelectedCluster((prev) => (prev === clusterId ? null : clusterId))
  }

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : ""}`}>
      {/* Header with controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search concepts or articles..."
              className="pl-9 bg-white dark:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Customer Support">Customer Support</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Clusters and concepts */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-sm">Knowledge Clusters</h3>
          </div>

          <div className="flex-1 overflow-auto p-2">
            <div className="space-y-2">
              {clusters.map((cluster) => (
                <div
                  key={cluster.id}
                  className={`p-2 rounded-md cursor-pointer transition-colors ${
                    selectedCluster === cluster.id
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => handleClusterSelect(cluster.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{cluster.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {cluster.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedCluster(null)}>
              <RefreshCw className="h-3 w-3 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4">
              <TabsList>
                <TabsTrigger value="graph">Knowledge Graph</TabsTrigger>
                <TabsTrigger value="list">Article List</TabsTrigger>
                <TabsTrigger value="comparison">Comparison ({comparisonArticles.length}/2)</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="graph" className="h-full m-0 overflow-hidden relative">
                {/* Graph visualization would go here */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md">
                  <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleResetZoom}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute top-4 left-4 flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={layout === "force" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLayout("force")}
                    >
                      Force
                    </Button>
                    <Button
                      variant={layout === "radial" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLayout("radial")}
                    >
                      Radial
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs">Density:</span>
                    <Slider
                      value={[density]}
                      min={10}
                      max={100}
                      step={10}
                      onValueChange={(value) => setDensity(value[0])}
                      className="w-24"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                    <Label htmlFor="show-labels" className="text-xs">
                      Show Labels
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="color-by-dept" checked={colorByDepartment} onCheckedChange={setColorByDepartment} />
                    <Label htmlFor="color-by-dept" className="text-xs">
                      Color by Department
                    </Label>
                  </div>
                </div>

                <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Knowledge Graph Visualization
                  {/* This would be replaced by the actual graph component */}
                </div>
              </TabsContent>

              <TabsContent value="list" className="h-full m-0 overflow-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedArticle?.id === article.id ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""
                      }`}
                      onClick={() => handleArticleSelect(article)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{article.title}</h3>
                          <Badge variant="outline">{article.department}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{article.content}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {article.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Views: {article.views}</span>
                          <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="h-full m-0 overflow-auto p-4">
                {comparisonArticles.length === 2 ? (
                  <ArticleComparison
                    articles={[comparisonArticles[0], comparisonArticles[1]]}
                    onClose={handleClearComparison}
                    onClearSelection={handleClearComparison}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="text-center max-w-md">
                      <h3 className="text-lg font-medium mb-2">Select Articles to Compare</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Select two articles from the list view to compare their content, metadata, and performance.
                      </p>
                      <Badge variant="outline" className="mb-4">
                        {comparisonArticles.length}/2 articles selected
                      </Badge>
                      <Button onClick={() => setActiveTab("list")}>Go to Article List</Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right sidebar - Article details */}
        {selectedArticle && (
          <ArticleDetailPanel
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
            onCompare={handleCompareSelect}
          />
        )}
      </div>
    </div>
  )
}
