<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgDashboard,
  SgDashboardEditor,
  SgLineChart,
  SgBarChart,
  SgAreaChart,
  SgPieChart,
  SgChartLegend,
  SgRangePicker,
  SgSegmented,
  SgTag,
  SgAvatar,
  SgProgress,
  SgButton,
  SgNotificationContainer,
  notification,
  SgEmpty,
  SgDrawer,
  SgDescriptions,
  SgDropdown,
  SgTable,
  SgRate,
  SgBadge,
  printElement,
  type ChartSeries,
  type DashboardWidget,
  type TableColumn,
} from '@skygraph/vue'
import {
  daily30,
  serviceHealth,
  recentActivity,
  trafficByCountry,
  dailyMetrics,
  channelMetrics,
  topProducts,
  getSummary,
} from './data'
import type { ChannelMetric, MetricRow, ProductMetric } from './data'
import {
  StatsRow,
  money,
  num,
  percent,
  colorFromString,
  initials,
  useAppLocale,
  type StatItem,
} from '../_shared'

type Period = '7d' | '14d' | '30d'
type Mode = 'operations' | 'drilldown' | 'editor'
type DrillTab = 'overview' | 'channels' | 'products'

const HEALTH_COLOR: Record<'healthy' | 'degraded' | 'down', string> = {
  healthy: 'success',
  degraded: 'warning',
  down: 'error',
}

const PALETTE = [
  'var(--sg-color-primary)',
  'var(--sg-color-success)',
  'var(--sg-color-warning)',
  'var(--sg-color-error)',
  'var(--sg-blue-4, #69b1ff)',
  'var(--sg-green-5, #95de64)',
]

const l = useAppLocale('dashboard')

const mode = ref<Mode>('operations')
const period = ref<Period>('14d')
const range = ref<[Date | null, Date | null]>([null, null])
const drillTab = ref<DrillTab>('overview')

const drillMetric = ref<MetricRow | null>(null)
const drillChannel = ref<ChannelMetric | null>(null)
const drillProduct = ref<ProductMetric | null>(null)

const drilldownRootRef = ref<HTMLDivElement | null>(null)

const modeOptions = computed(() => [
  { label: l.modes.operations, value: 'operations' },
  { label: l.modes.drilldown, value: 'drilldown' },
  { label: l.modes.editor, value: 'editor' },
])
const periodOptions = [
  { label: '7d', value: '7d' },
  { label: '14d', value: '14d' },
  { label: '30d', value: '30d' },
]
const drillTabOptions = computed(() => [
  { label: l.drilldown.overview, value: 'overview' },
  { label: l.drilldown.channels, value: 'channels' },
  { label: l.drilldown.products, value: 'products' },
])

const slice = computed(() => {
  const days = period.value === '7d' ? 7 : period.value === '14d' ? 14 : 30
  return daily30.slice(-days)
})

const totals = computed(() => {
  const s = slice.value
  const revenue = s.reduce((sum, d) => sum + d.revenue, 0)
  const orders = s.reduce((sum, d) => sum + d.orders, 0)
  const signups = s.reduce((sum, d) => sum + d.signups, 0)
  const active = s.length ? s[s.length - 1]!.active : 0
  const prevSlice = daily30.slice(-s.length * 2, -s.length)
  const prevRevenue = prevSlice.reduce((sum, d) => sum + d.revenue, 0) || 1
  const trend = ((revenue - prevRevenue) / prevRevenue) * 100
  return { revenue, orders, signups, active, trend }
})

const dateCategories = computed(() => slice.value.map((d) => d.date.slice(5)))

const revenueSeries = computed<ChartSeries[]>(() => [
  {
    id: 'revenue',
    label: l.drilldown.columns.revenue,
    values: slice.value.map((d) => d.revenue),
    color: 'var(--sg-color-primary)',
  },
])

const ordersSeries = computed<ChartSeries[]>(() => [
  {
    id: 'orders',
    label: l.drilldown.columns.orders,
    values: slice.value.map((d) => d.orders),
    color: 'var(--sg-color-success)',
  },
  {
    id: 'signups',
    label: l.stats.signups,
    values: slice.value.map((d) => d.signups),
    color: 'var(--sg-color-warning)',
  },
])

const activeSeries = computed<ChartSeries[]>(() => [
  {
    id: 'active',
    label: l.widgets.activeTitle,
    values: slice.value.map((d) => d.active),
    color: 'var(--sg-color-primary)',
  },
])

// Vue PieChart takes ChartSeries[] (one slice = one series with a single value).
const trafficSeries = computed<ChartSeries[]>(() =>
  trafficByCountry.slice(0, 6).map((t, i) => ({
    id: t.country,
    label: t.country,
    values: [t.visitors],
    color: PALETTE[i % PALETTE.length]!,
  })),
)

const operationsWidgets = computed<DashboardWidget[]>(() => [
  { id: 'revenue-chart', x: 1, y: 1, w: 8, h: 3 },
  { id: 'traffic-pie', x: 9, y: 1, w: 4, h: 3 },
  { id: 'orders-bar', x: 1, y: 4, w: 6, h: 3 },
  { id: 'active-area', x: 7, y: 4, w: 6, h: 3 },
  { id: 'health', x: 1, y: 7, w: 6, h: 4 },
  { id: 'activity', x: 7, y: 7, w: 6, h: 4 },
])

const editorWidgets = ref<DashboardWidget[]>(operationsWidgets.value.map((w) => ({ ...w })))

const trendTone = computed(() => (totals.value.trend >= 0 ? 'success' : 'error'))
const trendIcon = computed(() => (totals.value.trend >= 0 ? '▲' : '▼'))

const statItems = computed<StatItem[]>(() => [
  {
    key: 'revenue',
    icon: '💰',
    label: l.stats.revenue,
    value: money(totals.value.revenue, { compact: true }),
    sub: l.stats.revenueSub(trendIcon.value, percent(Math.abs(totals.value.trend))),
    subTone: trendTone.value,
    progress: Math.min(100, Math.abs(totals.value.trend) * 4),
    progressStatus: trendTone.value === 'success' ? 'success' : 'error',
  },
  {
    key: 'orders',
    icon: '📦',
    label: l.stats.orders,
    value: num(totals.value.orders),
    sub: l.stats.ordersSub((totals.value.orders / Math.max(1, slice.value.length)).toFixed(1)),
    subTone: 'default',
  },
  {
    key: 'signups',
    icon: '🆕',
    label: l.stats.signups,
    value: num(totals.value.signups),
    sub: l.stats.signupsSub,
    subTone: 'default',
  },
  {
    key: 'active',
    icon: '👥',
    label: l.stats.active,
    value: num(totals.value.active),
    sub: l.stats.activeSub,
    subTone: 'default',
  },
])

const widgetTitles = computed<Record<string, { title: string; hint: string }>>(() => ({
  'revenue-chart': {
    title: l.widgets.revenueTitle,
    hint: l.widgets.revenueHint(money(totals.value.revenue, { compact: true })),
  },
  'traffic-pie': {
    title: l.widgets.countriesTitle,
    hint: l.widgets.countriesHint(trafficByCountry.length),
  },
  'orders-bar': {
    title: l.widgets.ordersTitle,
    hint: l.widgets.ordersHint(num(totals.value.orders)),
  },
  'active-area': {
    title: l.widgets.activeTitle,
    hint: l.widgets.activeHint(num(totals.value.active)),
  },
  health: {
    title: l.widgets.healthTitle,
    hint: l.widgets.healthHint(serviceHealth.length),
  },
  activity: {
    title: l.widgets.activityTitle,
    hint: l.widgets.activityHint,
  },
}))

const widgetActionItems = computed(() => [
  { key: 'refresh', label: l.widgetActions.refresh },
  { key: 'export', label: l.widgetActions.exportPng },
  { key: 'pin', label: l.widgetActions.pinToTop },
])

function dispatchWidgetAction(widgetId: string, actionKey: string) {
  if (actionKey === 'refresh') notification.info(l.widgetToasts.refreshed(widgetId))
  else if (actionKey === 'export') notification.success(l.widgetToasts.exportQueued(widgetId))
  else if (actionKey === 'pin') notification.success(l.widgetToasts.pinned(widgetId))
}

function onWidgetContextMenu(e: MouseEvent, w: DashboardWidget) {
  e.preventDefault()
  e.stopPropagation()
  notification.info(l.widgetToasts.nodeContext(w.id))
}

function onDashboardContextMenu(e: MouseEvent) {
  e.preventDefault()
  notification.info(l.widgetToasts.canvasContext)
}

function onPrintClick() {
  if (drilldownRootRef.value) {
    printElement(drilldownRootRef.value, { fileName: 'analytics-overview' })
  }
}

function onExportClick() {
  notification.success(l.exportToast, l.exportToastSub)
}

function onLayoutChange(next: DashboardWidget[]) {
  editorWidgets.value = next
}

function onEditorAction(action: 'refresh' | 'settings' | 'remove', w: DashboardWidget) {
  if (action === 'refresh') notification.info(l.widgetToasts.refreshShort(w.id))
  else if (action === 'settings') notification.info(l.widgetToasts.settings(w.id))
  else notification.warning(l.widgetToasts.removed(w.id))
}

function closeDrawers() {
  drillMetric.value = null
  drillChannel.value = null
  drillProduct.value = null
}

/* ── Drill-down: overview table ─────────────────────────────────────────── */

const overviewSummary = computed(() => getSummary(dailyMetrics))
const overviewTrendIcon = computed(() => (overviewSummary.value.revenueTrend >= 0 ? '↑' : '↓'))

const overviewRows = computed(() =>
  dailyMetrics.map((m) => ({
    id: String(m.id),
    data: m as unknown as Record<string, unknown>,
  })),
)

const overviewColumns: TableColumn[] = [
  {
    key: 'date',
    title: l.drilldown.columns.date,
    width: 110,
    sortable: true,
    onFilter: (v, row) => String(row.date).includes(String(v)),
  },
  {
    key: 'revenue',
    title: l.drilldown.columns.revenue,
    width: 120,
    sortable: true,
    align: 'right',
    aggregate: 'sum',
    onFilter: (v, row) => Number(row.revenue) >= Number(v),
  },
  {
    key: 'orders',
    title: l.drilldown.columns.orders,
    width: 80,
    sortable: true,
    align: 'center',
    aggregate: 'sum',
  },
  {
    key: 'visitors',
    title: l.drilldown.columns.visitors,
    width: 100,
    sortable: true,
    align: 'center',
    aggregate: 'sum',
  },
  {
    key: 'conversion',
    title: l.drilldown.columns.conversion,
    width: 140,
    sortable: true,
  },
  {
    key: 'avgOrderValue',
    title: l.drilldown.columns.aov,
    width: 90,
    sortable: true,
    align: 'right',
  },
  {
    key: 'newCustomers',
    title: l.drilldown.columns.newCustomers,
    width: 70,
    sortable: true,
    align: 'center',
    aggregate: 'sum',
  },
  {
    key: 'returningCustomers',
    title: l.drilldown.columns.returning,
    width: 90,
    sortable: true,
    align: 'center',
    aggregate: 'sum',
  },
  { key: 'actions', title: '', width: 70 },
]

function pickOverviewRow(id: unknown) {
  const m = dailyMetrics.find((x) => String(x.id) === String(id))
  if (m) drillMetric.value = m
}

/* ── Drill-down: channels table ─────────────────────────────────────────── */

const channelRows = computed(() =>
  channelMetrics.map((c) => ({ id: c.channel, data: c as unknown as Record<string, unknown> })),
)

const totalChannelVisitors = computed(() => channelMetrics.reduce((s, c) => s + c.visitors, 0))
const totalChannelRevenue = computed(() => channelMetrics.reduce((s, c) => s + c.revenue, 0))

const channelSummaryItems = computed(() => [
  {
    key: 'visitors',
    label: l.drilldown.channelsTable.totalVisitors,
    value: num(totalChannelVisitors.value),
  },
  {
    key: 'revenue',
    label: l.drilldown.channelsTable.totalRevenue,
    value: money(totalChannelRevenue.value),
  },
  { key: 'top', label: l.drilldown.channelsTable.topChannel, value: l.channelTopValue },
  { key: 'conv', label: l.drilldown.channelsTable.bestConversion, value: l.channelBestConvValue },
])

const channelColumns = computed<TableColumn[]>(() => [
  {
    key: 'channel',
    title: l.drilldown.channelsTable.channel,
    width: 200,
    sortable: true,
    fixed: 'left',
  },
  {
    key: 'visitors',
    title: l.drilldown.channelsTable.visitors,
    width: 110,
    sortable: true,
    aggregate: 'sum',
  },
  {
    key: 'revenue',
    title: l.drilldown.channelsTable.revenue,
    width: 130,
    sortable: true,
    align: 'right',
    aggregate: 'sum',
  },
  {
    key: 'conversion',
    title: l.drilldown.channelsTable.conversion,
    width: 170,
    sortable: true,
    onFilter: (v, row) => Number(row.conversion) >= Number(v),
  },
  {
    key: 'trend',
    title: l.drilldown.channelsTable.trend,
    width: 120,
    filters: [
      { text: l.drilldown.channelsTable.trendUp, value: 'up' },
      { text: l.drilldown.channelsTable.trendFlat, value: 'flat' },
      { text: l.drilldown.channelsTable.trendDown, value: 'down' },
    ],
    onFilter: (v, row) => row.trend === v,
  },
  { key: 'actions', title: '', width: 90 },
])

function pickChannelRow(id: unknown) {
  const c = channelMetrics.find((x) => x.channel === String(id))
  if (c) drillChannel.value = c
}

/* ── Drill-down: products table ─────────────────────────────────────────── */

const productRows = computed(() =>
  topProducts.map((p) => ({ id: String(p.id), data: p as unknown as Record<string, unknown> })),
)

const productColumns = computed<TableColumn[]>(() => [
  {
    key: 'name',
    title: l.drilldown.productsTable.product,
    width: 240,
    sortable: true,
    fixed: 'left',
  },
  {
    key: 'unitsSold',
    title: l.drilldown.productsTable.unitsSold,
    width: 110,
    sortable: true,
    aggregate: 'sum',
  },
  {
    key: 'revenue',
    title: l.drilldown.productsTable.revenue,
    width: 130,
    sortable: true,
    align: 'right',
    aggregate: 'sum',
  },
  {
    key: 'rating',
    title: l.drilldown.productsTable.rating,
    width: 210,
    sortable: true,
  },
  {
    key: 'returnRate',
    title: l.drilldown.productsTable.returnRate,
    width: 130,
    sortable: true,
    onFilter: (v, row) => Number(row.returnRate) <= Number(v),
  },
  { key: 'actions', title: '', width: 90 },
])

function pickProductRow(id: unknown) {
  const p = topProducts.find((x) => String(x.id) === String(id))
  if (p) drillProduct.value = p
}

/* ── Drawer items ───────────────────────────────────────────────────────── */

const metricDrawerItems = computed(() => {
  const m = drillMetric.value
  if (!m) return []
  return [
    { key: 'date', label: l.drawers.date, value: m.date },
    { key: 'revenue', label: l.drawers.revenue, value: money(m.revenue) },
    { key: 'orders', label: l.drawers.orders, value: String(m.orders) },
    { key: 'visitors', label: l.drawers.visitors, value: num(m.visitors) },
    { key: 'conversion', label: l.drawers.conversion, value: percent(m.conversion, 2) },
    { key: 'aov', label: l.drawers.aov, value: money(m.avgOrderValue) },
    { key: 'newCustomers', label: l.drawers.newCustomers, value: String(m.newCustomers) },
    { key: 'returning', label: l.drawers.returning, value: String(m.returningCustomers) },
  ]
})

const channelDrawerItems = computed(() => {
  const c = drillChannel.value
  if (!c) return []
  return [
    { key: 'channel', label: l.drawers.channel, value: c.channel },
    { key: 'visitors', label: l.drawers.visitors, value: num(c.visitors) },
    { key: 'revenue', label: l.drawers.revenue, value: money(c.revenue) },
    { key: 'conversion', label: l.drawers.conversion, value: percent(c.conversion, 1) },
    { key: 'trend', label: l.drilldown.channelsTable.trend, value: l.trendLabel[c.trend] },
    { key: 'rpv', label: l.drawers.revenuePerVisitor, value: money(c.revenue / c.visitors) },
  ]
})

const productDrawerItems = computed(() => {
  const p = drillProduct.value
  if (!p) return []
  return [
    { key: 'product', label: l.drawers.product, value: p.name },
    { key: 'unitsSold', label: l.drilldown.productsTable.unitsSold, value: num(p.unitsSold) },
    { key: 'revenue', label: l.drawers.revenue, value: money(p.revenue) },
    { key: 'avgPrice', label: l.drawers.avgPrice, value: money(p.revenue / p.unitsSold) },
    { key: 'rating', label: l.drawers.rating, value: `⭐ ${p.rating}` },
    { key: 'returnRate', label: l.drawers.returnRateLabel, value: percent(p.returnRate, 1) },
  ]
})

function channelTrendTagColor(t: 'up' | 'flat' | 'down'): string {
  return t === 'up' ? 'success' : t === 'down' ? 'error' : 'default'
}

function activityTagColor(type: string): string {
  if (type === 'alert') return 'error'
  if (type === 'deploy') return 'success'
  if (type === 'edit') return 'warning'
  return 'default'
}

function serviceProgressStatus(s: 'healthy' | 'degraded' | 'down'): 'success' | 'active' | 'error' {
  if (s === 'healthy') return 'success'
  if (s === 'degraded') return 'active'
  return 'error'
}

function conversionStatus(n: number): 'success' | 'active' | 'error' {
  if (n >= 3) return 'success'
  if (n >= 2) return 'active'
  return 'error'
}

function channelConversionStatus(n: number): 'success' | 'active' {
  return n >= 4 ? 'success' : 'active'
}

function productReturnTone(n: number): string | undefined {
  return n > 3 ? 'var(--sg-color-error)' : undefined
}

function metricRevenueStatus(rev: number): 'success' | 'active' {
  return rev > 3000 ? 'success' : 'active'
}

function metricConversionStatus(c: number): 'success' | 'active' | 'error' {
  if (c >= 3) return 'success'
  if (c >= 2) return 'active'
  return 'error'
}

function productReturnStatus(rate: number): 'error' | 'active' | 'success' {
  if (rate > 3) return 'error'
  if (rate > 2) return 'active'
  return 'success'
}

function activityTypeLabel(rawType: string, fallback: string): string {
  const map = l.activityType as Record<string, string>
  return map[rawType] ?? fallback
}

function onServiceMenuSelect(key: string, name: string) {
  notification.info(l.serviceToast(key, name))
}

const serviceMenuItems = computed(() => [
  { key: 'restart', label: l.serviceMenu.restart },
  { key: 'logs', label: l.serviceMenu.viewLogs },
  { key: 'silence', label: l.serviceMenu.silence },
])
</script>

<template>
  <div class="sc-content" style="flex: 1">
    <SgNotificationContainer />

    <div class="db-toolbar">
      <div>
        <h2 style="margin: 0; font-size: 20px">{{ l.title }}</h2>
        <p style="margin: 4px 0 0; color: var(--sg-color-text-secondary); font-size: 13px">
          {{ l.lead }}
        </p>
      </div>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
        <SgSegmented
          :value="mode"
          :options="modeOptions"
          @change="(v: string) => (mode = v as Mode)"
        />
        <SgRangePicker v-model="range" />
        <SgSegmented
          :value="period"
          :options="periodOptions"
          @change="(v: string) => (period = v as Period)"
        />
        <SgButton v-if="mode === 'drilldown'" @click="onPrintClick">
          {{ l.printTable }}
        </SgButton>
        <SgButton v-else @click="onExportClick">{{ l.exportButton }}</SgButton>
      </div>
    </div>

    <StatsRow :items="statItems" />

    <!-- Operations mode: Dashboard with widgets -->
    <SgDashboard
      v-if="mode === 'operations'"
      :widgets="operationsWidgets"
      :columns="12"
      :row-height="70"
      :gap="12"
      @contextmenu="onDashboardContextMenu"
    >
      <template #widget="{ widget }">
        <!-- Widget header with title + hint + inline actions menu -->
        <div
          class="db-widget-shell"
          @contextmenu="(e: MouseEvent) => onWidgetContextMenu(e, widget)"
        >
          <div class="db-widget-title">
            <span>{{ widgetTitles[widget.id]?.title }}</span>
            <span class="db-widget-row-right">
              <span v-if="widgetTitles[widget.id]?.hint" class="db-widget-hint">
                {{ widgetTitles[widget.id]!.hint }}
              </span>
              <SgDropdown
                trigger="click"
                :items="widgetActionItems"
                @select="(key: string) => dispatchWidgetAction(widget.id, key)"
              >
                <SgButton size="small" type="text">⋯</SgButton>
              </SgDropdown>
            </span>
          </div>

          <!-- Widget body -->
          <div class="db-widget-body">
            <template v-if="widget.id === 'revenue-chart'">
              <SgLineChart
                :categories="dateCategories"
                :series="revenueSeries"
                :height="200"
                :legend="false"
                :crosshair="true"
                animate
                file-name="ops-revenue"
              />
            </template>

            <template v-else-if="widget.id === 'traffic-pie'">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <SgPieChart
                  :categories="[]"
                  :series="trafficSeries"
                  :width="180"
                  :height="180"
                  :inner-radius="0.4"
                />
                <SgChartLegend :series="trafficSeries" />
              </div>
            </template>

            <template v-else-if="widget.id === 'orders-bar'">
              <SgBarChart
                :categories="dateCategories"
                :series="ordersSeries"
                :height="200"
                legend
                file-name="ops-orders"
              />
            </template>

            <template v-else-if="widget.id === 'active-area'">
              <SgAreaChart
                :categories="dateCategories"
                :series="activeSeries"
                :height="200"
                file-name="ops-active"
              />
            </template>

            <template v-else-if="widget.id === 'health'">
              <SgEmpty v-if="serviceHealth.length === 0" :description="l.empty.noServices" />
              <div v-else class="db-list">
                <div v-for="s in serviceHealth" :key="s.name" class="db-list-row">
                  <div class="db-list-left">
                    <SgTag :color="HEALTH_COLOR[s.status]">{{ l.healthLabel[s.status] }}</SgTag>
                    <strong>{{ s.name }}</strong>
                    <span class="db-muted">{{ s.region }}</span>
                  </div>
                  <div class="db-list-right">
                    <SgProgress
                      :percent="s.uptime"
                      :show-info="false"
                      :status="serviceProgressStatus(s.status)"
                    />
                    <span style="font-size: 12px; min-width: 60px; text-align: right">
                      {{ s.latencyMs }}ms · {{ percent(s.uptime, 2) }}
                    </span>
                    <SgDropdown
                      trigger="click"
                      :items="serviceMenuItems"
                      @select="(key: string) => onServiceMenuSelect(key, s.name)"
                    >
                      <SgButton size="small" type="text">⋯</SgButton>
                    </SgDropdown>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="widget.id === 'activity'">
              <div class="db-list">
                <div v-for="a in recentActivity.slice(0, 8)" :key="a.id" class="db-list-row">
                  <div class="db-list-left">
                    <SgAvatar size="small" :style="{ background: colorFromString(a.user) }">
                      {{ initials(a.user) }}
                    </SgAvatar>
                    <div>
                      <div style="font-size: 13px">
                        <strong>{{ a.user }}</strong>
                        <span class="db-muted">
                          {{ activityTypeLabel(a.action, a.action) }}
                        </span>
                        {{ a.target }}
                      </div>
                      <div class="db-muted" style="font-size: 11px">{{ a.ago }}</div>
                    </div>
                  </div>
                  <SgTag :color="activityTagColor(a.type)">
                    {{ l.activityType[a.type] }}
                  </SgTag>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </SgDashboard>

    <!-- Editor mode -->
    <SgDashboardEditor
      v-if="mode === 'editor'"
      :widgets="editorWidgets"
      :columns="12"
      :row-height="70"
      :gap="12"
      @layout-change="onLayoutChange"
    >
      <template #widget="{ widget }">
        <div class="db-widget-shell">
          <div class="db-widget-title">
            <span>{{ widgetTitles[widget.id]?.title ?? widget.id }}</span>
            <span class="db-widget-row-right">
              <SgButton size="small" type="text" @click="onEditorAction('refresh', widget)"
                >↻</SgButton
              >
              <SgButton size="small" type="text" @click="onEditorAction('settings', widget)"
                >⚙</SgButton
              >
              <SgButton size="small" type="text" danger @click="onEditorAction('remove', widget)"
                >×</SgButton
              >
            </span>
          </div>
          <div class="db-widget-body">
            <template v-if="widget.id === 'revenue-chart'">
              <SgLineChart :categories="dateCategories" :series="revenueSeries" :height="180" />
            </template>
            <template v-else-if="widget.id === 'traffic-pie'">
              <SgPieChart
                :categories="[]"
                :series="trafficSeries"
                :height="180"
                :inner-radius="0.4"
              />
            </template>
            <template v-else-if="widget.id === 'orders-bar'">
              <SgBarChart
                :categories="dateCategories"
                :series="ordersSeries"
                :height="180"
                legend
              />
            </template>
            <template v-else-if="widget.id === 'active-area'">
              <SgAreaChart :categories="dateCategories" :series="activeSeries" :height="180" />
            </template>
            <template v-else>
              <div style="color: var(--sg-color-text-secondary); font-size: 12px">
                {{ widget.id }}
              </div>
            </template>
          </div>
        </div>
      </template>
    </SgDashboardEditor>

    <!-- Drilldown mode -->
    <div v-if="mode === 'drilldown'" ref="drilldownRootRef" class="db-drilldown">
      <SgSegmented
        :value="drillTab"
        :options="drillTabOptions"
        style="margin-bottom: 16px"
        @change="(v: string) => (drillTab = v as DrillTab)"
      />

      <!-- Overview sub-tab -->
      <div v-if="drillTab === 'overview'">
        <div style="margin-bottom: 8px; font-size: 13px; color: var(--sg-color-text-secondary)">
          {{ l.drilldownLead(overviewTrendIcon, Math.abs(overviewSummary.revenueTrend)) }}
        </div>
        <SgTable
          :columns="overviewColumns"
          :data="overviewRows"
          :page-size="15"
          size="small"
          bordered
          striped
          sticky
          searchable
          footer
        >
          <template #cell="{ column, value, row, id }">
            <template v-if="column.key === 'date'">
              <span style="font-family: monospace; font-size: 12px">{{ String(value) }}</span>
            </template>
            <template v-else-if="column.key === 'revenue'">{{ money(Number(value)) }}</template>
            <template v-else-if="column.key === 'visitors'">{{ num(Number(value)) }}</template>
            <template v-else-if="column.key === 'conversion'">
              <div style="display: flex; align-items: center; gap: 6px">
                <SgProgress
                  :percent="Number(value) * 20"
                  :show-info="false"
                  :status="conversionStatus(Number(value))"
                  :style="{ width: '60px' }"
                />
                <span>{{ percent(Number(value), 2) }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'avgOrderValue'">{{
              money(Number(value))
            }}</template>
            <template v-else-if="column.key === 'actions'">
              <SgButton size="small" @click="pickOverviewRow(row.id ?? id)">📊</SgButton>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </SgTable>
      </div>

      <!-- Channels sub-tab -->
      <div v-if="drillTab === 'channels'">
        <SgDescriptions
          :title="l.drilldown.channelsTable.summaryTitle"
          :items="channelSummaryItems"
          :column="2"
          size="small"
          style="margin-bottom: 16px"
        />
        <SgTable
          :columns="channelColumns"
          :data="channelRows"
          size="small"
          bordered
          searchable
          footer
        >
          <template #cell="{ column, value, row, id }">
            <template v-if="column.key === 'channel'">
              <strong>{{ String(value) }}</strong>
            </template>
            <template v-else-if="column.key === 'visitors'">{{ num(Number(value)) }}</template>
            <template v-else-if="column.key === 'revenue'">{{ money(Number(value)) }}</template>
            <template v-else-if="column.key === 'conversion'">
              <div style="display: flex; align-items: center; gap: 8px">
                <SgProgress
                  :percent="Number(value) * 15"
                  :show-info="false"
                  :status="channelConversionStatus(Number(value))"
                  :style="{ width: '80px' }"
                />
                <span>{{ percent(Number(value), 1) }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'trend'">
              <SgTag :color="channelTrendTagColor(String(value) as 'up' | 'flat' | 'down')">
                {{ l.trendLabel[String(value) as 'up' | 'flat' | 'down'] }}
              </SgTag>
            </template>
            <template v-else-if="column.key === 'actions'">
              <SgButton size="small" @click="pickChannelRow(row.channel ?? id)">
                {{ l.detailsBtn }}
              </SgButton>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </SgTable>
      </div>

      <!-- Products sub-tab -->
      <div v-if="drillTab === 'products'">
        <SgTable
          :columns="productColumns"
          :data="productRows"
          size="small"
          bordered
          searchable
          footer
        >
          <template #cell="{ column, value, row, id }">
            <template v-if="column.key === 'name'">
              <strong>{{ String(value) }}</strong>
            </template>
            <template v-else-if="column.key === 'unitsSold'">{{ num(Number(value)) }}</template>
            <template v-else-if="column.key === 'revenue'">{{ money(Number(value)) }}</template>
            <template v-else-if="column.key === 'rating'">
              <div style="display: flex; align-items: center; gap: 6px">
                <SgRate :value="Number(value)" disabled allow-half :count="5" />
                <span style="font-size: 12px">{{ String(value) }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'returnRate'">
              <div style="display: flex; align-items: center; gap: 6px">
                <span :style="{ color: productReturnTone(Number(value)) }">
                  {{ percent(Number(value), 1) }}
                </span>
                <SgBadge v-if="Number(value) > 3" :count="1" color="red" />
              </div>
            </template>
            <template v-else-if="column.key === 'actions'">
              <SgButton size="small" @click="pickProductRow(row.id ?? id)">
                {{ l.detailsBtn }}
              </SgButton>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </SgTable>
      </div>
    </div>

    <!-- Metric drawer -->
    <SgDrawer
      :open="!!drillMetric"
      :title="drillMetric ? l.drawers.dayDetailsTitle(drillMetric.date) : ''"
      :width="420"
      @close="closeDrawers"
    >
      <div v-if="drillMetric" style="display: flex; flex-direction: column; gap: 16px">
        <SgDescriptions :items="metricDrawerItems" :column="1" size="small" />
        <h4>{{ l.drawers.revenuePerformance }}</h4>
        <SgProgress
          :percent="Math.min(100, Math.round((drillMetric.revenue / 5000) * 100))"
          :status="metricRevenueStatus(drillMetric.revenue)"
        />
        <h4>{{ l.drawers.conversionRate }}</h4>
        <SgProgress
          :percent="Math.round(drillMetric.conversion * 20)"
          :status="metricConversionStatus(drillMetric.conversion)"
        />
      </div>
    </SgDrawer>

    <!-- Channel drawer -->
    <SgDrawer
      :open="!!drillChannel"
      :title="drillChannel?.channel ?? ''"
      :width="400"
      @close="closeDrawers"
    >
      <div v-if="drillChannel" style="display: flex; flex-direction: column; gap: 16px">
        <SgDescriptions :items="channelDrawerItems" :column="1" size="small" />
        <h4>{{ l.drawers.trafficShare }}</h4>
        <SgProgress
          :percent="Math.round((drillChannel.visitors / totalChannelVisitors) * 100)"
          status="active"
        />
        <h4>{{ l.drawers.revenueShare }}</h4>
        <SgProgress
          :percent="Math.round((drillChannel.revenue / totalChannelRevenue) * 100)"
          status="success"
        />
      </div>
    </SgDrawer>

    <!-- Product drawer -->
    <SgDrawer
      :open="!!drillProduct"
      :title="drillProduct?.name ?? ''"
      :width="420"
      @close="closeDrawers"
    >
      <div v-if="drillProduct" style="display: flex; flex-direction: column; gap: 16px">
        <SgDescriptions :items="productDrawerItems" :column="1" size="small" />
        <h4>{{ l.drawers.ratingHeading }}</h4>
        <SgRate :value="drillProduct.rating" disabled allow-half :count="5" />
        <h4>{{ l.drawers.returnRateHealth }}</h4>
        <SgProgress
          :percent="drillProduct.returnRate * 10"
          :status="productReturnStatus(drillProduct.returnRate)"
        />
      </div>
    </SgDrawer>
  </div>
</template>

<style scoped>
.db-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}
.db-widget-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 6px;
}
.db-widget-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  width: 100%;
}
.db-widget-row-right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.db-widget-hint {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  font-weight: 400;
}
.db-widget-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.db-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.db-list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 4px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  gap: 8px;
}
.db-list-row:last-child {
  border-bottom: none;
}
.db-list-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}
.db-list-right {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 220px;
  flex-shrink: 0;
}
.db-muted {
  color: var(--sg-color-text-secondary);
  font-size: 12px;
}
.db-drilldown {
  margin-top: 8px;
}
@media (max-width: 900px) {
  .db-list-right {
    width: 140px;
  }
}
</style>
