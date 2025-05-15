import type { Node, Link, DuplicatePair } from "./types"
import type { KnowledgeItem, Department, Status } from "./types"

// Generate random date in the past year
const randomDate = () => {
  const now = new Date()
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
  const randomTime = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime())
  return new Date(randomTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Generate mock nodes
const generateNodes = (): Node[] => {
  const departments = ["HR", "Support", "IT", "Sales", "Marketing"]
  const statuses = ["outdated", "current", "high-performing", "recently-updated", "low-performing"]

  const nodes: Node[] = []

  // HR Documents
  nodes.push({
    id: "hr-onboarding",
    title: "Employee Onboarding Process",
    description: "Complete guide to the employee onboarding process",
    content:
      "This document outlines the complete process for onboarding new employees, including paperwork, training schedules, and department introductions.",
    department: "HR",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Sarah Johnson",
    tags: ["onboarding", "new hire", "process"],
    size: 25,
    relatedDocuments: [
      {
        id: "hr-benefits",
        title: "Employee Benefits Overview",
        description: "Comprehensive guide to employee benefits and enrollment",
        department: "HR",
        similarity: 78,
      },
      {
        id: "hr-policies",
        title: "Company Policies Handbook",
        description: "Official company policies and procedures",
        department: "HR",
        similarity: 65,
      },
    ],
    analytics: {
      views: 842,
      helpfulness: 87,
      searchRelevance: 92,
      freshness: 85,
      completeness: 95,
      accuracy: 90,
    },
  })

  nodes.push({
    id: "hr-benefits",
    title: "Employee Benefits Overview",
    description: "Comprehensive guide to employee benefits and enrollment",
    content:
      "This document provides detailed information about all employee benefits, including health insurance, retirement plans, and other perks offered by the company.",
    department: "HR",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Sarah Johnson",
    tags: ["benefits", "insurance", "retirement"],
    size: 22,
    relatedDocuments: [
      {
        id: "hr-onboarding",
        title: "Employee Onboarding Process",
        description: "Complete guide to the employee onboarding process",
        department: "HR",
        similarity: 78,
      },
    ],
    analytics: {
      views: 756,
      helpfulness: 92,
      searchRelevance: 88,
      freshness: 80,
      completeness: 90,
      accuracy: 95,
    },
  })

  nodes.push({
    id: "hr-policies",
    title: "Company Policies Handbook",
    description: "Official company policies and procedures",
    content:
      "This handbook contains all official company policies and procedures that employees must follow, including code of conduct, leave policies, and workplace guidelines.",
    department: "HR",
    status: "outdated",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Michael Chen",
    tags: ["policies", "procedures", "handbook"],
    size: 30,
    relatedDocuments: [
      {
        id: "hr-onboarding",
        title: "Employee Onboarding Process",
        description: "Complete guide to the employee onboarding process",
        department: "HR",
        similarity: 65,
      },
    ],
    analytics: {
      views: 623,
      helpfulness: 75,
      searchRelevance: 82,
      freshness: 45,
      completeness: 88,
      accuracy: 70,
    },
  })

  // Additional HR Documents
  nodes.push({
    id: "hr-remote-work",
    title: "Remote Work Policy",
    description: "Guidelines for remote work arrangements",
    content:
      "This document outlines the company's policies and procedures for remote work arrangements, including eligibility, expectations, and best practices.",
    department: "HR",
    status: "recently-updated",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Michael Chen",
    tags: ["remote", "work from home", "telecommuting"],
    size: 26,
    relatedDocuments: [
      {
        id: "hr-policies",
        title: "Company Policies Handbook",
        description: "Official company policies and procedures",
        department: "HR",
        similarity: 75,
      },
    ],
    analytics: {
      views: 978,
      helpfulness: 94,
      searchRelevance: 90,
      freshness: 88,
      completeness: 93,
      accuracy: 92,
    },
  })

  nodes.push({
    id: "hr-performance",
    title: "Performance Review Guidelines",
    description: "Guidelines for conducting employee performance reviews",
    content:
      "This document provides managers with guidelines for conducting fair and effective performance reviews, including evaluation criteria, feedback methods, and goal setting.",
    department: "HR",
    status: "low-performing",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Sarah Johnson",
    tags: ["performance", "review", "evaluation"],
    size: 24,
    relatedDocuments: [
      {
        id: "hr-policies",
        title: "Company Policies Handbook",
        description: "Official company policies and procedures",
        department: "HR",
        similarity: 70,
      },
    ],
    analytics: {
      views: 412,
      helpfulness: 68,
      searchRelevance: 75,
      freshness: 65,
      completeness: 72,
      accuracy: 80,
    },
  })

  // Support Documents
  nodes.push({
    id: "support-troubleshooting",
    title: "Product Troubleshooting Guide",
    description: "Step-by-step troubleshooting for common product issues",
    content:
      "This guide provides detailed troubleshooting steps for resolving common issues with our products. It includes screenshots, diagrams, and step-by-step instructions.",
    department: "Support",
    status: "high-performing",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "David Wilson",
    tags: ["troubleshooting", "support", "guide"],
    size: 28,
    relatedDocuments: [
      {
        id: "support-faq",
        title: "Customer FAQ",
        description: "Frequently asked questions from customers",
        department: "Support",
        similarity: 85,
      },
    ],
    analytics: {
      views: 1245,
      helpfulness: 94,
      searchRelevance: 96,
      freshness: 88,
      completeness: 92,
      accuracy: 95,
    },
  })

  nodes.push({
    id: "support-faq",
    title: "Customer FAQ",
    description: "Frequently asked questions from customers",
    content:
      "This document contains answers to the most frequently asked questions from our customers about our products, services, and policies.",
    department: "Support",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Emily Rodriguez",
    tags: ["faq", "questions", "customers"],
    size: 20,
    relatedDocuments: [
      {
        id: "support-troubleshooting",
        title: "Product Troubleshooting Guide",
        description: "Step-by-step troubleshooting for common product issues",
        department: "Support",
        similarity: 85,
      },
    ],
    analytics: {
      views: 987,
      helpfulness: 89,
      searchRelevance: 94,
      freshness: 75,
      completeness: 85,
      accuracy: 90,
    },
  })

  // Additional Support Documents
  nodes.push({
    id: "support-product-manual",
    title: "Product User Manual",
    description: "Comprehensive user manual for all products",
    content:
      "This manual provides detailed instructions for using all features of our products, including setup, configuration, and advanced features.",
    department: "Support",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "David Wilson",
    tags: ["manual", "instructions", "guide"],
    size: 32,
    relatedDocuments: [
      {
        id: "support-troubleshooting",
        title: "Product Troubleshooting Guide",
        description: "Step-by-step troubleshooting for common product issues",
        department: "Support",
        similarity: 80,
      },
      {
        id: "support-faq",
        title: "Customer FAQ",
        description: "Frequently asked questions from customers",
        department: "Support",
        similarity: 75,
      },
    ],
    analytics: {
      views: 865,
      helpfulness: 86,
      searchRelevance: 88,
      freshness: 82,
      completeness: 90,
      accuracy: 92,
    },
  })

  // IT Documents
  nodes.push({
    id: "it-security",
    title: "Security Protocols",
    description: "Company security protocols and best practices",
    content:
      "This document outlines all security protocols and best practices that employees should follow to maintain data security and protect company assets.",
    department: "IT",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Robert Chang",
    tags: ["security", "protocols", "data protection"],
    size: 26,
    relatedDocuments: [
      {
        id: "it-network",
        title: "Network Configuration Guide",
        description: "Guide to network setup and configuration",
        department: "IT",
        similarity: 70,
      },
    ],
    analytics: {
      views: 532,
      helpfulness: 86,
      searchRelevance: 80,
      freshness: 82,
      completeness: 90,
      accuracy: 95,
    },
  })

  nodes.push({
    id: "it-network",
    title: "Network Configuration Guide",
    description: "Guide to network setup and configuration",
    content:
      "This guide provides detailed instructions for setting up and configuring the company network, including router settings, VPN access, and security measures.",
    department: "IT",
    status: "outdated",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Robert Chang",
    tags: ["network", "configuration", "setup"],
    size: 24,
    relatedDocuments: [
      {
        id: "it-security",
        title: "Security Protocols",
        description: "Company security protocols and best practices",
        department: "IT",
        similarity: 70,
      },
    ],
    analytics: {
      views: 345,
      helpfulness: 72,
      searchRelevance: 65,
      freshness: 40,
      completeness: 75,
      accuracy: 60,
    },
  })

  // Additional IT Documents
  nodes.push({
    id: "it-disaster-recovery",
    title: "Disaster Recovery Plan",
    description: "Procedures for recovering IT systems after a disaster",
    content:
      "This document outlines the company's disaster recovery plan, including backup procedures, recovery priorities, and communication protocols during system outages.",
    department: "IT",
    status: "high-performing",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Robert Chang",
    tags: ["disaster recovery", "backup", "business continuity"],
    size: 28,
    relatedDocuments: [
      {
        id: "it-security",
        title: "Security Protocols",
        description: "Company security protocols and best practices",
        department: "IT",
        similarity: 75,
      },
      {
        id: "it-network",
        title: "Network Configuration Guide",
        description: "Guide to network setup and configuration",
        department: "IT",
        similarity: 68,
      },
    ],
    analytics: {
      views: 478,
      helpfulness: 92,
      searchRelevance: 85,
      freshness: 88,
      completeness: 94,
      accuracy: 96,
    },
  })

  // Sales Documents
  nodes.push({
    id: "sales-playbook",
    title: "Sales Playbook",
    description: "Comprehensive sales strategies and scripts",
    content:
      "This playbook contains detailed sales strategies, scripts, and techniques for effectively selling our products and services to different customer segments.",
    department: "Sales",
    status: "high-performing",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Jessica Martinez",
    tags: ["sales", "strategies", "scripts"],
    size: 32,
    relatedDocuments: [
      {
        id: "sales-pricing",
        title: "Product Pricing Guide",
        description: "Detailed pricing information for all products",
        department: "Sales",
        similarity: 80,
      },
    ],
    analytics: {
      views: 1056,
      helpfulness: 95,
      searchRelevance: 90,
      freshness: 85,
      completeness: 98,
      accuracy: 92,
    },
  })

  nodes.push({
    id: "sales-pricing",
    title: "Product Pricing Guide",
    description: "Detailed pricing information for all products",
    content:
      "This guide contains detailed pricing information for all our products and services, including volume discounts, promotional offers, and competitive analysis.",
    department: "Sales",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Jessica Martinez",
    tags: ["pricing", "products", "discounts"],
    size: 22,
    relatedDocuments: [
      {
        id: "sales-playbook",
        title: "Sales Playbook",
        description: "Comprehensive sales strategies and scripts",
        department: "Sales",
        similarity: 80,
      },
    ],
    analytics: {
      views: 876,
      helpfulness: 90,
      searchRelevance: 85,
      freshness: 78,
      completeness: 92,
      accuracy: 88,
    },
  })

  // Additional Sales Documents
  nodes.push({
    id: "sales-customer-segments",
    title: "Customer Segmentation Guide",
    description: "Analysis of customer segments and targeting strategies",
    content:
      "This document provides a detailed analysis of our customer segments, including demographics, needs, buying behaviors, and strategies for targeting each segment.",
    department: "Sales",
    status: "recently-updated",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Jessica Martinez",
    tags: ["segmentation", "customers", "targeting"],
    size: 28,
    relatedDocuments: [
      {
        id: "sales-playbook",
        title: "Sales Playbook",
        description: "Comprehensive sales strategies and scripts",
        department: "Sales",
        similarity: 85,
      },
      {
        id: "marketing-personas",
        title: "Customer Personas",
        description: "Detailed customer persona profiles",
        department: "Marketing",
        similarity: 78,
      },
    ],
    analytics: {
      views: 645,
      helpfulness: 88,
      searchRelevance: 82,
      freshness: 94,
      completeness: 90,
      accuracy: 92,
    },
  })

  // Marketing Documents
  nodes.push({
    id: "marketing-strategy",
    title: "Marketing Strategy",
    description: "Comprehensive marketing strategy and plans",
    content:
      "This document outlines our comprehensive marketing strategy, including target audiences, messaging, channels, campaigns, and metrics for measuring success.",
    department: "Marketing",
    status: "high-performing",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Maria Garcia",
    tags: ["marketing", "strategy", "campaigns"],
    size: 30,
    relatedDocuments: [
      {
        id: "marketing-personas",
        title: "Customer Personas",
        description: "Detailed customer persona profiles",
        department: "Marketing",
        similarity: 85,
      },
      {
        id: "sales-customer-segments",
        title: "Customer Segmentation Guide",
        description: "Analysis of customer segments and targeting strategies",
        department: "Sales",
        similarity: 78,
      },
    ],
    analytics: {
      views: 876,
      helpfulness: 94,
      searchRelevance: 90,
      freshness: 86,
      completeness: 95,
      accuracy: 92,
    },
  })

  nodes.push({
    id: "marketing-personas",
    title: "Customer Personas",
    description: "Detailed customer persona profiles",
    content:
      "This document contains detailed profiles of our customer personas, including demographics, goals, challenges, preferences, and buying behaviors.",
    department: "Marketing",
    status: "current",
    createdAt: randomDate(),
    updatedAt: randomDate(),
    author: "Maria Garcia",
    tags: ["personas", "customers", "profiles"],
    size: 26,
    relatedDocuments: [
      {
        id: "marketing-strategy",
        title: "Marketing Strategy",
        description: "Comprehensive marketing strategy and plans",
        department: "Marketing",
        similarity: 85,
      },
      {
        id: "sales-customer-segments",
        title: "Customer Segmentation Guide",
        description: "Analysis of customer segments and targeting strategies",
        department: "Sales",
        similarity: 78,
      },
    ],
    analytics: {
      views: 732,
      helpfulness: 88,
      searchRelevance: 85,
      freshness: 82,
      completeness: 90,
      accuracy: 88,
    },
  })

  return nodes
}

// Generate links between nodes
const generateLinks = (nodes: Node[]): Link[] => {
  const links: Link[] = []

  // Create links based on department relationships
  const nodesByDepartment: Record<string, Node[]> = {}

  nodes.forEach((node) => {
    if (!nodesByDepartment[node.department]) {
      nodesByDepartment[node.department] = []
    }
    nodesByDepartment[node.department].push(node)
  })

  // Connect nodes within departments
  Object.values(nodesByDepartment).forEach((departmentNodes) => {
    for (let i = 0; i < departmentNodes.length; i++) {
      for (let j = i + 1; j < departmentNodes.length; j++) {
        links.push({
          source: departmentNodes[i].id,
          target: departmentNodes[j].id,
          value: 2,
          type: "department",
        })
      }
    }
  })

  // Add links based on related documents
  nodes.forEach((node) => {
    node.relatedDocuments.forEach((relatedDoc) => {
      // Check if this link already exists
      const linkExists = links.some(
        (link) =>
          (link.source === node.id && link.target === relatedDoc.id) ||
          (link.source === relatedDoc.id && link.target === node.id),
      )

      if (!linkExists) {
        links.push({
          source: node.id,
          target: relatedDoc.id,
          value: relatedDoc.similarity / 25, // Scale similarity to link strength
          type: "related",
        })
      }
    })
  })

  // Add some cross-department links
  const crossDepartmentConnections = [
    { source: "hr-onboarding", target: "it-security", value: 1, type: "cross-department" },
    { source: "support-troubleshooting", target: "sales-pricing", value: 1, type: "cross-department" },
    { source: "hr-remote-work", target: "it-security", value: 1.5, type: "cross-department" },
    { source: "sales-playbook", target: "marketing-strategy", value: 2, type: "cross-department" },
    { source: "marketing-personas", target: "sales-customer-segments", value: 2.5, type: "cross-department" },
    { source: "it-disaster-recovery", target: "hr-policies", value: 1.2, type: "cross-department" },
  ]

  links.push(...crossDepartmentConnections)

  return links
}

// Generate duplicate pairs
const generateDuplicatePairs = (nodes: Node[]): DuplicatePair[] => {
  const pairs: DuplicatePair[] = [
    {
      id: "hr-onboarding-hr-benefits",
      source: nodes.find((n) => n.id === "hr-onboarding")!,
      target: nodes.find((n) => n.id === "hr-benefits")!,
      similarity: 78,
      status: "merged",
    },
    {
      id: "support-troubleshooting-support-faq",
      source: nodes.find((n) => n.id === "support-troubleshooting")!,
      target: nodes.find((n) => n.id === "support-faq")!,
      similarity: 85,
      status: "flagged",
    },
    {
      id: "it-security-it-network",
      source: nodes.find((n) => n.id === "it-security")!,
      target: nodes.find((n) => n.id === "it-network")!,
      similarity: 70,
      status: "pending",
    },
    {
      id: "sales-playbook-sales-pricing",
      source: nodes.find((n) => n.id === "sales-playbook")!,
      target: nodes.find((n) => n.id === "sales-pricing")!,
      similarity: 80,
      status: "pending",
    },
    {
      id: "hr-policies-hr-onboarding",
      source: nodes.find((n) => n.id === "hr-policies")!,
      target: nodes.find((n) => n.id === "hr-onboarding")!,
      similarity: 65,
      status: "kept-separate",
    },
    {
      id: "support-faq-hr-policies",
      source: nodes.find((n) => n.id === "support-faq")!,
      target: nodes.find((n) => n.id === "hr-policies")!,
      similarity: 60,
      status: "pending",
    },
    {
      id: "it-network-sales-pricing",
      source: nodes.find((n) => n.id === "it-network")!,
      target: nodes.find((n) => n.id === "sales-pricing")!,
      similarity: 55,
      status: "pending",
    },
    {
      id: "hr-benefits-sales-playbook",
      source: nodes.find((n) => n.id === "hr-benefits")!,
      target: nodes.find((n) => n.id === "sales-playbook")!,
      similarity: 50,
      status: "pending",
    },
    // Additional duplicate pairs
    {
      id: "hr-remote-work-hr-policies",
      source: nodes.find((n) => n.id === "hr-remote-work")!,
      target: nodes.find((n) => n.id === "hr-policies")!,
      similarity: 72,
      status: "pending",
    },
    {
      id: "marketing-strategy-sales-playbook",
      source: nodes.find((n) => n.id === "marketing-strategy")!,
      target: nodes.find((n) => n.id === "sales-playbook")!,
      similarity: 75,
      status: "flagged",
    },
    {
      id: "marketing-personas-sales-customer-segments",
      source: nodes.find((n) => n.id === "marketing-personas")!,
      target: nodes.find((n) => n.id === "sales-customer-segments")!,
      similarity: 82,
      status: "pending",
    },
  ]

  return pairs
}

// Generate the complete graph data
const nodes = generateNodes()
const links = generateLinks(nodes)
const duplicatePairs = generateDuplicatePairs(nodes)

export const mockGraphData = {
  nodes,
  links,
}

export const mockDuplicatePairs = duplicatePairs

// Generate a large set of mock data for the knowledge graph
const generateMockData = (): KnowledgeItem[] => {
  const departments: Department[] = [
    "Engineering",
    "Product",
    "Marketing",
    "Sales",
    "Customer Support",
    "HR",
    "Finance",
    "Legal",
    "Operations",
    "Research",
  ]

  const topics = [
    "API Documentation",
    "User Onboarding",
    "Pricing Strategy",
    "Security Protocols",
    "Data Privacy",
    "Performance Optimization",
    "Customer Feedback",
    "Product Roadmap",
    "Market Analysis",
    "Competitor Research",
    "Employee Benefits",
    "Hiring Process",
    "Financial Reporting",
    "Legal Compliance",
    "Infrastructure Setup",
    "Disaster Recovery",
    "Brand Guidelines",
    "Social Media Strategy",
    "Sales Techniques",
    "Customer Retention",
    "Product Features",
    "Technical Specifications",
    "User Interface Design",
    "User Experience Research",
    "Mobile Development",
    "Web Development",
    "Database Management",
    "Cloud Infrastructure",
    "Machine Learning Models",
    "Analytics Implementation",
    "Regulatory Requirements",
    "Internal Policies",
    "Training Materials",
    "Troubleshooting Guides",
    "Release Notes",
    "Integration Guides",
    "Partner Programs",
    "Affiliate Marketing",
    "Email Campaigns",
    "Content Strategy",
    "SEO Optimization",
    "PPC Advertising",
    "Event Planning",
    "Community Management",
    "Customer Success Stories",
    "Product Demos",
    "Technical Support",
    "Account Management",
    "Billing Procedures",
    "Tax Compliance",
  ]

  const statuses: Status[] = ["draft", "published", "archived", "review"]

  const authors = [
    "Alex Johnson",
    "Sam Smith",
    "Jordan Lee",
    "Taylor Wong",
    "Casey Martinez",
    "Morgan Patel",
    "Jamie Garcia",
    "Riley Thompson",
    "Quinn Wilson",
    "Avery Rodriguez",
    "Dakota Chen",
    "Reese Nguyen",
    "Jordan Kim",
    "Cameron Davis",
    "Skyler Brown",
  ]

  // Generate 150 knowledge items
  const items: KnowledgeItem[] = []

  for (let i = 0; i < 150; i++) {
    const departmentIndex = Math.floor(Math.random() * departments.length)
    const topicIndex = Math.floor(Math.random() * topics.length)
    const statusIndex = Math.floor(Math.random() * statuses.length)
    const authorIndex = Math.floor(Math.random() * authors.length)

    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365))

    const updatedDate = new Date(createdDate)
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 30))

    const views = Math.floor(Math.random() * 10000)
    const helpfulCount = Math.floor(Math.random() * (views * 0.3))
    const notHelpfulCount = Math.floor(Math.random() * (views * 0.1))

    items.push({
      id: `doc-${i + 1}`,
      title: `${topics[topicIndex]} ${i + 1}`,
      department: departments[departmentIndex],
      status: statuses[statusIndex],
      author: authors[authorIndex],
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
      content: `This is a detailed document about ${topics[topicIndex]}. It contains comprehensive information that is useful for the ${departments[departmentIndex]} department.`,
      tags: [
        topics[topicIndex].split(" ")[0].toLowerCase(),
        departments[departmentIndex].toLowerCase(),
        Math.random() > 0.5 ? "important" : "reference",
        Math.random() > 0.7 ? "featured" : "",
      ].filter(Boolean),
      views,
      helpfulCount,
      notHelpfulCount,
      relatedDocuments: [],
    })
  }

  // Create relationships between documents
  items.forEach((item) => {
    // Each document will have 3-10 related documents
    const numRelated = 3 + Math.floor(Math.random() * 8)
    const relatedIndices = new Set<number>()

    while (relatedIndices.size < numRelated) {
      const relatedIndex = Math.floor(Math.random() * items.length)
      if (relatedIndex !== Number.parseInt(item.id.split("-")[1]) - 1) {
        relatedIndices.add(relatedIndex)
      }
    }

    item.relatedDocuments = Array.from(relatedIndices).map((index) => {
      const relatedItem = items[index]
      return {
        id: relatedItem.id,
        title: relatedItem.title,
        similarity: (0.5 + Math.random() * 0.5).toFixed(2),
      }
    })
  })

  return items
}

export const mockKnowledgeItems = generateMockData()

// Generate mock data for duplicate detection
export const mockDuplicates = mockKnowledgeItems.slice(0, 15).map((item, index) => {
  const duplicateIndex = 15 + index
  const duplicate = {
    ...mockKnowledgeItems[duplicateIndex],
    id: `dup-${index}`,
    title: mockKnowledgeItems[duplicateIndex].title,
    content:
      mockKnowledgeItems[duplicateIndex].content.substring(0, 20) +
      (index % 3 === 0
        ? " This is slightly different content to create a partial match."
        : mockKnowledgeItems[duplicateIndex].content.substring(20)),
    similarity: (0.7 + Math.random() * 0.3).toFixed(2),
  }

  return {
    original: item,
    duplicate: duplicate,
    similarity: Number.parseFloat(duplicate.similarity),
    detectedAt: new Date().toISOString(),
  }
})

// Generate additional connections for a more dense graph
export const generateGraphConnections = () => {
  const nodes = mockKnowledgeItems.map((item) => ({
    id: item.id,
    title: item.title,
    department: item.department,
    status: item.status,
  }))

  const links: { source: string; target: string; strength: number }[] = []

  // Create a dense network of connections
  nodes.forEach((node) => {
    // Each node will connect to 5-15 other nodes
    const connectionCount = 5 + Math.floor(Math.random() * 10)

    for (let i = 0; i < connectionCount; i++) {
      const targetIndex = Math.floor(Math.random() * nodes.length)
      const target = nodes[targetIndex]

      if (node.id !== target.id) {
        links.push({
          source: node.id,
          target: target.id,
          strength: 0.1 + Math.random() * 0.9,
        })
      }
    }
  })

  return { nodes, links }
}

export const graphData = generateGraphConnections()

// Generate clusters of related documents
export const generateClusters = () => {
  const clusters = []
  const departments = Array.from(new Set(mockKnowledgeItems.map((item) => item.department)))

  departments.forEach((department) => {
    const departmentItems = mockKnowledgeItems.filter((item) => item.department === department)

    clusters.push({
      id: `cluster-${department.toLowerCase().replace(/\s+/g, "-")}`,
      name: department,
      count: departmentItems.length,
      items: departmentItems.map((item) => item.id),
    })
  })

  // Add some cross-department clusters based on topics
  const topics = [
    "Security",
    "Documentation",
    "Customer",
    "Product",
    "Technical",
    "Research",
    "Development",
    "Marketing",
  ]

  topics.forEach((topic) => {
    const topicItems = mockKnowledgeItems.filter(
      (item) =>
        item.title.toLowerCase().includes(topic.toLowerCase()) ||
        item.content.toLowerCase().includes(topic.toLowerCase()),
    )

    if (topicItems.length > 5) {
      clusters.push({
        id: `cluster-topic-${topic.toLowerCase().replace(/\s+/g, "-")}`,
        name: `${topic} Resources`,
        count: topicItems.length,
        items: topicItems.map((item) => item.id),
      })
    }
  })

  return clusters
}

export const knowledgeClusters = generateClusters()
