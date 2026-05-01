import { useMemo, useState } from 'react'
import {
  Dashboard,
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
} from '@skygraph/react'
import type {
  ChartSeries,
  PieChartSlice,
  DashboardWidget,
} from '@skygraph/react'
import { daily30, serviceHealth, recentActivity, trafficByCountry } from './data'
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

const PALETTE = [
  'var(--sg-color-primary)',
  'var(--sg-color-success)',
  'var(--sg-color-warning)',
  'var(--sg-color-error)',
  'var(--sg-blue-4, #69b1ff)',
  'var(--sg-green-5, #95de64)',
]

export function DashboardApp() {
  const [period, setPeriod] = useState<Period>('14d')
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])

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

  const widgets: DashboardWidget[] = [
    {
      id: 'revenue-chart',
      title: <WidgetTitle title="Revenue trend" hint={`${money(totals.revenue, { compact: true })} total`} />,
      x: 1, y: 1, w: 8, h: 3,
      children: (
        <LineChart
          categories={dateCategories}
          series={revenueSeries}
          height={200}
          legend={false}
        />
      ),
    },
    {
      id: 'traffic-pie',
      title: <WidgetTitle title="Top countries" hint={`${trafficByCountry.length} regions`} />,
      x: 9, y: 1, w: 4, h: 3,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <PieChart data={trafficSlices} width={180} height={180} innerRadius={48} />
          <ChartLegend series={trafficLegend} />
        </div>
      ),
    },
    {
      id: 'orders-bar',
      title: <WidgetTitle title="Orders & signups" hint={`${num(totals.orders)} orders`} />,
      x: 1, y: 4, w: 6, h: 3,
      children: (
        <BarChart
          categories={dateCategories}
          series={ordersSeries}
          height={200}
          legend
        />
      ),
    },
    {
      id: 'active-area',
      title: <WidgetTitle title="Active users" hint={`${num(totals.active)} now`} />,
      x: 7, y: 4, w: 6, h: 3,
      children: (
        <AreaChart
          categories={dateCategories}
          series={activeSeries}
          height={200}
        />
      ),
    },
    {
      id: 'health',
      title: <WidgetTitle title="Service health" hint={`${serviceHealth.length} services`} />,
      x: 1, y: 7, w: 6, h: 4,
      children: <ServiceList />,
    },
    {
      id: 'activity',
      title: <WidgetTitle title="Recent activity" hint="last hour" />,
      x: 7, y: 7, w: 6, h: 4,
      children: <ActivityFeed />,
    },
  ]

  const trendTone = totals.trend >= 0 ? 'success' : 'error'
  const trendIcon = totals.trend >= 0 ? '▲' : '▼'

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />

      <div className="db-toolbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>Operations dashboard</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
            Live metrics across web, API, and infrastructure.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
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
          <Button onClick={() => notification.success('Report exported', 'CSV is in your downloads folder.')}>
            Export
          </Button>
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

      <Dashboard widgets={widgets} columns={12} rowHeight={70} gap={12} />

      <style>{styles}</style>
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
  width: 200px;
  flex-shrink: 0;
}
.db-muted {
  color: var(--sg-color-text-secondary);
  font-size: 12px;
}
@media (max-width: 900px) {
  .db-list-right { width: 120px; }
}
`
