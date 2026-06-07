<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgButton,
  SgDescriptions,
  SgDrawer,
  SgProgress,
  SgSegmented,
  SgTable,
  SgTag,
  type TableColumn,
} from '@skygraph/vue'
import { StatsRow, Toolbar, useShowcaseLocale, type StatItem } from '../_shared'

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
    open: 'Open',
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
  },
  ru: {
    search: 'Поиск задач, владельцев, направлений...',
    add: 'Новая задача',
    open: 'Открыть',
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
  },
} as const

const locale = useShowcaseLocale()
const l = computed(() => (locale.languageSwitcher === 'Язык' ? COPY.ru : COPY.en))
const tasks = ref<ProjectTask[]>([...TASKS])
const filter = ref<Filter>('all')
const search = ref('')
const selected = ref<ProjectTask | null>(null)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return tasks.value.filter((task) => {
    if (filter.value === 'active' && !['active', 'review'].includes(task.status)) return false
    if (filter.value === 'blocked' && task.status !== 'blocked') return false
    if (filter.value === 'done' && task.status !== 'done') return false
    if (!q) return true
    return [task.id, task.title, task.owner, task.area].some((value) =>
      value.toLowerCase().includes(q),
    )
  })
})

const tableData = computed(() =>
  filtered.value.map((task) => ({ id: task.id, data: task as unknown as Record<string, unknown> })),
)

const avg = computed(() =>
  Math.round(tasks.value.reduce((sum, task) => sum + task.progress, 0) / tasks.value.length),
)

const statItems = computed<StatItem[]>(() => [
  { key: 'total', label: l.value.stats.total, value: tasks.value.length },
  {
    key: 'active',
    label: l.value.stats.active,
    value: tasks.value.filter((task) => task.status === 'active' || task.status === 'review')
      .length,
  },
  {
    key: 'blocked',
    label: l.value.stats.blocked,
    value: tasks.value.filter((task) => task.status === 'blocked').length,
    subTone: 'error',
  },
  {
    key: 'avg',
    label: l.value.stats.avg,
    value: `${avg.value}%`,
    progress: avg.value,
    progressStatus: avg.value > 75 ? 'success' : 'active',
  },
])

const columns = computed<TableColumn[]>(() => [
  { key: 'title', title: l.value.columns.task, sortable: true },
  { key: 'owner', title: l.value.columns.owner, width: 160, sortable: true },
  { key: 'area', title: l.value.columns.area, width: 120, sortable: true },
  { key: 'priority', title: l.value.columns.priority, width: 110 },
  { key: 'status', title: l.value.columns.status, width: 120 },
  { key: 'progress', title: l.value.columns.progress, width: 160 },
  { key: 'due', title: l.value.columns.due, width: 100, sortable: true },
  { key: 'actions', title: l.value.columns.actions, width: 96 },
])

const filterOptions = computed(() =>
  Object.entries(l.value.filters).map(([value, label]) => ({ value, label })),
)

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

function openTask(id: string) {
  selected.value = tasks.value.find((task) => task.id === id) ?? null
}
</script>

<template>
  <div class="sc-content" style="flex: 1">
    <StatsRow :items="statItems" />

    <Toolbar v-model:searchValue="search" :search-placeholder="l.search" :search-width="280">
      <template #filters>
        <SgSegmented
          :value="filter"
          :options="filterOptions"
          @change="(value: string | number) => (filter = String(value) as Filter)"
        />
      </template>
      <template #actions>
        <SgButton type="primary">{{ l.add }}</SgButton>
      </template>
    </Toolbar>

    <SgTable :columns="columns" :data="tableData" :page-size="8" size="small" bordered>
      <template #cell="{ column, row, id, value }">
        <div v-if="column.key === 'title'">
          <strong>{{ String(value) }}</strong>
          <div style="font-size: 11px; color: var(--sg-color-text-secondary)">
            {{ String(row.id) }}
          </div>
        </div>
        <SgTag
          v-else-if="column.key === 'priority'"
          :color="PRIORITY_COLOR[row.priority as Priority]"
        >
          {{ l.priority[row.priority as Priority] }}
        </SgTag>
        <SgTag v-else-if="column.key === 'status'" :color="STATUS_COLOR[row.status as Status]">
          {{ l.status[row.status as Status] }}
        </SgTag>
        <SgProgress
          v-else-if="column.key === 'progress'"
          :percent="Number(value)"
          :show-info="false"
        />
        <SgButton v-else-if="column.key === 'actions'" size="small" @click="openTask(String(id))">
          {{ l.open }}
        </SgButton>
        <template v-else>{{ value ?? id }}</template>
      </template>
    </SgTable>

    <SgDrawer
      :open="!!selected"
      :title="selected ? `${selected.id} · ${selected.title}` : l.drawer.title"
      :width="460"
      @close="selected = null"
    >
      <template v-if="selected">
        <div style="display: grid; gap: 16px">
          <SgDescriptions :items="drawerItems" :column="1" size="small" />
          <SgProgress :percent="selected.progress" />
          <SgButton type="primary" :disabled="selected.status === 'done'" @click="markDone">
            {{ l.drawer.markDone }}
          </SgButton>
        </div>
      </template>
    </SgDrawer>
  </div>
</template>
