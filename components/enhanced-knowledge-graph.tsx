"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import type { Node, Link } from "@/lib/types"
import { Loader2, ZoomIn, ZoomOut, RefreshCw, Maximize2, Minimize2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface EnhancedKnowledgeGraphProps {
  data: {
    nodes: Node[]
    links: Link[]
  }
  onNodeClick: (node: Node) => void
  filterOptions: {
    department: string
    status: string
    searchQuery: string
  }
  layout: "force" | "radial" | "cluster"
  density?: number
  showLabels?: boolean
  colorByDepartment?: boolean
  colorByDensity?: boolean
}

export default function EnhancedKnowledgeGraph({
  data,
  onNodeClick,
  filterOptions,
  layout = "force",
  density = 50,
  showLabels = true,
  colorByDepartment = true,
  colorByDensity = false,
}: EnhancedKnowledgeGraphProps) {
  const graphRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const simulationRef = useRef<any>(null)
  const { theme } = useTheme()
  const { toast } = useToast()
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  // Main effect for graph rendering
  useEffect(() => {
    // Skip if the DOM isn't ready
    if (!graphRef.current) return

    let isMounted = true

    // Show loading indicator
    if (loadingRef.current) {
      loadingRef.current.style.display = "flex"
    }

    // Clean up previous simulation
    if (simulationRef.current) {
      simulationRef.current.stop()
      simulationRef.current = null
    }

    // Filter nodes based on filter options
    const filteredNodes = data.nodes.filter((node) => {
      const departmentMatch = filterOptions.department === "all" || node.department === filterOptions.department
      const statusMatch = filterOptions.status === "all" || node.status === filterOptions.status
      const searchMatch =
        !filterOptions.searchQuery || node.title.toLowerCase().includes(filterOptions.searchQuery.toLowerCase())

      return departmentMatch && statusMatch && searchMatch
    })

    // Apply density filter - only show a percentage of nodes based on density setting
    const nodesToShow = Math.max(5, Math.floor(filteredNodes.length * (density / 100)))
    const densityFilteredNodes = filteredNodes
      .sort((a, b) => b.analytics.views - a.analytics.views)
      .slice(0, nodesToShow)

    // Create a Set of node IDs for faster lookup
    const nodeIds = new Set(densityFilteredNodes.map((node) => node.id))

    // Filter links
    const filteredLinks = data.links.filter((link) => {
      const sourceId = typeof link.source === "string" ? link.source : link.source.id
      const targetId = typeof link.target === "string" ? link.target : link.target.id
      return nodeIds.has(sourceId) && nodeIds.has(targetId)
    })

    // Create deep copies to prevent D3 from mutating our state
    const nodesCopy = densityFilteredNodes.map((n) => ({ ...n }))
    const linksCopy = filteredLinks.map((l) => ({ ...l }))

    // Async function to load D3 and render the graph
    const renderGraph = async () => {
      try {
        // Dynamically import D3
        const d3 = await import("d3")

        if (!isMounted || !graphRef.current) return

        // Clear previous graph
        d3.select(graphRef.current).selectAll("*").remove()

        // If no nodes to display, hide loading and return
        if (nodesCopy.length === 0) {
          if (loadingRef.current) {
            loadingRef.current.style.display = "none"
          }
          return
        }

        const width = graphRef.current.clientWidth
        const height = graphRef.current.clientHeight

        // Create SVG
        const svg = d3
          .select(graphRef.current)
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; height: auto;")

        // Add zoom functionality
        const g = svg.append("g")

        const zoom = d3
          .zoom()
          .extent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([0.1, 3])
          .on("zoom", (event) => {
            g.attr("transform", event.transform)
            setZoomLevel(event.transform.k)
          })

        svg.call(zoom as any)

        // Define node colors based on department
        const departmentColors: Record<string, string> = {
          HR: "#a78bfa", // purple
          Support: "#60a5fa", // blue
          IT: "#5eead4", // cyan
          Sales: "#fde68a", // yellow
          Marketing: "#fca5a5", // coral
          Engineering: "#93c5fd", // light blue
          Product: "#86efac", // light green
          "Customer Support": "#fdba74", // orange
          Finance: "#c4b5fd", // lavender
          Legal: "#f9a8d4", // pink
          Operations: "#a5b4fc", // indigo
          Research: "#d8b4fe", // purple
        }

        // Define node border colors based on status
        const statusColors: Record<string, string> = {
          outdated: "#ef4444", // red
          current: "#10b981", // green
          "recently-updated": "#3b82f6", // blue
          "low-performing": "#f59e0b", // amber
          draft: "#9ca3af", // gray
          published: "#10b981", // green
          archived: "#6b7280", // gray
          review: "#f59e0b", // amber
        }

        // Create a color scale for density visualization
        const densityColorScale = d3
          .scaleSequential()
          .domain([0, d3.max(nodesCopy, (d) => d.analytics.views) || 1000])
          .interpolator(d3.interpolateViridis)

        // Create simulation based on layout
        let simulation

        if (layout === "force") {
          // Force-directed layout
          simulation = d3
            .forceSimulation(nodesCopy)
            .force(
              "link",
              d3
                .forceLink(linksCopy)
                .id((d: any) => d.id)
                .distance(100)
                .strength((d: any) => 1 / Math.min(d.source.size, d.target.size)),
            )
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force(
              "collision",
              d3.forceCollide().radius((d: any) => d.size + 10),
            )
        } else if (layout === "radial") {
          // Radial layout
          // Group nodes by department
          const departments = Array.from(new Set(nodesCopy.map((node) => node.department)))

          simulation = d3
            .forceSimulation(nodesCopy)
            .force(
              "link",
              d3
                .forceLink(linksCopy)
                .id((d: any) => d.id)
                .distance(50)
                .strength(0.3),
            )
            .force(
              "r",
              d3
                .forceRadial(
                  (d: any) => {
                    const departmentIndex = departments.indexOf(d.department)
                    return 100 + departmentIndex * 50
                  },
                  width / 2,
                  height / 2,
                )
                .strength(0.8),
            )
            .force("charge", d3.forceManyBody().strength(-100))
            .force(
              "collision",
              d3.forceCollide().radius((d: any) => d.size + 5),
            )
        } else if (layout === "cluster") {
          // Cluster layout
          const departments = Array.from(new Set(nodesCopy.map((node) => node.department)))
          const departmentCenters: Record<string, { x: number; y: number }> = {}

          // Calculate department centers in a circle
          departments.forEach((dept, i) => {
            const angle = (i * 2 * Math.PI) / departments.length
            const radius = Math.min(width, height) * 0.35
            departmentCenters[dept] = {
              x: width / 2 + radius * Math.cos(angle),
              y: height / 2 + radius * Math.sin(angle),
            }
          })

          simulation = d3
            .forceSimulation(nodesCopy)
            .force(
              "link",
              d3
                .forceLink(linksCopy)
                .id((d: any) => d.id)
                .distance(30)
                .strength(0.2),
            )
            .force(
              "x",
              d3
                .forceX()
                .x((d: any) => departmentCenters[d.department]?.x || width / 2)
                .strength(0.5),
            )
            .force(
              "y",
              d3
                .forceY()
                .y((d: any) => departmentCenters[d.department]?.y || height / 2)
                .strength(0.5),
            )
            .force("charge", d3.forceManyBody().strength(-50))
            .force(
              "collision",
              d3.forceCollide().radius((d: any) => d.size + 5),
            )
        }

        // Store simulation in ref
        simulationRef.current = simulation

        // Create links with varying thickness based on relationship strength
        const link = g
          .append("g")
          .attr("stroke", theme === "dark" ? "#374151" : "#e5e7eb")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(linksCopy)
          .join("line")
          .attr("stroke-width", (d: any) => Math.sqrt(d.value || 1) * 2)
          .attr("stroke", (d: any) => {
            if (d.type === "related") return theme === "dark" ? "#8b5cf6" : "#a78bfa"
            if (d.type === "cross-department") return theme === "dark" ? "#f59e0b" : "#fbbf24"
            return theme === "dark" ? "#374151" : "#e5e7eb"
          })

        // Create node groups
        const node = g
          .append("g")
          .selectAll("g")
          .data(nodesCopy)
          .join("g")
          .attr("cursor", "pointer")
          .on("click", (event, d) => {
            event.stopPropagation()
            if (isMounted) {
              onNodeClick(d)
              toast({
                title: "Node Selected",
                description: `Viewing details for "${d.title}"`,
                variant: "default",
              })
            }
          })
          .on("mouseover", (event, d) => {
            setHoveredNode(d)
          })
          .on("mouseout", () => {
            setHoveredNode(null)
          })
          .call(
            d3
              .drag()
              .on("start", (event, d: any) => {
                if (!event.active) simulation.alphaTarget(0.3).restart()
                d.fx = d.x
                d.fy = d.y
              })
              .on("drag", (event, d: any) => {
                d.fx = event.x
                d.fy = event.y
              })
              .on("end", (event, d: any) => {
                if (!event.active) simulation.alphaTarget(0)
                d.fx = null
                d.fy = null
              }),
          )

        // Add circles for nodes with dynamic coloring
        node
          .append("circle")
          .attr("r", (d: any) => d.size || 20)
          .attr("fill", (d: any) => {
            if (colorByDensity) {
              return densityColorScale(d.analytics.views)
            }
            if (colorByDepartment) {
              return departmentColors[d.department] || "#e5e7eb"
            }
            return theme === "dark" ? "#6b7280" : "#d1d5db"
          })
          .attr("stroke", (d: any) => statusColors[d.status] || "transparent")
          .attr("stroke-width", 3)
          .attr("opacity", 0.9)

        // Add labels if enabled
        if (showLabels) {
          node
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", (d: any) => (d.size || 20) + 15)
            .attr("fill", theme === "dark" ? "#d1d5db" : "#4b5563")
            .attr("font-size", "12px")
            .text((d: any) => (d.title.length > 20 ? d.title.substring(0, 20) + "..." : d.title))
        }

        // Add department labels for cluster layout
        if (layout === "cluster") {
          const departments = Array.from(new Set(nodesCopy.map((node) => node.department)))
          const departmentCenters: Record<string, { x: number; y: number }> = {}

          // Calculate department centers in a circle
          departments.forEach((dept, i) => {
            const angle = (i * 2 * Math.PI) / departments.length
            const radius = Math.min(width, height) * 0.35
            departmentCenters[dept] = {
              x: width / 2 + radius * Math.cos(angle),
              y: height / 2 + radius * Math.sin(angle),
            }
          })

          // Add department labels
          g.selectAll(".dept-label")
            .data(departments)
            .join("text")
            .attr("class", "dept-label")
            .attr("x", (d) => departmentCenters[d].x)
            .attr("y", (d) => departmentCenters[d].y - 40)
            .attr("text-anchor", "middle")
            .attr("fill", (d) => departmentColors[d] || "#4b5563")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text((d) => d)
        }

        // Update positions on tick
        simulation.on("tick", () => {
          link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y)

          node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
        })

        // Stop animation after 3 seconds if not interacting
        if (!isAnimating) {
          setTimeout(() => {
            if (isMounted && simulationRef.current) {
              simulationRef.current.alpha(0).stop()
            }
          }, 3000)
        }

        // Hide loading indicator
        if (loadingRef.current && isMounted) {
          loadingRef.current.style.display = "none"
        }
      } catch (error) {
        console.error("Error rendering graph:", error)
        // Hide loading indicator on error
        if (loadingRef.current && isMounted) {
          loadingRef.current.style.display = "none"
        }
      }
    }

    // Render the graph
    renderGraph()

    // Cleanup function
    return () => {
      isMounted = false
      if (simulationRef.current) {
        simulationRef.current.stop()
        simulationRef.current = null
      }
    }
  }, [
    data,
    filterOptions,
    onNodeClick,
    theme,
    toast,
    layout,
    density,
    showLabels,
    colorByDepartment,
    colorByDensity,
    isAnimating,
  ])

  // Handle zoom in
  const handleZoomIn = () => {
    if (!graphRef.current) return
    const d3 = window.d3
    if (!d3) return

    const svg = d3.select(graphRef.current).select("svg")
    const currentZoom = d3.zoomTransform(svg.node())
    const newScale = currentZoom.k * 1.2

    svg
      .transition()
      .duration(300)
      .call(d3.zoom().transform, d3.zoomIdentity.translate(currentZoom.x, currentZoom.y).scale(newScale))

    setZoomLevel(newScale)
  }

  // Handle zoom out
  const handleZoomOut = () => {
    if (!graphRef.current) return
    const d3 = window.d3
    if (!d3) return

    const svg = d3.select(graphRef.current).select("svg")
    const currentZoom = d3.zoomTransform(svg.node())
    const newScale = currentZoom.k / 1.2

    svg
      .transition()
      .duration(300)
      .call(d3.zoom().transform, d3.zoomIdentity.translate(currentZoom.x, currentZoom.y).scale(newScale))

    setZoomLevel(newScale)
  }

  // Handle reset zoom
  const handleResetZoom = () => {
    if (!graphRef.current) return
    const d3 = window.d3
    if (!d3) return

    const svg = d3.select(graphRef.current).select("svg")

    svg.transition().duration(500).call(d3.zoom().transform, d3.zoomIdentity)

    setZoomLevel(1)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Toggle animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)

    if (!isAnimating && simulationRef.current) {
      simulationRef.current.alpha(0.3).restart()
    } else if (simulationRef.current) {
      simulationRef.current.alpha(0).stop()
    }
  }

  return (
    <div className={`w-full h-full relative ${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : ""}`}>
      <div
        ref={loadingRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: theme === "dark" ? "rgba(17, 24, 39, 0.7)" : "rgba(255, 255, 255, 0.7)" }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
      </div>

      <div
        ref={graphRef}
        className="w-full h-full"
        style={{
          background: theme === "dark" ? "#111827" : "white",
          borderRadius: "0.5rem",
        }}
      />

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md">
        <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Zoom In">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleResetZoom} title="Reset Zoom">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleFullscreen} title="Toggle Fullscreen">
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="absolute p-3 rounded-md shadow-lg z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          style={{
            left: "50%",
            top: "20px",
            transform: "translateX(-50%)",
            maxWidth: "300px",
          }}
        >
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{hoveredNode.title}</h3>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{hoveredNode.description}</p>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-gray-600 dark:text-gray-400">Department: {hoveredNode.department}</span>
            <span className="text-gray-600 dark:text-gray-400">Views: {hoveredNode.analytics.views}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-400">Status: {hoveredNode.status.replace("-", " ")}</span>
            <span className="text-gray-600 dark:text-gray-400">Helpfulness: {hoveredNode.analytics.helpfulness}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
