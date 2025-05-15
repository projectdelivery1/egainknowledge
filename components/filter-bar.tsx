"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface FilterBarProps {
  onFilterChange: (filters: any) => void
  initialDepartment: string
  initialStatus: string
  initialSearchQuery: string
}

export default function FilterBar({
  onFilterChange,
  initialDepartment = "all",
  initialStatus = "all",
  initialSearchQuery = "",
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [department, setDepartment] = useState(initialDepartment)
  const [status, setStatus] = useState(initialStatus)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { toast } = useToast()

  // Update local state if props change
  useEffect(() => {
    setDepartment(initialDepartment)
    setStatus(initialStatus)
    setSearchQuery(initialSearchQuery)
  }, [initialDepartment, initialStatus, initialSearchQuery])

  // Update active filters for display
  useEffect(() => {
    const filters = []
    if (department !== "all") filters.push(`Department: ${department}`)
    if (status !== "all") filters.push(`Status: ${status}`)
    setActiveFilters(filters)
  }, [department, status])

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
    onFilterChange({ department, status, searchQuery: newSearchQuery })

    toast({
      title: "Searching",
      description: `Searching for "${newSearchQuery}"`,
      variant: "default",
    })
  }

  // Handle department selection
  const handleDepartmentChange = (newDepartment: string) => {
    setDepartment(newDepartment)
    onFilterChange({ department: newDepartment, status, searchQuery })

    toast({
      title: "Filter Applied",
      description: `Filtering by department: ${newDepartment === "all" ? "All Departments" : newDepartment}`,
      variant: "default",
    })
  }

  // Handle status selection
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    onFilterChange({ department, status: newStatus, searchQuery })

    toast({
      title: "Filter Applied",
      description: `Filtering by status: ${newStatus === "all" ? "All Statuses" : newStatus}`,
      variant: "default",
    })
  }

  // Handle clearing all filters
  const handleClearFilters = () => {
    setDepartment("all")
    setStatus("all")
    onFilterChange({ department: "all", status: "all", searchQuery })

    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
      variant: "default",
    })
  }

  return (
    <div className="p-4 border-b border-[#e5e7eb] flex flex-col gap-2 bg-[#f9fafb]">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0aec0] h-4 w-4" />
          <Input
            placeholder="Search knowledge base..."
            className="pl-9 border-[#e5e7eb] focus-visible:ring-[#3b82f6] bg-white text-[#4a5568]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-[#e5e7eb] text-[#4a5568] hover:bg-[#f8fafc] bg-white">
              <Filter className="h-4 w-4 text-[#3b82f6]" />
              Department
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border-[#e5e7eb]">
            <DropdownMenuLabel className="text-[#4a5568]">Filter by Department</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-[#e5e7eb]" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleDepartmentChange("all")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                All Departments
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDepartmentChange("HR")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <span className="w-3 h-3 rounded-full bg-[#a29bfe] mr-2"></span>
                HR
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDepartmentChange("Support")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <span className="w-3 h-3 rounded-full bg-[#74b9ff] mr-2"></span>
                Support
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDepartmentChange("IT")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <span className="w-3 h-3 rounded-full bg-[#81ecec] mr-2"></span>
                IT
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDepartmentChange("Sales")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <span className="w-3 h-3 rounded-full bg-[#ffeaa7] mr-2"></span>
                Sales
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-[#e5e7eb] text-[#4a5568] hover:bg-[#f8fafc] bg-white">
              <Clock className="h-4 w-4 text-[#3b82f6]" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border-[#e5e7eb]">
            <DropdownMenuLabel className="text-[#4a5568]">Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-[#e5e7eb]" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleStatusChange("all")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("outdated")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <AlertTriangle className="h-4 w-4 mr-2 text-[#f59e0b]" />
                Outdated
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("current")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <CheckCircle className="h-4 w-4 mr-2 text-[#10b981]" />
                Current
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("recently-updated")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <span className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></span>
                Recently Updated
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("low-performing")}
                className="text-[#4a5568] focus:bg-[#f8fafc] focus:text-[#4a5568]"
              >
                <span className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></span>
                Low Performing
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex gap-2 mt-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="bg-[#e6f0ff] text-[#3b82f6] hover:bg-[#d1e5ff]">
              {filter}
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs text-[#3b82f6] hover:bg-[#e6f0ff] hover:text-[#3b82f6]"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
