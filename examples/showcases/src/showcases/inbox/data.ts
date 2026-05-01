export type InboxFolder = 'inbox' | 'sent' | 'drafts' | 'starred' | 'archive' | 'spam' | 'trash'

export interface EmailParticipant {
  name: string
  email: string
}

export interface EmailMessage {
  id: string
  threadId: string
  from: EmailParticipant
  to: EmailParticipant[]
  cc?: EmailParticipant[]
  body: string
  at: string
  attachments?: Array<{ name: string; size: string }>
}

export interface EmailThread {
  id: string
  subject: string
  participants: EmailParticipant[]
  preview: string
  receivedAt: string
  read: boolean
  starred: boolean
  important: boolean
  folder: InboxFolder
  labels: string[]
  messageIds: string[]
}

const senders: EmailParticipant[] = [
  { name: 'Stripe',         email: 'noreply@stripe.com' },
  { name: 'GitHub',         email: 'noreply@github.com' },
  { name: 'Linear',         email: 'updates@linear.app' },
  { name: 'Vercel',         email: 'team@vercel.com' },
  { name: 'Alex Kim',       email: 'alex@studio.dev' },
  { name: 'Maria Sanchez',  email: 'maria@studio.dev' },
  { name: 'James Lee',      email: 'james@studio.dev' },
  { name: 'Customer Support', email: 'support@notion.so' },
  { name: 'Hooli HR',       email: 'people@hooli.app' },
  { name: 'AWS Billing',    email: 'aws-billing@amazon.com' },
]

const me: EmailParticipant = { name: 'You', email: 'you@studio.dev' }

const subjects = [
  'Your weekly summary is ready',
  'Pull request #2491 needs your review',
  'Q3 OKR draft for review',
  'Deployment finished — preview available',
  'Re: design review notes',
  'Standup notes — Tuesday',
  'Action required: invoice attached',
  '🎉 Welcome aboard',
  'Salary review schedule',
  'Your AWS invoice for April',
]

const previews = [
  'Here is what happened in your account this week — totals, top movers and alerts.',
  'Sophie left 3 comments on your branch. Tests are green.',
  'I drafted an update for our quarterly objectives — would love your input by Friday.',
  'A new preview deployment is available at preview-2491.studio.dev.',
  'Quick follow-up on the modal spec — see inline notes.',
  'Standup notes attached. Action items are highlighted in yellow.',
  'Please review attached invoice and confirm payment by EOM.',
  'Welcome to the team! Here is your onboarding checklist.',
  'Your performance review is scheduled for next Wednesday at 14:00.',
  'Your monthly invoice has been generated. Total: $1,284.20.',
]

const labels = ['work', 'finance', 'personal', 'updates', 'urgent', 'newsletters']

function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]!
}

function timeAgo(daysAgo: number, hourOffset = 0): string {
  return new Date(Date.now() - daysAgo * 86400000 - hourOffset * 3600000).toISOString()
}

export const threads: EmailThread[] = subjects.map((subject, i) => {
  const sender = pick(senders, i + 2)
  return {
    id: `t${i + 1}`,
    subject,
    participants: [sender, me],
    preview: pick(previews, i),
    receivedAt: timeAgo(Math.floor(i / 3), i),
    read: i % 4 === 0,
    starred: i % 5 === 0,
    important: i === 1 || i === 6 || i === 9,
    folder: i === 7 ? 'starred' : 'inbox',
    labels: [pick(labels, i), pick(labels, i + 2)],
    messageIds: [`m${i + 1}-1`, ...(i % 3 === 0 ? [`m${i + 1}-2`] : []), ...(i % 4 === 0 ? [`m${i + 1}-3`] : [])],
  }
})

export const messagesById: Record<string, EmailMessage> = {}

threads.forEach((thread, i) => {
  thread.messageIds.forEach((mid, idx) => {
    const isFromMe = idx % 2 === 1
    messagesById[mid] = {
      id: mid,
      threadId: thread.id,
      from: isFromMe ? me : thread.participants[0]!,
      to: isFromMe ? [thread.participants[0]!] : [me],
      body: idx === 0
        ? `${thread.preview}\n\nThanks,\n${thread.participants[0]!.name}`
        : isFromMe
          ? `Thanks for the heads up — looking into it now.\n\nBest,\nYou`
          : `Following up on the previous thread. Could you confirm by EOD?\n\n${thread.participants[0]!.name}`,
      at: timeAgo(Math.floor(i / 3), thread.messageIds.length - idx),
      attachments: idx === 0 && i % 3 === 0
        ? [{ name: `${subjects[i]!.slice(0, 12).replace(/\s/g, '_')}.pdf`, size: '184 KB' }]
        : undefined,
    }
  })
})

export const folderCounts = (list: EmailThread[]): Record<InboxFolder, number> => ({
  inbox:   list.filter(t => t.folder === 'inbox' && !t.read).length,
  starred: list.filter(t => t.starred).length,
  sent:    0,
  drafts:  2,
  archive: 0,
  spam:    1,
  trash:   0,
})
