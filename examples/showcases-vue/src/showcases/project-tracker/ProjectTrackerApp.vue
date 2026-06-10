<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgButton,
  SgCollapse,
  SgConfigProvider,
  SgDescriptions,
  SgDrawer,
  SgProgress,
  SgSegmented,
  SgTable,
  SgTag,
  SgTimeline,
  SgTree,
  type RowId,
  type TableColumn,
  type ThemeConfig,
  type TreeNodeData,
} from '@skygraph/vue'
import { useShowcaseLocale } from '../_shared'

type Status = 'triage' | 'investigating' | 'contained' | 'resolved'
type Severity = 'low' | 'medium' | 'high' | 'critical'
type Filter = 'all' | 'open' | 'critical' | 'resolved'

interface Incident {
  id: string
  title: string
  system: string
  lane: 'Edge' | 'Identity' | 'Data' | 'Platform'
  analyst: string
  status: Status
  severity: Severity
  confidence: number
  sla: string
  region: string
  assetKey: string
}

const INCIDENTS: Incident[] = [
  {
    id: 'SOC-1042',
    title: 'Impossible travel sign-in',
    system: 'SSO gateway',
    lane: 'Identity',
    analyst: 'Nina Petrova',
    status: 'investigating',
    severity: 'critical',
    confidence: 88,
    sla: '18 min',
    region: 'EU',
    assetKey: 'identity',
  },
  {
    id: 'SOC-1043',
    title: 'Suspicious data export',
    system: 'Warehouse',
    lane: 'Data',
    analyst: 'Sara Vogel',
    status: 'triage',
    severity: 'high',
    confidence: 73,
    sla: '42 min',
    region: 'US',
    assetKey: 'data',
  },
  {
    id: 'SOC-1044',
    title: 'WAF anomaly burst',
    system: 'Public API',
    lane: 'Edge',
    analyst: 'Mia Rossi',
    status: 'contained',
    severity: 'medium',
    confidence: 64,
    sla: '1 h',
    region: 'APAC',
    assetKey: 'edge',
  },
  {
    id: 'SOC-1045',
    title: 'Privileged token reuse',
    system: 'Kubernetes',
    lane: 'Platform',
    analyst: 'Omar Said',
    status: 'investigating',
    severity: 'critical',
    confidence: 91,
    sla: '9 min',
    region: 'EU',
    assetKey: 'platform',
  },
  {
    id: 'SOC-1046',
    title: 'Endpoint beacon pattern',
    system: 'Fleet agents',
    lane: 'Platform',
    analyst: 'Alex Kim',
    status: 'resolved',
    severity: 'medium',
    confidence: 100,
    sla: 'closed',
    region: 'US',
    assetKey: 'platform',
  },
  {
    id: 'SOC-1047',
    title: 'DNS tunneling candidate',
    system: 'Resolver mesh',
    lane: 'Edge',
    analyst: 'Emma Tang',
    status: 'triage',
    severity: 'low',
    confidence: 31,
    sla: '2 h',
    region: 'LATAM',
    assetKey: 'edge',
  },
]

const STATUS_COLOR: Record<Status, string> = {
  triage: 'orange',
  investigating: 'blue',
  contained: 'purple',
  resolved: 'green',
}

const SEVERITY_COLOR: Record<Severity, string> = {
  low: 'default',
  medium: 'orange',
  high: 'red',
  critical: 'magenta',
}

const ASSET_TREE: TreeNodeData[] = [
  {
    key: 'all',
    title: 'Security estate',
    children: [
      { key: 'edge', title: 'Edge perimeter' },
      { key: 'identity', title: 'Identity fabric' },
      { key: 'data', title: 'Data platforms' },
      { key: 'platform', title: 'Runtime platform' },
    ],
  },
]

const COMMAND_CENTER_THEME: ThemeConfig = {
  mode: 'dark',
  token: {
    colorPrimary: '#38bdf8',
    colorSuccess: '#22c55e',
    colorWarning: '#f59e0b',
    colorError: '#f43f5e',
    colorText: '#e2e8f0',
    colorBg: '#08111f',
    colorBorder: '#1e3a5f',
    borderRadius: 14,
    fontSize: 14,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  cssVars: {
    '--sg-color-bg': '#08111f',
    '--sg-color-bg-secondary': '#0d1b2f',
    '--sg-color-bg-elevated': '#12233b',
    '--sg-color-bg-container': '#0d1b2f',
    '--sg-color-bg-hover': '#17314f',
    '--sg-color-border': '#1e3a5f',
    '--sg-color-border-secondary': '#18304d',
    '--sg-color-text-secondary': '#b6c7dd',
    '--sg-color-text-tertiary': '#7f95b2',
    '--sg-color-text-placeholder': '#64748b',
    '--sg-color-primary-hover': '#7dd3fc',
    '--sg-color-primary-active': '#0284c7',
    '--sg-color-primary-bg': 'rgba(56, 189, 248, 0.16)',
    '--sg-shadow': '0 18px 50px rgba(2, 8, 23, 0.42)',
  },
}

const COPY = {
  en: {
    title: 'Security command center',
    subtitle:
      'A scoped SOC workspace that combines incident Table, infrastructure Tree, Timeline, Collapse panels and Drawer details under one local theme.',
    tokenLabel: 'Token override',
    action: 'Escalate critical',
    filters: { all: 'All incidents', open: 'Open', critical: 'Critical', resolved: 'Resolved' },
    status: {
      triage: 'Triage',
      investigating: 'Investigating',
      contained: 'Contained',
      resolved: 'Resolved',
    },
    severity: { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' },
    stats: {
      total: 'Signals',
      critical: 'Critical',
      open: 'Open cases',
      confidence: 'Avg confidence',
    },
    columns: {
      incident: 'Incident',
      system: 'System',
      lane: 'Lane',
      severity: 'Severity',
      status: 'Status',
      confidence: 'Confidence',
      sla: 'SLA',
      analyst: 'Analyst',
    },
    drawer: {
      title: 'Incident details',
      system: 'System',
      lane: 'Lane',
      analyst: 'Analyst',
      region: 'Region',
      status: 'Status',
      severity: 'Severity',
      confidence: 'Detection confidence',
      markResolved: 'Mark resolved',
    },
    treeTitle: 'Infrastructure tree',
    tableTitle: 'Incident queue',
    timelineTitle: 'Response timeline',
    playbookTitle: 'Playbooks',
    playbooks: [
      {
        key: 'contain',
        label: 'Containment',
        content: 'Quarantine identity sessions, rotate tokens and isolate affected workloads.',
      },
      {
        key: 'notify',
        label: 'Notification',
        content: 'Notify owner teams, open compliance note and attach timeline evidence.',
      },
      {
        key: 'recover',
        label: 'Recovery',
        content: 'Validate clean state, restore automation and close with post-incident notes.',
      },
    ],
    timeline: [
      'Correlation rule grouped 17 events into one incident.',
      'Analyst assigned and scope reduced to two systems.',
      'Containment playbook is waiting for approval.',
    ],
  },
  ru: {
    title: 'Центр реагирования SOC',
    subtitle:
      'Локальная SOC-витрина объединяет Table инцидентов, Tree инфраструктуры, Timeline, Collapse-панели и Drawer деталей под одной темой.',
    tokenLabel: 'Token override',
    action: 'Эскалировать critical',
    filters: { all: 'Все инциденты', open: 'Открытые', critical: 'Critical', resolved: 'Закрытые' },
    status: {
      triage: 'Триаж',
      investigating: 'Расследуется',
      contained: 'Сдержан',
      resolved: 'Закрыт',
    },
    severity: { low: 'Низкий', medium: 'Средний', high: 'Высокий', critical: 'Critical' },
    stats: {
      total: 'Сигналов',
      critical: 'Critical',
      open: 'Открыто',
      confidence: 'Средняя уверенность',
    },
    columns: {
      incident: 'Инцидент',
      system: 'Система',
      lane: 'Зона',
      severity: 'Риск',
      status: 'Статус',
      confidence: 'Уверенность',
      sla: 'SLA',
      analyst: 'Аналитик',
    },
    drawer: {
      title: 'Детали инцидента',
      system: 'Система',
      lane: 'Зона',
      analyst: 'Аналитик',
      region: 'Регион',
      status: 'Статус',
      severity: 'Риск',
      confidence: 'Уверенность детекта',
      markResolved: 'Закрыть инцидент',
    },
    treeTitle: 'Дерево инфраструктуры',
    tableTitle: 'Очередь инцидентов',
    timelineTitle: 'Ход реагирования',
    playbookTitle: 'Playbooks',
    playbooks: [
      {
        key: 'contain',
        label: 'Сдерживание',
        content: 'Закрыть identity-сессии, обновить токены и изолировать затронутые workloads.',
      },
      {
        key: 'notify',
        label: 'Уведомления',
        content:
          'Уведомить владельцев, открыть compliance note и приложить timeline доказательств.',
      },
      {
        key: 'recover',
        label: 'Восстановление',
        content:
          'Проверить чистое состояние, вернуть автоматизацию и закрыть post-incident заметками.',
      },
    ],
    timeline: [
      'Correlation rule собрал 17 событий в один инцидент.',
      'Аналитик назначен, scope снижен до двух систем.',
      'Containment playbook ожидает подтверждения.',
    ],
  },
} as const

const locale = useShowcaseLocale()
const l = computed(() => (locale.languageSwitcher === 'Язык' ? COPY.ru : COPY.en))
const incidents = ref<Incident[]>([...INCIDENTS])
const filter = ref<Filter>('all')
const selectedAsset = ref('all')
const selected = ref<Incident | null>(null)

const filterOptions = computed(() =>
  Object.entries(l.value.filters).map(([value, label]) => ({ value, label })),
)

const filtered = computed(() =>
  incidents.value.filter((incident) => {
    if (selectedAsset.value !== 'all' && incident.assetKey !== selectedAsset.value) return false
    if (filter.value === 'open') return incident.status !== 'resolved'
    if (filter.value === 'critical') return incident.severity === 'critical'
    if (filter.value === 'resolved') return incident.status === 'resolved'
    return true
  }),
)

const tableRows = computed(() =>
  filtered.value.map((incident) => ({
    id: incident.id as RowId,
    data: { ...incident } as Record<string, unknown>,
  })),
)

const avg = computed(() =>
  Math.round(
    incidents.value.reduce((sum, incident) => sum + incident.confidence, 0) /
      incidents.value.length,
  ),
)
const criticalCount = computed(
  () => incidents.value.filter((incident) => incident.severity === 'critical').length,
)
const openCount = computed(
  () => incidents.value.filter((incident) => incident.status !== 'resolved').length,
)

const metrics = computed(() => [
  { key: 'total', label: l.value.stats.total, value: incidents.value.length, color: 'purple' },
  { key: 'critical', label: l.value.stats.critical, value: criticalCount.value, color: 'magenta' },
  { key: 'open', label: l.value.stats.open, value: openCount.value, color: 'blue' },
  { key: 'confidence', label: l.value.stats.confidence, value: `${avg.value}%`, color: 'green' },
])

const columns = computed<TableColumn[]>(() => [
  { key: 'id', title: 'ID', width: 120, sortable: true, fixed: 'left' },
  { key: 'title', title: l.value.columns.incident, width: 230, sortable: true },
  { key: 'system', title: l.value.columns.system, width: 150, sortable: true },
  { key: 'lane', title: l.value.columns.lane, width: 120, sortable: true },
  { key: 'severity', title: l.value.columns.severity, width: 120, sortable: true },
  { key: 'status', title: l.value.columns.status, width: 140, sortable: true },
  { key: 'confidence', title: l.value.columns.confidence, width: 160, sortable: true },
  { key: 'sla', title: l.value.columns.sla, width: 100, sortable: true },
  { key: 'analyst', title: l.value.columns.analyst, width: 150, sortable: true },
])

const drawerItems = computed(() => {
  if (!selected.value) return []
  return [
    { label: l.value.drawer.system, value: selected.value.system },
    { label: l.value.drawer.lane, value: selected.value.lane },
    { label: l.value.drawer.analyst, value: selected.value.analyst },
    { label: l.value.drawer.region, value: selected.value.region },
    { label: l.value.drawer.status, value: l.value.status[selected.value.status] },
    { label: l.value.drawer.severity, value: l.value.severity[selected.value.severity] },
  ]
})

const playbookItems = computed(() =>
  l.value.playbooks.map((item) => ({
    key: item.key,
    label: item.label,
    content: item.content,
  })),
)

const timelineItems = computed(() =>
  l.value.timeline.map((content, index) => ({
    content,
    color: index === 2 ? 'orange' : 'blue',
  })),
)

function selectAsset(keys: (string | number)[]) {
  if (keys.length) selectedAsset.value = String(keys[0])
}

function selectIncident(_id: RowId, row: Record<string, unknown>) {
  selected.value = row as unknown as Incident
}

function statusLabel(value: unknown) {
  return l.value.status[value as Status]
}

function severityLabel(value: unknown) {
  return l.value.severity[value as Severity]
}

function statusColor(value: unknown) {
  return STATUS_COLOR[value as Status]
}

function severityColor(value: unknown) {
  return SEVERITY_COLOR[value as Severity]
}

function markResolved() {
  if (!selected.value) return
  const id = selected.value.id
  incidents.value = incidents.value.map((incident) =>
    incident.id === id ? { ...incident, status: 'resolved', confidence: 100 } : incident,
  )
  selected.value = { ...selected.value, status: 'resolved', confidence: 100 }
}
</script>

<template>
  <SgConfigProvider :theme="COMMAND_CENTER_THEME">
    <div class="sc-content pt-theme" style="flex: 1">
      <section class="pt-hero">
        <div>
          <SgTag color="purple">{{ l.tokenLabel }}</SgTag>
          <h2>{{ l.title }}</h2>
          <p>{{ l.subtitle }}</p>
        </div>
        <SgButton type="primary">{{ l.action }}</SgButton>
      </section>

      <div class="pt-toolbar">
        <SgSegmented v-model="filter" :options="filterOptions" />
      </div>

      <section class="pt-metrics">
        <div v-for="metric of metrics" :key="metric.key" class="pt-metric">
          <SgTag :color="metric.color">{{ metric.label }}</SgTag>
          <strong>{{ metric.value }}</strong>
          <SgProgress v-if="metric.key === 'confidence'" :percent="avg" :show-info="false" />
        </div>
      </section>

      <section class="pt-workbench">
        <div class="pt-panel pt-tree-panel">
          <div class="pt-panel-head">
            <strong>{{ l.treeTitle }}</strong>
            <SgTag>{{ filtered.length }}</SgTag>
          </div>
          <SgTree
            :tree-data="ASSET_TREE"
            :selected-keys="[selectedAsset]"
            default-expand-all
            @select="selectAsset"
          />
        </div>

        <div class="pt-panel pt-main-panel">
          <div class="pt-panel-head">
            <strong>{{ l.tableTitle }}</strong>
            <SgTag color="blue">{{ filter }}</SgTag>
          </div>
          <SgTable
            :columns="columns"
            :data="tableRows"
            :page-size="6"
            searchable
            striped
            bordered
            highlight-on-hover
            @row-click="selectIncident"
          >
            <template #cell="{ column, value }">
              <SgTag v-if="column.key === 'severity'" :color="severityColor(value)">
                {{ severityLabel(value) }}
              </SgTag>
              <SgTag v-else-if="column.key === 'status'" :color="statusColor(value)">
                {{ statusLabel(value) }}
              </SgTag>
              <SgProgress
                v-else-if="column.key === 'confidence'"
                :percent="Number(value)"
                :show-info="false"
              />
              <template v-else>{{ value }}</template>
            </template>
          </SgTable>
        </div>
      </section>

      <section class="pt-side-grid">
        <div class="pt-panel">
          <div class="pt-panel-head">
            <strong>{{ l.timelineTitle }}</strong>
          </div>
          <SgTimeline :items="timelineItems" pending />
        </div>
        <div class="pt-panel">
          <div class="pt-panel-head">
            <strong>{{ l.playbookTitle }}</strong>
          </div>
          <SgCollapse :items="playbookItems" default-active-key="contain" />
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
            <div class="pt-progress-label">{{ l.drawer.confidence }}</div>
            <SgProgress :percent="selected.confidence" />
          </div>
          <SgButton type="primary" :disabled="selected.status === 'resolved'" @click="markResolved">
            {{ l.drawer.markResolved }}
          </SgButton>
        </div>
      </SgDrawer>
    </div>
  </SgConfigProvider>
</template>
