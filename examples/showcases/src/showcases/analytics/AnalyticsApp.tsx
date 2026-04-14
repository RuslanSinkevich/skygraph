import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Segmented, Descriptions, Progress,
  Button, Result, Rate, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn, TabItem } from '@skygraph/react'
import { dailyMetrics, channelMetrics, topProducts, getSummary } from './data'
import type { MetricRow, ChannelMetric, ProductMetric } from './data'

function metricToRow(m: MetricRow) {
  return { id: String(m.id), data: { ...m } as Record<string, unknown> }
}

function channelToRow(c: ChannelMetric) {
  return { id: c.channel, data: { ...c } as Record<string, unknown> }
}

function productToRow(p: ProductMetric) {
  return { id: String(p.id), data: { ...p } as Record<string, unknown> }
}

function StatsRow({ summary }: { summary: ReturnType<typeof getSummary> }) {
  const trendIcon = summary.revenueTrend >= 0 ? '↑' : '↓'
  const trendColor = summary.revenueTrend >= 0 ? 'var(--sg-color-success, green)' : 'var(--sg-color-error, red)'
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-card-label">Revenue</div>
        <div className="stat-card-value">${(summary.totalRevenue / 1000).toFixed(1)}k</div>
        <div className="stat-card-sub" style={{ color: trendColor }}>
          {trendIcon} {Math.abs(summary.revenueTrend)}% vs prev period
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Orders</div>
        <div className="stat-card-value">{summary.totalOrders.toLocaleString()}</div>
        <div className="stat-card-sub">avg ${summary.avgOrderValue}/order</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">Visitors</div>
        <div className="stat-card-value">{summary.totalVisitors.toLocaleString()}</div>
        <div className="stat-card-sub">{summary.avgConversion}% conversion</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">New Customers</div>
        <div className="stat-card-value">{summary.totalNewCustomers}</div>
        <div className="stat-card-sub">acquisition</div>
      </div>
    </div>
  )
}

function OverviewTab() {
  const [period, setPeriod] = useState<string>('30d')

  const filtered = useMemo(() => {
    const days = period === '7d' ? 7 : period === '14d' ? 14 : 30
    return dailyMetrics.slice(-days)
  }, [period])

  const summary = getSummary(filtered)
  const tableData = useMemo(() => filtered.map(metricToRow), [filtered])

  const columns: TableColumn[] = [
    { key: 'date', title: 'Date', width: 110, sortable: true },
    {
      key: 'revenue', title: 'Revenue', width: 110, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
    { key: 'orders', title: 'Orders', width: 80, sortable: true, align: 'center' },
    {
      key: 'visitors', title: 'Visitors', width: 90, sortable: true, align: 'center',
      render: (val) => Number(val).toLocaleString(),
    },
    {
      key: 'conversion', title: 'Conversion', width: 100, sortable: true,
      render: (val) => (
        <span style={{ color: Number(val) >= 3 ? 'var(--sg-color-success, green)' : undefined }}>
          {val}%
        </span>
      ),
    },
    {
      key: 'avgOrderValue', title: 'AOV', width: 80, sortable: true, align: 'right',
      render: (val) => `$${val}`,
    },
    { key: 'newCustomers', title: 'New', width: 60, sortable: true, align: 'center' },
  ]

  return (
    <>
      <div className="sc-toolbar">
        <Segmented
          value={period}
          onChange={setPeriod}
          options={[
            { label: '7 days', value: '7d' },
            { label: '14 days', value: '14d' },
            { label: '30 days', value: '30d' },
          ]}
        />
        <div className="sc-toolbar-spacer" />
        <Button size="small" onClick={() => notification.info('Export CSV (mock)')}>Export</Button>
      </div>
      <StatsRow summary={summary} />
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        summary={(rows) => {
          const totalRev = rows.reduce((s, r) => s + (Number(r.data.revenue) || 0), 0)
          const totalOrd = rows.reduce((s, r) => s + (Number(r.data.orders) || 0), 0)
          const totalVis = rows.reduce((s, r) => s + (Number(r.data.visitors) || 0), 0)
          const avgConv = rows.length ? (rows.reduce((s, r) => s + (Number(r.data.conversion) || 0), 0) / rows.length).toFixed(2) : '0'
          const avgAOV = totalOrd ? (totalRev / totalOrd).toFixed(2) : '0'
          const totalNew = rows.reduce((s, r) => s + (Number(r.data.newCustomers) || 0), 0)
          return [[
            { content: 'Total' },
            { content: `$${totalRev.toLocaleString()}`, align: 'right' as const },
            { content: String(totalOrd), align: 'center' as const },
            { content: totalVis.toLocaleString(), align: 'center' as const },
            { content: `${avgConv}%` },
            { content: `$${avgAOV}`, align: 'right' as const },
            { content: String(totalNew), align: 'center' as const },
          ]]
        }}
      />
    </>
  )
}

function ChannelsTab() {
  const tableData = useMemo(() => channelMetrics.map(channelToRow), [])

  const columns: TableColumn[] = [
    { key: 'channel', title: 'Channel', width: 160, sortable: true },
    {
      key: 'visitors', title: 'Visitors', width: 100, sortable: true,
      render: (val) => Number(val).toLocaleString(),
    },
    {
      key: 'revenue', title: 'Revenue', width: 110, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
    {
      key: 'conversion', title: 'Conversion', width: 140, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={Number(val) * 10} showInfo={false} style={{ width: 80 }} />
          <span>{val}%</span>
        </div>
      ),
    },
    {
      key: 'trend', title: 'Trend', width: 120,
      render: (val) => (
        <Tag color={val === 'up' ? 'success' : val === 'down' ? 'error' : 'default'}>
          {val === 'up' ? '↑ Growing' : val === 'down' ? '↓ Declining' : '→ Stable'}
        </Tag>
      ),
    },
  ]

  const totalVisitors = channelMetrics.reduce((s, c) => s + c.visitors, 0)
  const totalRevenue = channelMetrics.reduce((s, c) => s + c.revenue, 0)

  return (
    <>
      <Descriptions
        title="Channel Summary"
        items={[
          { label: 'Total Visitors', children: totalVisitors.toLocaleString() },
          { label: 'Total Revenue', children: `$${totalRevenue.toLocaleString()}` },
          { label: 'Top Channel', children: 'Organic Search' },
          { label: 'Best Conversion', children: 'Email (5.2%)' },
        ]}
        column={2}
        size="small"
        style={{ marginBottom: 20 }}
      />
      <Table columns={columns} data={tableData} size="small" />
    </>
  )
}

function ProductsTab() {
  const tableData = useMemo(() => topProducts.map(productToRow), [])

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Product', width: 220, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'unitsSold', title: 'Units Sold', width: 100, sortable: true,
      render: (val) => Number(val).toLocaleString(),
    },
    {
      key: 'revenue', title: 'Revenue', width: 110, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
    {
      key: 'rating', title: 'Rating', width: 180, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Rate value={Number(val)} disabled allowHalf count={5} />
          <span style={{ fontSize: 12 }}>{val}</span>
        </div>
      ),
    },
    {
      key: 'returnRate', title: 'Return Rate', width: 100, sortable: true,
      render: (val) => (
        <span style={{ color: Number(val) > 3 ? 'var(--sg-color-error, red)' : undefined }}>
          {val}%
        </span>
      ),
    },
  ]

  return <Table columns={columns} data={tableData} size="small" />
}

function NoDataTab() {
  return (
    <Result
      status="info"
      title="No Custom Reports Yet"
      subTitle="Create custom reports to track specific metrics that matter to your business."
      extra={
        <Button type="primary" onClick={() => notification.info('Create report wizard (mock)')}>
          Create Report
        </Button>
      }
    />
  )
}

export function AnalyticsApp() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs: TabItem[] = [
    { key: 'overview', label: 'Overview', children: <OverviewTab /> },
    { key: 'channels', label: 'Channels', children: <ChannelsTab /> },
    { key: 'products', label: 'Top Products', children: <ProductsTab /> },
    { key: 'reports', label: 'Custom Reports', children: <NoDataTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
