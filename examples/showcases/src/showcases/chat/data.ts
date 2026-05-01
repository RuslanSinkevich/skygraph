export interface ChatUser {
  id: string
  name: string
  online: boolean
  role?: string
}

export interface Conversation {
  id: string
  type: 'dm' | 'channel'
  name: string
  lastMessage: string
  lastAt: string
  unread: number
  members: string[]
}

export interface Message {
  id: string
  conversationId: string
  authorId: string
  text: string
  at: string
  reactions?: { emoji: string; count: number }[]
  pinned?: boolean
  attachments?: Array<{ name: string; size: string; type: 'image' | 'doc' }>
}

export const me: ChatUser = { id: 'me', name: 'You', online: true, role: 'Engineer' }

export const users: ChatUser[] = [
  { id: 'u1', name: 'Alex Kim',     online: true,  role: 'Designer' },
  { id: 'u2', name: 'Maria Sanchez',online: true,  role: 'PM' },
  { id: 'u3', name: 'James Lee',    online: false, role: 'Engineer' },
  { id: 'u4', name: 'Sophie Wu',    online: true,  role: 'Engineer' },
  { id: 'u5', name: 'Liam Novak',   online: false, role: 'QA' },
  { id: 'u6', name: 'Emma Tang',    online: true,  role: 'CTO' },
  me,
]

export const conversations: Conversation[] = [
  {
    id: 'c1', type: 'channel', name: '#design-system',
    lastMessage: 'Pushed v2.4 release notes',
    lastAt: '10:42', unread: 3,
    members: ['u1', 'u2', 'u3', 'u4', 'me'],
  },
  {
    id: 'c2', type: 'channel', name: '#release-2-5',
    lastMessage: 'CI passed on staging',
    lastAt: '10:31', unread: 0,
    members: ['u3', 'u4', 'u5', 'me'],
  },
  {
    id: 'c3', type: 'dm', name: 'Alex Kim',
    lastMessage: 'Can you review the modal spec?',
    lastAt: '09:55', unread: 1,
    members: ['u1', 'me'],
  },
  {
    id: 'c4', type: 'dm', name: 'Maria Sanchez',
    lastMessage: 'Standup pushed to 11:00',
    lastAt: 'Yesterday', unread: 0,
    members: ['u2', 'me'],
  },
  {
    id: 'c5', type: 'channel', name: '#general',
    lastMessage: 'Welcome Liam! 🎉',
    lastAt: 'Mon', unread: 0,
    members: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'me'],
  },
  {
    id: 'c6', type: 'dm', name: 'Emma Tang',
    lastMessage: 'Q3 plan attached',
    lastAt: 'Mon', unread: 0,
    members: ['u6', 'me'],
  },
]

export const messages: Message[] = [
  {
    id: 'm1', conversationId: 'c1', authorId: 'u1', at: '10:18',
    text: 'Hey team — I pushed the @release-2-5 notes. Could you all review the new tokens?',
    reactions: [{ emoji: '👀', count: 2 }],
  },
  {
    id: 'm2', conversationId: 'c1', authorId: 'u2', at: '10:24',
    text: 'Looks great. One nit: spacing on the buttons feels a bit tight on mobile.',
  },
  {
    id: 'm3', conversationId: 'c1', authorId: 'u4', at: '10:29',
    text: 'I added a fix in #release-2-5 — re-running the visual regression now.',
    pinned: true,
  },
  {
    id: 'm4', conversationId: 'c1', authorId: 'me', at: '10:32',
    text: 'Thanks @Sophie Wu — let me know once VR is green.',
  },
  {
    id: 'm5', conversationId: 'c1', authorId: 'u4', at: '10:38',
    text: 'All green ✅',
    reactions: [{ emoji: '🎉', count: 4 }, { emoji: '🚀', count: 2 }],
    attachments: [{ name: 'vr-report.pdf', size: '420 KB', type: 'doc' }],
  },
  {
    id: 'm6', conversationId: 'c1', authorId: 'u1', at: '10:42',
    text: 'Pushed v2.4 release notes. Going to start on the v2.5 spec now.',
  },

  {
    id: 'm7', conversationId: 'c3', authorId: 'u1', at: '09:50',
    text: 'Can you review the modal spec when you have a sec?',
  },
  {
    id: 'm8', conversationId: 'c3', authorId: 'me', at: '09:52',
    text: 'Yep, pulling it up now.',
  },
  {
    id: 'm9', conversationId: 'c3', authorId: 'u1', at: '09:55',
    text: 'Thanks 🙏',
  },

  {
    id: 'm10', conversationId: 'c2', authorId: 'u3', at: '10:30',
    text: 'CI is green on staging. Promoting in 30m unless someone objects.',
  },
  {
    id: 'm11', conversationId: 'c2', authorId: 'me', at: '10:31',
    text: 'No objections from my side.',
  },
]

export const timeline = [
  { id: 't1', at: '10:42', label: 'Alex Kim updated #design-system release notes' },
  { id: 't2', at: '10:38', label: 'Sophie Wu attached vr-report.pdf' },
  { id: 't3', at: '10:30', label: 'James Lee promoted v2.5 to staging' },
  { id: 't4', at: '09:55', label: 'Alex Kim mentioned you in DM' },
  { id: 't5', at: '09:30', label: 'Standup notes pinned in #general' },
]
