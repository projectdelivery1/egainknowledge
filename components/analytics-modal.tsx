"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Node } from "@/lib/types"
import { useState } from "react"

interface AnalyticsModalProps {
  isOpen?: boolean
  onClose?: () => void
  title?: string
  content?: React.ReactNode
  node?: Node
}

export default function AnalyticsModal({
  isOpen = false,
  onClose = () => {},
  title = "",
  content = null,
  node,
}: AnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState("views")

  // If we have a node, show node-specific analytics
  if (node) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Analytics for {node.title}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="views" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="views" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-xs text-green-600 dark:text-green-400">+15.8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">876</div>
                    <p className="text-xs text-green-600 dark:text-green-400">+12.3% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2m 34s</div>
                    <p className="text-xs text-green-600 dark:text-green-400">+8.7% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Views Over Time</CardTitle>
                      <CardDescription>Daily views for this document</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Views chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Helpfulness Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-green-600 dark:text-green-400">+5.2% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-green-600 dark:text-green-400">+8 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Shares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-green-600 dark:text-green-400">+5 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Engagement Over Time</CardTitle>
                      <CardDescription>User interactions with this document</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Engagement chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Search Terms</CardTitle>
                      <CardDescription>Top search terms that led to this document</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">onboarding process</span>
                      <span className="text-muted-foreground">124 searches</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">new employee setup</span>
                      <span className="text-muted-foreground">98 searches</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">hr onboarding</span>
                      <span className="text-muted-foreground">76 searches</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">first day procedures</span>
                      <span className="text-muted-foreground">65 searches</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">employee welcome</span>
                      <span className="text-muted-foreground">52 searches</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Search Position</CardTitle>
                      <CardDescription>Average position in search results</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Search position chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>User Feedback</CardTitle>
                      <CardDescription>Comments and ratings from users</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">John D.</span>
                        <span className="text-green-600 dark:text-green-400">Helpful</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This document was very clear and helped me understand the onboarding process. Thank you!
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-green-600 dark:text-green-400">Helpful</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great information, but could use more details about the IT setup process.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Robert K.</span>
                        <span className="text-amber-600 dark:text-amber-400">Somewhat Helpful</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The document is a bit outdated. Some of the links no longer work.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  }

  // If we don't have a node, show general analytics content
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{content}</div>
      </DialogContent>
    </Dialog>
  )
}
