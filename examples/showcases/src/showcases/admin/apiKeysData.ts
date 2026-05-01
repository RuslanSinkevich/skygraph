import { systemUsers } from './data'

export interface ApiKey {
  id: string
  name: string
  prefix: string
  scopes: string[]
  ownerId: string
  ownerName: string
  createdAt: string
  lastUsed: string | null
  expiresAt: string | null
  rateLimit: number
  status: 'active' | 'revoked' | 'expired'
}

export interface ActiveSession {
  id: string
  userId: string
  userName: string
  device: string
  browser: string
  ip: string
  location: string
  createdAt: string
  lastActive: string
  current: boolean
}

const keyNames = [
  'Production API', 'Mobile App Backend', 'Internal Webhook', 'CI/CD Pipeline',
  'Analytics Pipeline', 'Customer Portal', 'Marketing Automation', 'Slack Integration',
  'Stripe Webhook', 'Backup Service', 'Monitoring Probe', 'Public Read API',
]

const allScopes = [
  'read:users', 'write:users', 'read:orders', 'write:orders',
  'read:analytics', 'admin:settings', 'webhooks:write', 'billing:read',
] as const

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function randomScopes(): string[] {
  const n = 1 + Math.floor(Math.random() * 4)
  const out = new Set<string>()
  while (out.size < n) out.add(pick(allScopes))
  return [...out]
}

export const apiKeys: ApiKey[] = keyNames.map((name, i) => {
  const owner = pick(systemUsers)
  const status: ApiKey['status'] = i % 9 === 0 ? 'revoked' : i % 8 === 0 ? 'expired' : 'active'
  const expiresInDays = status === 'expired' ? -10 - i : 30 + i * 10
  return {
    id: `key_${i + 1}`,
    name,
    prefix: `sk_${(Math.random().toString(36).slice(2, 6)).toUpperCase()}`,
    scopes: randomScopes(),
    ownerId: owner.id,
    ownerName: owner.name,
    createdAt: new Date(Date.now() - (30 + i * 7) * 86400000).toISOString().slice(0, 10),
    lastUsed: status === 'revoked' ? null
      : new Date(Date.now() - Math.random() * 5 * 86400000).toISOString().slice(0, 16).replace('T', ' '),
    expiresAt: status === 'expired'
      ? new Date(Date.now() + expiresInDays * 86400000).toISOString().slice(0, 10)
      : new Date(Date.now() + expiresInDays * 86400000).toISOString().slice(0, 10),
    rateLimit: pick([60, 100, 500, 1000]),
    status,
  }
})

const browsers = ['Chrome 120', 'Firefox 121', 'Safari 17', 'Edge 120', 'Opera 105']
const devices = ['MacBook Pro', 'Windows 11 Desktop', 'iPad Pro', 'iPhone 15', 'Android Pixel', 'Linux Workstation']
const cities = ['New York, US', 'London, UK', 'Berlin, DE', 'Tokyo, JP', 'Sydney, AU', 'San Francisco, US', 'Singapore', 'Toronto, CA']

export const activeSessions: ActiveSession[] = systemUsers
  .slice(0, 18)
  .map((u, i) => {
    const created = Date.now() - (i * 4 + Math.random() * 24) * 3600 * 1000
    const last = created + Math.random() * (Date.now() - created)
    return {
      id: `s_${i + 1}`,
      userId: u.id,
      userName: u.name,
      device: pick(devices),
      browser: pick(browsers),
      ip: `${10 + (i % 250)}.${(i * 17) % 250}.${(i * 43) % 250}.${(i * 7) % 250}`,
      location: pick(cities),
      createdAt: new Date(created).toISOString().slice(0, 16).replace('T', ' '),
      lastActive: new Date(last).toISOString().slice(0, 16).replace('T', ' '),
      current: i === 0,
    }
  })
