import { useMemo, useState } from 'react'
import { Button, Descriptions, Drawer, Progress, Segmented, Table, Tag } from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { StatsRow, Toolbar, useShowcaseLocale, useTableRows } from '../_shared'

type Status = 'planned' | 'active' | 'review' | 'blocked' | 'done'
type Priority = 'low' | 'medium' | 'high'

interface ProjectTask {
  id: string
  title: string
  owner: string
  area: string
  status: Status
  priority: Priority
  progress: number
  due: string
}

const TASKS: ProjectTask[] = [
  {
    id: 'PT-101',
    title: 'Billing export',
    owner: 'Nina Petrova',
    area: 'Finance',
    status: 'active',
    priority: 'high',
    progress: 68,
    due: 'Jun 12',
  },
  {
    id: 'PT-102',
    title: 'Customer import cleanup',
    owner: 'Sara Vogel',
    area: 'CRM',
    status: 'review',
    priority: 'medium',
    progress: 92,
    due: 'Jun 09',
  },
  {
    id: 'PT-103',
    title: 'Mobile onboarding copy',
    owner: 'Mia Rossi',
    area: 'Growth',
    status: 'planned',
    priority: 'low',
    progress: 18,
    due: 'Jun 20',
  },
  {
    id: 'PT-104',
    title: 'Warehouse stock alerts',
    owner: 'Omar Said',
    area: 'Ops',
    status: 'blocked',
    priority: 'high',
    progress: 41,
    due: 'Jun 10',
  },
  {
    id: 'PT-105',
    title: 'Role audit checklist',
    owner: 'Alex Kim',
    area: 'Security',
    status: 'done',
    priority: 'medium',
    progress: 100,
    due: 'Jun 07',
  },
  {
    id: 'PT-106',
    title: 'Dashboard drill-down QA',
    owner: 'Emma Tang',
    area: 'Analytics',
    status: 'active',
    priority: 'medium',
    progress: 56,
    due: 'Jun 15',
  },
]

const STATUS_COLOR: Record<Status, string> = {
  planned: 'default',
  active: 'blue',
  review: 'purple',
  blocked: 'red',
  done: 'green',
}

const PRIORITY_COLOR: Record<Priority, string> = {
  low: 'default',
  medium: 'orange',
  high: 'red',
}

const COPY = {
  en: {
    search: 'Search tasks, owners, areas...',
    add: 'New task',
    columns: {
      task: 'Task',
      owner: 'Owner',
      area: 'Area',
      priority: 'Priority',
      status: 'Status',
      progress: 'Progress',
      due: 'Due',
      actions: '',
    },
    filters: { all: 'All', active: 'Active', blocked: 'Blocked', done: 'Done' },
    status: {
      planned: 'Planned',
      active: 'Active',
      review: 'Review',
      blocked: 'Blocked',
      done: 'Done',
    },
    priority: { low: 'Low', medium: 'Medium', high: 'High' },
    stats: {
      total: 'Tasks',
      active: 'In progress',
      blocked: 'Blocked',
      done: 'Done',
      avg: 'Average progress',
    },
    drawer: {
      title: 'Task details',
      owner: 'Owner',
      area: 'Area',
      due: 'Due date',
      status: 'Status',
      priority: 'Priority',
      markDone: 'Mark done',
    },
    open: 'Open',
  },
  ru: {
    search: 'Поиск задач, владельцев, направлений...',
    add: 'Новая задача',
    columns: {
      task: 'Задача',
      owner: 'Владелец',
      area: 'Направление',
      priority: 'Приоритет',
      status: 'Статус',
      progress: 'Прогресс',
      due: 'Срок',
      actions: '',
    },
    filters: { all: 'Все', active: 'В работе', blocked: 'Блокеры', done: 'Готово' },
    status: {
      planned: 'План',
      active: 'В работе',
      review: 'Ревью',
      blocked: 'Блокер',
      done: 'Готово',
    },
    priority: { low: 'Низкий', medium: 'Средний', high: 'Высокий' },
    stats: {
      total: 'Задач',
      active: 'В работе',
      blocked: 'Блокеры',
      done: 'Готово',
      avg: 'Средний прогресс',
    },
    drawer: {
      title: 'Детали задачи',
      owner: 'Владелец',
      area: 'Направление',
      due: 'Срок',
      status: 'Статус',
      priority: 'Приоритет',
      markDone: 'Отметить готовой',
    },
    open: 'Открыть',
  },
} as const

type Filter = keyof typeof COPY.en.filters

export function ProjectTrackerApp() {
  const locale = useShowcaseLocale()
  const l = locale.languageSwitcher === 'Язык' ? COPY.ru : COPY.en
  const [tasks, setTasks] = useState<ProjectTask[]>(TASKS)
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<ProjectTask | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks.filter((task) => {
      if (filter === 'active' && !['active', 'review'].includes(task.status)) return false
      if (filter === 'blocked' && task.status !== 'blocked') return false
      if (filter === 'done' && task.status !== 'done') return false
      if (!q) return true
      return [task.id, task.title, task.owner, task.area].some((value) =>
        value.toLowerCase().includes(q),
      )
    })
  }, [filter, search, tasks])

  const rows = useTableRows(filtered)
  const avg = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)

  const columns: TableColumn[] = [
    {
      key: 'title',
      title: l.columns.task,
      sortable: true,
      render: (value, row) => (
        <div>
          <strong>{String(value)}</strong>
          <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)' }}>
            {String(row.id)}
          </div>
        </div>
      ),
    },
    { key: 'owner', title: l.columns.owner, width: 160, sortable: true },
    { key: 'area', title: l.columns.area, width: 120, sortable: true },
    {
      key: 'priority',
      title: l.columns.priority,
      width: 110,
      render: (value) => (
        <Tag color={PRIORITY_COLOR[value as Priority]}>{l.priority[value as Priority]}</Tag>
      ),
    },
    {
      key: 'status',
      title: l.columns.status,
      width: 120,
      render: (value) => (
        <Tag color={STATUS_COLOR[value as Status]}>{l.status[value as Status]}</Tag>
      ),
    },
    {
      key: 'progress',
      title: l.columns.progress,
      width: 160,
      render: (value) => <Progress percent={Number(value)} showInfo={false} />,
    },
    { key: 'due', title: l.columns.due, width: 100, sortable: true },
    {
      key: 'actions',
      title: l.columns.actions,
      width: 96,
      render: (_value, row) => (
        <Button
          size="small"
          onClick={() => setSelected(tasks.find((task) => task.id === row.id) ?? null)}
        >
          {l.open}
        </Button>
      ),
    },
  ]

  const markDone = () => {
    if (!selected) return
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selected.id ? { ...task, status: 'done', progress: 100 } : task,
      ),
    )
    setSelected({ ...selected, status: 'done', progress: 100 })
  }

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <StatsRow
        items={[
          { key: 'total', label: l.stats.total, value: tasks.length },
          {
            key: 'active',
            label: l.stats.active,
            value: tasks.filter((task) => task.status === 'active' || task.status === 'review')
              .length,
          },
          {
            key: 'blocked',
            label: l.stats.blocked,
            value: tasks.filter((task) => task.status === 'blocked').length,
            subTone: 'error',
          },
          {
            key: 'avg',
            label: l.stats.avg,
            value: `${avg}%`,
            progress: avg,
            progressStatus: avg > 75 ? 'success' : 'active',
          },
        ]}
      />

      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: l.search, width: 280 }}
        filters={
          <Segmented
            value={filter}
            onChange={(value) => setFilter(String(value) as Filter)}
            options={Object.entries(l.filters).map(([value, label]) => ({ value, label }))}
          />
        }
        actions={<Button type="primary">{l.add}</Button>}
      />

      <Table columns={columns} data={rows} pageSize={8} size="small" bordered />

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.id} · ${selected.title}` : l.drawer.title}
        width={460}
      >
        {selected && (
          <div style={{ display: 'grid', gap: 16 }}>
            <Descriptions
              column={1}
              size="small"
              items={[
                { label: l.drawer.owner, children: selected.owner },
                { label: l.drawer.area, children: selected.area },
                { label: l.drawer.due, children: selected.due },
                {
                  label: l.drawer.status,
                  children: (
                    <Tag color={STATUS_COLOR[selected.status]}>{l.status[selected.status]}</Tag>
                  ),
                },
                {
                  label: l.drawer.priority,
                  children: (
                    <Tag color={PRIORITY_COLOR[selected.priority]}>
                      {l.priority[selected.priority]}
                    </Tag>
                  ),
                },
              ]}
            />
            <Progress percent={selected.progress} />
            <Button type="primary" onClick={markDone} disabled={selected.status === 'done'}>
              {l.drawer.markDone}
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  )
}
