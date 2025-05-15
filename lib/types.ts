export type Node = {
  id: string
  title: string
  description: string
  content: string
  department: Department
  status: Status
  createdAt: string
  updatedAt: string
  author: string
  tags: string[]
  size: number
  relatedDocuments: {
    id: string
    title: string
    description: string
    department: Department
    similarity: number
  }[]
  analytics: {
    views: number
    helpfulness: number
    searchRelevance: number
    freshness: number
    completeness: number
    accuracy: number
  }
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

export type Link = {
  source: string | Node
  target: string | Node
  value: number
  type: string
}

export type DuplicatePair = {
  id: string
  source: Node
  target: Node
  similarity: number
  status: "pending" | "merged" | "kept-separate" | "flagged"
}

export type KnowledgeItem = {
  id: string
  title: string
  department: Department
  status: Status
  author: string
  createdAt: string
  updatedAt: string
  content: string
  tags: string[]
  views: number
  helpfulCount: number
  notHelpfulCount: number
  relatedDocuments: {
    id: string
    title: string
    similarity: string
  }[]
}

export type Department =
  | "Engineering"
  | "Product"
  | "Marketing"
  | "Sales"
  | "Customer Support"
  | "HR"
  | "Finance"
  | "Legal"
  | "Operations"
  | "Research"
  | "IT"
  | "Support"

export type Status =
  | "draft"
  | "published"
  | "archived"
  | "review"
  | "outdated"
  | "current"
  | "high-performing"
  | "recently-updated"
  | "low-performing"
