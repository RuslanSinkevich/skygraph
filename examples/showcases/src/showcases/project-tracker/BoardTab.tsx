import { useState } from 'react'
import { Tag, notification } from '@skygraph/react'
import { tasks as initialTasks } from './data'
import type { Task, TaskStatus } from './data'
import { Kanban } from '../_shared'
import { priorityColors, statusLabels, taskStatuses } from './common'

const COLUMN_TONE: Record<TaskStatus, string> = {
  todo: '#bfbfbf',
  'in-progress': '#1677ff',
  review: '#faad14',
  done: '#52c41a',
}

/** NEW: Kanban board for tasks. Drag cards between columns to update status. */
export function BoardTab() {
  const [tasks, setTasks] = useState(initialTasks)

  const columns = taskStatuses.map(status => {
    const items = tasks.filter(t => t.status === status)
    const totalEst = items.reduce((s, t) => s + t.estimate, 0)
    return {
      key: status,
      title: statusLabels[status],
      color: COLUMN_TONE[status],
      items,
      meta: <span>{items.length} · {totalEst}h</span>,
    }
  })

  const handleDrop = (id: string | number, _from: string, to: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: to as TaskStatus } : t))
    notification.success(`Moved to ${statusLabels[to as TaskStatus]}`)
  }

  return (
    <>
      <p style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13, marginBottom: 12 }}>
        Drag task cards between columns to change status. WIP limits and assignment shown on each card.
      </p>
      <Kanban<Task>
        columns={columns}
        onDrop={handleDrop}
        renderCard={(t) => (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Tag color={priorityColors[t.priority]} style={{ fontSize: 10 }}>{t.priority}</Tag>
              <span style={{ fontSize: 11, color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))' }}>
                {t.estimate}h
              </span>
            </div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{t.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
              <span>{t.assignee}</span>
              <span>{t.dueDate}</span>
            </div>
            {t.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 6 }}>
                {t.tags.map(tag => <Tag key={tag} style={{ fontSize: 10 }}>{tag}</Tag>)}
              </div>
            )}
          </>
        )}
      />
    </>
  )
}
