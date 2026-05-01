export type TicketStatus = 'new' | 'open' | 'pending' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TicketComment {
  id: string
  authorName: string
  authorRole: 'customer' | 'agent' | 'system'
  body: string
  at: string
}

export interface Ticket {
  id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  customerName: string
  customerEmail: string
  assigneeName: string
  channel: 'email' | 'web' | 'chat' | 'phone'
  product: string
  tags: string[]
  createdAt: string
  updatedAt: string
  description: string
  comments: TicketComment[]
}

const subjects = [
  'Cannot log in after password reset',
  'Invoice not received for January',
  'Feature request: dark mode in mobile',
  'API rate limit reached unexpectedly',
  '2FA codes not arriving',
  'Subscription renewed twice',
  'Export to CSV is broken',
  'How do I add a teammate?',
  'Webhook signature verification fails',
  'Integration with Slack stopped working',
  'Refund requested for last invoice',
  'Account suspension — please advise',
  'Mobile app crashes on iOS 17',
  'Dashboard widget renders blank',
  'Email notifications delayed by 30+ min',
]

const customers = [
  { name: 'Acme Corp', email: 'support@acme.com' },
  { name: 'Globex',    email: 'help@globex.io' },
  { name: 'Initech',   email: 'admin@initech.dev' },
  { name: 'Hooli',     email: 'team@hooli.app' },
  { name: 'Soylent',   email: 'noc@soylent.bio' },
  { name: 'Stark Ind', email: 'ops@stark.ind' },
  { name: 'Wayne Ent', email: 'it@wayne.ent' },
  { name: 'Umbrella',  email: 'crm@umbrella.eu' },
]

const agents = ['Alex Kim', 'Maria Sanchez', 'James Lee', 'Sophie Wu', 'Liam Novak', 'Emma Tang']
const products = ['Web App', 'Mobile App', 'API', 'Billing', 'Dashboard', 'Integrations']
const channels: Ticket['channel'][] = ['email', 'web', 'chat', 'phone']
const priorities: TicketPriority[] = ['low', 'medium', 'high', 'urgent']
const statuses: TicketStatus[] = ['new', 'open', 'pending', 'resolved', 'closed']
const tagPool = ['login', 'billing', 'api', 'mobile', 'web', 'export', 'webhook', 'integration', 'urgent', 'enterprise']

function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]!
}

function timeAgo(daysAgo: number, hourOffset = 0): string {
  return new Date(Date.now() - daysAgo * 86400000 - hourOffset * 3600000).toISOString()
}

function genComments(t: Ticket): TicketComment[] {
  const out: TicketComment[] = [{
    id: `${t.id}-c0`,
    authorName: t.customerName,
    authorRole: 'customer',
    body: t.description,
    at: t.createdAt,
  }]
  const replyCount = (t.id.charCodeAt(2) % 4) + 1
  for (let i = 1; i <= replyCount; i++) {
    const isAgent = i % 2 === 1
    out.push({
      id: `${t.id}-c${i}`,
      authorName: isAgent ? t.assigneeName : t.customerName,
      authorRole: isAgent ? 'agent' : 'customer',
      body: isAgent
        ? [
            'Hi, thanks for reaching out — could you share a screenshot?',
            'I can reproduce on my side. Forwarding to engineering.',
            'Confirmed it is a known issue, fix is rolling out today.',
            'Could you try again in 5 minutes? We pushed a hotfix.',
          ][i % 4]!
        : [
            'Sure, attaching it now.',
            'Still happening, anything else I can try?',
            'Just tried — works again, thank you!',
            'Same issue is also on our staging account.',
          ][i % 4]!,
      at: timeAgo(0, replyCount - i),
    })
  }
  return out
}

export const tickets: Ticket[] = subjects.map((subject, i) => {
  const customer = pick(customers, i)
  const status = pick(statuses, i)
  const priority = pick(priorities, i + 1)
  const id = `T-${(2300 + i).toString().padStart(4, '0')}`
  const t: Ticket = {
    id,
    subject,
    status,
    priority,
    customerName: customer.name,
    customerEmail: customer.email,
    assigneeName: pick(agents, i + 2),
    channel: pick(channels, i),
    product: pick(products, i),
    tags: [pick(tagPool, i), pick(tagPool, i + 3)],
    createdAt: timeAgo((i % 5) + 1, i),
    updatedAt: timeAgo(i % 3, i + 2),
    description: `${subject} — full repro steps and environment info attached.`,
    comments: [],
  }
  t.comments = genComments(t)
  return t
})

export const STATUS_COLOR: Record<TicketStatus, string> = {
  new:      'processing',
  open:     'warning',
  pending:  'default',
  resolved: 'success',
  closed:   'default',
}

export const PRIORITY_COLOR: Record<TicketPriority, string> = {
  low:    'default',
  medium: 'processing',
  high:   'warning',
  urgent: 'error',
}
