"use client"

import { useState } from "react"
import { X, Calendar, User, Tag, Clock, BarChart2, ExternalLink, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Node } from "@/lib/types"

interface SidePanelProps {
  node: Node
  onClose: () => void
}

export default function SidePanel({ node, onClose }: SidePanelProps) {
  const [activeTab, setActiveTab] = useState("details")

  // Mock article content
  const articleContent = [
    {
      id: 1,
      title: "Introduction",
      content:
        "This document provides comprehensive information about the topic. It covers all essential aspects and serves as a reference guide for users seeking detailed knowledge on the subject matter.",
    },
    {
      id: 2,
      title: "Main Content",
      content:
        "The main section elaborates on key concepts, methodologies, and best practices. It includes step-by-step instructions, examples, and case studies to illustrate practical applications and implementation strategies.",
    },
    {
      id: 3,
      title: "Technical Details",
      content:
        "This section delves into technical specifications, system requirements, compatibility information, and integration guidelines. It provides detailed explanations of underlying technologies, architectures, and frameworks.",
    },
    {
      id: 4,
      title: "Troubleshooting",
      content:
        "The troubleshooting guide addresses common issues, error messages, and their resolutions. It offers diagnostic procedures, workarounds, and solutions to help users overcome challenges they might encounter.",
    },
    {
      id: 5,
      title: "Conclusion",
      content:
        "The conclusion summarizes key points, highlights important takeaways, and provides recommendations for further reading or related resources. It reinforces the main objectives and value proposition of the document.",
    },
  ]

  // Mock related articles
  const relatedArticles = [
    { id: "rel1", title: "Getting Started Guide", views: 1245 },
    { id: "rel2", title: "Advanced Configuration Options", views: 876 },
    { id: "rel3", title: "Frequently Asked Questions", views: 2103 },
    { id: "rel4", title: "Troubleshooting Common Issues", views: 1532 },
  ]

  // Mock version history
  const versionHistory = [
    { version: "3.2", date: "2023-04-15", author: "Jessica Smith", changes: "Updated technical specifications" },
    { version: "3.1", date: "2023-02-28", author: "Michael Johnson", changes: "Added new troubleshooting section" },
    { version: "3.0", date: "2023-01-10", author: "Sarah Williams", changes: "Major revision of all content" },
  ]

  return (
    <div className="w-96 border-l border-[#e5e7eb] dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col h-full">
      <div className="p-4 border-b border-[#e5e7eb] dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-medium text-[#111827] dark:text-white">Document Details</h2>
        <button
          onClick={onClose}
          className="text-[#6b7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 border-b border-[#e5e7eb] dark:border-gray-700">
        <h3 className="text-xl font-medium text-[#111827] dark:text-white mb-2">{node.title}</h3>
        <p className="text-[#4b5563] dark:text-gray-300 mb-4">{node.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-[#6b7280] dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last updated: 2 days ago</span>
          </div>
          <div className="flex items-center text-sm text-[#6b7280] dark:text-gray-400">
            <User className="h-4 w-4 mr-2" />
            <span>Author: Jessica Smith</span>
          </div>
          <div className="flex items-center text-sm text-[#6b7280] dark:text-gray-400">
            <Tag className="h-4 w-4 mr-2" />
            <span>Department: {node.department}</span>
          </div>
          <div className="flex items-center text-sm text-[#6b7280] dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span>Status: {node.status.replace("-", " ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-[#f3f4f6] dark:bg-gray-800 text-[#4b5563] dark:text-gray-300">
            #documentation
          </Badge>
          <Badge variant="outline" className="bg-[#f3f4f6] dark:bg-gray-800 text-[#4b5563] dark:text-gray-300">
            #{node.department.toLowerCase()}
          </Badge>
          <Badge variant="outline" className="bg-[#f3f4f6] dark:bg-gray-800 text-[#4b5563] dark:text-gray-300">
            #guide
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-3 mb-1">
          <span className="text-sm font-medium text-[#4b5563] dark:text-gray-300">Related articles</span>
          <span className="text-sm text-[#4b5563] dark:text-gray-300">{node.relatedDocuments.length}</span>
        </div>
        <div className="h-6 bg-[#f3f4f6] dark:bg-gray-800 rounded-md flex items-center px-2">
          <span className="text-xs text-[#6b7280] dark:text-gray-400">
            This node contains {node.relatedDocuments.length + 1} articles
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b border-[#e5e7eb] dark:border-gray-700">
            <TabsList className="w-full bg-transparent border-b-0">
              <TabsTrigger
                value="details"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "details" ? "border-[#3b82f6] text-[#3b82f6] dark:text-blue-400" : "border-transparent"
                }`}
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="related"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "related" ? "border-[#3b82f6] text-[#3b82f6] dark:text-blue-400" : "border-transparent"
                }`}
              >
                Related
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "analytics"
                    ? "border-[#3b82f6] text-[#3b82f6] dark:text-blue-400"
                    : "border-transparent"
                }`}
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === "history" ? "border-[#3b82f6] text-[#3b82f6] dark:text-blue-400" : "border-transparent"
                }`}
              >
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-4">
            <div className="space-y-6">
              {articleContent.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h4 className="text-md font-medium text-[#111827] dark:text-white">{section.title}</h4>
                  <p className="text-sm text-[#4b5563] dark:text-gray-300">{section.content}</p>
                </div>
              ))}

              <div className="space-y-2">
                <h4 className="text-md font-medium text-[#111827] dark:text-white">Full Content</h4>
                <div className="p-4 bg-[#f9fafb] dark:bg-gray-800 rounded-md border border-[#e5e7eb] dark:border-gray-700 max-h-96 overflow-y-auto">
                  <p className="text-sm text-[#4b5563] dark:text-gray-300 whitespace-pre-line">{node.content}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related" className="p-4">
            <div className="space-y-4">
              {node.relatedDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md hover:bg-[#f9fafb] dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-[#111827] dark:text-white">{doc.title}</h4>
                    <ExternalLink className="h-4 w-4 text-[#6b7280] dark:text-gray-400" />
                  </div>
                  <div className="flex items-center mt-2 text-xs text-[#6b7280] dark:text-gray-400">
                    <BarChart2 className="h-3 w-3 mr-1" />
                    <span>{doc.views || 0} views</span>
                  </div>
                  <div className="mt-3 p-2 bg-[#f9fafb] dark:bg-gray-800 rounded border border-[#e5e7eb] dark:border-gray-700">
                    <p className="text-xs text-[#4b5563] dark:text-gray-300 line-clamp-3">
                      {doc.content || doc.description}
                    </p>
                    <button className="text-xs text-[#3b82f6] dark:text-blue-400 mt-1 hover:underline">
                      Read more
                    </button>
                  </div>
                </div>
              ))}

              {node.relatedDocuments.length === 0 && (
                <div className="text-center p-4 text-[#6b7280] dark:text-gray-400">No related articles found</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="p-4">
            <div className="space-y-4">
              <div className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md">
                <h4 className="text-sm font-medium text-[#111827] dark:text-white mb-2">Views over time</h4>
                <div className="h-32 bg-[#f9fafb] dark:bg-gray-800 rounded flex items-end p-2">
                  {[35, 45, 30, 65, 85, 75, 90, 82, 78, 95, 86, 80].map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 mx-0.5"
                      style={{
                        height: `${value}%`,
                        background: value > 70 ? "#3b82f6" : "#93c5fd",
                      }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-[#6b7280] dark:text-gray-400">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md">
                  <h4 className="text-xs font-medium text-[#6b7280] dark:text-gray-400">Total views</h4>
                  <p className="text-xl font-semibold text-[#111827] dark:text-white">12,543</p>
                </div>
                <div className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md">
                  <h4 className="text-xs font-medium text-[#6b7280] dark:text-gray-400">Avg. time spent</h4>
                  <p className="text-xl font-semibold text-[#111827] dark:text-white">3m 24s</p>
                </div>
                <div className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md">
                  <h4 className="text-xs font-medium text-[#6b7280] dark:text-gray-400">Helpfulness</h4>
                  <p className="text-xl font-semibold text-[#111827] dark:text-white">87%</p>
                </div>
                <div className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md">
                  <h4 className="text-xs font-medium text-[#6b7280] dark:text-gray-400">Search clicks</h4>
                  <p className="text-xl font-semibold text-[#111827] dark:text-white">4,287</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="p-4">
            <div className="space-y-4">
              {versionHistory.map((version, index) => (
                <div
                  key={index}
                  className="p-3 border border-[#e5e7eb] dark:border-gray-700 rounded-md hover:bg-[#f9fafb] dark:hover:bg-gray-800"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-[#111827] dark:text-white">Version {version.version}</h4>
                    <span className="text-xs text-[#6b7280] dark:text-gray-400">{version.date}</span>
                  </div>
                  <p className="text-xs text-[#6b7280] dark:text-gray-400 mt-1">Author: {version.author}</p>
                  <p className="text-sm text-[#4b5563] dark:text-gray-300 mt-2">{version.changes}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-[#e5e7eb] dark:border-gray-700 flex justify-between">
        <Button variant="outline" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button variant="outline" className="flex items-center gap-1 text-red-500 hover:text-red-600">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}
