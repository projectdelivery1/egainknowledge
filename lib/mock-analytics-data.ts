// Mock data for the analytics dashboard

export const mockAnalyticsData = {
  // Overview metrics
  totalViews: 245678,
  viewsIncrease: 15.3,
  activeUsers: 12456,
  usersIncrease: 8.7,
  searchSuccessRate: 78,
  searchRateDecrease: 2.1,
  avgTimeOnPage: 3.5,
  timeOnPageIncrease: 12.4,

  // Usage over time data
  usageOverTime: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    views: [12500, 14200, 16800, 18900, 17500, 19200, 21500, 23400, 22800, 24500, 26700, 28900],
    users: [5600, 6200, 7100, 7800, 7400, 8100, 9200, 9800, 9500, 10200, 11500, 12400],
    visitors: [5600, 6200, 7100, 7800, 7400, 8100, 9200, 9800, 9500, 10200, 11500, 12400],
  },

  // Top search terms
  topSearchTerms: [
    { term: "onboarding", searches: 1245 },
    { term: "benefits", searches: 987 },
    { term: "security", searches: 876 },
    { term: "troubleshooting", searches: 754 },
    { term: "pricing", searches: 632 },
    { term: "policies", searches: 521 },
    { term: "network", searches: 432 },
    { term: "sales", searches: 387 },
  ],

  // User engagement
  userEngagement: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    helpfulRatings: [65, 68, 72, 75, 73, 78, 82, 85],
    commentsPerDoc: [1.2, 1.5, 1.8, 2.1, 2.0, 2.3, 2.5, 2.7],
    sharesPerDoc: [0.5, 0.7, 0.9, 1.1, 1.0, 1.2, 1.4, 1.5],
  },

  // Department distribution
  departmentDistribution: [
    { name: "HR", value: 35 },
    { name: "Support", value: 25 },
    { name: "IT", value: 20 },
    { name: "Sales", value: 15 },
    { name: "Marketing", value: 5 },
  ],

  // Device breakdown
  deviceBreakdown: [
    { name: "Desktop", value: 65 },
    { name: "Mobile", value: 25 },
    { name: "Tablet", value: 10 },
  ],

  // Search success rate
  searchSuccessRate30Days: [
    { date: "Oct 1", rate: 75 },
    { date: "Oct 5", rate: 76 },
    { date: "Oct 10", rate: 74 },
    { date: "Oct 15", rate: 77 },
    { date: "Oct 20", rate: 79 },
    { date: "Oct 25", rate: 78 },
    { date: "Oct 30", rate: 80 },
  ],
}
