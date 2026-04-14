export type ContactStatus = 'lead' | 'customer' | 'churned' | 'prospect'

export interface Contact {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: ContactStatus
  revenue: number
  lastContact: string
  avatar: string
}

export interface Deal {
  id: string
  title: string
  contactId: string
  value: number
  stage: 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  probability: number
  createdAt: string
}

export interface Activity {
  id: string
  contactId: string
  type: 'call' | 'email' | 'meeting' | 'note'
  description: string
  date: string
}

const firstNames = ['Alex', 'Maria', 'James', 'Sophie', 'Liam', 'Emma', 'Noah', 'Olivia', 'Ivan', 'Anna', 'Daniel', 'Lisa', 'Tom', 'Kate', 'Ben', 'Sarah', 'Max', 'Julia', 'Chris', 'Elena', 'Raj', 'Priya', 'Yuki', 'Carlos', 'Lin', 'Omar']
const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Clark', 'Lewis']
const companies = ['TechCorp', 'DataFlow Inc', 'CloudNine', 'Nexus Labs', 'Pixel Studio', 'ByteForge', 'Quantum AI', 'GreenTech', 'SkyNet Ltd', 'CoreStack', 'Acme Corp', 'Nova Systems', 'ZenWorks', 'BluePeak']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function genContacts(count: number): Contact[] {
  const statuses: ContactStatus[] = ['lead', 'customer', 'churned', 'prospect']
  return Array.from({ length: count }, (_, i) => {
    const first = pick(firstNames)
    const last = pick(lastNames)
    return {
      id: `c${i + 1}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${pick(companies).toLowerCase().replace(/\s/g, '')}.com`,
      company: pick(companies),
      phone: `+1 (${300 + i}) 555-${String(1000 + i).slice(1)}`,
      status: pick(statuses),
      revenue: Math.floor(Math.random() * 500000),
      lastContact: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString().slice(0, 10),
      avatar: first[0] + last[0],
    }
  })
}

function genDeals(contacts: Contact[]): Deal[] {
  const stages: Deal['stage'][] = ['qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost']
  return contacts.slice(0, 30).map((c, i) => ({
    id: `d${i + 1}`,
    title: `${c.company} — ${pick(['Enterprise License', 'Annual Plan', 'Custom Integration', 'Support Package', 'Consulting', 'Premium Tier', 'Training'])}`,
    contactId: c.id,
    value: Math.floor(Math.random() * 200000) + 5000,
    stage: pick(stages),
    probability: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.random() * 180 * 86400000).toISOString().slice(0, 10),
  }))
}

function genActivities(contacts: Contact[]): Activity[] {
  const types: Activity['type'][] = ['call', 'email', 'meeting', 'note']
  const descs: Record<Activity['type'], string[]> = {
    call: ['Discussed pricing options', 'Follow-up on proposal', 'Cold call — interested', 'Quarterly check-in', 'Demo scheduled', 'Budget discussion'],
    email: ['Sent proposal PDF', 'Shared case study', 'Renewal reminder', 'Welcome onboarding email', 'Follow-up after demo', 'Invoice sent'],
    meeting: ['Demo presentation', 'Contract review', 'Kickoff meeting', 'Quarterly business review', 'Product roadmap sync', 'Executive alignment'],
    note: ['Decision maker identified', 'Budget approved Q3', 'Competitor evaluation in progress', 'Needs custom API integration', 'Expanding to new team', 'Upsell opportunity'],
  }
  return Array.from({ length: 60 }, (_, i) => {
    const type = pick(types)
    return {
      id: `a${i + 1}`,
      contactId: pick(contacts).id,
      type,
      description: pick(descs[type]),
      date: new Date(Date.now() - Math.random() * 60 * 86400000).toISOString().slice(0, 10),
    }
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export const contacts = genContacts(50)
export const deals = genDeals(contacts)
export const activities = genActivities(contacts)

export const pipelineStats = {
  qualification: deals.filter(d => d.stage === 'qualification'),
  proposal: deals.filter(d => d.stage === 'proposal'),
  negotiation: deals.filter(d => d.stage === 'negotiation'),
  'closed-won': deals.filter(d => d.stage === 'closed-won'),
  'closed-lost': deals.filter(d => d.stage === 'closed-lost'),
}

export function toTableRow(c: Contact) {
  return { id: c.id, data: { ...c } as Record<string, unknown> }
}
