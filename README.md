
### egain AI KNOWLEDGE MANAGER





## Overview

egain AI KNOWLEDGE MANAGER is a comprehensive knowledge management system designed to help organizations efficiently organize, visualize, and maintain their knowledge base content. The platform uses advanced visualization techniques and AI-powered analytics to identify relationships between documents, detect duplicates, and provide actionable insights to improve content quality and user experience.

## Key Features

### 1. Knowledge Graph Visualization

- **Interactive Graph View**: Visualize relationships between knowledge articles with an interactive force-directed or radial graph
- **Department Color Coding**: Easily identify content by department with intuitive color coding
- **Status Indicators**: Quickly see content status (current, outdated, high-performing, etc.)
- **Multiple Articles Per Node**: Nodes indicate when they contain multiple related articles
- **Filtering Options**: Filter by department, status, or search terms


### 2. Duplicate Detection

- **Similarity Analysis**: Automatically detect potential duplicate or contradicting content
- **Diff View**: Compare documents side-by-side or with highlighted differences
- **Merge Capabilities**: Easily merge duplicate content or keep documents separate
- **Flagging System**: Flag content for further review
- **Metadata Comparison**: Compare document metadata to make informed decisions


### 3. Analytics Dashboard

- **Performance Metrics**: Track views, helpfulness ratings, search success rates, and more
- **Content Health**: Monitor content freshness, quality, and performance
- **User Engagement**: Analyze how users interact with your knowledge base
- **Search Analytics**: Identify zero-result searches and optimization opportunities
- **Device Breakdown**: Understand how users access your content across different devices


### 4. Content Insights

- **Top Viewed Articles**: Identify your most popular content
- **Idle Content**: Find content that's not being viewed
- **Content to Improve**: Discover articles that need attention
- **Zero Result Searches**: See what users are searching for but not finding
- **Content Freshness**: Track the age distribution of your knowledge base


### 5. List View

- **Sortable Content List**: View all knowledge articles in a sortable, filterable list
- **Bulk Operations**: Perform actions on multiple articles at once
- **Quick Editing**: Make quick edits without leaving the list view


## Technology Stack

- **Frontend Framework**: Next.js with App Router
- **UI Components**: React with shadcn/ui component library
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for data visualization
- **State Management**: React hooks for local state management
- **Theming**: Dark and light mode support
- **Icons**: Lucide React icons


## Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn


### Setup

1. Clone the repository:

```shellscript
git clone https://github.com/projectdelivery1/egainknowledge/
cd egainknowledge
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Project Structure

```plaintext
egain-ai-knowledge-manager/
├── app/                      # Next.js App Router pages
│   ├── analytics/            # Analytics dashboard page
│   ├── content-analysis/     # Content analysis page
│   ├── content-health/       # Content health page
│   ├── discovery/            # Content discovery page
│   ├── duplicates/           # Duplicates detection page
│   ├── insights/             # Insights dashboard page
│   ├── list/                 # List view page
│   ├── search-gap/           # Search gap analysis page
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page (Graph view)
├── components/               # React components
│   ├── analytics/            # Analytics chart components
│   ├── insights/             # Insight components
│   ├── ui/                   # UI components (shadcn)
│   ├── article-comparison.tsx # Article comparison component
│   ├── content-insights-dashboard.tsx # Content insights dashboard
│   ├── diff-view.tsx         # Diff view for comparing documents
│   ├── duplicate-detection.tsx # Duplicate detection component
│   ├── header.tsx            # Application header
│   ├── knowledge-analytics.tsx # Knowledge analytics component
│   ├── knowledge-graph.tsx   # Knowledge graph visualization
│   ├── knowledge-list-view.tsx # List view component
│   ├── side-panel.tsx        # Side panel for document details
│   └── theme-provider.tsx    # Theme provider for dark/light mode
├── hooks/                    # Custom React hooks
│   ├── use-mobile.tsx        # Hook for detecting mobile devices
│   └── use-toast.ts          # Hook for toast notifications
├── lib/                      # Utility functions and data
│   ├── mock-analytics-data.ts # Mock analytics data
│   ├── mock-data.ts          # Mock knowledge base data
│   ├── mock-insights-data.ts # Mock insights data
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
│   ├── diverse-group.png     # User avatar image
│   └── egain-logo.png        # egain logo
├── .eslintrc.json           # ESLint configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Data Structure

The application uses several key data structures:

### Node

Represents a knowledge article or document:

```typescript
type Node = {
  id: string;
  title: string;
  description: string;
  content: string;
  department: Department;
  status: Status;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  size: number;
  relatedDocuments: RelatedDocument[];
  analytics: {
    views: number;
    helpfulness: number;
    searchRelevance: number;
    freshness: number;
    completeness: number;
    accuracy: number;
  };
};
```

### Link

Represents a relationship between nodes:

```typescript
type Link = {
  source: string | Node;
  target: string | Node;
  value: number;
  type: string;
};
```

### DuplicatePair

Represents a pair of potentially duplicate documents:

```typescript
type DuplicatePair = {
  id: string;
  source: Node;
  target: Node;
  similarity: number;
  status: "pending" | "merged" | "kept-separate" | "flagged";
};
```

## Key Components

### KnowledgeGraph

The KnowledgeGraph component visualizes relationships between knowledge articles using D3.js. It supports:

- Force-directed and radial layouts
- Filtering by department, status, and search terms
- Interactive node selection
- Color coding by department and status
- Indicators for nodes with multiple articles


### DuplicateDetection

The DuplicateDetection component helps identify and manage potential duplicate content:

- Lists potential duplicates with similarity scores
- Provides diff view, side-by-side comparison, and metadata comparison
- Allows flagging, merging, or keeping documents separate
- Filters duplicates by status and similarity


### ContentInsightsDashboard

The ContentInsightsDashboard component provides analytics and insights:

- Overview metrics (views, helpfulness, zero-result searches, content freshness)
- Top viewed articles
- Idle content
- Zero-result searches
- Content to improve
- Content freshness distribution
- High helpfulness articles


## Customization

### Theming

The application supports both light and dark modes. The theme can be toggled using the sun/moon icon in the header.

### Department Colors

Department colors can be customized in the following components:

- `knowledge-graph.tsx`: Update the `departmentColors` object
- `duplicate-detection.tsx`: Update the `getDepartmentColor` function
- `side-panel.tsx`: Update the department badge colors


### Status Indicators

Status indicators can be customized in:

- `knowledge-graph.tsx`: Update the `statusColors` object
- `duplicate-detection.tsx`: Update the `getStatusBadge` function


## Integration

While the current implementation uses mock data, the application is designed to be integrated with backend services:

### API Integration

Replace mock data imports with API calls in:

- `knowledge-graph.tsx`: Fetch graph data from your knowledge base API
- `duplicate-detection.tsx`: Fetch duplicate pairs from your analysis API
- `content-insights-dashboard.tsx`: Fetch insights data from your analytics API


### Authentication

Add authentication by:

1. Creating an auth provider component
2. Wrapping the application with the auth provider
3. Adding login/logout functionality to the header
4. Protecting routes that require authentication


## Best Practices

### Performance Optimization

- The KnowledgeGraph component uses memoization to prevent unnecessary re-renders
- Large datasets are paginated where appropriate
- D3.js visualizations are optimized for performance


### Accessibility

- The application uses semantic HTML elements
- Color contrast meets WCAG standards
- Interactive elements have appropriate ARIA attributes
- Keyboard navigation is supported


### Responsive Design

- The application is fully responsive and works on desktop, tablet, and mobile devices
- Layout adjusts based on screen size
- Touch interactions are supported for mobile users


## Future Enhancements

- **Real-time Updates**: Implement WebSocket connections for real-time data updates
- **Advanced Search**: Add natural language search capabilities
- **AI-powered Recommendations**: Suggest content improvements based on analytics
- **Custom Dashboards**: Allow users to create custom analytics dashboards
- **Export Functionality**: Enable exporting data and reports in various formats
- **User Management**: Add user roles and permissions
- **Workflow Integration**: Connect with content creation and approval workflows


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support@egain.com](mailto:support@egain.com) or visit our support portal at [https://support.egain.com](https://support.egain.com).

---

© 2025 egain. All rights reserved.
