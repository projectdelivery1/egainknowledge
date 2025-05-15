"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  ArrowUpDown,
  ChevronDown,
  FileText,
  Download,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockGraphData } from "@/lib/mock-data"

export default function KnowledgeListView() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<string>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  // Get all documents from mock data
  const allDocuments = mockGraphData.nodes

  // Theme-based styling
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-[#f6f8fc]"
  const textColor = theme === "dark" ? "text-white" : "text-[#4a5568]"
  const secondaryTextColor = theme === "dark" ? "text-gray-400" : "text-[#718096]"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-[#e9ecef]"
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-[#f1f5f9]"
  const tableBgColor = theme === "dark" ? "bg-gray-800" : "bg-white"

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    return allDocuments
      .filter((doc) => {
        const matchesSearch =
          searchQuery === "" ||
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesDepartment = departmentFilter === "all" || doc.department === departmentFilter
        const matchesStatus = statusFilter === "all" || doc.status === statusFilter

        return matchesSearch && matchesDepartment && matchesStatus
      })
      .sort((a, b) => {
        if (sortField === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        } else if (sortField === "department") {
          return sortDirection === "asc"
            ? a.department.localeCompare(b.department)
            : b.department.localeCompare(a.department)
        } else if (sortField === "status") {
          return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
        } else if (sortField === "views") {
          return sortDirection === "asc" ? a.analytics.views - b.analytics.views : b.analytics.views - a.analytics.views
        } else if (sortField === "updated") {
          return sortDirection === "asc"
            ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        }
        return 0
      })
  }, [allDocuments, searchQuery, departmentFilter, statusFilter, sortField, sortDirection])

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle department filter
  const handleDepartmentFilter = (department: string) => {
    setDepartmentFilter(department)
    toast({
      title: "Filter Applied",
      description: `Filtering by department: ${department === "all" ? "All Departments" : department}`,
      variant: "default",
    })
  }

  // Handle status filter
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    toast({
      title: "Filter Applied",
      description: `Filtering by status: ${status === "all" ? "All Statuses" : status}`,
      variant: "default",
    })
  }

  // Handle document selection
  const handleSelectDocument = (id: string) => {
    setSelectedDocuments((prev) => {
      if (prev.includes(id)) {
        return prev.filter((docId) => docId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Handle select all documents
  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id))
    }
  }

  // Handle document actions
  const handleViewDocument = (title: string) => {
    toast({
      title: "View Document",
      description: `Viewing "${title}"`,
      variant: "default",
    })
  }

  const handleEditDocument = (title: string) => {
    toast({
      title: "Edit Document",
      description: `Editing "${title}"`,
      variant: "default",
    })
  }

  const handleDeleteDocument = (title: string) => {
    toast({
      title: "Delete Document",
      description: `Deleting "${title}"`,
      variant: "destructive",
    })
  }

  const handleDuplicateDocument = (title: string) => {
    toast({
      title: "Duplicate Document",
      description: `Duplicating "${title}"`,
      variant: "default",
    })
  }

  // Handle bulk actions
  const handleBulkDelete = () => {
    toast({
      title: "Bulk Delete",
      description: `Deleting ${selectedDocuments.length} documents`,
      variant: "destructive",
    })
    setSelectedDocuments([])
  }

  const handleBulkExport = () => {
    toast({
      title: "Bulk Export",
      description: `Exporting ${selectedDocuments.length} documents`,
      variant: "default",
    })
  }

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "outdated":
        return theme === "dark" ? "bg-red-900/30 text-red-400 border-red-800" : "bg-red-50 text-red-700 border-red-200"
      case "current":
        return theme === "dark"
          ? "bg-green-900/30 text-green-400 border-green-800"
          : "bg-green-50 text-green-700 border-green-200"
      case "high-performing":
        return theme === "dark"
          ? "bg-purple-900/30 text-purple-400 border-purple-800"
          : "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return theme === "dark"
          ? "bg-gray-800 text-gray-300 border-gray-700"
          : "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  // Get department badge styling
  const getDepartmentBadge = (department: string) => {
    switch (department) {
      case "HR":
        return theme === "dark"
          ? "bg-blue-900/30 text-blue-400 border-blue-800"
          : "bg-blue-50 text-blue-700 border-blue-200"
      case "Support":
        return theme === "dark"
          ? "bg-teal-900/30 text-teal-400 border-teal-800"
          : "bg-teal-50 text-teal-700 border-teal-200"
      case "IT":
        return theme === "dark"
          ? "bg-cyan-900/30 text-cyan-400 border-cyan-800"
          : "bg-cyan-50 text-cyan-700 border-cyan-200"
      case "Sales":
        return theme === "dark"
          ? "bg-amber-900/30 text-amber-400 border-amber-800"
          : "bg-amber-50 text-amber-700 border-amber-200"
      default:
        return theme === "dark"
          ? "bg-gray-800 text-gray-300 border-gray-700"
          : "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className={`flex-1 overflow-hidden flex flex-col ${bgColor}`}>
      {/* Toolbar */}
      <div className={`p-4 border-b ${borderColor} flex flex-wrap gap-3 items-center`}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${secondaryTextColor} h-4 w-4`} />
          <Input
            placeholder="Search documents..."
            className={`pl-9 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-[#ebeef5] border-[#e9ecef]"}`}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`gap-2 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-[#ebeef5] border-[#e9ecef]"}`}
            >
              <Filter className="h-4 w-4" />
              Department
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
            <DropdownMenuItem onClick={() => handleDepartmentFilter("all")}>All Departments</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDepartmentFilter("HR")}>HR</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDepartmentFilter("Support")}>Support</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDepartmentFilter("IT")}>IT</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDepartmentFilter("Sales")}>Sales</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`gap-2 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-[#ebeef5] border-[#e9ecef]"}`}
            >
              <Filter className="h-4 w-4" />
              Status
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
            <DropdownMenuItem onClick={() => handleStatusFilter("all")}>All Statuses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("current")}>Current</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("outdated")}>Outdated</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("high-performing")}>High Performing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1 flex justify-end gap-2">
          {selectedDocuments.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 ${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}
                onClick={handleBulkExport}
              >
                <Download className="h-4 w-4" />
                Export ({selectedDocuments.length})
              </Button>
              <Button variant="destructive" size="sm" className="gap-1" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4" />
                Delete ({selectedDocuments.length})
              </Button>
            </>
          )}
          <Button
            className="gap-1"
            onClick={() => {
              toast({
                title: "Create Document",
                description: "Creating a new document",
                variant: "default",
              })
            }}
          >
            <Plus className="h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table className={tableBgColor}>
          <TableHeader className={theme === "dark" ? "bg-gray-900" : "bg-[#f8fafc]"}>
            <TableRow className={theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "hover:bg-[#f1f5f9]"}>
              <TableHead className="w-[40px]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                  onChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center">
                  Title
                  {sortField === "title" && <ArrowUpDown className={`ml-1 h-4 w-4 ${secondaryTextColor}`} />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
                <div className="flex items-center">
                  Department
                  {sortField === "department" && <ArrowUpDown className={`ml-1 h-4 w-4 ${secondaryTextColor}`} />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center">
                  Status
                  {sortField === "status" && <ArrowUpDown className={`ml-1 h-4 w-4 ${secondaryTextColor}`} />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("views")}>
                <div className="flex items-center">
                  Views
                  {sortField === "views" && <ArrowUpDown className={`ml-1 h-4 w-4 ${secondaryTextColor}`} />}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("updated")}>
                <div className="flex items-center">
                  Last Updated
                  {sortField === "updated" && <ArrowUpDown className={`ml-1 h-4 w-4 ${secondaryTextColor}`} />}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((document) => (
              <TableRow
                key={document.id}
                className={`${theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "hover:bg-[#f1f5f9]"}`}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedDocuments.includes(document.id)}
                    onChange={() => handleSelectDocument(document.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className={`h-4 w-4 ${secondaryTextColor}`} />
                    <div>
                      <div className={`font-medium ${textColor}`}>{document.title}</div>
                      <div className={`text-xs ${secondaryTextColor}`}>{document.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getDepartmentBadge(document.department)}>
                    {document.department}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(document.status)}>
                    {document.status}
                  </Badge>
                </TableCell>
                <TableCell>{document.analytics.views.toLocaleString()}</TableCell>
                <TableCell>{document.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                      <DropdownMenuItem onClick={() => handleViewDocument(document.title)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditDocument(document.title)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateDocument(document.title)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className={theme === "dark" ? "bg-gray-700" : ""} />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteDocument(document.title)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredDocuments.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className={`${secondaryTextColor}`}>No documents found</div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setDepartmentFilter("all")
                      setStatusFilter("all")
                    }}
                  >
                    Clear filters
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${borderColor} flex justify-between items-center`}>
        <div className={secondaryTextColor}>
          Showing {filteredDocuments.length} of {allDocuments.length} documents
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
            onClick={() => {
              toast({
                title: "Export All",
                description: "Exporting all documents",
                variant: "default",
              })
            }}
          >
            <Download className="h-4 w-4 mr-1" />
            Export All
          </Button>
        </div>
      </div>
    </div>
  )
}
