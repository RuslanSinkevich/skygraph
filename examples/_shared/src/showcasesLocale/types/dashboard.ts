export interface DashboardLocale {
  title: string
  lead: string
  modes: {
    operations: string
    drilldown: string
    editor: string
  }
  printTable: string
  exportButton: string
  exportToast: string
  exportToastSub: string
  stats: {
    revenue: string
    revenueSub: (icon: string, pct: string) => string
    orders: string
    ordersSub: (perDay: string) => string
    signups: string
    signupsSub: string
    active: string
    activeSub: string
  }
  widgets: {
    revenueTitle: string
    revenueHint: (total: string) => string
    countriesTitle: string
    countriesHint: (count: number) => string
    ordersTitle: string
    ordersHint: (count: string) => string
    activeTitle: string
    activeHint: (now: string) => string
    healthTitle: string
    healthHint: (count: number) => string
    activityTitle: string
    activityHint: string
  }
  widgetActions: {
    refresh: string
    exportPng: string
    pinToTop: string
  }
  widgetToasts: {
    refreshed: (id: string) => string
    exportQueued: (id: string) => string
    pinned: (id: string) => string
    nodeContext: (id: string) => string
    canvasContext: string
    refreshShort: (id: string) => string
    settings: (id: string) => string
    removed: (id: string) => string
  }
  drilldown: {
    overview: string
    channels: string
    products: string
    overviewHint: (icon: string, pct: number) => string
    columns: {
      date: string
      revenue: string
      orders: string
      visitors: string
      conversion: string
      aov: string
      newCustomers: string
      returning: string
    }
    channelsTable: {
      summaryTitle: string
      totalVisitors: string
      totalRevenue: string
      topChannel: string
      topChannelValue: string
      bestConversion: string
      bestConversionValue: string
      channel: string
      visitors: string
      revenue: string
      conversion: string
      trend: string
      trendUp: string
      trendFlat: string
      trendDown: string
    }
    productsTable: {
      product: string
      unitsSold: string
      revenue: string
      rating: string
      returnRate: string
    }
    groupedReturning: string
    groupedOrders: string
  }
  drawers: {
    dayDetailsTitle: (date: string) => string
    date: string
    revenue: string
    orders: string
    visitors: string
    conversion: string
    aov: string
    newCustomers: string
    returning: string
    revenuePerformance: string
    conversionRate: string
    channel: string
    revenuePerVisitor: string
    trafficShare: string
    revenueShare: string
    product: string
    avgPrice: string
    rating: string
    returnRateLabel: string
    ratingHeading: string
    returnRateHealth: string
  }
  empty: {
    noServices: string
    noDataInPeriod: string
  }
  serviceMenu: {
    restart: string
    viewLogs: string
    silence: string
  }
  serviceToast: (action: string, name: string) => string
  healthLabel: Record<'healthy' | 'degraded' | 'down', string>
  activityType: Record<'alert' | 'deploy' | 'edit' | 'login', string>
  trendLabel: Record<'up' | 'flat' | 'down', string>
  detailsBtn: string
  drilldownLead: (icon: string, pct: number) => string
  channelTopValue: string
  channelBestConvValue: string
  exportToastTitle: string
}
