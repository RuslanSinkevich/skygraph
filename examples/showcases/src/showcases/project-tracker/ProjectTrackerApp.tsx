import { useMemo, useState } from 'react'
import {
  Button,
  ConfigProvider,
  Descriptions,
  Drawer,
  Progress,
  Segmented,
  Tag,
} from '@skygraph/react'
import { useShowcaseLocale } from '../_shared'

type Status = 'planned' | 'active' | 'review' | 'blocked' | 'done'
type Priority = 'low' | 'medium' | 'high'
type Filter = 'all' | 'active' | 'blocked' | 'done'

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

const STATUS_ORDER: Status[] = ['planned', 'active', 'review', 'blocked', 'done']

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

const PROJECT_TRACKER_THEME = {
  mode: 'dark',
  token: {
    colorPrimary: '#a78bfa',
    colorSuccess: '#34d399',
    colorWarning: '#fbbf24',
    colorError: '#fb7185',
    colorText: '#e5e7eb',
    colorBg: '#101827',
    colorBorder: '#334155',
    borderRadius: 14,
    fontSize: 14,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  cssVars: {
    '--sg-color-bg': '#101827',
    '--sg-color-bg-secondary': '#162033',
    '--sg-color-bg-elevated': '#1d2940',
    '--sg-color-bg-container': '#162033',
    '--sg-color-bg-hover': '#24314f',
    '--sg-color-border': '#334155',
    '--sg-color-border-secondary': '#26344f',
    '--sg-color-text-secondary': '#b7c2d8',
    '--sg-color-text-tertiary': '#7f8ca5',
    '--sg-color-text-placeholder': '#64748b',
    '--sg-color-primary-hover': '#c4b5fd',
    '--sg-color-primary-active': '#8b5cf6',
    '--sg-color-primary-bg': 'rgba(167, 139, 250, 0.16)',
    '--sg-shadow': '0 18px 50px rgba(8, 13, 28, 0.38)',
  },
} as const

const COPY = {
  en: {
    title: 'Project delivery cockpit',
    subtitle:
      'Scoped ConfigProvider theme: every control below inherits a dense indigo night palette through token overrides.',
    tokenLabel: 'Token override',
    add: 'New sprint',
    filters: { all: 'All work', active: 'In flight', blocked: 'Blocked', done: 'Shipped' },
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
      avg: 'Average progress',
    },
    drawer: {
      title: 'Task details',
      owner: 'Owner',
      area: 'Area',
      due: 'Due date',
      status: 'Status',
      priority: 'Priority',
      progress: 'Progress',
      markDone: 'Mark done',
    },
    open: 'Open task',
  },
  ru: {
    title: 'Тёмный cockpit проекта',
    subtitle:
      'Локальный ConfigProvider переопределяет токены: все контролы ниже наследуют плотную индиго-тему без глобальной смены приложения.',
    tokenLabel: 'Token override',
    add: 'Новый спринт',
    filters: { all: 'Вся работа', active: 'В работе', blocked: 'Блокеры', done: 'Доставлено' },
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
      avg: 'Средний прогресс',
    },
    drawer: {
      title: 'Детали задачи',
      owner: 'Владелец',
      area: 'Направление',
      due: 'Срок',
      status: 'Статус',
      priority: 'Приоритет',
      progress: 'Прогресс',
      markDone: 'Отметить готовой',
    },
    open: 'Открыть',
  },
} as const

export function ProjectTrackerApp() {
  const locale = useShowcaseLocale()
  const l = locale.languageSwitcher === 'Язык' ? COPY.ru : COPY.en
  const [tasks, setTasks] = useState<ProjectTask[]>(TASKS)
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<ProjectTask | null>(null)

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return task.status === 'active' || task.status === 'review'
      if (filter === 'blocked') return task.status === 'blocked'
      if (filter === 'done') return task.status === 'done'
      return true
    })
  }, [filter, tasks])

  const statusColumns = STATUS_ORDER.map((status) => ({
    status,
    tasks: filtered.filter((task) => task.status === status),
  }))

  const avg = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)
  const activeCount = tasks.filter(
    (task) => task.status === 'active' || task.status === 'review',
  ).length
  const blockedCount = tasks.filter((task) => task.status === 'blocked').length

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
    <ConfigProvider theme={PROJECT_TRACKER_THEME}>
      <div className="sc-content pt-theme" style={{ flex: 1 }}>
        <section className="pt-hero">
          <div>
            <Tag color="purple">{l.tokenLabel}</Tag>
            <h2>{l.title}</h2>
            <p>{l.subtitle}</p>
          </div>
          <Button type="primary">{l.add}</Button>
        </section>

        <div className="pt-toolbar">
          <Segmented
            value={filter}
            onChange={(value) => setFilter(value as Filter)}
            options={Object.entries(l.filters).map(([value, label]) => ({ value, label }))}
          />
        </div>

        <section className="pt-metrics">
          {[
            { key: 'total', label: l.stats.total, value: tasks.length, color: 'purple' },
            { key: 'active', label: l.stats.active, value: activeCount, color: 'blue' },
            { key: 'blocked', label: l.stats.blocked, value: blockedCount, color: 'red' },
            { key: 'avg', label: l.stats.avg, value: `${avg}%`, color: 'green' },
          ].map((metric) => (
            <div className="pt-metric" key={metric.key}>
              <Tag color={metric.color}>{metric.label}</Tag>
              <strong>{metric.value}</strong>
              {metric.key === 'avg' && <Progress percent={avg} showInfo={false} />}
            </div>
          ))}
        </section>

        <section className="pt-board">
          {statusColumns.map(({ status, tasks: columnTasks }) => (
            <div className="pt-column" key={status}>
              <div className="pt-column-head">
                <Tag color={STATUS_COLOR[status]}>{l.status[status]}</Tag>
                <span>{columnTasks.length}</span>
              </div>
              <div className="pt-column-body">
                {columnTasks.map((task) => (
                  <Button key={task.id} className="pt-task-card" onClick={() => setSelected(task)}>
                    <span className="pt-task-id">{task.id}</span>
                    <strong>{task.title}</strong>
                    <span>{task.owner}</span>
                    <Progress percent={task.progress} showInfo={false} />
                    <span className="pt-task-meta">
                      <Tag color={PRIORITY_COLOR[task.priority]}>{l.priority[task.priority]}</Tag>
                      <span>{task.due}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Drawer
          open={!!selected}
          onClose={() => setSelected(null)}
          title={selected ? `${selected.id} · ${selected.title}` : l.drawer.title}
          width={460}
          className="pt-drawer"
        >
          {selected && (
            <div className="pt-drawer-body">
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
              <div>
                <div className="pt-progress-label">{l.drawer.progress}</div>
                <Progress percent={selected.progress} />
              </div>
              <Button type="primary" onClick={markDone} disabled={selected.status === 'done'}>
                {l.drawer.markDone}
              </Button>
            </div>
          )}
        </Drawer>
      </div>
    </ConfigProvider>
  )
}
