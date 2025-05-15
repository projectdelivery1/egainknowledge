"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import Header from "@/components/header"
import KnowledgeGraph from "@/components/knowledge-graph"
import SidePanel from "@/components/side-panel"
import { mockGraphData } from "@/lib/mock-data"
import type { Node } from "@/lib/types"

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [department, setDepartment] = useState("all")
  const [status, setStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [layout, setLayout] = useState<"force" | "radial">("force")

  // Memoize the filter options object to prevent recreation on every render
  const filterOptions = useMemo(
    () => ({
      department,
      status,
      searchQuery,
    }),
    [department, status, searchQuery],
  )

  // Memoize callback functions to prevent recreation on every render
  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node)
  }, [])

  const handleFilterChange = useCallback((filters: any) => {
    setDepartment(filters.department)
    setStatus(filters.status)
    setSearchQuery(filters.searchQuery)
  }, [])

  useEffect(() => {
    // Listen for filter events from the header
    const handleDepartmentFilter = (e: CustomEvent) => {
      setDepartment(e.detail)
    }

    const handleStatusFilter = (e: CustomEvent) => {
      setStatus(e.detail)
    }

    window.addEventListener("filter-department", handleDepartmentFilter as EventListener)
    window.addEventListener("filter-status", handleStatusFilter as EventListener)

    return () => {
      window.removeEventListener("filter-department", handleDepartmentFilter as EventListener)
      window.removeEventListener("filter-status", handleStatusFilter as EventListener)
    }
  }, [])

  return (
    <main className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Header showFilters={true} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative p-4">
            <div className="w-full h-full rounded-lg shadow-sm overflow-hidden border border-[#e5e7eb] dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="absolute top-4 right-4 z-10 flex gap-1">
                <button
                  className={`px-3 py-1 text-sm rounded-l-md ${
                    layout === "force"
                      ? "bg-[#3b82f6] text-white"
                      : "bg-[#f9fafb] text-[#4b5563] border border-[#e5e7eb] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                  }`}
                  onClick={() => setLayout("force")}
                >
                  Force
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-r-md ${
                    layout === "radial"
                      ? "bg-[#3b82f6] text-white"
                      : "bg-[#f9fafb] text-[#4b5563] border border-[#e5e7eb] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                  }`}
                  onClick={() => setLayout("radial")}
                >
                  Radial
                </button>
              </div>

              <div className="absolute top-4 left-4 z-10 flex gap-1">
                <button className="p-2 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 rounded-md text-[#4b5563] dark:text-gray-300 hover:bg-[#f9fafb] dark:hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button className="p-2 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 rounded-md text-[#4b5563] dark:text-gray-300 hover:bg-[#f9fafb] dark:hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button className="p-2 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 rounded-md text-[#4b5563] dark:text-gray-300 hover:bg-[#f9fafb] dark:hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 12a9 9 0 0 0 15 6.7L21 16"></path>
                    <path d="M21 22v-6h-6"></path>
                  </svg>
                </button>
              </div>

              <KnowledgeGraph
                data={mockGraphData}
                onNodeClick={handleNodeClick}
                filterOptions={filterOptions}
                layout={layout}
              />

              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-md border border-[#e5e7eb] dark:border-gray-700 text-xs">
                <div className="mb-2">
                  <div className="font-medium mb-1 dark:text-white">Departments:</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#a78bfa]"></span>
                      <span className="dark:text-gray-300">HR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#60a5fa]"></span>
                      <span className="dark:text-gray-300">Support</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#5eead4]"></span>
                      <span className="dark:text-gray-300">IT</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#fde68a]"></span>
                      <span className="dark:text-gray-300">Sales</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#fca5a5]"></span>
                      <span className="dark:text-gray-300">Marketing</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1 dark:text-white">Status:</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full border-2 border-[#ef4444]"></span>
                      <span className="dark:text-gray-300">Outdated</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full border-2 border-[#10b981]"></span>
                      <span className="dark:text-gray-300">Current</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full border-2 border-[#3b82f6]"></span>
                      <span className="dark:text-gray-300">Recently Updated</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full border-2 border-[#f59e0b]"></span>
                      <span className="dark:text-gray-300">Low Performing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {selectedNode && <SidePanel node={selectedNode} onClose={() => setSelectedNode(null)} />}
      </div>
    </main>
  )
}
