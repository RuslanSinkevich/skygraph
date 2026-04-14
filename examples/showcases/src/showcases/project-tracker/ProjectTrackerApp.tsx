import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Button, Input, Select, Tree, Calendar,
  Form, Field, DatePicker, Progress, Breadcrumb, Dropdown,
  Badge, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { tasks, projectTree, sprintProgress, calendarEvents } from './data'
import type { Task, Priority, TaskStatus } from './data'

const priorityColors: Record<Priority, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'blue',
  low: 'gray',
}

const statusColors: Record<TaskStatus, string> = {
  todo: 'default',
  'in-progress': 'blue',
  review: 'orange',
  done: 'green',
}

function StatsRow() {
  const pct = Math.round((sprintProgress.done / sprintProgress.total) * 100)
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Sprint Progress</div>
        <Progress percent={pct} size="small" />
        <div className="stat-card-sub">{sprintProgress.done} of {sprintProgress.total} done</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">In Progress</div>
        <div className="stat-card-value">{sprintProgress.inProgress}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">In Review</div>
        <div className="stat-card-value">{sprintProgress.review}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">To Do</div>
        <div className="stat-card-value">{sprintProgress.todo}</div>
      </div>
    </div>
  )
}

function TasksTab() {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  const filtered = useMemo(() => {
    let list = tasks
    if (search) list = list.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    if (priorityFilter) list = list.filter(t => t.priority === priorityFilter)
    if (statusFilter) list = list.filter(t => t.status === statusFilter)
    return list
  }, [search, priorityFilter, statusFilter])

  const columns: TableColumn<Task>[] = [
    {
      key: 'title',
      title: 'Task',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.title}</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            {r.tags.map(t => <Tag key={t} color="default" style={{ fontSize: 11 }}>{t}</Tag>)}
          </div>
        </div>
      ),
    },
    { key: 'project', title: 'Project', sorter: (a, b) => a.project.localeCompare(b.project) },
    { key: 'assignee', title: 'Assignee', sorter: (a, b) => a.assignee.localeCompare(b.assignee) },
    {
      key: 'priority',
      title: 'Priority',
      sorter: (a, b) => { const o = { critical: 0, high: 1, medium: 2, low: 3 }; return o[a.priority] - o[b.priority] },
      render: (_, r) => <Tag color={priorityColors[r.priority]}>{r.priority}</Tag>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, r) => <Tag color={statusColors[r.status]}>{r.status}</Tag>,
    },
    {
      key: 'dueDate',
      title: 'Due',
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
      render: (_, r) => {
        const overdue = new Date(r.dueDate) < new Date() && r.status !== 'done'
        return <span style={{ color: overdue ? 'var(--sg-color-error)' : undefined }}>{r.dueDate}{overdue && ' ⚠️'}</span>
      },
    },
    {
      key: 'estimate',
      title: 'Est.',
      sorter: (a, b) => a.estimate - b.estimate,
      render: (_, r) => `${r.estimate}h`,
    },
    {
      key: 'actions',
      title: '',
      render: (_, r) => (
        <Dropdown
          items={[
            { key: 'edit', label: 'Edit' },
            { key: 'assign', label: 'Re-assign' },
            { key: 'move', label: 'Move to Done' },
            { key: 'delete', label: 'Delete', danger: true },
          ]}
          onSelect={(key) => notification.info({ message: `${key} task: ${r.title}` })}
        >
          <Button size="small">⋯</Button>
        </Dropdown>
      ),
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 220 }} />
        <Select
          placeholder="Priority"
          value={priorityFilter || undefined}
          onChange={v => setPriorityFilter(v ?? '')}
          options={[
            { label: 'All priorities', value: '' },
            { label: 'Critical', value: 'critical' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]}
          allowClear
          style={{ width: 140 }}
        />
        <Select
          placeholder="Status"
          value={statusFilter || undefined}
          onChange={v => setStatusFilter(v ?? '')}
          options={[
            { label: 'All statuses', value: '' },
            { label: 'To Do', value: 'todo' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Review', value: 'review' },
            { label: 'Done', value: 'done' },
          ]}
          allowClear
          style={{ width: 140 }}
        />
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.info({ message: 'New task dialog (mock)' })}>
          + New Task
        </Button>
      </div>
      <Table<Task>
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 10 }}
        rowSelection={{ type: 'checkbox' }}
      />
    </>
  )
}

function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const projectTasks = selectedProject === 'all'
    ? tasks
    : tasks.filter(t => t.project.toLowerCase().replace(/\s/g, '-') === selectedProject
      || selectedProject.startsWith(t.project.toLowerCase().replace(/\s/g, '-')))

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ width: 240, flexShrink: 0 }}>
        <Tree
          treeData={projectTree}
          defaultExpandAll
          selectedKeys={[selectedProject]}
          onSelect={(keys) => { if (keys.length) setSelectedProject(keys[0] as string) }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Breadcrumb
          items={[
            { title: 'Projects' },
            { title: selectedProject === 'all' ? 'All' : selectedProject },
          ]}
        />
        <div style={{ marginTop: 12, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
          {projectTasks.length} tasks in this scope
        </div>
        <div style={{ marginTop: 12 }}>
          {projectTasks.slice(0, 10).map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--sg-color-border-secondary)' }}>
              <Tag color={priorityColors[t.priority]} style={{ fontSize: 11 }}>{t.priority}</Tag>
              <span style={{ flex: 1, fontSize: 13 }}>{t.title}</span>
              <Tag color={statusColors[t.status]}>{t.status}</Tag>
              <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{t.assignee}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CalendarTab() {
  return (
    <Calendar
      fullscreen={false}
      cellRender={(date) => {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        const evts = calendarEvents.filter(e => e.date === dateStr)
        if (!evts.length) return null
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {evts.slice(0, 2).map((e, i) => (
              <div key={i} style={{ fontSize: 10, background: `var(--sg-color-${priorityColors[e.priority] === 'gray' ? 'default' : priorityColors[e.priority]}-bg, var(--sg-color-bg-secondary))`, padding: '0 4px', borderRadius: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {e.title}
              </div>
            ))}
            {evts.length > 2 && <div style={{ fontSize: 10, color: 'var(--sg-color-text-secondary)' }}>+{evts.length - 2} more</div>}
          </div>
        )
      }}
    />
  )
}

function NewTaskTab() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Form onFinish={(values) => notification.success({ message: 'Task created (mock)', description: JSON.stringify(values) })}>
        <Field name="title" label="Task Title" rules={[{ required: true }]}>
          <Input placeholder="Implement feature X" />
        </Field>
        <Field name="project" label="Project" rules={[{ required: true }]}>
          <Select
            options={['Frontend', 'Backend', 'Infrastructure', 'Design System', 'Mobile App'].map(p => ({ label: p, value: p }))}
            placeholder="Select project"
          />
        </Field>
        <Field name="assignee" label="Assignee" rules={[{ required: true }]}>
          <Select
            options={['Alex K.', 'Maria S.', 'James L.', 'Sophie W.'].map(a => ({ label: a, value: a }))}
            placeholder="Assign to"
          />
        </Field>
        <Field name="priority" label="Priority" rules={[{ required: true }]}>
          <Select
            options={[
              { label: 'Critical', value: 'critical' },
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ]}
            placeholder="Priority"
          />
        </Field>
        <Field name="dueDate" label="Due Date">
          <DatePicker placeholder="Select date" />
        </Field>
        <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>Create Task</Button>
      </Form>
    </div>
  )
}

export function ProjectTrackerApp() {
  const tabs: TabItem[] = [
    { key: 'tasks', label: 'Tasks' },
    { key: 'projects', label: 'Projects' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'new', label: '+ New Task' },
  ]
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
      <div style={{ marginTop: 16 }}>
        {activeTab === 'tasks' && <TasksTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'calendar' && <CalendarTab />}
        {activeTab === 'new' && <NewTaskTab />}
      </div>
    </div>
  )
}
