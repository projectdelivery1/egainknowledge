"use client"

import type React from "react"

import { useState } from "react"
import { Search, TrendingUp, Clock, Filter, Bookmark, ThumbsUp } from "lucide-react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { mockGraphData } from "@/lib/mock-data"
import ContentDiscovery from "@/components/content-discovery"

export default function DiscoveryPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search Executed",
      description: `Searching for "${searchQuery}"`,
    })
  }

  // Extract all unique tags from mock data
  const allTags = Array.from(new Set(mockGraphData.nodes.flatMap((node) => node.tags)))

  return (
    <main className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Content Discovery</h1>
              <p className="text-gray-500">Explore and discover knowledge across departments</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Search & Discover</CardTitle>
              <CardDescription>Find content across all knowledge bases</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search for content..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" type="button" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button type="submit">Search</Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Popular Tags</CardTitle>
                <CardDescription>Browse content by topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Content
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Clock className="h-4 w-4" />
                  Recently Updated
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Highly Rated
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bookmark className="h-4 w-4" />
                  My Bookmarks
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="recent">Recently Updated</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-0">
              <ContentDiscovery type="trending" />
            </TabsContent>

            <TabsContent value="recommended" className="mt-0">
              <ContentDiscovery type="recommended" />
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <ContentDiscovery type="recent" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
