export interface DailyMetric {
  date: string
  revenue: number
  orders: number
  signups: number
  active: number
}

export interface ServiceHealth {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  latencyMs: number
  uptime: number
  region: string
}

export interface ActivityEvent {
  id: string
  user: string
  avatar: string
  action: string
  target: string
  ago: string
  type: 'deploy' | 'login' | 'edit' | 'alert'
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export function genDaily(days: number): DailyMetric[] {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - 1 - i) * 86400000)
    return {
      date: date.toISOString().slice(0, 10),
      revenue: Math.round(2000 + Math.random() * 4000 + i * 50),
      orders: Math.floor(40 + Math.random() * 60),
      signups: Math.floor(10 + Math.random() * 25),
      active: Math.floor(800 + Math.random() * 400),
    }
  })
}

export const daily30 = genDaily(30)

export const serviceHealth: ServiceHealth[] = [
  { name: 'Web App', status: 'healthy', latencyMs: 84, uptime: 99.98, region: 'us-east-1' },
  { name: 'API Gateway', status: 'healthy', latencyMs: 132, uptime: 99.95, region: 'us-east-1' },
  { name: 'Postgres', status: 'degraded', latencyMs: 412, uptime: 99.81, region: 'us-east-1' },
  { name: 'Redis Cache', status: 'healthy', latencyMs: 12, uptime: 99.99, region: 'us-east-1' },
  { name: 'Worker Queue', status: 'healthy', latencyMs: 67, uptime: 99.9, region: 'us-west-2' },
  { name: 'CDN', status: 'healthy', latencyMs: 22, uptime: 99.99, region: 'global' },
  { name: 'Email Service', status: 'down', latencyMs: 0, uptime: 95.2, region: 'eu-west-1' },
  { name: 'Storage', status: 'healthy', latencyMs: 198, uptime: 99.92, region: 'multi' },
]

const users = ['Alex K.', 'Maria S.', 'James L.', 'Sophie W.', 'Liam N.', 'Emma T.', 'Noah D.']
const actions: Array<ActivityEvent['type']> = ['deploy', 'login', 'edit', 'alert']
const targets: Record<ActivityEvent['type'], string[]> = {
  deploy: ['production v2.4.1', 'staging v2.4.2', 'web v3.1.0', 'api v1.7.3'],
  login: ['from Chrome / macOS', 'from Mobile / iOS', 'via SSO', 'from Edge / Win'],
  edit: ['settings.toml', 'feature flags', 'role: editor', 'pricing page'],
  alert: ['p99 latency spike', 'disk usage 87%', 'error rate +3%', 'queue backlog'],
}

export const recentActivity: ActivityEvent[] = Array.from({ length: 12 }, (_, i) => {
  const u = pick(users)
  const t = pick(actions)
  return {
    id: `a${i + 1}`,
    user: u,
    avatar: u
      .split(' ')
      .map((s) => s[0])
      .join(''),
    action: t,
    target: pick(targets[t]),
    ago: `${i + 1}m ago`,
    type: t,
  }
})

export const trafficByCountry = [
  { country: 'United States', visitors: 14820 },
  { country: 'Germany', visitors: 6340 },
  { country: 'United Kingdom', visitors: 5100 },
  { country: 'Japan', visitors: 4720 },
  { country: 'France', visitors: 3210 },
  { country: 'Canada', visitors: 2980 },
  { country: 'Australia', visitors: 2340 },
  { country: 'Brazil', visitors: 1820 },
]

// ─── Analytics drill-down dataset (absorbed from analytics showcase) ────────

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
    const orders = Math.floor((visitors * conversion) / 100)
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
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    unitsSold: 1243,
    revenue: 49720,
    rating: 4.7,
    returnRate: 2.1,
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    unitsSold: 876,
    revenue: 131400,
    rating: 4.5,
    returnRate: 3.4,
  },
  {
    id: 3,
    name: 'USB-C Hub 7-in-1',
    unitsSold: 2134,
    revenue: 42680,
    rating: 4.3,
    returnRate: 1.8,
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    unitsSold: 654,
    revenue: 52320,
    rating: 4.8,
    returnRate: 0.9,
  },
  {
    id: 5,
    name: 'Noise-Cancelling Headphones',
    unitsSold: 543,
    revenue: 97740,
    rating: 4.6,
    returnRate: 2.5,
  },
  {
    id: 6,
    name: 'Portable SSD 1TB',
    unitsSold: 1876,
    revenue: 131320,
    rating: 4.4,
    returnRate: 1.2,
  },
  { id: 7, name: '4K Webcam', unitsSold: 987, revenue: 59220, rating: 4.2, returnRate: 3.1 },
  { id: 8, name: 'LED Desk Lamp', unitsSold: 1567, revenue: 47010, rating: 4.1, returnRate: 2.0 },
]

export function getSummary(metrics: MetricRow[]) {
  const totalRevenue = metrics.reduce((s, m) => s + m.revenue, 0)
  const totalOrders = metrics.reduce((s, m) => s + m.orders, 0)
  const totalVisitors = metrics.reduce((s, m) => s + m.visitors, 0)
  const avgConversion = metrics.length
    ? metrics.reduce((s, m) => s + m.conversion, 0) / metrics.length
    : 0
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0
  const totalNewCustomers = metrics.reduce((s, m) => s + m.newCustomers, 0)
  const half = Math.floor(metrics.length / 2)
  const prevRevenue = metrics.slice(0, half).reduce((s, m) => s + m.revenue, 0)
  const currRevenue = metrics.slice(half).reduce((s, m) => s + m.revenue, 0)
  const revenueTrend = prevRevenue ? ((currRevenue - prevRevenue) / prevRevenue) * 100 : 0
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
