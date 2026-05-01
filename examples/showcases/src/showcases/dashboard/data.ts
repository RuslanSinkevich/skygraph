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
  { name: 'Web App',       status: 'healthy',  latencyMs: 84,  uptime: 99.98, region: 'us-east-1' },
  { name: 'API Gateway',   status: 'healthy',  latencyMs: 132, uptime: 99.95, region: 'us-east-1' },
  { name: 'Postgres',      status: 'degraded', latencyMs: 412, uptime: 99.81, region: 'us-east-1' },
  { name: 'Redis Cache',   status: 'healthy',  latencyMs: 12,  uptime: 99.99, region: 'us-east-1' },
  { name: 'Worker Queue',  status: 'healthy',  latencyMs: 67,  uptime: 99.90, region: 'us-west-2' },
  { name: 'CDN',           status: 'healthy',  latencyMs: 22,  uptime: 99.99, region: 'global' },
  { name: 'Email Service', status: 'down',     latencyMs: 0,   uptime: 95.20, region: 'eu-west-1' },
  { name: 'Storage',       status: 'healthy',  latencyMs: 198, uptime: 99.92, region: 'multi' },
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
    avatar: u.split(' ').map(s => s[0]).join(''),
    action: t,
    target: pick(targets[t]),
    ago: `${i + 1}m ago`,
    type: t,
  }
})

export const trafficByCountry = [
  { country: 'United States', visitors: 14820 },
  { country: 'Germany',       visitors: 6340 },
  { country: 'United Kingdom',visitors: 5100 },
  { country: 'Japan',         visitors: 4720 },
  { country: 'France',        visitors: 3210 },
  { country: 'Canada',        visitors: 2980 },
  { country: 'Australia',     visitors: 2340 },
  { country: 'Brazil',        visitors: 1820 },
]
