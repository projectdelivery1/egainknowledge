"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  X,
  Calendar,
  Clock,
  User,
  Link2,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  TrendingDown,
  AlertOctagon,
  ThumbsUp,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import type { KnowledgeItem } from "@/lib/types"
import { Progress } from "@/components/ui/progress"

interface ArticleDetailPanelProps {
  article: KnowledgeItem
  onClose: () => void
  onCompare?: (article: KnowledgeItem) => void
}

export default function ArticleDetailPanel({ article, onClose, onCompare }: ArticleDetailPanelProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme } = useTheme()
  const router = useRouter()

  // Determine article status
  const getArticleStatus = () => {
    const updatedDate = new Date(article.updatedAt)
    const now = new Date()
    const daysDifference = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24))

    if (daysDifference <= 7) return "RECENTLY UPDATED"
    if (article.views < 100 && article.helpfulCount / (article.helpfulCount + article.notHelpfulCount) < 0.7)
      return "LOW PERFORMING"
    if (daysDifference > 180) return "OUTDATED"

    // Random assignment for demo purposes
    const statuses = ["CONTRADICTING INFO", "NEEDS UPDATE", null]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const articleStatus = getArticleStatus()

  // Get status color
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "RECENTLY UPDATED":
        return theme === "dark"
          ? "text-green-300 bg-green-900/30 border-green-700"
          : "text-green-700 bg-green-100 border-green-200"
      case "LOW PERFORMING":
        return theme === "dark"
          ? "text-amber-300 bg-amber-900/30 border-amber-700"
          : "text-amber-700 bg-amber-100 border-amber-200"
      case "OUTDATED":
        return theme === "dark" ? "text-red-300 bg-red-900/30 border-red-700" : "text-red-700 bg-red-100 border-red-200"
      case "CONTRADICTING INFO":
        return theme === "dark"
          ? "text-purple-300 bg-purple-900/30 border-purple-700"
          : "text-purple-700 bg-purple-100 border-purple-200"
      case "NEEDS UPDATE":
        return theme === "dark"
          ? "text-blue-300 bg-blue-900/30 border-blue-700"
          : "text-blue-700 bg-blue-100 border-blue-200"
      default:
        return theme === "dark"
          ? "text-gray-300 bg-gray-800 border-gray-700"
          : "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "RECENTLY UPDATED":
        return <RefreshCw className="h-3 w-3 mr-1" />
      case "LOW PERFORMING":
        return <TrendingDown className="h-3 w-3 mr-1" />
      case "OUTDATED":
        return <AlertTriangle className="h-3 w-3 mr-1" />
      case "CONTRADICTING INFO":
        return <AlertOctagon className="h-3 w-3 mr-1" />
      case "NEEDS UPDATE":
        return <AlertTriangle className="h-3 w-3 mr-1" />
      default:
        return <CheckCircle className="h-3 w-3 mr-1" />
    }
  }

  // Generate AI suggestions
  const generateAiSuggestions = () => {
    const suggestions = [
      {
        type: "content",
        suggestion: "Add more details about the latest security protocols in section 3.",
        impact: "high",
      },
      {
        type: "structure",
        suggestion:
          "Consider breaking the long paragraph in the introduction into bullet points for better readability.",
        impact: "medium",
      },
      {
        type: "keywords",
        suggestion: "Add keywords related to 'remote access' to improve search visibility.",
        impact: "high",
      },
      {
        type: "visuals",
        suggestion: "Add a diagram illustrating the network configuration process.",
        impact: "medium",
      },
      {
        type: "links",
        suggestion: "Add links to related documents on VPN setup and troubleshooting.",
        impact: "low",
      },
    ]

    // Return a random subset of suggestions
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  const aiSuggestions = generateAiSuggestions()

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return theme === "dark" ? "text-red-300 bg-red-900/30" : "text-red-700 bg-red-100"
      case "medium":
        return theme === "dark" ? "text-amber-300 bg-amber-900/30" : "text-amber-700 bg-amber-100"
      case "low":
        return theme === "dark" ? "text-green-300 bg-green-900/30" : "text-green-700 bg-green-100"
      default:
        return theme === "dark" ? "text-gray-300 bg-gray-800" : "text-gray-700 bg-gray-100"
    }
  }

  // Calculate metrics
  const helpfulnessRate = Math.round(
    (article.helpfulCount / (article.helpfulCount + article.notHelpfulCount || 1)) * 100,
  )
  const viewsPerDay = Math.round(
    article.views /
      Math.max(1, Math.floor((new Date().getTime() - new Date(article.createdAt).getTime()) / (1000 * 3600 * 24))),
  )

  return (
    <div
      className={`w-96 border-l ${
        theme === "dark" ? "border-gray-700 bg-gray-900" : "border-[#e9ecef] bg-[#f6f8fc]"
      } flex flex-col h-full`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b ${
          theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"
        }`}
      >
        <h2 className={`font-semibold ${theme === "dark" ? "text-white" : "text-[#4a5568]"}`}>Article Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={`${
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-[#a0aec0] hover:text-[#4a5568] hover:bg-[#ebeef5]"
          }`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"}`}>
        <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-[#4a5568]"}`}>
          {article.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className={`${theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"}`}>
            {article.department}
          </Badge>
          {articleStatus && (
            <Badge variant="outline" className={getStatusColor(articleStatus)}>
              {getStatusIcon(articleStatus)}
              {articleStatus}
            </Badge>
          )}
        </div>
        {onCompare && (
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => onCompare(article)}>
            <Link2 className="h-4 w-4 mr-2" />
            Select for Comparison
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className={`border-b ${theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"}`}>
          <TabsList
            className={`w-full justify-start rounded-none border-b-0 ${
              theme === "dark" ? "bg-gray-900" : "bg-transparent"
            } p-0`}
          >
            <TabsTrigger
              value="overview"
              className={`rounded-none border-b-2 border-transparent ${
                theme === "dark"
                  ? "data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:text-[#a78bfa] text-gray-400"
                  : "data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:text-[#7c5cfc] text-[#718096]"
              }`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className={`rounded-none border-b-2 border-transparent ${
                theme === "dark"
                  ? "data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:text-[#a78bfa] text-gray-400"
                  : "data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:text-[#7c5cfc] text-[#718096]"
              }`}
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className={`rounded-none border-b-2 border-transparent ${
                theme === "dark"
                  ? "data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:text-[#a78bfa] text-gray-400"
                  : "data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:text-[#7c5cfc] text-[#718096]"
              }`}
            >
              AI Suggestions
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="overview" className="p-4 m-0 h-full overflow-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className={theme === "dark" ? "h-4 w-4 text-gray-500" : "h-4 w-4 text-[#a0aec0]"} />
                <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                  Created: {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={theme === "dark" ? "h-4 w-4 text-gray-500" : "h-4 w-4 text-[#a0aec0]"} />
                <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                  Last updated: {new Date(article.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className={theme === "dark" ? "h-4 w-4 text-gray-500" : "h-4 w-4 text-[#a0aec0]"} />
                <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                  Author: {article.author}
                </span>
              </div>

              <Separator className={theme === "dark" ? "bg-gray-700" : "bg-[#e9ecef]"} />

              <div>
                <h4 className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                  Content
                </h4>
                <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-[#ebeef5]"}>
                  <CardContent className="p-4">
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                      {article.content}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={
                        theme === "dark"
                          ? "bg-[#4c1d95] text-[#a78bfa] cursor-pointer"
                          : "bg-[#e9d8fd] text-[#7c5cfc] cursor-pointer"
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}`}>
                  Related Documents
                </h4>
                <div className="space-y-2">
                  {article.relatedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-sm ${
                        theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-[#ebeef5] hover:bg-[#e9ecef]"
                      } cursor-pointer flex justify-between items-center`}
                    >
                      <span className={theme === "dark" ? "text-gray-300" : "text-[#4a5568]"}>{doc.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {doc.similarity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="p-4 m-0 h-full overflow-auto">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-white"}>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Eye className={`h-5 w-5 mb-1 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                    <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {article.views}
                    </div>
                    <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Total Views</div>
                  </CardContent>
                </Card>

                <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-white"}>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <ThumbsUp className={`h-5 w-5 mb-1 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                    <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {helpfulnessRate}%
                    </div>
                    <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Helpfulness</div>
                  </CardContent>
                </Card>
              </div>

              <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-white"}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Views per Day
                      </span>
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {viewsPerDay}
                      </span>
                    </div>
                    <Progress value={Math.min(viewsPerDay / 10, 100)} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Helpfulness Rate
                      </span>
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {helpfulnessRate}%
                      </span>
                    </div>
                    <Progress value={helpfulnessRate} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Search Relevance
                      </span>
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {Math.round(Math.random() * 40 + 60)}%
                      </span>
                    </div>
                    <Progress value={Math.round(Math.random() * 40 + 60)} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Content Freshness
                      </span>
                      <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {Math.round(Math.random() * 30 + 70)}%
                      </span>
                    </div>
                    <Progress value={Math.round(Math.random() * 30 + 70)} className="h-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-white"}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Top Search Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-2">
                    {["network setup", "vpn configuration", "security protocol", "remote access"].map((term, i) => (
                      <div
                        key={i}
                        className={`flex justify-between items-center p-2 rounded ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {term}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round(Math.random() * 50 + 10)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="p-4 m-0 h-full overflow-auto">
            <div className="space-y-4">
              <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-white"}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle
                    className={`text-base flex items-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    AI Content Suggestions
                  </CardTitle>
                  <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                    Recommendations to improve this article
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-4">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Badge className={`${getImpactColor(suggestion.impact)} mt-0.5`}>{suggestion.impact}</Badge>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {suggestion.suggestion}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-12">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Apply
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Ignore
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "border-gray-700 bg-gray-800" : "border-[#e9ecef] bg-white"}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className={`text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Content Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
                        theme === "dark" ? "border-purple-600" : "border-purple-500"
                      }`}
                    >
                      <span className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {Math.round(Math.random() * 20 + 70)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          Content Quality
                        </span>
                        <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {Math.round(Math.random() * 20 + 70)}%
                        </span>
                      </div>
                      <Progress value={Math.round(Math.random() * 20 + 70)} className="h-1" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          SEO Optimization
                        </span>
                        <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {Math.round(Math.random() * 30 + 60)}%
                        </span>
                      </div>
                      <Progress value={Math.round(Math.random() * 30 + 60)} className="h-1" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          Readability
                        </span>
                        <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {Math.round(Math.random() * 15 + 80)}%
                        </span>
                      </div>
                      <Progress value={Math.round(Math.random() * 15 + 80)} className="h-1" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          Completeness
                        </span>
                        <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {Math.round(Math.random() * 25 + 65)}%
                        </span>
                      </div>
                      <Progress value={Math.round(Math.random() * 25 + 65)} className="h-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
