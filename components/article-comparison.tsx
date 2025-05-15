"use client"

import { useState } from "react"
import { X, ArrowLeft, ArrowRight, RefreshCw, Download, Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import type { KnowledgeItem } from "@/lib/types"
import { diffWords } from "diff"

interface ArticleComparisonProps {
  articles: [KnowledgeItem, KnowledgeItem]
  onClose: () => void
  onClearSelection: () => void
}

export default function ArticleComparison({ articles, onClose, onClearSelection }: ArticleComparisonProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("content")
  const [article1, article2] = articles

  // Calculate the difference between the two articles' content
  const contentDiff = diffWords(article1.content, article2.content)

  // Calculate metadata differences
  const getDateDiff = (date1: string, date2: string) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const createdDateDiff = getDateDiff(article1.createdAt, article2.createdAt)
  const updatedDateDiff = getDateDiff(article1.updatedAt, article2.updatedAt)

  // Find common and unique tags
  const commonTags = article1.tags.filter((tag) => article2.tags.includes(tag))
  const uniqueTags1 = article1.tags.filter((tag) => !article2.tags.includes(tag))
  const uniqueTags2 = article2.tags.filter((tag) => !article1.tags.includes(tag))

  // Calculate performance differences
  const viewsDiff = article2.views - article1.views
  const helpfulnessDiff =
    (article2.helpfulCount / (article2.helpfulCount + article2.notHelpfulCount || 1)) * 100 -
    (article1.helpfulCount / (article1.helpfulCount + article1.notHelpfulCount || 1)) * 100

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onClearSelection} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Selection
            </Button>
            <h2 className="text-xl font-bold">Article Comparison</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Article titles */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-2">{article1.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {article1.department}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                {article1.status}
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{article2.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {article2.department}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                {article2.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <TabsList className="mx-4 h-14">
              <TabsTrigger value="content" className="data-[state=active]:border-purple-600">
                Content Differences
              </TabsTrigger>
              <TabsTrigger value="metadata" className="data-[state=active]:border-purple-600">
                Metadata Comparison
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:border-purple-600">
                Performance Analysis
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:border-purple-600">
                Recommendations
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <TabsContent value="content" className="p-6 m-0">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Content Comparison</h3>
                <div className="border rounded-md p-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-wrap">
                    {contentDiff.map((part, index) => {
                      let className = "text-gray-700 dark:text-gray-300" // unchanged
                      if (part.added) {
                        className = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-1 rounded"
                      } else if (part.removed) {
                        className =
                          "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-1 rounded line-through"
                      }

                      return (
                        <span key={index} className={className}>
                          {part.value}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Original Content</h4>
                  <div className="border rounded-md p-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{article1.content}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Compared Content</h4>
                  <div className="border rounded-md p-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{article2.content}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/30"></span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Removed text</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/30"></span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Added text</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="p-6 m-0">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Creation & Update Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Created</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                            <span>{new Date(article1.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                            <span>{new Date(article2.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600 dark:text-gray-400">Difference:</span>
                            <span
                              className={
                                createdDateDiff > 0
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }
                            >
                              {createdDateDiff} days
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Last Updated</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                            <span>{new Date(article1.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                            <span>{new Date(article2.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600 dark:text-gray-400">Difference:</span>
                            <span
                              className={
                                updatedDateDiff > 0
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }
                            >
                              {updatedDateDiff} days
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Authors</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                          <span>{article1.author}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                          <span>{article2.author}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600 dark:text-gray-400">Same author:</span>
                          <span
                            className={
                              article1.author === article2.author
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }
                          >
                            {article1.author === article2.author ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Tags Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Common Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {commonTags.length > 0 ? (
                            commonTags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              >
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">No common tags</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Unique to Article 1</h4>
                          <div className="flex flex-wrap gap-2">
                            {uniqueTags1.length > 0 ? (
                              uniqueTags1.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                >
                                  {tag}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-gray-600 dark:text-gray-400">None</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Unique to Article 2</h4>
                          <div className="flex flex-wrap gap-2">
                            {uniqueTags2.length > 0 ? (
                              uniqueTags2.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                >
                                  {tag}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-gray-600 dark:text-gray-400">None</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Related Documents Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Article 1 Related Documents</h4>
                        <div className="space-y-2">
                          {article1.relatedDocuments.length > 0 ? (
                            article1.relatedDocuments.map((doc, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded"
                              >
                                <span>{doc.title}</span>
                                <span className="text-gray-600 dark:text-gray-400">Similarity: {doc.similarity}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">No related documents</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Article 2 Related Documents</h4>
                        <div className="space-y-2">
                          {article2.relatedDocuments.length > 0 ? (
                            article2.relatedDocuments.map((doc, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded"
                              >
                                <span>{doc.title}</span>
                                <span className="text-gray-600 dark:text-gray-400">Similarity: {doc.similarity}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">No related documents</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="p-6 m-0">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Engagement Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Views</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                          <span>{article1.views}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                          <span>{article2.views}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600 dark:text-gray-400">Difference:</span>
                          <span
                            className={
                              viewsDiff > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                            }
                          >
                            {viewsDiff > 0 ? "+" : ""}
                            {viewsDiff} views
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Helpfulness Rating</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                          <span>
                            {Math.round(
                              (article1.helpfulCount / (article1.helpfulCount + article1.notHelpfulCount || 1)) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                          <span>
                            {Math.round(
                              (article2.helpfulCount / (article2.helpfulCount + article2.notHelpfulCount || 1)) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600 dark:text-gray-400">Difference:</span>
                          <span
                            className={
                              helpfulnessDiff > 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }
                          >
                            {helpfulnessDiff > 0 ? "+" : ""}
                            {Math.round(helpfulnessDiff)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Content Age Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Age</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                          <span>
                            {Math.floor(
                              (new Date().getTime() - new Date(article1.createdAt).getTime()) / (1000 * 3600 * 24),
                            )}{" "}
                            days
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                          <span>
                            {Math.floor(
                              (new Date().getTime() - new Date(article2.createdAt).getTime()) / (1000 * 3600 * 24),
                            )}{" "}
                            days
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Time Since Last Update</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 1:</span>
                          <span>
                            {Math.floor(
                              (new Date().getTime() - new Date(article1.updatedAt).getTime()) / (1000 * 3600 * 24),
                            )}{" "}
                            days
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Article 2:</span>
                          <span>
                            {Math.floor(
                              (new Date().getTime() - new Date(article2.updatedAt).getTime()) / (1000 * 3600 * 24),
                            )}{" "}
                            days
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="p-4 rounded bg-gray-50 dark:bg-gray-900">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        Based on the performance metrics, {article1.views > article2.views ? "Article 1" : "Article 2"}{" "}
                        has higher engagement with {Math.max(article1.views, article2.views)} views compared to{" "}
                        {Math.min(article1.views, article2.views)} views.
                        {helpfulnessDiff !== 0 &&
                          ` In terms of helpfulness, ${helpfulnessDiff > 0 ? "Article 2" : "Article 1"} is rated more helpful by users.`}
                      </p>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Performance Winner
                        </Badge>
                        <span className="font-medium">
                          {article1.views *
                            (article1.helpfulCount / (article1.helpfulCount + article1.notHelpfulCount || 1)) >
                          article2.views *
                            (article2.helpfulCount / (article2.helpfulCount + article2.notHelpfulCount || 1))
                            ? article1.title
                            : article2.title}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="p-6 m-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2 text-purple-600" />
                      Merge Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="p-4 rounded bg-gray-50 dark:bg-gray-900 mb-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Based on the content and performance analysis, here are recommendations for merging these
                        articles:
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500 pl-4 py-1">
                        <h4 className="font-medium mb-1">Recommended Action</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {contentDiff.filter((d) => d.added || d.removed).length > 10
                            ? "Merge these articles into a new comprehensive document"
                            : "Keep as separate documents but cross-reference them"}
                        </p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4 py-1">
                        <h4 className="font-medium mb-1">Content Strategy</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {article1.views > article2.views
                            ? `Use Article 1 as the base and incorporate the unique content from Article 2`
                            : `Use Article 2 as the base and incorporate the unique content from Article 1`}
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4 py-1">
                        <h4 className="font-medium mb-1">Tag Recommendations</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Combine all unique tags from both articles for better discoverability
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {[...new Set([...article1.tags, ...article2.tags])].map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Content Improvement Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-800 dark:text-purple-200 mt-0.5">
                            1
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {contentDiff.filter((d) => d.added).length > contentDiff.filter((d) => d.removed).length
                              ? "Article 2 contains more detailed information that should be preserved in the final version"
                              : "Article 1 contains more detailed information that should be preserved in the final version"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-800 dark:text-purple-200 mt-0.5">
                            2
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {uniqueTags1.length > 0 || uniqueTags2.length > 0
                              ? "Combine all tags for better search visibility and categorization"
                              : "Consider adding more specific tags to improve discoverability"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-800 dark:text-purple-200 mt-0.5">
                            3
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {article1.relatedDocuments.length !== article2.relatedDocuments.length
                              ? "Consolidate related documents from both articles to provide more comprehensive references"
                              : "Review related documents to ensure they're still relevant to the merged content"}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Action Items</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <Button className="w-full justify-start" variant="default">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Create Merged Document
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Keep Both Documents
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Archive Lower Performing Document
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Flag for Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
