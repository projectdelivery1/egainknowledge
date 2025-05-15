"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import type { Node, Link } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface KnowledgeGraphProps {
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
  layout: "force" | "radial"
}

export default function KnowledgeGraph({ data, onNodeClick, filterOptions, layout }: KnowledgeGraphProps) {
  const graphRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const simulationRef = useRef<any>(null)
  const { theme } = useTheme()
  const { toast } = useToast()
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)

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

    // Create a Set of node IDs for faster lookup
    const nodeIds = new Set(filteredNodes.map((node) => node.id))

    // Filter links
    const filteredLinks = data.links.filter((link) => {
      const sourceId = typeof link.source === "string" ? link.source : link.source.id
      const targetId = typeof link.target === "string" ? link.target : link.target.id
      return nodeIds.has(sourceId) && nodeIds.has(targetId)
    })

    // Create deep copies to prevent D3 from mutating our state
    const nodesCopy = filteredNodes.map((n) => ({ ...n }))
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
        }

        // Define node border colors based on status
        const statusColors: Record<string, string> = {
          outdated: "#ef4444", // red
          current: "#10b981", // green
          "recently-updated": "#3b82f6", // blue
          "low-performing": "#f59e0b", // amber
        }

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
                .distance(100),
            )
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(50))
        } else {
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
            .force("collision", d3.forceCollide().radius(30))
        }

        // Store simulation in ref
        simulationRef.current = simulation

        // Create links
        const link = g
          .append("g")
          .attr("stroke", theme === "dark" ? "#4b5563" : "#e5e7eb")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(linksCopy)
          .join("line")
          .attr("stroke-width", (d: any) => Math.sqrt(d.value || 1))

        // Create nodes
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

        // Add circles for nodes
        node
          .append("circle")
          .attr("r", (d: any) => d.size || 20)
          .attr("fill", (d: any) => departmentColors[d.department] || "#e5e7eb")
          .attr("stroke", (d: any) => statusColors[d.status] || "transparent")
          .attr("stroke-width", 3)

        // Add small circles to indicate multiple articles
        node
          .filter((d: any) => d.relatedDocuments && d.relatedDocuments.length > 0)
          .append("circle")
          .attr("r", 6)
          .attr("cx", (d: any) => (d.size || 20) - 5)
          .attr("cy", (d: any) => (d.size || 20) - 5)
          .attr("fill", theme === "dark" ? "#f3f4f6" : "#4b5563")
          .attr("stroke", (d: any) => departmentColors[d.department] || "#e5e7eb")
          .attr("stroke-width", 1)

        // Add labels
        node
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", (d: any) => (d.size || 20) + 15)
          .attr("fill", theme === "dark" ? "#d1d5db" : "#4b5563")
          .attr("font-size", "12px")
          .text((d: any) => (d.title.length > 20 ? d.title.substring(0, 20) + "..." : d.title))

        // Update positions on tick
        simulation.on("tick", () => {
          link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y)

          node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
        })

        // Add drag behavior
        node.call(
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
  }, [data, filterOptions, onNodeClick, theme, toast, layout])

  return (
    <div className="h-full w-full bg-white dark:bg-gray-900 relative">
      <div
        ref={loadingRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: theme === "dark" ? "rgba(17, 24, 39, 0.7)" : "rgba(255, 255, 255, 0.7)" }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-[#3b82f6]" />
      </div>

      <div
        ref={graphRef}
        className="w-full h-full"
        style={{
          background: theme === "dark" ? "#111827" : "white",
          borderRadius: "0.5rem",
        }}
      />

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="absolute p-3 rounded-md shadow-lg z-10 bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700"
          style={{
            left: "50%",
            top: "20px",
            transform: "translateX(-50%)",
            maxWidth: "300px",
          }}
        >
          <h3 className="font-medium text-[#4b5563] dark:text-white">{hoveredNode.title}</h3>
          <p className="text-sm mt-1 text-[#6b7280] dark:text-gray-300">{hoveredNode.description}</p>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-[#6b7280] dark:text-gray-400">Department: {hoveredNode.department}</span>
            <span className="text-[#6b7280] dark:text-gray-400">Status: {hoveredNode.status.replace("-", " ")}</span>
          </div>
          <div className="mt-2 text-xs text-[#6b7280] dark:text-gray-400">
            <span>Contains {hoveredNode.relatedDocuments.length + 1} articles</span>
          </div>
        </div>
      )}
    </div>
  )
}
