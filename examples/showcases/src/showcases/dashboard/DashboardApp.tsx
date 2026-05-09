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
import {
  StatsRow,
  money,
  num,
  percent,
  colorFromString,
  initials,
} from '../_shared'

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
  const [mode, setMode] = useState<Mode>('operations')
  const [period, setPeriod] = useState<Period>('14d')
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])
  const [drill, setDrill] = useState<AnalyticsContext>({ metric: null, channel: null, product: null })
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

  const dateCategories = useMemo(() => slice.map(d => d.date.slice(5)), [slice])

  const revenueSeries: ChartSeries[] = [
    { id: 'revenue', label: 'Revenue', values: slice.map(d => d.revenue), color: 'var(--sg-color-primary)' },
  ]

  const ordersSeries: ChartSeries[] = [
    { id: 'orders', label: 'Orders', values: slice.map(d => d.orders), color: 'var(--sg-color-success)' },
    { id: 'signups', label: 'Signups', values: slice.map(d => d.signups), color: 'var(--sg-color-warning)' },
  ]

  const activeSeries: ChartSeries[] = [
    { id: 'active', label: 'Active users', values: slice.map(d => d.active), color: 'var(--sg-color-primary)' },
  ]

  const trafficSlices: PieChartSlice[] = trafficByCountry.slice(0, 6).map((t, i) => ({
    id: t.country,
    label: t.country,
    value: t.visitors,
    color: PALETTE[i % PALETTE.length]!,
  }))

  const trafficLegend: ChartSeries[] = trafficSlices.map(s => ({
    id: s.id,
    label: s.label,
    color: s.color,
    values: [s.value],
  }))

  const widgetActions = (id: string): WidgetAction[] => [
    {
      id: 'refresh',
      label: 'Refresh',
      onClick: () => notification.info(`Refreshed ${id}`),
    },
    {
      id: 'export',
      label: 'Export PNG',
      onClick: (w) => notification.success(`Export queued for "${w.id}"`),
    },
    {
      id: 'pin',
      label: 'Pin to top',
      onClick: () => notification.success(`Pinned ${id}`),
    },
  ]

  const buildWidgets = (): DashboardWidget[] => [
    {
      id: 'revenue-chart',
      title: <WidgetTitle title="Revenue trend" hint={`${money(totals.revenue, { compact: true })} total`} />,
      x: 1, y: 1, w: 8, h: 3,
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
      title: <WidgetTitle title="Top countries" hint={`${trafficByCountry.length} regions`} />,
      x: 9, y: 1, w: 4, h: 3,
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
      title: <WidgetTitle title="Orders & signups" hint={`${num(totals.orders)} orders`} />,
      x: 1, y: 4, w: 6, h: 3,
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
      title: <WidgetTitle title="Active users" hint={`${num(totals.active)} now`} />,
      x: 7, y: 4, w: 6, h: 3,
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
      title: <WidgetTitle title="Service health" hint={`${serviceHealth.length} services`} />,
      x: 1, y: 7, w: 6, h: 4,
      actions: widgetActions('health'),
      children: <ServiceList />,
    },
    {
      id: 'activity',
      title: <WidgetTitle title="Recent activity" hint="last hour" />,
      x: 7, y: 7, w: 6, h: 4,
      actions: widgetActions('activity'),
      children: <ActivityFeed />,
    },
  ]

  const [widgets, setWidgets] = useState<DashboardWidget[]>(buildWidgets)

  // Rebuild widgets whenever period changes (so charts re-key on data).
  const operationsWidgets = useMemo(buildWidgets, [period, slice]) // eslint-disable-line react-hooks/exhaustive-deps

  const trendTone = totals.trend >= 0 ? 'success' : 'error'
  const trendIcon = totals.trend >= 0 ? '▲' : '▼'

  const handleWidgetContextMenu = (e: React.MouseEvent, w: DashboardWidget) => {
    e.preventDefault()
    notification.info(`Right-click on widget "${w.id}" — context menu would open here`)
  }

  const handleDashboardContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    notification.info('Right-click on background — would offer "Add widget…"')
  }

  const handlePrint = () => {
    tableRef.current?.print({ fileName: 'analytics-overview' })
  }

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />

      <div className="db-toolbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>Operations dashboard</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
            Live metrics across web, API, and infrastructure. Drill into KPIs for breakdowns or open
            the layout editor.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Segmented
            value={mode}
            onChange={(v) => setMode(v as Mode)}
            options={[
              { label: 'Operations', value: 'operations' },
              { label: 'Drill-down', value: 'drilldown' },
              { label: 'Layout editor', value: 'editor' },
            ]}
          />
          <RangePicker
            value={range}
            onChange={(v) => setRange(v as [Date | null, Date | null])}
          />
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
            <Button onClick={handlePrint}>Print table</Button>
          ) : (
            <Button onClick={() => notification.success('Report exported', 'CSV is in your downloads folder.')}>
              Export
            </Button>
          )}
        </div>
      </div>

      <StatsRow
        items={[
          {
            key: 'revenue',
            icon: '💰',
            label: 'Revenue',
            value: money(totals.revenue, { compact: true }),
            sub: `${trendIcon} ${percent(Math.abs(totals.trend))} vs prev`,
            subTone: trendTone,
            progress: Math.min(100, Math.abs(totals.trend) * 4),
            progressStatus: trendTone === 'success' ? 'success' : 'error',
          },
          { key: 'orders', icon: '📦', label: 'Orders', value: num(totals.orders), sub: `${(totals.orders / slice.length).toFixed(1)} per day`, subTone: 'default' },
          { key: 'signups', icon: '🆕', label: 'Signups', value: num(totals.signups), sub: 'unique users', subTone: 'default' },
          { key: 'active', icon: '👥', label: 'Active now', value: num(totals.active), sub: 'last 5 min', subTone: 'default' },
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
          onWidgetRefresh={(w) => notification.info(`Refresh "${w.id}"`)}
          onWidgetSettings={(w) => notification.info(`Settings for "${w.id}"`)}
          onWidgetRemove={(w) => notification.warning(`Removed "${w.id}"`)}
          columns={12}
          rowHeight={70}
          gap={12}
        />
      )}

      {mode === 'drilldown' && (
        <DrillDownView
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
        title={`Day Details — ${drill.metric?.date ?? ''}`}
        width={420}
      >
        {drill.metric && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Date', children: drill.metric.date },
                { label: 'Revenue', children: money(drill.metric.revenue) },
                { label: 'Orders', children: String(drill.metric.orders) },
                { label: 'Visitors', children: num(drill.metric.visitors) },
                { label: 'Conversion', children: percent(drill.metric.conversion, 2) },
                { label: 'AOV', children: money(drill.metric.avgOrderValue) },
                { label: 'New Customers', children: String(drill.metric.newCustomers) },
                { label: 'Returning', children: String(drill.metric.returningCustomers) },
              ]}
              column={1}
              size="small"
            />
            <h4>Revenue Performance</h4>
            <Progress percent={Math.min(100, Math.round((drill.metric.revenue / 5000) * 100))} status={drill.metric.revenue > 3000 ? 'success' : 'active'} />
            <h4>Conversion Rate</h4>
            <Progress percent={Math.round(drill.metric.conversion * 20)} status={drill.metric.conversion >= 3 ? 'success' : drill.metric.conversion >= 2 ? 'active' : 'error'} />
          </div>
        )}
      </Drawer>

      <Drawer
        open={!!drill.channel}
        onClose={() => setDrill({ metric: null, channel: null, product: null })}
        title={drill.channel?.channel ?? ''}
        width={400}
      >
        {drill.channel && <ChannelDetail channel={drill.channel} />}
      </Drawer>

      <Drawer
        open={!!drill.product}
        onClose={() => setDrill({ metric: null, channel: null, product: null })}
        title={drill.product?.name ?? ''}
        width={420}
      >
        {drill.product && <ProductDetail product={drill.product} />}
      </Drawer>

      <style>{styles}</style>
    </div>
  )
}

interface DrillDownViewProps {
  tableRef: React.Ref<TableRef>
  slice: typeof daily30
  onPickMetric: (m: MetricRow) => void
  onPickChannel: (c: ChannelMetric) => void
  onPickProduct: (p: ProductMetric) => void
}

function DrillDownView({ tableRef, slice, onPickMetric, onPickChannel, onPickProduct }: DrillDownViewProps) {
  const [tab, setTab] = useState<'overview' | 'channels' | 'products'>('overview')
  void slice

  return (
    <div className="db-drilldown">
      <Segmented
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        options={[
          { label: 'Overview (daily)', value: 'overview' },
          { label: 'Channels', value: 'channels' },
          { label: 'Top products', value: 'products' },
        ]}
        style={{ marginBottom: 16 }}
      />
      {tab === 'overview' && <OverviewTable tableRef={tableRef} onPick={onPickMetric} />}
      {tab === 'channels' && <ChannelsTable onPick={onPickChannel} />}
      {tab === 'products' && <ProductsTable onPick={onPickProduct} />}
    </div>
  )
}

function OverviewTable({ tableRef, onPick }: { tableRef: React.Ref<TableRef>; onPick: (m: MetricRow) => void }) {
  const tableData = useMemo(
    () => dailyMetrics.map((m) => ({ id: String(m.id), data: m as unknown as Record<string, unknown> })),
    [],
  )
  const summary = getSummary(dailyMetrics)
  const trendIcon = summary.revenueTrend >= 0 ? '↑' : '↓'

  const columns: TableColumn[] = [
    {
      key: 'date',
      title: 'Date',
      width: 110,
      sortable: true,
      filterMode: 'search',
      onFilter: (v, row) => String(row.date).includes(String(v)),
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
    {
      key: 'revenue',
      title: 'Revenue',
      width: 120,
      sortable: true,
      align: 'right',
      filterMode: 'advanced',
      advancedFilterType: 'number',
      onFilter: (v, row) => Number(row.revenue) >= Number(v),
      render: (val) => money(Number(val)),
      aggregate: 'sum',
    },
    { key: 'orders', title: 'Orders', width: 80, sortable: true, align: 'center', aggregate: 'sum' },
    { key: 'visitors', title: 'Visitors', width: 100, sortable: true, align: 'center', render: (v) => num(Number(v)), aggregate: 'sum' },
    {
      key: 'conversion',
      title: 'Conversion',
      width: 130,
      sortable: true,
      render: (val) => {
        const n = Number(val)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Progress percent={n * 20} showInfo={false} style={{ width: 60 }} status={n >= 3 ? 'success' : n >= 2 ? 'active' : 'error'} />
            <span>{percent(n, 2)}</span>
          </div>
        )
      },
    },
    { key: 'avgOrderValue', title: 'AOV', width: 80, sortable: true, align: 'right', render: (v) => money(Number(v)) },
    { key: 'newCustomers', title: 'New', width: 60, sortable: true, align: 'center', aggregate: 'sum' },
    { key: 'returningCustomers', title: 'Returning', width: 80, sortable: true, align: 'center', aggregate: 'sum' },
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
        Trend: <strong>{trendIcon} {Math.abs(summary.revenueTrend)}%</strong> revenue change vs previous half-period.
        Right-click headers / cells for context menus. Try Group-by toolbar.
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
          { key: 'returningCustomers', label: 'Returning' },
          { key: 'orders', label: 'Orders' },
        ]}
        footer
      />
    </div>
  )
}

function ChannelsTable({ onPick }: { onPick: (c: ChannelMetric) => void }) {
  const tableData = useMemo(
    () => channelMetrics.map((c) => ({ id: c.channel, data: c as unknown as Record<string, unknown> })),
    [],
  )
  const totalVisitors = channelMetrics.reduce((s, c) => s + c.visitors, 0)
  const totalRevenue = channelMetrics.reduce((s, c) => s + c.revenue, 0)

  const columns: TableColumn[] = [
    { key: 'channel', title: 'Channel', width: 200, sortable: true, fixed: 'left', render: (v) => <strong>{String(v)}</strong> },
    { key: 'visitors', title: 'Visitors', width: 110, sortable: true, render: (v) => num(Number(v)), aggregate: 'sum' },
    { key: 'revenue', title: 'Revenue', width: 130, sortable: true, align: 'right', render: (v) => money(Number(v)), aggregate: 'sum' },
    {
      key: 'conversion',
      title: 'Conversion',
      width: 160,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      onFilter: (v, row) => Number(row.conversion) >= Number(v),
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={Number(val) * 15} showInfo={false} style={{ width: 80 }} status={Number(val) >= 4 ? 'success' : 'active'} />
          <span>{percent(Number(val), 1)}</span>
        </div>
      ),
    },
    {
      key: 'trend',
      title: 'Trend',
      width: 120,
      filters: [
        { text: 'Up', value: 'up' },
        { text: 'Flat', value: 'flat' },
        { text: 'Down', value: 'down' },
      ],
      onFilter: (v, row) => row.trend === v,
      render: (v) => <Tag color={v === 'up' ? 'success' : v === 'down' ? 'error' : 'default'}>{String(v)}</Tag>,
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
          Details
        </Button>
      ),
    },
  ]

  return (
    <>
      <Descriptions
        title="Channel summary"
        items={[
          { label: 'Total Visitors', children: num(totalVisitors) },
          { label: 'Total Revenue', children: money(totalRevenue) },
          { label: 'Top Channel', children: 'Organic Search' },
          { label: 'Best Conversion', children: 'Email (5.2%)' },
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

function ProductsTable({ onPick }: { onPick: (p: ProductMetric) => void }) {
  const tableData = useMemo(
    () => topProducts.map((p) => ({ id: String(p.id), data: p as unknown as Record<string, unknown> })),
    [],
  )

  const columns: TableColumn[] = [
    { key: 'name', title: 'Product', width: 240, sortable: true, fixed: 'left', render: (v) => <strong>{String(v)}</strong> },
    { key: 'unitsSold', title: 'Units Sold', width: 110, sortable: true, render: (v) => num(Number(v)), aggregate: 'sum' },
    { key: 'revenue', title: 'Revenue', width: 130, sortable: true, align: 'right', render: (v) => money(Number(v)), aggregate: 'sum' },
    {
      key: 'rating',
      title: 'Rating',
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
      title: 'Return Rate',
      width: 130,
      sortable: true,
      filterMode: 'advanced',
      advancedFilterType: 'number',
      onFilter: (v, row) => Number(row.returnRate) <= Number(v),
      render: (v) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: Number(v) > 3 ? 'var(--sg-color-error)' : undefined }}>{percent(Number(v), 1)}</span>
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
          Details
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

function ChannelDetail({ channel }: { channel: ChannelMetric }) {
  const totalVisitors = channelMetrics.reduce((s, c) => s + c.visitors, 0)
  const totalRevenue = channelMetrics.reduce((s, c) => s + c.revenue, 0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions
        items={[
          { label: 'Channel', children: channel.channel },
          { label: 'Visitors', children: num(channel.visitors) },
          { label: 'Revenue', children: money(channel.revenue) },
          { label: 'Conversion', children: percent(channel.conversion, 1) },
          { label: 'Trend', children: <Tag color={channel.trend === 'up' ? 'success' : channel.trend === 'down' ? 'error' : 'default'}>{channel.trend}</Tag> },
          { label: 'Revenue/Visitor', children: money(channel.revenue / channel.visitors) },
        ]}
        column={1}
        size="small"
      />
      <h4>Traffic Share</h4>
      <Progress percent={Math.round((channel.visitors / totalVisitors) * 100)} status="active" />
      <h4>Revenue Share</h4>
      <Progress percent={Math.round((channel.revenue / totalRevenue) * 100)} status="success" />
    </div>
  )
}

function ProductDetail({ product }: { product: ProductMetric }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Descriptions
        items={[
          { label: 'Product', children: product.name },
          { label: 'Units Sold', children: num(product.unitsSold) },
          { label: 'Revenue', children: money(product.revenue) },
          { label: 'Avg Price', children: money(product.revenue / product.unitsSold) },
          { label: 'Rating', children: `⭐ ${product.rating}` },
          { label: 'Return Rate', children: percent(product.returnRate, 1) },
        ]}
        column={1}
        size="small"
      />
      <h4>Rating</h4>
      <Rate value={product.rating} disabled allowHalf count={5} />
      <h4>Return Rate Health</h4>
      <Progress percent={product.returnRate * 10} status={product.returnRate > 3 ? 'error' : product.returnRate > 2 ? 'active' : 'success'} />
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

function ServiceList() {
  if (!serviceHealth.length) return <Empty description="No services" />
  return (
    <div className="db-list">
      {serviceHealth.map(s => {
        const tone = s.status === 'healthy' ? 'success' : s.status === 'degraded' ? 'warning' : 'error'
        const pct = s.uptime
        return (
          <div key={s.name} className="db-list-row">
            <div className="db-list-left">
              <Tag color={HEALTH_COLOR[s.status]}>{s.status}</Tag>
              <strong>{s.name}</strong>
              <span className="db-muted">{s.region}</span>
            </div>
            <div className="db-list-right">
              <Progress percent={pct} showInfo={false} status={tone === 'success' ? 'success' : tone === 'warning' ? 'active' : 'error'} />
              <span style={{ fontSize: 12, minWidth: 60, textAlign: 'right' }}>
                {s.latencyMs}ms · {percent(pct, 2)}
              </span>
              <Dropdown
                trigger="click"
                items={[
                  { key: 'restart', label: 'Restart' },
                  { key: 'logs', label: 'View logs' },
                  { key: 'silence', label: 'Silence alerts' },
                ]}
                onSelect={(k) => notification.info(`${k}: ${s.name}`)}
              >
                <Button size="small" type="text">⋯</Button>
              </Dropdown>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ActivityFeed() {
  return (
    <div className="db-list">
      {recentActivity.slice(0, 8).map(a => (
        <div key={a.id} className="db-list-row">
          <div className="db-list-left">
            <Avatar size="small" style={{ background: colorFromString(a.user) }}>
              {initials(a.user)}
            </Avatar>
            <div>
              <div style={{ fontSize: 13 }}>
                <strong>{a.user}</strong> <span className="db-muted">{a.action}</span> {a.target}
              </div>
              <div className="db-muted" style={{ fontSize: 11 }}>{a.ago}</div>
            </div>
          </div>
          <Tag color={
            a.type === 'alert' ? 'error' :
            a.type === 'deploy' ? 'success' :
            a.type === 'edit' ? 'warning' : 'default'
          }>{a.type}</Tag>
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
