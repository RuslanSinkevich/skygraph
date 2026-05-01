import { useState, useMemo } from 'react'
import {
  Table, Tag, Button, Modal, Dropdown, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { tasks as initialTasks, taskToRow } from './data'
import type { Task, Priority, TaskStatus } from './data'
import { Toolbar, useFilteredList, statusColor, percent } from '../_shared'
import { priorityColors, statusColors, statusLabels } from './common'
import { TaskForm } from './TaskForm'

export function TasksTab() {
  const [search, setSearch] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const [createOpen, setCreateOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useFilteredList(tasks, search, ['title', 'project', 'assignee'])
  const tableData = useMemo(() => filtered.map(taskToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'title', title: 'Task', width: 280, sortable: true,
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{String(val)}</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            {String(row.tagsStr || '').split(', ').filter(Boolean).map(t =>
              <Tag key={t} color="default" style={{ fontSize: 11 }}>{t}</Tag>
            )}
          </div>
        </div>
      ),
    },
    { key: 'project', title: 'Project', width: 120, sortable: true },
    { key: 'assignee', title: 'Assignee', width: 100, sortable: true },
    {
      key: 'priority', title: 'Priority', width: 100, sortable: true,
      filters: ['critical', 'high', 'medium', 'low'].map(v => ({ text: v, value: v })),
      onFilter: (value, row) => row.priority === value,
      render: (val) => <Tag color={priorityColors[val as Priority]}>{String(val)}</Tag>,
    },
    {
      key: 'status', title: 'Status', width: 110,
      filters: (Object.keys(statusLabels) as TaskStatus[]).map(v => ({ text: statusLabels[v], value: v })),
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[val as TaskStatus]}>{statusLabels[val as TaskStatus]}</Tag>,
    },
    {
      key: 'dueDate', title: 'Due', width: 110, sortable: true,
      render: (val, row) => {
        const overdue = new Date(String(val)) < new Date() && row.status !== 'done'
        return (
          <span style={{ color: overdue ? 'var(--sg-color-error)' : undefined }}>
            {String(val)}{overdue ? ' ⚠️' : ''}
          </span>
        )
      },
    },
    { key: 'estimate', title: 'Est.', width: 60, sortable: true, align: 'center', render: (val) => `${val}h` },
    {
      key: 'actions', title: '', width: 50,
      render: (_, row) => (
        <Dropdown
          items={[
            { key: 'edit', label: 'Edit' },
            { key: 'assign', label: 'Re-assign' },
            { key: 'done', label: 'Move to Done' },
            { key: 'delete', label: 'Delete', danger: true },
          ]}
          onSelect={(key) => {
            if (key === 'done') {
              setTasks(prev => prev.map(t => t.id === row.id ? { ...t, status: 'done' } : t))
              notification.success(`Marked done: ${row.title}`)
            } else if (key === 'delete') {
              setTasks(prev => prev.filter(t => t.id !== row.id))
              notification.error(`Deleted: ${row.title}`)
            } else {
              notification.info(`${key}: ${row.title}`)
            }
          }}
        >
          <Button size="small">⋯</Button>
        </Dropdown>
      ),
    },
  ]

  const handleCreate = (values: Partial<Task>) => {
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: values.title ?? 'Untitled',
      project: values.project ?? 'Frontend',
      assignee: values.assignee ?? 'Alex K.',
      priority: (values.priority as Priority) ?? 'medium',
      status: 'todo',
      dueDate: typeof values.dueDate === 'string'
        ? values.dueDate
        : new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      estimate: Number(values.estimate) || 3,
      tags: [],
    }
    setTasks(prev => [newTask, ...prev])
    notification.success(`Task "${newTask.title}" created`)
    setCreateOpen(false)
  }

  const completedPct = tasks.length
    ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)
    : 0

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search tasks…', width: 220 }}
        filters={<Tag color={statusColor('done')}>{percent(completedPct, 0)} done</Tag>}
        actions={
          <>
            {selected.length > 0 && (
              <Tag>{selected.length} selected</Tag>
            )}
            <Button type="primary" onClick={() => setCreateOpen(true)}>+ New Task</Button>
          </>
        }
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={12}
        size="small"
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
      />
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Task"
        footer={null}
        width={520}
      >
        <TaskForm onSubmit={handleCreate} onCancel={() => setCreateOpen(false)} />
      </Modal>
    </>
  )
}
