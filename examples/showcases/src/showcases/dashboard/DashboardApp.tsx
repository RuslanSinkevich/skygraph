import { useMemo, useRef, useState } from 'react'
import {
  Dashboard,
  DashboardEditor,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  ChartLegend,
  RangePicker,
  Segmented,
  Tag,
  Avatar,
  Progress,
  Button,
  NotificationContainer,
  notification,
  Empty,
  Drawer,
  Descriptions,
  Dropdown,
  Table,
  Rate,
  Badge,
} from '@skygraph/react'
import type {
  ChartSeries,
  PieChartSlice,
  DashboardWidget,
  WidgetAction,
  TableColumn,
  TableRef,
} from '@skygraph/react'
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
import { StatsRow, money, num, percent, colorFromString, initials, useAppLocale } from '../_shared'
import type { ShowcasesLocale } from '@skygraph-examples/shared'

type DashboardLocale = ShowcasesLocale['apps']['dashboard']

const HEALTH_COLOR: Record<'healthy' | 'degraded' | 'down', string> = {
  healthy: 'success',
  degraded: 'warning',
  down: 'error',
}

type Period = '7d' | '14d' | '30d'
type Mode = 'operations' | 'drilldown' | 'editor'

const PALETTE = [
  'var(--sg-color-primary)',
  'var(--sg-color-success)',
  'var(--sg-color-warning)',
  'var(--sg-color-error)',
  'var(--sg-blue-4, #69b1ff)',
  'var(--sg-green-5, #95de64)',
]

interface AnalyticsContext {
  metric: MetricRow | null
  channel: ChannelMetric | null
  product: ProductMetric | null
}

export function DashboardApp() {
  const l = useAppLocale('dashboard')
  const [mode, setMode] = useState<Mode>('operations')
  const [period, setPeriod] = useState<Period>('14d')
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])
  const [drill, setDrill] = useState<AnalyticsContext>({
    metric: null,
    channel: null,
    product: null,
  })
  const tableRef = useRef<TableRef>(null)

  const slice = useMemo(() => {
    const days = period === '7d' ? 7 : period === '14d' ? 14 : 30
    return daily30.slice(-days)
  }, [period])

  const totals = useMemo(() => {
    const revenue = slice.reduce((s, d) => s + d.revenue, 0)
    const orders = slice.reduce((s, d) => s + d.orders, 0)
    const signups = slice.reduce((s, d) => s + d.signups, 0)
    const active = slice.length ? slice[slice.length - 1]!.active : 0
    const prevSlice = daily30.slice(-slice.length * 2, -slice.length)
    const prevRevenue = prevSlice.reduce((s, d) => s + d.revenue, 0) || 1
    const trend = ((revenue - prevRevenue) / prevRevenue) * 100
    return { revenue, orders, signups, active, trend }
  }, [slice])

  const dateCategories = useMemo(() => slice.map((d) => d.date.slice(5)), [slice])

  const revenueSeries: ChartSeries[] = [
    {
      id: 'revenue',
      label: l.drilldown.columns.revenue,
      values: slice.map((d) => d.revenue),
      color: 'var(--sg-color-primary)',
    },
  ]

  const ordersSeries: ChartSeries[] = [
    {
      id: 'orders',
      label: l.drilldown.columns.orders,
      values: slice.map((d) => d.orders),
      color: 'var(--sg-color-success)',
    },
    {
      id: 'signups',
      label: l.stats.signups,
      values: slice.map((d) => d.signups),
      color: 'var(--sg-color-warning)',
    },
  ]

  const activeSeries: ChartSeries[] = [
    {
      id: 'active',
      label: l.widgets.activeTitle,
      values: slice.map((d) => d.active),
      color: 'var(--sg-color-primary)',
    },
  ]

  const trafficSlices: PieChartSlice[] = trafficByCountry.slice(0, 6).map((t, i) => ({
    id: t.country,
    label: t.country,
    value: t.visitors,
    color: PALETTE[i % PALETTE.length]!,
  }))

  const trafficLegend: ChartSeries[] = trafficSlices.map((s) => ({
    id: s.id,
    label: s.label,
    color: s.color,
    values: [s.value],
  }))

  const widgetActions = (id: string): WidgetAction[] => [
    {
      id: 'refresh',
      label: l.widgetActions.refresh,
      onClick: () => notification.info(l.widgetToasts.refreshed(id)),
    },
    {
      id: 'export',
      label: l.widgetActions.exportPng,
      onClick: (w) => notification.success(l.widgetToasts.exportQueued(w.id)),
    },
    {
      id: 'pin',
      label: l.widgetActions.pinToTop,
      onClick: () => notification.success(l.widgetToasts.pinned(id)),
    },
  ]

  const buildWidgets = (): DashboardWidget[] => [
    {
      id: 'revenue-chart',
      title: (
        <WidgetTitle
          title={l.widgets.revenueTitle}
          hint={l.widgets.revenueHint(money(totals.revenue, { compact: true }))}
        />
      ),
      x: 1,
      y: 1,
      w: 8,
      h: 3,
      actions: widgetActions('revenue-chart'),
      children: (
        <LineChart
          categories={dateCategories}
          series={revenueSeries}
          height={200}
          legend={false}
          actions
          crosshair
          fileName="ops-revenue"
          animate
        />
      ),
    },
    {
      id: 'traffic-pie',
      title: (
        <WidgetTitle
          title={l.widgets.countriesTitle}
          hint={l.widgets.countriesHint(trafficByCountry.length)}
        />
      ),
      x: 9,
      y: 1,
      w: 4,
      h: 3,
      actions: widgetActions('traffic-pie'),
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <PieChart data={trafficSlices} width={180} height={180} innerRadius={48} actions />
          <ChartLegend series={trafficLegend} />
        </div>
      ),
    },
    {
      id: 'orders-bar',
      title: (
        <WidgetTitle
          title={l.widgets.ordersTitle}
          hint={l.widgets.ordersHint(num(totals.orders))}
        />
      ),
      x: 1,
      y: 4,
      w: 6,
      h: 3,
      actions: widgetActions('orders-bar'),
      children: (
        <BarChart
          categories={dateCategories}
          series={ordersSeries}
          height={200}
          legend
          actions
          fileName="ops-orders"
        />
      ),
    },
    {
      id: 'active-area',
      title: (
        <WidgetTitle
          title={l.widgets.activeTitle}
          hint={l.widgets.activeHint(num(totals.active))}
        />
      ),
      x: 7,
      y: 4,
      w: 6,
      h: 3,
      actions: widgetActions('active-area'),
      children: (
        <AreaChart
          categories={dateCategories}
          series={activeSeries}
          height={200}
          actions
          fileName="ops-active"
        />
      ),
    },
    {
      id: 'health',
      title: (
        <WidgetTitle
          title={l.widgets.healthTitle}
          hint={l.widgets.healthHint(serviceHealth.length)}
        />
      ),
      x: 1,
      y: 7,
      w: 6,
      h: 4,
      actions: widgetActions('health'),
      children: <ServiceList l={l} />,
    },
    {
      id: 'activity',
      title: <WidgetTitle title={l.widgets.activityTitle} hint={l.widgets.activityHint} />,
      x: 7,
      y: 7,
      w: 6,
      h: 4,
      actions: widgetActions('activity'),
      children: <ActivityFeed l={l} />,
    },
  ]

  const [widgets, setWidgets] = useState<DashboardWidget[]>(buildWidgets)

  // Rebuild widgets whenever period changes (so charts re-key on data).
  const operationsWidgets = useMemo(buildWidgets, [period, slice]) // eslint-disable-line react-hooks/exhaustive-deps

  const trendTone = totals.trend >= 0 ? 'success' : 'error'
  const trendIcon = totals.trend >= 0 ? '▲' : '▼'

  const handleWidgetContextMenu = (e: React.MouseEvent, w: DashboardWidget) => {
    e.preventDefault()
    notification.info(l.widgetToasts.nodeContext(w.id))
  }

  const handleDashboardContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    notification.info(l.widgetToasts.canvasContext)
  }

  const handlePrint = () => {
    tableRef.current?.print({ fileName: 'analytics-overview' })
  }

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />

      <div className="db-toolbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>{l.title}</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
            {l.lead}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Segmented
            value={mode}
            onChange={(v) => setMode(v as Mode)}
            options={[
              { label: l.modes.operations, value: 'operations' },
              { label: l.modes.drilldown, value: 'drilldown' },
              { label: l.modes.editor, value: 'editor' },
            ]}
          />
          <RangePicker value={range} onChange={(v) => setRange(v as [Date | null, Date | null])} />
          <Segmented
            value={period}
            onChange={(v) => setPeriod(v as Period)}
            options={[
              { label: '7d', value: '7d' },
              { label: '14d', value: '14d' },
              { label: '30d', value: '30d' },
            ]}
          />
          {mode === 'drilldown' ? (
            <Button onClick={handlePrint}>{l.printTable}</Button>
          ) : (
            <Button onClick={() => notification.success(l.exportToast, l.exportToastSub)}>
              {l.exportButton}
            </Button>
          )}
        </div>
      </div>

      <StatsRow
        items={[
          {
            key: 'revenue',
            icon: '💰',
            label: l.stats.revenue,
            value: money(totals.revenue, { compact: true }),
            sub: l.stats.revenueSub(trendIcon, percent(Math.abs(totals.trend))),
            subTone: trendTone,
            progress: Math.min(100, Math.abs(totals.trend) * 4),
            progressStatus: trendTone === 'success' ? 'success' : 'error',
          },
          {
            key: 'orders',
            icon: '📦',
            label: l.stats.orders,
            value: num(totals.orders),
            sub: l.stats.ordersSub((totals.orders / slice.length).toFixed(1)),
            subTone: 'default',
          },
          {
            key: 'signups',
            icon: '🆕',
            label: l.stats.signups,
            value: num(totals.signups),
            sub: l.stats.signupsSub,
            subTone: 'default',
          },
          {
            key: 'active',
            icon: '👥',
            label: l.stats.active,
            value: num(totals.active),
            sub: l.stats.activeSub,
            subTone: 'default',
          },
        ]}
      />

      {mode === 'operations' && (
        <Dashboard
          widgets={operationsWidgets}
          columns={12}
          rowHeight={70}
          gap={12}
          onWidgetContextMenu={handleWidgetContextMenu}
          onDashboardContextMenu={handleDashboardContextMenu}
        />
      )}

      {mode === 'editor' && (
        <DashboardEditor
          widgets={widgets}
          onLayoutChange={(next) => setWidgets(next)}
          onWidgetRefresh={(w) => notification.info(l.widgetToasts.refreshShort(w.id))}
          onWidgetSettings={(w) => notification.info(l.widgetToasts.settings(w.id))}
          onWidgetRemove={(w) => notification.warning(l.widgetToasts.removed(w.id))}
          columns={12}
          rowHeight={70}
          gap={12}
        />
      )}

      {mode === 'drilldown' && (
        <DrillDownView
          l={l}
          tableRef={tableRef}
          slice={slice}
          onPickMetric={(m) => setDrill({ metric: m, channel: null, product: null })}
          onPickChannel={(c) => setDrill({ metric: null, channel: c, product: null })}
          onPickProduct={(p) => setDrill({ metric: null, channel: null, product: p })}
        />
      )}

      <Drawer
        open={!!drill.metric}
        onClose={() => setDrill({ metric: null, channel: null, product: null })}
        title={l.drawers.dayDetailsTitle(drill.metric?.date ?? '')}
        width={420}
      >
        {drill.metric && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: l.drawers.date, children: drill.metric.date },
                { label: l.drawers.revenue, children: money(drill.metric.revenue) },
                { label: l.drawers.orders, children: String(drill.metric.orders) },
                { label: l.drawers.visitors, children: num(drill.metric.visitors) },
                { label: l.drawers.conversion, children: percent(drill.metric.conversion, 2) },
                { label: l.drawers.aov, children: money(drill.metric.avgOrderValue) },
                { label: l.drawers.newCustomers, children: String(drill.metric.newCustomers) },
                { label: l.drawers.returning, children: String(drill.metric.returningCustomers) },
              ]}
              column={1}
              size="small"
            />
            <h4>{l.drawers.revenuePerformance}</h4>
            <Progress
              percent={Math.min(100, Math.round((drill.metric.revenue / 5000) * 100))}
              status={drill.metric.revenue > 3000 ? 'success' : 'active'}
            />
            <h4>{l.drawers.conversionRate}</h4>
            <Progress
              percent={Math.round(drill.metric.conversion * 20)}
              status={
                drill.metric.conversion >= 3
                  ? 'success'
                  : drill.metric.conversion >= 2
                    ? 'active'
                    : 'error'
              }
            />
          </div>
        )}
      </Drawer>

      <Drawer
        open={!!drill.channel}
        onClose={() => setDrill({ metric: null, channel: null, product: null })}
        title={drill.channel?.channel ?? ''}
        width={400}
      >
        {drill.channel && <ChannelDetail l={l} channel={drill.channel} />}
      </Drawer>

      <Drawer
        open={!!drill.product}
        onClose={() => setDrill({ metric: null, channel: null, product: null })}
        title={drill.product?.name ?? ''}
        width={420}
      >
        {drill.product && <ProductDetail l={l} product={drill.product} />}
      </Drawer>

      <style>{styles}</style>
    </div>
  )
}

interface DrillDownViewProps {
  l: DashboardLocale
  tableRef: React.Ref<TableRef>
  slice: typeof daily30
  onPickMetric: (m: MetricRow) => void
  onPickChannel: (c: ChannelMetric) => void
  onPickProduct: (p: ProductMetric) => void
}

function DrillDownView({
  l,
  tableRef,
  slice,
  onPickMetric,
  onPickChannel,
  onPickProduct,
}: DrillDownViewProps) {
  const [tab, setTab] = useState<'overview' | 'channels' | 'products'>('overview')
  void slice

  return (
    <div className="db-drilldown">
      <Segmented
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        options={[
          { label: l.drilldown.overview, value: 'overview' },
          { label: l.drilldown.channels, value: 'channels' },
          { label: l.drilldown.products, value: 'products' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {tab === 'overview' && <OverviewTable l={l} tableRef={tableRef} onPick={onPickMetric} />}
      {tab === 'channels' && <ChannelsTable l={l} onPick={onPickChannel} />}
      {tab === 'products' && <ProductsTable l={l} onPick={onPickProduct} />}
    </div>
  )
}

function OverviewTable({
  l,
  tableRef,
  onPick,
}: {
  l: DashboardLocale
  tableRef: React.Ref<TableRef>
  onPick: (m: MetricRow) => void
}) {
  const tableData = useMemo(
    () =>
      dailyMetrics.map((m) => ({
        id: String(m.id),
        data: m as unknown as Record<string, unknown>,
      })),
    [],
  )
  const summary = getSummary(dailyMetrics)
  const trendIcon = summary.revenueTrend >= 0 ? '↑' : '↓'

  const columns: TableColumn[] = [
    {
      key: 'date',
      title: l.drilldown.columns.date,
      width: 110,
      sortable: true,
      filterMode: 'search',
      onFilter: (v, row) => String(row.date).includes(String(v)),
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
    {
      key: 'revenue',
      title: l.drilldown.columns.revenue,
      width: 120,
      sortable: true,
      align: 'right',
      filterMode: 'advanced',
      advancedFilterType: 'number',
      onFilter: (v, row) => Number(row.revenue) >= Number(v),
      render: (val) => money(Number(val)),
      aggregate: 'sum',
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
      render: (v) => num(Number(v)),
      aggregate: 'sum',
    },
    {
      key: 'conversion',
      title: l.drilldown.columns.conversion,
      width: 130,
      sortable: true,
      render: (val) => {
        const n = Number(val)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Progress
              percent={n * 20}
              showInfo={false}
              style={{ width: 60 }}
              status={n >= 3 ? 'success' : n >= 2 ? 'active' : 'error'}
            />
            <span>{percent(n, 2)}</span>
          </div>
        )
      },
    },
    {
      key: 'avgOrderValue',
      title: l.drilldown.columns.aov,
      width: 80,
      sortable: true,
      align: 'right',
      render: (v) => money(Number(v)),
    },
    {
      key: 'newCustomers',
      title: l.drilldown.columns.newCustomers,
      width: 60,
      sortable: true,
      align: 'center',
      aggregate: 'sum',
    },
    {
      key: 'returningCustomers',
      title: l.drilldown.columns.returning,
      width: 80,
      sortable: true,
      align: 'center',
      aggregate: 'sum',
    },
    {
      key: 'actions',
      title: '',
      width: 60,
      render: (_v, row) => (
        <Button
          size="small"
          onClick={() => {
            const m = dailyMetrics.find((x) => String(x.id) === String(row.id))
            if (m) onPick(m)
          }}
        >
          📊
        </Button>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        {l.drilldownLead(trendIcon, Math.abs(summary.revenueTrend))}
      </div>
      <Table
        ref={tableRef}
        columns={columns}
        data={tableData}
        pageSize={15}
        size="small"
        bordered
        striped
        sticky
        searchable
        exportable
        printable={{ fileName: 'analytics-overview' }}
        densityToggle
        columnPinning
        columnVisibility
        groupByOptions={[
          { key: 'returningCustomers', label: l.drilldown.groupedReturning },
          { key: 'orders', label: l.drilldown.groupedOrders },
        ]}
        footer
      />
    </div>
  )
}

function ChannelsTable({ l, onPick }: { l: DashboardLocale; onPick: (c: ChannelMetric) => void }) {
  const tableData = useMemo(
    () =>
      channelMetrics.map((c) => ({ id: c.channel, data: c as unknown as Record<string, unknown> })),
    [],
  )
  const totalVisitors = channelMetrics.reduce((s, c) => s + c.visitors, 0)
  const totalRevenue = channelMetrics.reduce((s, c) => s + c.revenue, 0)

  const columns: TableColumn[] = [
    {
      key: 'channel',
      title: l.drilldown.channelsTable.channel,
      width: 200,
      sortable: true,
      fixed: 'left',
      render: (v) => <strong>{String(v)}</strong>,
    },
    {
      key: 'visitors',
      title: l.drilldown.channelsTable.visitors,
      width: 110,
      sortable: true,
      render: (v) => num(Number(v)),
      aggregate: 'sum',
    },
    {
      key: 'revenue',
      title: l.drilldown.channelsTable.revenue,
      width: 130,
      sortable: true,
      align: 'right',
      render: (v) => money(Number(v)),
      aggregate: 'sum',
    },
    {
      key: 'conversion',
      title: l.drilldown.channelsTable.conversion,
      width: 160,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      onFilter: (v, row) => Number(row.conversion) >= Number(v),
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress
            percent={Number(val) * 15}
            showInfo={false}
            style={{ width: 80 }}
            status={Number(val) >= 4 ? 'success' : 'active'}
          />
          <span>{percent(Number(val), 1)}</span>
        </div>
      ),
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
      render: (v) => (
        <Tag color={v === 'up' ? 'success' : v === 'down' ? 'error' : 'default'}>
          {l.trendLabel[v as 'up' | 'flat' | 'down']}
        </Tag>
      ),
    },
    {
      key: 'actions',
      title: '',
      width: 80,
      render: (_v, row) => (
        <Button
          size="small"
          onClick={() => {
            const c = channelMetrics.find((x) => x.channel === String(row.channel))
            if (c) onPick(c)
          }}
        >
          {l.detailsBtn}
        </Button>
      ),
    },
  ]

  return (
    <>
      <Descriptions
        title={l.drilldown.channelsTable.summaryTitle}
        items={[
          { label: l.drilldown.channelsTable.totalVisitors, children: num(totalVisitors) },
          { label: l.drilldown.channelsTable.totalRevenue, children: money(totalRevenue) },
          { label: l.drilldown.channelsTable.topChannel, children: l.channelTopValue },
          { label: l.drilldown.channelsTable.bestConversion, children: l.channelBestConvValue },
        ]}
        column={2}
        size="small"
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        data={tableData}
        size="small"
        bordered
        searchable
        columnPinning
        densityToggle
        exportable
        footer
      />
    </>
  )
}

function ProductsTable({ l, onPick }: { l: DashboardLocale; onPick: (p: ProductMetric) => void }) {
  const tableData = useMemo(
    () =>
      topProducts.map((p) => ({ id: String(p.id), data: p as unknown as Record<string, unknown> })),
    [],
  )

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: l.drilldown.productsTable.product,
      width: 240,
      sortable: true,
      fixed: 'left',
      render: (v) => <strong>{String(v)}</strong>,
    },
    {
      key: 'unitsSold',
      title: l.drilldown.productsTable.unitsSold,
      width: 110,
      sortable: true,
      render: (v) => num(Number(v)),
      aggregate: 'sum',
    },
    {
      key: 'revenue',
      title: l.drilldown.productsTable.revenue,
      width: 130,
      sortable: true,
      align: 'right',
      render: (v) => money(Number(v)),
      aggregate: 'sum',
    },
    {
      key: 'rating',
      title: l.drilldown.productsTable.rating,
      width: 200,
      sortable: true,
      render: (v) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Rate value={Number(v)} disabled allowHalf count={5} />
          <span style={{ fontSize: 12 }}>{String(v)}</span>
        </div>
      ),
    },
    {
      key: 'returnRate',
      title: l.drilldown.productsTable.returnRate,
      width: 130,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      onFilter: (v, row) => Number(row.returnRate) <= Number(v),
      render: (v) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: Number(v) > 3 ? 'var(--sg-color-error)' : undefined }}>
            {percent(Number(v), 1)}
          </span>
          {Number(v) > 3 && <Badge count={1} color="red" />}
        </div>
      ),
    },
    {
      key: 'actions',
      title: '',
      width: 90,
      render: (_v, row) => (
        <Button
          size="small"
          onClick={() => {
            const p = topProducts.find((x) => String(x.id) === String(row.id))
            if (p) onPick(p)
          }}
        >
          {l.detailsBtn}
        </Button>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={tableData}
      size="small"
      bordered
      searchable
      columnPinning
      densityToggle
      exportable
      footer
    />
  )
}

function ChannelDetail({ l, channel }: { l: DashboardLocale; channel: ChannelMetric }) {
  const totalVisitors = channelMetrics.reduce((s, c) => s + c.visitors, 0)
  const totalRevenue = channelMetrics.reduce((s, c) => s + c.revenue, 0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions
        items={[
          { label: l.drawers.channel, children: channel.channel },
          { label: l.drawers.visitors, children: num(channel.visitors) },
          { label: l.drawers.revenue, children: money(channel.revenue) },
          { label: l.drawers.conversion, children: percent(channel.conversion, 1) },
          {
            label: l.drilldown.channelsTable.trend,
            children: (
              <Tag
                color={
                  channel.trend === 'up'
                    ? 'success'
                    : channel.trend === 'down'
                      ? 'error'
                      : 'default'
                }
              >
                {l.trendLabel[channel.trend]}
              </Tag>
            ),
          },
          {
            label: l.drawers.revenuePerVisitor,
            children: money(channel.revenue / channel.visitors),
          },
        ]}
        column={1}
        size="small"
      />
      <h4>{l.drawers.trafficShare}</h4>
      <Progress percent={Math.round((channel.visitors / totalVisitors) * 100)} status="active" />
      <h4>{l.drawers.revenueShare}</h4>
      <Progress percent={Math.round((channel.revenue / totalRevenue) * 100)} status="success" />
    </div>
  )
}

function ProductDetail({ l, product }: { l: DashboardLocale; product: ProductMetric }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions
        items={[
          { label: l.drawers.product, children: product.name },
          { label: l.drilldown.productsTable.unitsSold, children: num(product.unitsSold) },
          { label: l.drawers.revenue, children: money(product.revenue) },
          { label: l.drawers.avgPrice, children: money(product.revenue / product.unitsSold) },
          { label: l.drawers.rating, children: `⭐ ${product.rating}` },
          { label: l.drawers.returnRateLabel, children: percent(product.returnRate, 1) },
        ]}
        column={1}
        size="small"
      />
      <h4>{l.drawers.ratingHeading}</h4>
      <Rate value={product.rating} disabled allowHalf count={5} />
      <h4>{l.drawers.returnRateHealth}</h4>
      <Progress
        percent={product.returnRate * 10}
        status={product.returnRate > 3 ? 'error' : product.returnRate > 2 ? 'active' : 'success'}
      />
    </div>
  )
}

function WidgetTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="db-widget-title">
      <span>{title}</span>
      {hint && <span className="db-widget-hint">{hint}</span>}
    </div>
  )
}

function ServiceList({ l }: { l: DashboardLocale }) {
  if (!serviceHealth.length) return <Empty description={l.empty.noServices} />
  return (
    <div className="db-list">
      {serviceHealth.map((s) => {
        const tone =
          s.status === 'healthy' ? 'success' : s.status === 'degraded' ? 'warning' : 'error'
        const pct = s.uptime
        return (
          <div key={s.name} className="db-list-row">
            <div className="db-list-left">
              <Tag color={HEALTH_COLOR[s.status]}>{l.healthLabel[s.status]}</Tag>
              <strong>{s.name}</strong>
              <span className="db-muted">{s.region}</span>
            </div>
            <div className="db-list-right">
              <Progress
                percent={pct}
                showInfo={false}
                status={tone === 'success' ? 'success' : tone === 'warning' ? 'active' : 'error'}
              />
              <span style={{ fontSize: 12, minWidth: 60, textAlign: 'right' }}>
                {s.latencyMs}ms · {percent(pct, 2)}
              </span>
              <Dropdown
                trigger="click"
                items={[
                  { key: 'restart', label: l.serviceMenu.restart },
                  { key: 'logs', label: l.serviceMenu.viewLogs },
                  { key: 'silence', label: l.serviceMenu.silence },
                ]}
                onSelect={(k) => notification.info(l.serviceToast(String(k), s.name))}
              >
                <Button size="small" type="text">
                  ⋯
                </Button>
              </Dropdown>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ActivityFeed({ l }: { l: DashboardLocale }) {
  return (
    <div className="db-list">
      {recentActivity.slice(0, 8).map((a) => (
        <div key={a.id} className="db-list-row">
          <div className="db-list-left">
            <Avatar size="small" style={{ background: colorFromString(a.user) }}>
              {initials(a.user)}
            </Avatar>
            <div>
              <div style={{ fontSize: 13 }}>
                <strong>{a.user}</strong>{' '}
                <span className="db-muted">
                  {l.activityType[a.action as keyof typeof l.activityType] ?? a.action}
                </span>{' '}
                {a.target}
              </div>
              <div className="db-muted" style={{ fontSize: 11 }}>
                {a.ago}
              </div>
            </div>
          </div>
          <Tag
            color={
              a.type === 'alert'
                ? 'error'
                : a.type === 'deploy'
                  ? 'success'
                  : a.type === 'edit'
                    ? 'warning'
                    : 'default'
            }
          >
            {l.activityType[a.type]}
          </Tag>
        </div>
      ))}
    </div>
  )
}

const styles = `
.db-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}
.db-widget-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-weight: 600;
  font-size: 13px;
  width: 100%;
}
.db-widget-hint {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  font-weight: 400;
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
.db-list-row:last-child { border-bottom: none; }
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
  .db-list-right { width: 140px; }
}
`
