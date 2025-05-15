"use client"
import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, HelpCircle, ChevronDown, Sun, Moon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  showFilters?: boolean
}

export default function Header({ showFilters = false }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { toast } = useToast()
  const [department, setDepartment] = useState("Pre-Sales - Finance")

  // Get active tab based on pathname
  const getActiveTab = (path: string) => {
    if (path === "/") return "graph"
    if (path === "/duplicates") return "duplicates"
    if (path === "/insights") return "insights"
    if (path === "/list") return "list"
    if (path === "/analytics") return "analytics"
    return "graph" // Default
  }

  const activeTab = getActiveTab(pathname)

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode`,
      variant: "default",
    })
  }

  return (
    <header className="border-b border-[#e5e7eb] bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <div className="flex items-center">
              <span className="text-xl font-bold text-[#333333] dark:text-white mr-1">egain</span>
              <span className="text-xl font-bold text-[#d6249f] dark:text-[#d6249f]">AI</span>
              <span className="text-xl font-bold text-[#333333] dark:text-white ml-2">KNOWLEDGE MANAGER</span>
            </div>
            <span className="ml-1 text-sm italic text-[#666666] dark:text-gray-300">easy with egain</span>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-9 border-[#e5e7eb] dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-blue-500 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">DEPARTMENT</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium dark:text-white">
                  {department}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setDepartment("Pre-Sales - Finance")}>
                  Pre-Sales - Finance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDepartment("Marketing")}>Marketing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDepartment("Support")}>Support</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDepartment("HR")}>HR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white gap-1 rounded-md" size="sm">
            + Article
          </Button>

          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/diverse-group.png" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium dark:text-white">Jessica</span>
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation tabs - preserved from original design */}
      <div className="px-4 py-2 border-t border-[#e5e7eb] dark:border-gray-700 flex items-center justify-between">
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeTab === "graph"
                ? "bg-[#e6f0ff] text-[#3b82f6] dark:bg-blue-900/30 dark:text-blue-300"
                : "text-[#4b5563] hover:bg-[#f9fafb] dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            Graph View
          </Link>
          <Link
            href="/duplicates"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeTab === "duplicates"
                ? "bg-[#e6f0ff] text-[#3b82f6] dark:bg-blue-900/30 dark:text-blue-300"
                : "text-[#4b5563] hover:bg-[#f9fafb] dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            Duplicates
          </Link>
          <Link
            href="/insights"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeTab === "insights"
                ? "bg-[#e6f0ff] text-[#3b82f6] dark:bg-blue-900/30 dark:text-blue-300"
                : "text-[#4b5563] hover:bg-[#f9fafb] dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            Insights
          </Link>
          <Link
            href="/list"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeTab === "list"
                ? "bg-[#e6f0ff] text-[#3b82f6] dark:bg-blue-900/30 dark:text-blue-300"
                : "text-[#4b5563] hover:bg-[#f9fafb] dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            List View
          </Link>
          <Link
            href="/analytics"
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeTab === "analytics"
                ? "bg-[#e6f0ff] text-[#3b82f6] dark:bg-blue-900/30 dark:text-blue-300"
                : "text-[#4b5563] hover:bg-[#f9fafb] dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {showFilters && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#e5e7eb] bg-white text-[#4b5563] hover:bg-[#f9fafb] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    Department
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-department", { detail: "all" }))
                        toast({ title: "Filter Applied", description: "Filtering by All Departments" })
                      }
                    }}
                  >
                    All Departments
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-department", { detail: "HR" }))
                        toast({ title: "Filter Applied", description: "Filtering by HR" })
                      }
                    }}
                  >
                    HR
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-department", { detail: "Support" }))
                        toast({ title: "Filter Applied", description: "Filtering by Support" })
                      }
                    }}
                  >
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-department", { detail: "IT" }))
                        toast({ title: "Filter Applied", description: "Filtering by IT" })
                      }
                    }}
                  >
                    IT
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-department", { detail: "Sales" }))
                        toast({ title: "Filter Applied", description: "Filtering by Sales" })
                      }
                    }}
                  >
                    Sales
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#e5e7eb] bg-white text-[#4b5563] hover:bg-[#f9fafb] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    Status
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-status", { detail: "all" }))
                        toast({ title: "Filter Applied", description: "Filtering by All Statuses" })
                      }
                    }}
                  >
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-status", { detail: "current" }))
                        toast({ title: "Filter Applied", description: "Filtering by Current" })
                      }
                    }}
                  >
                    Current
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-status", { detail: "outdated" }))
                        toast({ title: "Filter Applied", description: "Filtering by Outdated" })
                      }
                    }}
                  >
                    Outdated
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-status", { detail: "recently-updated" }))
                        toast({ title: "Filter Applied", description: "Filtering by Recently Updated" })
                      }
                    }}
                  >
                    Recently Updated
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (typeof window !== "undefined" && window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent("filter-status", { detail: "low-performing" }))
                        toast({ title: "Filter Applied", description: "Filtering by Low Performing" })
                      }
                    }}
                  >
                    Low Performing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <button
            onClick={handleThemeToggle}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f9fafb] dark:hover:bg-gray-800"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-gray-300" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  )
}
