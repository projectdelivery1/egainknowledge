"use client"

import { useState } from "react"
import { ArrowUp, Plus, FileEdit, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Mock data for search gap report
const mockSearchGapData = {
  "no-results": [
    {
      term: "VPN for Mac",
      searchVolume: 245,
      lastSearched: "2 hours ago",
      trend: "up",
      trendPercentage: 15,
      suggestedAction: "create",
      relatedTerms: ["Mac VPN setup", "VPN configuration Mac", "Mac security"],
    },
    {
      term: "Password reset mobile app",
      searchVolume: 189,
      lastSearched: "30 minutes ago",
      trend: "up",
      trendPercentage: 28,
      suggestedAction: "create",
      relatedTerms: ["mobile password reset", "app login issues", "reset credentials"],
    },
    {
      term: "Team calendar sharing",
      searchVolume: 156,
      lastSearched: "1 hour ago",
      trend: "stable",
      trendPercentage: 0,
      suggestedAction: "create",
      relatedTerms: ["share calendar", "team schedule", "calendar permissions"],
    },
    {
      term: "Expense report approval workflow",
      searchVolume: 132,
      lastSearched: "3 hours ago",
      trend: "up",
      trendPercentage: 12,
      suggestedAction: "create",
      relatedTerms: ["expense approval", "report workflow", "expense policy"],
    },
    {
      term: "Remote desktop troubleshooting",
      searchVolume: 118,
      lastSearched: "45 minutes ago",
      trend: "down",
      trendPercentage: 5,
      suggestedAction: "create",
      relatedTerms: ["remote connection issues", "desktop access", "remote work"],
    },
  ],
  "low-relevance": [
    {
      term: "Onboarding checklist",
      searchVolume: 312,
      lastSearched: "15 minutes ago",
      trend: "up",
      trendPercentage: 32,
      suggestedAction: "expand",
      relevanceScore: 45,
      existingDocument: "Employee Onboarding Process",
      relatedTerms: ["new hire checklist", "onboarding steps", "first day"],
    },
    {
      term: "Benefits enrollment",
      searchVolume: 278,
      lastSearched: "1 hour ago",
      trend: "up",
      trendPercentage: 18,
      suggestedAction: "expand",
      relevanceScore: 52,
      existingDocument: "Employee Benefits Overview",
      relatedTerms: ["health benefits", "enrollment period", "benefits selection"],
    },
    {
      term: "Product pricing tiers",
      searchVolume: 245,
      lastSearched: "2 hours ago",
      trend: "stable",
      trendPercentage: 0,
      suggestedAction: "expand",
      relevanceScore: 48,
      existingDocument: "Product Pricing Guide",
      relatedTerms: ["pricing options", "subscription tiers", "pricing comparison"],
    },
    {
      term: "Security compliance requirements",
      searchVolume: 198,
      lastSearched: "30 minutes ago",
      trend: "up",
      trendPercentage: 10,
      suggestedAction: "expand",
      relevanceScore: 55,
      existingDocument: "Security Protocols",
      relatedTerms: ["compliance policy", "security standards", "data protection"],
    },
    {
      term: "Sales presentation templates",
      searchVolume: 176,
      lastSearched: "3 hours ago",
      trend: "down",
      trendPercentage: 8,
      suggestedAction: "expand",
      relevanceScore: 40,
      existingDocument: "Sales Playbook",
      relatedTerms: ["pitch deck", "sales slides", "presentation materials"],
    },
  ],
  trending: [
    {
      term: "Remote work policy",
      searchVolume: 425,
      lastSearched: "5 minutes ago",
      trend: "up",
      trendPercentage: 45,
      suggestedAction: "update",
      existingDocument: "Remote Work Policy",
      lastUpdated: "3 months ago",
      relatedTerms: ["work from home", "remote guidelines", "telecommuting"],
    },
    {
      term: "Data security best practices",
      searchVolume: 387,
      lastSearched: "10 minutes ago",
      trend: "up",
      trendPercentage: 38,
      suggestedAction: "update",
      existingDocument: "Security Protocols",
      lastUpdated: "2 months ago",
      relatedTerms: ["security guidelines", "data protection", "information security"],
    },
    {
      term: "Customer support escalation",
      searchVolume: 342,
      lastSearched: "30 minutes ago",
      trend: "up",
      trendPercentage: 25,
      suggestedAction: "create",
      relatedTerms: ["support tiers", "escalation process", "customer issues"],
    },
    {
      term: "Product roadmap 2023",
      searchVolume: 298,
      lastSearched: "1 hour ago",
      trend: "up",
      trendPercentage: 22,
      suggestedAction: "update",
      existingDocument: "Product Roadmap",
      lastUpdated: "6 months ago",
      relatedTerms: ["feature timeline", "upcoming releases", "product planning"],
    },
    {
      term: "Performance review templates",
      searchVolume: 276,
      lastSearched: "45 minutes ago",
      trend: "up",
      trendPercentage: 15,
      suggestedAction: "expand",
      existingDocument: "Performance Review Guidelines",
      lastUpdated: "4 months ago",
      relatedTerms: ["review forms", "evaluation templates", "performance assessment"],
    },
  ],
}

interface SearchGapReportProps {
  type: "no-results" | "low-relevance" | "trending"
}

export default function SearchGapReport({ type }: SearchGapReportProps) {
  const { toast } = useToast()
  const [expandedTerms, setExpandedTerms] = useState<string[]>([])

  const data = mockSearchGapData[type]

  const toggleExpandTerm = (term: string) => {
    setExpandedTerms((prev) => (prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]))
  }

  const handleAction = (term: string, action: string) => {
    toast({
      title: `Action: ${action}`,
      description: `${action.charAt(0).toUpperCase() + action.slice(1)} content for "${term}"`,
    })
  }

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === "up") {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUp className="h-3 w-3 mr-1" />
          {percentage}%
        </div>
      )
    } else if (trend === "down") {
      return (
        <div className="flex items-center text-red-600">
          <ArrowUp className="h-3 w-3 mr-1 rotate-180" />
          {percentage}%
        </div>
      )
    }
    return <div className="flex items-center text-gray-600">0%</div>
  }

  const getActionButton = (item: any) => {
    if (item.suggestedAction === "create") {
      return (
        <Button className="gap-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleAction(item.term, "create")}>
          <Plus className="h-4 w-4" />
          Create Content
        </Button>
      )
    } else if (item.suggestedAction === "expand") {
      return (
        <Button className="gap-1 bg-purple-600 hover:bg-purple-700" onClick={() => handleAction(item.term, "expand")}>
          <FileEdit className="h-4 w-4" />
          Expand Document
        </Button>
      )
    } else {
      return (
        <Button className="gap-1 bg-amber-600 hover:bg-amber-700" onClick={() => handleAction(item.term, "update")}>
          <FileEdit className="h-4 w-4" />
          Update Content
        </Button>
      )
    }
  }

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-medium">{item.term}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    {item.searchVolume} searches
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {getTrendIcon(item.trend, item.trendPercentage)}
                  </span>
                  <span>Last searched: {item.lastSearched}</span>
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className={
                  type === "no-results"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : type === "low-relevance"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                }
              >
                {type === "no-results" ? "No Results" : type === "low-relevance" ? "Low Relevance" : "Trending"}
              </Badge>
            </div>
          </CardHeader>

          {type === "low-relevance" && (
            <CardContent className="pb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Relevance Score:</span>
                <Progress
                  value={item.relevanceScore}
                  className="h-2 flex-1"
                  indicatorClassName={
                    item.relevanceScore < 40 ? "bg-red-500" : item.relevanceScore < 60 ? "bg-amber-500" : "bg-green-500"
                  }
                />
                <span className="text-sm font-medium">{item.relevanceScore}%</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Existing Document:</span>
                <Button variant="link" className="h-auto p-0 text-blue-600">
                  {item.existingDocument}
                </Button>
              </div>
            </CardContent>
          )}

          {type === "trending" && item.existingDocument && (
            <CardContent className="pb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Existing Document:</span>
                <Button variant="link" className="h-auto p-0 text-blue-600">
                  {item.existingDocument}
                </Button>
                <span className="text-xs text-gray-500">(Last updated: {item.lastUpdated})</span>
              </div>
            </CardContent>
          )}

          {expandedTerms.includes(item.term) && (
            <CardContent className="pt-0">
              <div className="mt-3 pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">Related Search Terms:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.relatedTerms.map((term: string, i: number) => (
                    <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          )}

          <CardFooter className="flex justify-between py-3">
            <Button variant="ghost" size="sm" className="text-gray-600" onClick={() => toggleExpandTerm(item.term)}>
              {expandedTerms.includes(item.term) ? "Less Details" : "More Details"}
            </Button>

            {getActionButton(item)}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
