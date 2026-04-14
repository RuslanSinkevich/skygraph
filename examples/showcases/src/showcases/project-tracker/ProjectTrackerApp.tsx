import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Button, Input, Select, Tree, Calendar,
  Form, Field, DatePicker, Progress, Breadcrumb, Dropdown,
  notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { tasks, projectTree, sprintProgress, calendarEvents, taskToRow } from './data'
import type { Priority, TaskStatus } from './data'

const priorityColors: Record<Priority, string> = {
  critical: 'error',
  high: 'warning',
  medium: 'processing',
  low: 'default',
}

const statusColors: Record<TaskStatus, string> = {
  todo: 'default',
  'in-progress': 'processing',
  review: 'warning',
  done: 'success',
}

function StatsRow() {
  const pct = Math.round((sprintProgress.done / sprintProgress.total) * 100)
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Sprint Progress</div>
        <Progress percent={pct} />
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
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    if (!search) return tasks
    const q = search.toLowerCase()
    return tasks.filter(t => t.title.toLowerCase().includes(q))
  }, [search])

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
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
      onFilter: (value, row) => row.priority === value,
      render: (val) => <Tag color={priorityColors[val as Priority]}>{String(val)}</Tag>,
    },
    {
      key: 'status', title: 'Status', width: 110,
      filters: [
        { text: 'To Do', value: 'todo' },
        { text: 'In Progress', value: 'in-progress' },
        { text: 'Review', value: 'review' },
        { text: 'Done', value: 'done' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Tag color={statusColors[val as TaskStatus]}>{String(val)}</Tag>,
    },
    {
      key: 'dueDate', title: 'Due', width: 110, sortable: true,
      render: (val, row) => {
        const overdue = new Date(String(val)) < new Date() && row.status !== 'done'
        return <span style={{ color: overdue ? 'var(--sg-color-error)' : undefined }}>{String(val)}{overdue ? ' ⚠️' : ''}</span>
      },
    },
    {
      key: 'estimate', title: 'Est.', width: 60, sortable: true, align: 'center',
      render: (val) => `${val}h`,
    },
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
          onSelect={(key) => notification.info(`${key} task: ${row.title}`)}
        >
          <Button size="small">⋯</Button>
        </Dropdown>
      ),
    },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Input placeholder="Search tasks..." value={search} onChange={setSearch} style={{ width: 220 }} />
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => notification.info('New task dialog (mock)')}>
          + New Task
        </Button>
      </div>
      <Table
        columns={columns}
        data={tableData}
        pageSize={12}
        size="small"
        rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys as string[]) }}
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
          {projectTasks.slice(0, 15).map(t => (
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
              <div key={i} style={{ fontSize: 10, background: 'var(--sg-color-bg-secondary)', padding: '0 4px', borderRadius: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
      <Form onFinish={(values) => notification.success('Task created (mock)', JSON.stringify(values))}>
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
  const [activeTab, setActiveTab] = useState('tasks')

  const tabs: TabItem[] = [
    { key: 'tasks', label: 'Tasks', children: <TasksTab /> },
    { key: 'projects', label: 'Projects', children: <ProjectsTab /> },
    { key: 'calendar', label: 'Calendar', children: <CalendarTab /> },
    { key: 'new', label: '+ New Task', children: <NewTaskTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <StatsRow />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
