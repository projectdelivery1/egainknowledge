"use client"

import { useState } from "react"
import Header from "@/components/header"
import ContentHealthView from "@/components/content-health-view"
import { mockGraphData } from "@/lib/mock-data"

export default function ContentHealthPage() {
  const [selectedDocumentId, setSelectedDocumentId] = useState(mockGraphData.nodes[0].id)

  const handleDocumentChange = (documentId: string) => {
    setSelectedDocumentId(documentId)
  }

  const selectedDocument = mockGraphData.nodes.find((node) => node.id === selectedDocumentId)

  return (
    <main className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 overflow-hidden p-4">
        {selectedDocument && <ContentHealthView document={selectedDocument} onDocumentChange={handleDocumentChange} />}
      </div>
    </main>
  )
}
