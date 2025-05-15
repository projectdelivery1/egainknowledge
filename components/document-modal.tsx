"use client"

import { useState } from "react"
import {
  X,
  Download,
  Share2,
  Printer,
  Edit,
  Clock,
  Calendar,
  User,
  Tag,
  FileText,
  Eye,
  ThumbsUp,
  Search,
  MessageSquare,
  BarChart2,
  ExternalLink,
  Reply,
  Users,
  Smartphone,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Node } from "@/lib/types"
import { useTheme } from "next-themes"

interface DocumentModalProps {
  node: Node
  onClose: () => void
}

export default function DocumentModal({ node, onClose }: DocumentModalProps) {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("content")

  // Format the content with proper sections
  const formatContent = () => {
    // This is a simplified example - in a real app, you'd parse markdown or rich text
    const sections = [
      { title: "Introduction", content: node.content },
      {
        title: "Network Setup",
        content:
          "This section covers the initial setup of network devices including routers, switches, and access points. Follow these steps to ensure proper configuration and connectivity across all devices.",
      },
      {
        title: "Router Configuration",
        content:
          "1. Access the router admin panel at 192.168.1.1\n2. Login with admin credentials\n3. Navigate to Network Settings\n4. Configure the following parameters:\n   - SSID: CompanyNetwork\n   - Security: WPA2-Enterprise\n   - Channel: Auto\n   - Bandwidth: 40MHz",
      },
      {
        title: "VPN Access",
        content:
          "To set up VPN access, install the company VPN client from the software portal. Configure with the following settings:\n\n- Server: vpn.company.com\n- Port: 443\n- Protocol: OpenVPN\n- Authentication: Certificate + Username/Password",
      },
      {
        title: "Security Measures",
        content:
          "Implement the following security measures to protect the network:\n\n1. Enable firewall on all endpoints\n2. Set up network segmentation for guest access\n3. Configure intrusion detection system\n4. Implement regular security audits\n5. Ensure all firmware is updated regularly",
      },
      {
        title: "Troubleshooting",
        content:
          "Common issues and their solutions:\n\n- Connection drops: Check for interference or overlapping channels\n- Slow performance: Monitor bandwidth usage and QoS settings\n- VPN connection issues: Verify server status and client configuration\n- Security alerts: Follow incident response protocol in the security handbook",
      },
    ]

    return sections
  }

  const sections = formatContent()

  // Generate a table of contents from the sections
  const tableOfContents = sections.map((section) => section.title)

  // Related documents with more details
  const relatedDocs = node.relatedDocuments.map((doc) => ({
    ...doc,
    lastUpdated: "May 2, 2025",
    author: "Technical Team",
    views: Math.floor(Math.random() * 500) + 100,
  }))

  // Version history
  const versionHistory = [
    {
      version: "2.3",
      date: "May 6, 2025",
      author: "Robert Chang",
      changes: "Updated security protocols and VPN configuration",
    },
    {
      version: "2.2",
      date: "Mar 15, 2025",
      author: "Sarah Johnson",
      changes: "Added new router models and configuration steps",
    },
    {
      version: "2.1",
      date: "Jan 22, 2025",
      author: "Robert Chang",
      changes: "Updated troubleshooting section with new solutions",
    },
    {
      version: "2.0",
      date: "Nov 10, 2024",
      author: "Michael Wong",
      changes: "Major revision with new network architecture",
    },
    { version: "1.5", date: "Aug 3, 2024", author: "Robert Chang", changes: "Added security best practices" },
  ]

  // Comments and feedback
  const comments = [
    {
      author: "Lisa Chen",
      date: "May 7, 2025",
      content: "The VPN setup instructions worked perfectly. Thanks!",
      avatar: "LC",
    },
    {
      author: "David Miller",
      date: "May 5, 2025",
      content: "Could use more details on firewall configuration for remote workers.",
      avatar: "DM",
    },
    {
      author: "Emma Wilson",
      date: "May 3, 2025",
      content: "The troubleshooting section saved me hours of work!",
      avatar: "EW",
    },
  ]

  // Usage statistics
  const usageStats = {
    weeklyViews: [42, 56, 38, 65, 72, 45, 58],
    helpfulRatings: 87,
    totalViews: 732,
    uniqueViewers: 245,
    avgTimeSpent: "4m 32s",
    searchAppearances: 156,
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold dark:text-white">{node.title}</h2>
              <Badge
                variant="outline"
                className={
                  node.status === "current"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : node.status === "outdated"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                }
              >
                {node.status}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {node.department}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{node.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto hidden md:block">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-200">Document Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Created: {node.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Updated: {node.updatedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Author: {node.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Views: {node.analytics.views}</span>
                  </div>
                </div>
              </div>

              <Separator className="dark:bg-gray-700" />

              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-200">Table of Contents</h3>
                <ul className="space-y-1">
                  {tableOfContents.map((title, index) => (
                    <li key={index}>
                      <button
                        className="text-sm text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                        onClick={() => {
                          setActiveTab("content")
                          setTimeout(() => {
                            document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" })
                          }, 100)
                        }}
                      >
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="dark:bg-gray-700" />

              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-200">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {node.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="dark:bg-gray-700" />

              <div>
                <h3 className="text-sm font-medium mb-2 dark:text-gray-200">Performance</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="dark:text-gray-300">Helpfulness</span>
                      <span className="dark:text-gray-300">{node.analytics.helpfulness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${node.analytics.helpfulness}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="dark:text-gray-300">Relevance</span>
                      <span className="dark:text-gray-300">{node.analytics.searchRelevance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${node.analytics.searchRelevance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="dark:text-gray-300">Freshness</span>
                      <span className="dark:text-gray-300">{node.analytics.freshness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${node.analytics.freshness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <TabsList className="mx-4 h-14">
                  <TabsTrigger value="content" className="data-[state=active]:border-purple-600">
                    <FileText className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="related" className="data-[state=active]:border-purple-600">
                    <Tag className="h-4 w-4 mr-2" />
                    Related
                  </TabsTrigger>
                  <TabsTrigger value="versions" className="data-[state=active]:border-purple-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Versions
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="data-[state=active]:border-purple-600">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="usage" className="data-[state=active]:border-purple-600">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Usage
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="content" className="p-6 m-0">
                <div className="prose dark:prose-invert max-w-none">
                  {sections.map((section, index) => (
                    <div key={index} id={`section-${index}`} className="mb-8">
                      <h2 className="text-xl font-bold mb-4 dark:text-white">{section.title}</h2>
                      <div className="whitespace-pre-wrap dark:text-gray-300">{section.content}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="related" className="p-6 m-0">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Related Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedDocs.map((doc, index) => (
                    <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base dark:text-white">{doc.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {doc.department}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Similarity: {doc.similarity}%
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{doc.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{doc.lastUpdated}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{doc.views} views</span>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-3 w-3" />
                            <span>Open</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="versions" className="p-6 m-0">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Version History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Version
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Changes
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {versionHistory.map((version, index) => (
                        <tr key={index} className={index === 0 ? "bg-purple-50 dark:bg-purple-900/10" : ""}>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              {index === 0 && (
                                <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  Current
                                </Badge>
                              )}
                              v{version.version}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{version.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{version.author}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{version.changes}</td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="p-6 m-0">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Comments & Feedback</h2>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Add Comment
                  </Button>
                </div>

                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-800 dark:text-purple-200 flex-shrink-0">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium dark:text-white">{comment.author}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200">
                            <ThumbsUp className="h-3 w-3" />
                            Helpful
                          </button>
                          <button className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200">
                            <Reply className="h-3 w-3" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="usage" className="p-6 m-0">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Usage Statistics</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Eye className="h-8 w-8 text-purple-600 mb-2" />
                      <div className="text-2xl font-bold dark:text-white">{usageStats.totalViews}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Views</div>
                    </CardContent>
                  </Card>
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Users className="h-8 w-8 text-purple-600 mb-2" />
                      <div className="text-2xl font-bold dark:text-white">{usageStats.uniqueViewers}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Unique Viewers</div>
                    </CardContent>
                  </Card>
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <ThumbsUp className="h-8 w-8 text-purple-600 mb-2" />
                      <div className="text-2xl font-bold dark:text-white">{usageStats.helpfulRatings}%</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Helpfulness Rating</div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium mb-3 dark:text-white">Weekly Views</h3>
                <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="h-48 flex items-end justify-between gap-2">
                      {usageStats.weeklyViews.map((views, index) => {
                        const height = (views / Math.max(...usageStats.weeklyViews)) * 100
                        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                        return (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div className="w-full bg-purple-600 rounded-t" style={{ height: `${height}%` }}></div>
                            <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">{days[index]}</div>
                            <div className="text-xs font-medium dark:text-gray-300">{views}</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 dark:text-white">Access Details</h3>
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm dark:text-gray-300">Average Time Spent</span>
                          </div>
                          <span className="font-medium dark:text-white">{usageStats.avgTimeSpent}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm dark:text-gray-300">Search Appearances</span>
                          </div>
                          <span className="font-medium dark:text-white">{usageStats.searchAppearances}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm dark:text-gray-300">Mobile Access</span>
                          </div>
                          <span className="font-medium dark:text-white">32%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm dark:text-gray-300">External Shares</span>
                          </div>
                          <span className="font-medium dark:text-white">18</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 dark:text-white">Top Search Terms</h3>
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <span className="text-sm dark:text-gray-300">network configuration</span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                            42 searches
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <span className="text-sm dark:text-gray-300">vpn setup</span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                            36 searches
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <span className="text-sm dark:text-gray-300">router settings</span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                            29 searches
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <span className="text-sm dark:text-gray-300">network security</span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                            24 searches
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
