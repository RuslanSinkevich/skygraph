<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgButton,
  SgConfigProvider,
  SgDescriptions,
  SgDrawer,
  SgProgress,
  SgSegmented,
  SgTag,
  type ThemeConfig,
} from '@skygraph/vue'
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

const PROJECT_TRACKER_THEME: ThemeConfig = {
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
}

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
  },
} as const

const locale = useShowcaseLocale()
const l = computed(() => (locale.languageSwitcher === 'Язык' ? COPY.ru : COPY.en))
const tasks = ref<ProjectTask[]>([...TASKS])
const filter = ref<Filter>('all')
const selected = ref<ProjectTask | null>(null)

const filterOptions = computed(() =>
  Object.entries(l.value.filters).map(([value, label]) => ({ value, label })),
)

const filtered = computed(() =>
  tasks.value.filter((task) => {
    if (filter.value === 'active') return task.status === 'active' || task.status === 'review'
    if (filter.value === 'blocked') return task.status === 'blocked'
    if (filter.value === 'done') return task.status === 'done'
    return true
  }),
)

const statusColumns = computed(() =>
  STATUS_ORDER.map((status) => ({
    status,
    tasks: filtered.value.filter((task) => task.status === status),
  })),
)

const avg = computed(() =>
  Math.round(tasks.value.reduce((sum, task) => sum + task.progress, 0) / tasks.value.length),
)
const activeCount = computed(
  () => tasks.value.filter((task) => task.status === 'active' || task.status === 'review').length,
)
const blockedCount = computed(() => tasks.value.filter((task) => task.status === 'blocked').length)

const metrics = computed(() => [
  { key: 'total', label: l.value.stats.total, value: tasks.value.length, color: 'purple' },
  { key: 'active', label: l.value.stats.active, value: activeCount.value, color: 'blue' },
  { key: 'blocked', label: l.value.stats.blocked, value: blockedCount.value, color: 'red' },
  { key: 'avg', label: l.value.stats.avg, value: `${avg.value}%`, color: 'green' },
])

const drawerItems = computed(() => {
  if (!selected.value) return []
  return [
    { label: l.value.drawer.owner, value: selected.value.owner },
    { label: l.value.drawer.area, value: selected.value.area },
    { label: l.value.drawer.due, value: selected.value.due },
    { label: l.value.drawer.status, value: l.value.status[selected.value.status] },
    { label: l.value.drawer.priority, value: l.value.priority[selected.value.priority] },
  ]
})

function markDone() {
  if (!selected.value) return
  const id = selected.value.id
  tasks.value = tasks.value.map((task) =>
    task.id === id ? { ...task, status: 'done', progress: 100 } : task,
  )
  selected.value = { ...selected.value, status: 'done', progress: 100 }
}
</script>

<template>
  <SgConfigProvider :theme="PROJECT_TRACKER_THEME">
    <div class="sc-content pt-theme" style="flex: 1">
      <section class="pt-hero">
        <div>
          <SgTag color="purple">{{ l.tokenLabel }}</SgTag>
          <h2>{{ l.title }}</h2>
          <p>{{ l.subtitle }}</p>
        </div>
        <SgButton type="primary">{{ l.add }}</SgButton>
      </section>

      <div class="pt-toolbar">
        <SgSegmented v-model="filter" :options="filterOptions" />
      </div>

      <section class="pt-metrics">
        <div v-for="metric of metrics" :key="metric.key" class="pt-metric">
          <SgTag :color="metric.color">{{ metric.label }}</SgTag>
          <strong>{{ metric.value }}</strong>
          <SgProgress v-if="metric.key === 'avg'" :percent="avg" :show-info="false" />
        </div>
      </section>

      <section class="pt-board">
        <div v-for="column of statusColumns" :key="column.status" class="pt-column">
          <div class="pt-column-head">
            <SgTag :color="STATUS_COLOR[column.status]">{{ l.status[column.status] }}</SgTag>
            <span>{{ column.tasks.length }}</span>
          </div>
          <div class="pt-column-body">
            <SgButton
              v-for="task of column.tasks"
              :key="task.id"
              class="pt-task-card"
              @click="selected = task"
            >
              <span class="pt-task-id">{{ task.id }}</span>
              <strong>{{ task.title }}</strong>
              <span>{{ task.owner }}</span>
              <SgProgress :percent="task.progress" :show-info="false" />
              <span class="pt-task-meta">
                <SgTag :color="PRIORITY_COLOR[task.priority]">{{
                  l.priority[task.priority]
                }}</SgTag>
                <span>{{ task.due }}</span>
              </span>
            </SgButton>
          </div>
        </div>
      </section>

      <SgDrawer
        :open="!!selected"
        :title="selected ? `${selected.id} · ${selected.title}` : l.drawer.title"
        :width="460"
        class="pt-drawer"
        @close="selected = null"
      >
        <div v-if="selected" class="pt-drawer-body">
          <SgDescriptions :items="drawerItems" :column="1" size="small" />
          <div>
            <div class="pt-progress-label">{{ l.drawer.progress }}</div>
            <SgProgress :percent="selected.progress" />
          </div>
          <SgButton type="primary" :disabled="selected.status === 'done'" @click="markDone">
            {{ l.drawer.markDone }}
          </SgButton>
        </div>
      </SgDrawer>
    </div>
  </SgConfigProvider>
</template>
