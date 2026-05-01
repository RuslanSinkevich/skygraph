export type Priority = 'critical' | 'high' | 'medium' | 'low'
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

export interface Task {
  id: string
  title: string
  project: string
  assignee: string
  priority: Priority
  status: TaskStatus
  dueDate: string
  estimate: number
  tags: string[]
}

export interface ProjectNode {
  key: string
  title: string
  children?: ProjectNode[]
  [field: string]: unknown
}

const taskTitles = [
  'Set up CI/CD pipeline', 'Design landing page', 'Implement auth flow', 'Write unit tests',
  'Fix memory leak', 'Add dark mode', 'Optimize bundle size', 'Create API docs',
  'Database migration v2', 'Add error tracking', 'Build notification system', 'Refactor state management',
  'Mobile responsive layout', 'Add i18n support', 'Performance audit', 'Setup monitoring',
  'Code review automation', 'Add search feature', 'Implement caching layer', 'SSL certificate renewal',
  'User onboarding flow', 'Add export to PDF', 'Fix timezone bugs', 'Upgrade dependencies',
  'Add rate limiting', 'Write E2E tests', 'Design system tokens', 'Build admin panel',
  'API versioning', 'Add webhooks support', 'OAuth2 integration', 'GraphQL migration',
  'Docker containerization', 'Load testing setup', 'CDN configuration', 'Backup strategy',
  'Multi-tenant support', 'Role-based access control', 'Audit logging', 'Data encryption',
  'API gateway setup', 'Service mesh config', 'Blue-green deployment', 'Feature flags system',
  'Analytics dashboard', 'Customer feedback widget', 'Payment integration', 'Email template builder',
  'Chat system MVP', 'Video call integration',
]

const assignees = ['Alex K.', 'Maria S.', 'James L.', 'Sophie W.', 'Liam N.', 'Emma T.', 'Noah D.', 'Olivia M.']
const projects = ['Frontend', 'Backend', 'Infrastructure', 'Design System', 'Mobile App']
const tagOptions = ['bug', 'feature', 'refactor', 'docs', 'security', 'performance', 'ux', 'tech-debt']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const tasks: Task[] = taskTitles.map((title, i) => ({
  id: `t${i + 1}`,
  title,
  project: pick(projects),
  assignee: pick(assignees),
  priority: pick(['critical', 'high', 'medium', 'medium', 'low'] as Priority[]),
  status: pick(['todo', 'todo', 'in-progress', 'in-progress', 'review', 'done', 'done'] as TaskStatus[]),
  dueDate: new Date(Date.now() + (Math.random() * 60 - 15) * 86400000).toISOString().slice(0, 10),
  estimate: pick([1, 2, 3, 5, 8, 13]),
  tags: Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => pick(tagOptions)).filter((v, i, a) => a.indexOf(v) === i),
}))

export const projectTree: ProjectNode[] = [
  {
    key: 'all',
    title: 'All Projects',
    children: projects.map(p => ({
      key: p.toLowerCase().replace(/\s/g, '-'),
      title: p,
      children: [
        { key: `${p.toLowerCase().replace(/\s/g, '-')}-sprint-1`, title: 'Sprint 1' },
        { key: `${p.toLowerCase().replace(/\s/g, '-')}-sprint-2`, title: 'Sprint 2' },
        { key: `${p.toLowerCase().replace(/\s/g, '-')}-backlog`, title: 'Backlog' },
      ],
    })),
  },
]

export const calendarEvents = tasks
  .filter(t => t.status !== 'done')
  .map(t => ({ date: t.dueDate, title: t.title, priority: t.priority }))

export const sprintProgress = {
  total: tasks.length,
  done: tasks.filter(t => t.status === 'done').length,
  inProgress: tasks.filter(t => t.status === 'in-progress').length,
  review: tasks.filter(t => t.status === 'review').length,
  todo: tasks.filter(t => t.status === 'todo').length,
}

export function taskToRow(t: Task) {
  return { id: t.id, data: { ...t, tagsStr: t.tags.join(', ') } as Record<string, unknown> }
}
