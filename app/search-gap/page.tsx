"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Filter, Download } from "lucide-react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import SearchGapReport from "@/components/search-gap-report"

export default function SearchGapPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Search Executed",
      description: `Searching for "${searchQuery}"`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Report Exported",
      description: "Search gap report has been exported to CSV",
    })
  }

  return (
    <main className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Search Gap Analysis</h1>
              <p className="text-gray-500">Identify content gaps based on user search patterns</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Create Content
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Search Analysis</CardTitle>
              <CardDescription>Find search terms with no results or low relevance</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search for terms..."
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

          <Tabs defaultValue="no-results" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="no-results">No Results</TabsTrigger>
              <TabsTrigger value="low-relevance">Low Relevance</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="no-results" className="mt-0">
              <SearchGapReport type="no-results" />
            </TabsContent>

            <TabsContent value="low-relevance" className="mt-0">
              <SearchGapReport type="low-relevance" />
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              <SearchGapReport type="trending" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
