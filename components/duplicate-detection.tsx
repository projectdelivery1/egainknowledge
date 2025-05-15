"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, AlertCircle, Flag, GitMerge, Layers, Eye, ChevronDown, Check, Copy, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import DiffView from "@/components/diff-view"
import { mockDuplicatePairs } from "@/lib/mock-data"
import type { DuplicatePair } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

export default function DuplicateDetection() {
  const { toast } = useToast()
  const { theme } = useTheme()
  const [selectedPair, setSelectedPair] = useState<DuplicatePair | null>(
    mockDuplicatePairs.length > 0 ? mockDuplicatePairs[0] : null,
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [similarityFilter, setStatusSimilarity] = useState("all")
  const [activeTab, setActiveTab] = useState("diff")
  const [pairStatuses, setPairStatuses] = useState<Record<string, string>>({})

  // Filter pairs based on search and filters
  const filteredPairs = useMemo(() => {
    return mockDuplicatePairs.filter((pair) => {
      const matchesSearch =
        searchQuery === "" ||
        pair.source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pair.target.title.toLowerCase().includes(searchQuery.toLowerCase())

      const pairStatus = pairStatuses[pair.id] || pair.status
      const matchesStatus = statusFilter === "all" || pairStatus === statusFilter

      const matchesSimilarity =
        similarityFilter === "all" ||
        (similarityFilter === "high" && pair.similarity >= 90) ||
        (similarityFilter === "medium" && pair.similarity >= 75 && pair.similarity < 90) ||
        (similarityFilter === "low" && pair.similarity < 75)

      return matchesSearch && matchesStatus && matchesSimilarity
    })
  }, [searchQuery, statusFilter, similarityFilter, pairStatuses])

  // Handle status change for a pair
  const handleStatusChange = (pairId: string, newStatus: string) => {
    // Update the status in our local state
    setPairStatuses((prev) => ({
      ...prev,
      [pairId]: newStatus,
    }))

    // Show toast notification
    const statusMessages = {
      merged: "Documents have been merged successfully",
      "kept-separate": "Documents marked as separate entities",
      flagged: "Documents flagged for further review",
    }

    const statusTitles = {
      merged: "Merged",
      "kept-separate": "Kept Separate",
      flagged: "Flagged for Review",
    }

    const statusVariants = {
      merged: "success",
      "kept-separate": "info",
      flagged: "warning",
    }

    toast({
      title: statusTitles[newStatus as keyof typeof statusTitles] || "Status Updated",
      description: statusMessages[newStatus as keyof typeof statusMessages] || "Document status has been updated",
      variant: (statusVariants[newStatus as keyof typeof statusVariants] as any) || "default",
    })
  }

  // Status badge colors and text
  const getStatusBadge = (status: string) => {
    const isDark = theme === "dark"

    switch (status) {
      case "pending":
        return {
          color: isDark
            ? "bg-slate-800 text-slate-200 border border-slate-700"
            : "bg-[#f0f4f9] text-[#4a6f8a] border border-[#d0e1f0]",
          text: "Pending Review",
        }
      case "merged":
        return {
          color: isDark
            ? "bg-blue-950 text-blue-200 border border-blue-800"
            : "bg-[#e6f0ff] text-[#3b82f6] border border-[#c7d9f9]",
          text: "Merged",
        }
      case "kept-separate":
        return {
          color: isDark
            ? "bg-green-950 text-green-200 border border-green-800"
            : "bg-[#ecfdf5] text-[#10b981] border border-[#d1fae5]",
          text: "Kept Separate",
        }
      case "flagged":
        return {
          color: isDark
            ? "bg-amber-950 text-amber-200 border border-amber-800"
            : "bg-[#fff8e6] text-[#d97706] border border-[#fde68a]",
          text: "Flagged for Review",
        }
      default:
        return {
          color: isDark
            ? "bg-slate-800 text-slate-200 border border-slate-700"
            : "bg-[#f0f4f9] text-[#4a6f8a] border border-[#d0e1f0]",
          text: status,
        }
    }
  }

  // Get similarity color based on percentage
  const getSimilarityColor = (similarity: number) => {
    const isDark = theme === "dark"

    if (similarity >= 85) return isDark ? "bg-red-600" : "bg-[#ef4444]"
    if (similarity >= 75) return isDark ? "bg-amber-500" : "bg-[#f59e0b]"
    return isDark ? "bg-green-600" : "bg-[#10b981]"
  }

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle filter changes
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }

  const handleSimilarityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusSimilarity(e.target.value)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Handle view in graph
  const handleViewInGraph = () => {
    toast({
      title: "Navigating",
      description: "Opening documents in graph view",
      variant: "default",
    })
  }

  // Handle pair selection
  const handlePairSelect = (pair: DuplicatePair) => {
    setSelectedPair(pair)
  }

  // Get department color
  const getDepartmentColor = (department: string) => {
    const isDark = theme === "dark"

    switch (department) {
      case "HR":
        return isDark ? "bg-purple-600" : "bg-[#a29bfe]"
      case "Support":
        return isDark ? "bg-blue-500" : "bg-[#74b9ff]"
      case "IT":
        return isDark ? "bg-teal-500" : "bg-[#81ecec]"
      case "Sales":
        return isDark ? "bg-amber-400" : "bg-[#ffeaa7]"
      case "Marketing":
        return isDark ? "bg-rose-500" : "bg-[#ff9ff3]"
      case "Finance":
        return isDark ? "bg-green-500" : "bg-[#55efc4]"
      default:
        return isDark ? "bg-purple-600" : "bg-[#a29bfe]"
    }
  }

  const isDark = theme === "dark"

  return (
    <div className={`flex flex-col h-full ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <div className={`p-4 border-b ${isDark ? "border-slate-800 bg-slate-950" : "border-[#e5e7eb] bg-white"}`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-xl font-semibold ${isDark ? "text-white" : "text-[#333333]"}`}>Contradicting Info</h1>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 ${isDark ? "border-slate-700 text-slate-300" : "border-[#e5e7eb] text-[#4a5568]"}`}
            >
              <Copy className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 ${isDark ? "border-slate-700 text-slate-300" : "border-[#e5e7eb] text-[#4a5568]"}`}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 ${isDark ? "border-slate-700 text-slate-300" : "border-[#e5e7eb] text-[#4a5568]"}`}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button className="gap-1 bg-blue-600 text-white hover:bg-blue-700">
              <Check className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-slate-500" : "text-[#a0aec0]"} h-4 w-4`}
            />
            <Input
              placeholder="Search duplicates..."
              className={`pl-9 ${
                isDark
                  ? "border-slate-700 bg-slate-900 text-white focus-visible:ring-blue-600"
                  : "border-[#e5e7eb] focus-visible:ring-[#3b82f6] bg-white"
              }`}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="relative">
            <select
              className={`px-3 py-2 rounded-md border ${
                isDark ? "border-slate-700 bg-slate-900 text-white" : "border-[#e5e7eb] bg-white text-[#4a5568]"
              } focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-8`}
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="merged">Merged</option>
              <option value="kept-separate">Kept Separate</option>
              <option value="flagged">Flagged for Review</option>
              <option value="outdated">Outdated</option>
            </select>
            <ChevronDown
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isDark ? "text-slate-500" : "text-[#a0aec0]"} h-4 w-4 pointer-events-none`}
            />
          </div>

          <div className="relative">
            <select
              className={`px-3 py-2 rounded-md border ${
                isDark ? "border-slate-700 bg-slate-900 text-white" : "border-[#e5e7eb] bg-white text-[#4a5568]"
              } focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-8`}
              value={similarityFilter}
              onChange={handleSimilarityFilterChange}
            >
              <option value="all">All Similarity</option>
              <option value="high">High (90%+)</option>
              <option value="medium">Medium (75-90%)</option>
              <option value="low">Low (&lt;75%)</option>
            </select>
            <ChevronDown
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isDark ? "text-slate-500" : "text-[#a0aec0]"} h-4 w-4 pointer-events-none`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - List of duplicate pairs */}
        <div
          className={`w-1/3 border-r ${isDark ? "border-slate-800 bg-slate-900" : "border-[#e5e7eb] bg-[#f9fafb]"} overflow-y-auto`}
        >
          <div className="p-3">
            <h2 className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-[#718096]"} mb-2`}>
              {filteredPairs.length} potential {filteredPairs.length === 1 ? "duplicate" : "duplicates"} found
            </h2>

            <div className="space-y-3">
              {filteredPairs.map((pair) => {
                const pairStatus = pairStatuses[pair.id] || pair.status
                const statusBadge = getStatusBadge(pairStatus)

                return (
                  <Card
                    key={pair.id}
                    className={`border ${
                      isDark ? "border-slate-800 bg-slate-950" : "border-[#e5e7eb] bg-white"
                    } cursor-pointer transition-colors ${
                      selectedPair?.id === pair.id
                        ? "ring-2 ring-blue-600"
                        : isDark
                          ? "hover:bg-slate-900"
                          : "hover:bg-[#f8fafc]"
                    }`}
                    onClick={() => handlePairSelect(pair)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className={`font-medium ${isDark ? "text-white" : "text-[#4a5568]"} line-clamp-1`}>
                          {pair.source.title}
                        </div>
                        <Badge className={statusBadge.color}>{statusBadge.text}</Badge>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Progress
                          value={pair.similarity}
                          className={`h-1.5 flex-1 ${isDark ? "bg-slate-800" : "bg-[#e5e7eb]"}`}
                          indicatorClassName={getSimilarityColor(pair.similarity)}
                        />
                        <span className={`text-xs font-medium ${isDark ? "text-slate-400" : "text-[#718096]"}`}>
                          {pair.similarity}%
                        </span>
                      </div>

                      <div
                        className={`flex justify-between items-center text-xs ${isDark ? "text-slate-400" : "text-[#718096]"}`}
                      >
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${getDepartmentColor(pair.source.department)}`}></span>
                          <span>{pair.source.department}</span>
                        </div>
                        <span>vs</span>
                        <div className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${getDepartmentColor(pair.target.department)}`}></span>
                          <span>{pair.target.department}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {filteredPairs.length === 0 && (
                <div className={`text-center p-8 ${isDark ? "text-slate-500" : "text-[#a0aec0]"}`}>
                  No duplicates match your filters
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right panel - Comparison view */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedPair ? (
            <>
              <div
                className={`p-4 border-b ${isDark ? "border-slate-800 bg-slate-900" : "border-[#e5e7eb] bg-[#f9fafb]"}`}
              >
                <div className="flex justify-between items-center">
                  <h2 className={`font-semibold ${isDark ? "text-white" : "text-[#4a5568]"}`}>Comparison View</h2>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        isDark
                          ? "bg-slate-800 text-slate-200 border border-slate-700"
                          : "bg-[#f0f4f9] text-[#4a6f8a] border border-[#d0e1f0]"
                      }
                    >
                      Similarity: {selectedPair.similarity}%
                    </Badge>
                    <Badge className={getStatusBadge(pairStatuses[selectedPair.id] || selectedPair.status).color}>
                      {getStatusBadge(pairStatuses[selectedPair.id] || selectedPair.status).text}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className={`flex-1 overflow-hidden ${isDark ? "bg-slate-950" : "bg-white"}`}>
                <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
                  <div className={`border-b ${isDark ? "border-slate-800" : "border-[#e5e7eb]"} px-4`}>
                    <TabsList className={isDark ? "bg-slate-900" : "bg-transparent"}>
                      <TabsTrigger
                        value="diff"
                        className={
                          isDark
                            ? "data-[state=active]:bg-blue-900 data-[state=active]:text-blue-100"
                            : "data-[state=active]:bg-[#e6f0ff] data-[state=active]:text-[#3b82f6]"
                        }
                      >
                        Diff View
                      </TabsTrigger>
                      <TabsTrigger
                        value="side-by-side"
                        className={
                          isDark
                            ? "data-[state=active]:bg-blue-900 data-[state=active]:text-blue-100"
                            : "data-[state=active]:bg-[#e6f0ff] data-[state=active]:text-[#3b82f6]"
                        }
                      >
                        Side by Side
                      </TabsTrigger>
                      <TabsTrigger
                        value="metadata"
                        className={
                          isDark
                            ? "data-[state=active]:bg-blue-900 data-[state=active]:text-blue-100"
                            : "data-[state=active]:bg-[#e6f0ff] data-[state=active]:text-[#3b82f6]"
                        }
                      >
                        Metadata
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="flex-1 overflow-auto">
                    <TabsContent value="diff" className="m-0 p-0 h-full">
                      <DiffView
                        sourceContent={selectedPair.source.content}
                        targetContent={selectedPair.target.content}
                        sourceTitle={selectedPair.source.title}
                        targetTitle={selectedPair.target.title}
                        sourceDepartment={selectedPair.source.department}
                        targetDepartment={selectedPair.target.department}
                      />
                    </TabsContent>

                    <TabsContent value="side-by-side" className="m-0 p-4 h-full">
                      <div className="grid grid-cols-2 gap-4 h-full">
                        <Card
                          className={`${isDark ? "border-slate-800" : "border-[#e5e7eb]"} overflow-hidden h-full flex flex-col`}
                        >
                          <div
                            className={`p-3 ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#f9fafb] border-[#e5e7eb]"} border-b flex items-center gap-2`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${getDepartmentColor(selectedPair.source.department)}`}
                            ></span>
                            <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                              {selectedPair.source.title}
                            </h3>
                          </div>
                          <div className="p-4 flex-1 overflow-auto">
                            <p className={`text-sm ${isDark ? "text-slate-300" : "text-[#4a5568]"}`}>
                              {selectedPair.source.content}
                            </p>
                          </div>
                        </Card>

                        <Card
                          className={`${isDark ? "border-slate-800" : "border-[#e5e7eb]"} overflow-hidden h-full flex flex-col`}
                        >
                          <div
                            className={`p-3 ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#f9fafb] border-[#e5e7eb]"} border-b flex items-center gap-2`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${getDepartmentColor(selectedPair.target.department)}`}
                            ></span>
                            <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                              {selectedPair.target.title}
                            </h3>
                          </div>
                          <div className="p-4 flex-1 overflow-auto">
                            <p className={`text-sm ${isDark ? "text-slate-300" : "text-[#4a5568]"}`}>
                              {selectedPair.target.content}
                            </p>
                          </div>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="metadata" className="m-0 p-4 h-full">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className={isDark ? "border-slate-800" : "border-[#e5e7eb]"}>
                          <div
                            className={`p-3 ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#f9fafb] border-[#e5e7eb]"} border-b flex items-center gap-2`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${getDepartmentColor(selectedPair.source.department)}`}
                            ></span>
                            <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                              {selectedPair.source.title}
                            </h3>
                          </div>
                          <CardContent className="p-4">
                            <dl className="space-y-2">
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>
                                  Department:
                                </dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.source.department}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Status:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.source.status}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Author:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.source.author}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Created:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.source.createdAt}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Updated:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.source.updatedAt}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Views:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.source.analytics.views}
                                </dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>

                        <Card className={isDark ? "border-slate-800" : "border-[#e5e7eb]"}>
                          <div
                            className={`p-3 ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#f9fafb] border-[#e5e7eb]"} border-b flex items-center gap-2`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${getDepartmentColor(selectedPair.target.department)}`}
                            ></span>
                            <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                              {selectedPair.target.title}
                            </h3>
                          </div>
                          <CardContent className="p-4">
                            <dl className="space-y-2">
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>
                                  Department:
                                </dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.target.department}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Status:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.target.status}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Author:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.target.author}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Created:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.target.createdAt}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Updated:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.target.updatedAt}
                                </dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className={`text-sm ${isDark ? "text-slate-400" : "text-[#718096]"}`}>Views:</dt>
                                <dd className={`text-sm font-medium ${isDark ? "text-white" : "text-[#4a5568]"}`}>
                                  {selectedPair.target.analytics.views}
                                </dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              <div
                className={`p-4 border-t ${isDark ? "border-slate-800 bg-slate-900" : "border-[#e5e7eb] bg-[#f9fafb]"}`}
              >
                <div className="flex justify-between">
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-1 ${
                        isDark
                          ? "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                          : "border-[#e5e7eb] bg-white text-[#4a5568] hover:bg-[#f8fafc]"
                      }`}
                      onClick={handleViewInGraph}
                    >
                      <Eye className="h-4 w-4" />
                      View in Graph
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-1 ${
                        (pairStatuses[selectedPair.id] || selectedPair.status) === "flagged"
                          ? isDark
                            ? "bg-amber-950 text-amber-200 border-amber-800"
                            : "bg-[#fff8e6] text-[#d97706] border-[#fde68a]"
                          : isDark
                            ? "border-slate-700 bg-slate-900 text-slate-300"
                            : "border-[#e5e7eb] bg-white text-[#4a5568]"
                      }`}
                      onClick={() => handleStatusChange(selectedPair.id, "flagged")}
                    >
                      <Flag className="h-4 w-4" />
                      Flag for Review
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-1 ${
                        (pairStatuses[selectedPair.id] || selectedPair.status) === "kept-separate"
                          ? isDark
                            ? "bg-green-950 text-green-200 border-green-800"
                            : "bg-[#ecfdf5] text-[#10b981] border-[#d1fae5]"
                          : isDark
                            ? "border-slate-700 bg-slate-900 text-slate-300"
                            : "border-[#e5e7eb] bg-white text-[#4a5568]"
                      }`}
                      onClick={() => handleStatusChange(selectedPair.id, "kept-separate")}
                    >
                      <Layers className="h-4 w-4" />
                      Keep Separate
                    </Button>

                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handleStatusChange(selectedPair.id, "merged")}
                    >
                      <GitMerge className="h-4 w-4" />
                      Merge Documents
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={`flex items-center justify-center h-full ${isDark ? "text-slate-500" : "text-[#a0aec0]"}`}>
              <div className="text-center">
                <AlertCircle className={`h-12 w-12 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-[#a0aec0]"}`} />
                <p>Select a duplicate pair to compare</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
