import type { Priority, TaskStatus } from './data'

export const priorityColors: Record<Priority, string> = {
  critical: 'error', high: 'warning', medium: 'processing', low: 'default',
}

export const statusColors: Record<TaskStatus, string> = {
  todo: 'default', 'in-progress': 'processing', review: 'warning', done: 'success',
}

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do', 'in-progress': 'In Progress', review: 'Review', done: 'Done',
}

export const taskStatuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done']

export const projects = ['Frontend', 'Backend', 'Infrastructure', 'Design System', 'Mobile App']

export const assignees = ['Alex K.', 'Maria S.', 'James L.', 'Sophie W.', 'Liam N.', 'Emma T.', 'Noah D.', 'Olivia M.']
