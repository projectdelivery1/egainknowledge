// Mock data for the insights dashboard

export const mockInsightsData = {
  // Overview metrics
  totalViews: 124567,
  viewsIncrease: 12.5,
  avgHelpfulness: 87,
  helpfulnessIncrease: 3.2,
  zeroResultSearches: 42,
  zeroResultsIncrease: 8.7,
  avgFreshness: 68,
  freshnessDecrease: 5.3,

  // Top viewed articles
  topViewedArticles: [
    {
      title: "Employee Onboarding Process",
      department: "HR",
      author: "Sarah Johnson",
      views: 3245,
      helpfulnessRating: 92,
    },
    {
      title: "Product Troubleshooting Guide",
      department: "Support",
      author: "David Wilson",
      views: 2876,
      helpfulnessRating: 88,
    },
    {
      title: "Sales Playbook",
      department: "Sales",
      author: "Jessica Martinez",
      views: 2543,
      helpfulnessRating: 95,
    },
    {
      title: "Security Protocols",
      department: "IT",
      author: "Robert Chang",
      views: 2187,
      helpfulnessRating: 86,
    },
    {
      title: "Employee Benefits Overview",
      department: "HR",
      author: "Sarah Johnson",
      views: 1954,
      helpfulnessRating: 90,
    },
    {
      title: "Customer FAQ",
      department: "Support",
      author: "Emily Rodriguez",
      views: 1876,
      helpfulnessRating: 89,
    },
    {
      title: "Product Pricing Guide",
      department: "Sales",
      author: "Jessica Martinez",
      views: 1765,
      helpfulnessRating: 87,
    },
  ],

  // Idle content
  idleContent: [
    {
      title: "Legacy System Documentation",
      department: "IT",
      author: "Robert Chang",
      lastUpdated: "Mar 15, 2022",
      daysWithoutViews: 45,
    },
    {
      title: "Previous Quarter Sales Strategy",
      department: "Sales",
      author: "Jessica Martinez",
      lastUpdated: "Jan 10, 2023",
      daysWithoutViews: 38,
    },
    {
      title: "Outdated HR Policies (2021)",
      department: "HR",
      author: "Michael Chen",
      lastUpdated: "Dec 5, 2021",
      daysWithoutViews: 60,
    },
    {
      title: "Former Product Line Support Guide",
      department: "Support",
      author: "Emily Rodriguez",
      lastUpdated: "Apr 22, 2022",
      daysWithoutViews: 30,
    },
    {
      title: "Deprecated API Documentation",
      department: "IT",
      author: "Robert Chang",
      lastUpdated: "Feb 8, 2022",
      daysWithoutViews: 52,
    },
    {
      title: "Old Vendor Relationships",
      department: "Sales",
      author: "Jessica Martinez",
      lastUpdated: "Nov 30, 2022",
      daysWithoutViews: 25,
    },
  ],

  // Zero result searches
  zeroResultSearches: [
    {
      term: "remote work policy",
      searches: 28,
      lastSearched: "2 days ago",
      trend: "up",
      trendPercentage: 40,
      suggestedAction: "Create new content",
    },
    {
      term: "maternity leave",
      searches: 23,
      lastSearched: "1 day ago",
      trend: "up",
      trendPercentage: 15,
      suggestedAction: "Add synonym to existing content",
    },
    {
      term: "api authentication",
      searches: 19,
      lastSearched: "3 days ago",
      trend: "down",
      trendPercentage: 5,
      suggestedAction: "Create new content",
    },
    {
      term: "expense reimbursement",
      searches: 17,
      lastSearched: "1 day ago",
      trend: "up",
      trendPercentage: 30,
      suggestedAction: "Add synonym to existing content",
    },
    {
      term: "product roadmap 2023",
      searches: 15,
      lastSearched: "4 days ago",
      trend: "down",
      trendPercentage: 10,
      suggestedAction: "Create new content",
    },
    {
      term: "customer refund policy",
      searches: 12,
      lastSearched: "2 days ago",
      trend: "up",
      trendPercentage: 20,
      suggestedAction: "Add synonym to existing content",
    },
  ],

  // Content to improve
  contentToImprove: [
    {
      title: "Network Configuration Guide",
      department: "IT",
      author: "Robert Chang",
      lastUpdated: "Feb 8, 2022",
      qualityScore: 65,
      issueDescription: "Contains outdated references to deprecated systems and has several broken links.",
      issues: [
        { type: "outdated", count: 12 },
        { type: "grammar", count: 5 },
      ],
    },
    {
      title: "Company Policies Handbook",
      department: "HR",
      author: "Michael Chen",
      lastUpdated: "Dec 5, 2021",
      qualityScore: 72,
      issueDescription: "Multiple grammar issues and references to outdated policies that need updating.",
      issues: [
        { type: "grammar", count: 15 },
        { type: "outdated", count: 8 },
      ],
    },
    {
      title: "Product Return Process",
      department: "Support",
      author: "Emily Rodriguez",
      lastUpdated: "Mar 20, 2022",
      qualityScore: 68,
      issueDescription: "Missing important details about international returns and contains confusing instructions.",
      issues: [
        { type: "incomplete", count: 3 },
        { type: "grammar", count: 7 },
      ],
    },
    {
      title: "Sales Territory Guidelines",
      department: "Sales",
      author: "Jessica Martinez",
      lastUpdated: "Jan 15, 2023",
      qualityScore: 75,
      issueDescription: "Needs updating with new territory definitions and contains several formatting issues.",
      issues: [
        { type: "outdated", count: 6 },
        { type: "grammar", count: 4 },
      ],
    },
    {
      title: "Employee Offboarding Checklist",
      department: "HR",
      author: "Sarah Johnson",
      lastUpdated: "Apr 10, 2022",
      qualityScore: 70,
      issueDescription: "Missing steps for remote employees and contains outdated security protocols.",
      issues: [
        { type: "incomplete", count: 5 },
        { type: "outdated", count: 3 },
      ],
    },
  ],

  // Content freshness
  contentFreshness: {
    thisYear: 45,
    lastYear: 30,
    twoYearsAgo: 15,
    threeYearsAgo: 7,
    fourPlusYearsAgo: 3,
    total: 100,
  },

  // High helpfulness articles
  highHelpfulnessArticles: [
    {
      title: "Sales Playbook",
      department: "Sales",
      author: "Jessica Martinez",
      helpfulnessRating: 95,
      rating: 4.8,
      views: 2543,
    },
    {
      title: "Employee Onboarding Process",
      department: "HR",
      author: "Sarah Johnson",
      helpfulnessRating: 92,
      rating: 4.7,
      views: 3245,
    },
    {
      title: "Employee Benefits Overview",
      department: "HR",
      author: "Sarah Johnson",
      helpfulnessRating: 90,
      rating: 4.5,
      views: 1954,
    },
    {
      title: "Customer FAQ",
      department: "Support",
      author: "Emily Rodriguez",
      helpfulnessRating: 89,
      rating: 4.4,
      views: 1876,
    },
    {
      title: "Product Troubleshooting Guide",
      department: "Support",
      author: "David Wilson",
      helpfulnessRating: 88,
      rating: 4.3,
      views: 2876,
    },
    {
      title: "Product Pricing Guide",
      department: "Sales",
      author: "Jessica Martinez",
      helpfulnessRating: 87,
      rating: 4.2,
      views: 1765,
    },
  ],
}
