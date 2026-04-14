export interface MetricRow {
  id: number
  date: string
  revenue: number
  orders: number
  visitors: number
  conversion: number
  avgOrderValue: number
  newCustomers: number
  returningCustomers: number
}

export interface ChannelMetric {
  channel: string
  visitors: number
  revenue: number
  conversion: number
  trend: 'up' | 'down' | 'flat'
}

export interface ProductMetric {
  id: number
  name: string
  unitsSold: number
  revenue: number
  rating: number
  returnRate: number
}

function genDailyMetrics(days: number): MetricRow[] {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - 1 - i) * 86400000)
    const visitors = 800 + Math.floor(Math.random() * 1200)
    const conversion = 1.5 + Math.random() * 4
    const orders = Math.floor(visitors * conversion / 100)
    const avgOrder = 35 + Math.random() * 80
    const revenue = orders * avgOrder
    const newCust = Math.floor(orders * (0.3 + Math.random() * 0.3))
    return {
      id: i + 1,
      date: date.toISOString().slice(0, 10),
      revenue: Math.round(revenue),
      orders,
      visitors,
      conversion: Math.round(conversion * 100) / 100,
      avgOrderValue: Math.round(avgOrder * 100) / 100,
      newCustomers: newCust,
      returningCustomers: orders - newCust,
    }
  })
}

export const dailyMetrics = genDailyMetrics(30)

export const channelMetrics: ChannelMetric[] = [
  { channel: 'Organic Search', visitors: 12450, revenue: 89400, conversion: 3.2, trend: 'up' },
  { channel: 'Direct', visitors: 8320, revenue: 67200, conversion: 4.1, trend: 'up' },
  { channel: 'Social Media', visitors: 6780, revenue: 34500, conversion: 1.8, trend: 'down' },
  { channel: 'Email', visitors: 4560, revenue: 45600, conversion: 5.2, trend: 'up' },
  { channel: 'Paid Ads', visitors: 9870, revenue: 56300, conversion: 2.4, trend: 'flat' },
  { channel: 'Referral', visitors: 3240, revenue: 28900, conversion: 3.8, trend: 'up' },
]

export const topProducts: ProductMetric[] = [
  { id: 1, name: 'Wireless Earbuds Pro', unitsSold: 1243, revenue: 49720, rating: 4.7, returnRate: 2.1 },
  { id: 2, name: 'Smart Watch Ultra', unitsSold: 876, revenue: 131400, rating: 4.5, returnRate: 3.4 },
  { id: 3, name: 'USB-C Hub 7-in-1', unitsSold: 2134, revenue: 42680, rating: 4.3, returnRate: 1.8 },
  { id: 4, name: 'Mechanical Keyboard', unitsSold: 654, revenue: 52320, rating: 4.8, returnRate: 0.9 },
  { id: 5, name: 'Noise-Cancelling Headphones', unitsSold: 543, revenue: 97740, rating: 4.6, returnRate: 2.5 },
  { id: 6, name: 'Portable SSD 1TB', unitsSold: 1876, revenue: 131320, rating: 4.4, returnRate: 1.2 },
  { id: 7, name: '4K Webcam', unitsSold: 987, revenue: 59220, rating: 4.2, returnRate: 3.1 },
  { id: 8, name: 'LED Desk Lamp', unitsSold: 1567, revenue: 47010, rating: 4.1, returnRate: 2.0 },
]

export function getSummary(metrics: MetricRow[]) {
  const totalRevenue = metrics.reduce((s, m) => s + m.revenue, 0)
  const totalOrders = metrics.reduce((s, m) => s + m.orders, 0)
  const totalVisitors = metrics.reduce((s, m) => s + m.visitors, 0)
  const avgConversion = metrics.reduce((s, m) => s + m.conversion, 0) / metrics.length
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0
  const totalNewCustomers = metrics.reduce((s, m) => s + m.newCustomers, 0)

  const half = Math.floor(metrics.length / 2)
  const prevRevenue = metrics.slice(0, half).reduce((s, m) => s + m.revenue, 0)
  const currRevenue = metrics.slice(half).reduce((s, m) => s + m.revenue, 0)
  const revenueTrend = prevRevenue ? ((currRevenue - prevRevenue) / prevRevenue * 100) : 0

  return {
    totalRevenue,
    totalOrders,
    totalVisitors,
    avgConversion: Math.round(avgConversion * 100) / 100,
    avgOrderValue: Math.round(avgOrderValue * 100) / 100,
    totalNewCustomers,
    revenueTrend: Math.round(revenueTrend * 10) / 10,
  }
}
