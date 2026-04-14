import { useState, useMemo } from 'react'
import {
  Table, Tabs, Tag, Segmented, Descriptions, Progress, Select,
  Button, Result, Rate, Modal, Form, Field, Input, InputNumber, Switch,
  Drawer, Badge,
  notification, NotificationContainer,
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
  const [exportModal, setExportModal] = useState(false)
  const [detailDrawer, setDetailDrawer] = useState<MetricRow | null>(null)

  const filtered = useMemo(() => {
    const days = period === '7d' ? 7 : period === '14d' ? 14 : 30
    return dailyMetrics.slice(-days)
  }, [period])

  const summary = getSummary(filtered)
  const tableData = useMemo(() => filtered.map(metricToRow), [filtered])

  const columns: TableColumn[] = [
    {
      key: 'date', title: 'Date', width: 110, sortable: true,
      render: (val) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{String(val)}</span>,
    },
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
      key: 'conversion', title: 'Conversion', width: 120, sortable: true,
      render: (val) => {
        const n = Number(val)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Progress percent={n * 20} showInfo={false} style={{ width: 50 }}
              status={n >= 3 ? 'success' : n >= 2 ? 'active' : 'error'} />
            <span style={{ color: n >= 3 ? 'var(--sg-color-success, green)' : undefined }}>{val}%</span>
          </div>
        )
      },
    },
    {
      key: 'avgOrderValue', title: 'AOV', width: 80, sortable: true, align: 'right',
      render: (val) => `$${val}`,
    },
    { key: 'newCustomers', title: 'New', width: 60, sortable: true, align: 'center' },
    { key: 'returningCustomers', title: 'Returning', width: 80, sortable: true, align: 'center' },
    {
      key: 'actions', title: '', width: 60,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const m = filtered.find(x => String(x.id) === String(row.id))
          if (m) setDetailDrawer(m)
        }}>📊</Button>
      ),
    },
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
        <Button size="small" onClick={() => setExportModal(true)}>Export</Button>
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
          const totalRet = rows.reduce((s, r) => s + (Number(r.data.returningCustomers) || 0), 0)
          return [[
            { content: 'Total' },
            { content: `$${totalRev.toLocaleString()}`, align: 'right' as const },
            { content: String(totalOrd), align: 'center' as const },
            { content: totalVis.toLocaleString(), align: 'center' as const },
            { content: `${avgConv}%` },
            { content: `$${avgAOV}`, align: 'right' as const },
            { content: String(totalNew), align: 'center' as const },
            { content: String(totalRet), align: 'center' as const },
            { content: '' },
          ]]
        }}
      />

      <Modal
        open={exportModal}
        onClose={() => setExportModal(false)}
        title="Export Data"
        footer={null}
        width={440}
      >
        <Form onFinish={(values) => {
          notification.success(`Exported as ${values.format} (mock)`)
          setExportModal(false)
        }}>
          <Field name="format" label="Format" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'CSV', value: 'csv' },
                { label: 'Excel (.xlsx)', value: 'xlsx' },
                { label: 'JSON', value: 'json' },
                { label: 'PDF Report', value: 'pdf' },
              ]}
              placeholder="Select format"
            />
          </Field>
          <Field name="period" label="Period">
            <Select
              options={[
                { label: 'Current view', value: 'current' },
                { label: 'Last 7 days', value: '7d' },
                { label: 'Last 30 days', value: '30d' },
                { label: 'Last 90 days', value: '90d' },
                { label: 'All time', value: 'all' },
              ]}
              placeholder="Select period"
            />
          </Field>
          <Field name="includeCharts" label="Include charts in export">
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setExportModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Export</Button>
          </div>
        </Form>
      </Modal>

      <Drawer
        open={!!detailDrawer}
        onClose={() => setDetailDrawer(null)}
        title={`Day Details — ${detailDrawer?.date ?? ''}`}
        width={420}
      >
        {detailDrawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Date', children: detailDrawer.date },
                { label: 'Revenue', children: `$${detailDrawer.revenue.toLocaleString()}` },
                { label: 'Orders', children: String(detailDrawer.orders) },
                { label: 'Visitors', children: detailDrawer.visitors.toLocaleString() },
                { label: 'Conversion', children: `${detailDrawer.conversion}%` },
                { label: 'AOV', children: `$${detailDrawer.avgOrderValue}` },
                { label: 'New Customers', children: String(detailDrawer.newCustomers) },
                { label: 'Returning', children: String(detailDrawer.returningCustomers) },
              ]}
              column={1}
              size="small"
            />
            <h4>Revenue Performance</h4>
            <Progress
              percent={Math.min(100, Math.round((detailDrawer.revenue / 5000) * 100))}
              status={detailDrawer.revenue > 3000 ? 'success' : 'active'}
            />
            <h4>Conversion Rate</h4>
            <Progress
              percent={Math.round(detailDrawer.conversion * 20)}
              status={detailDrawer.conversion >= 3 ? 'success' : detailDrawer.conversion >= 2 ? 'active' : 'error'}
            />
            <h4>Customer Mix</h4>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: 12, border: '1px solid var(--sg-color-border-secondary)', borderRadius: 6 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{detailDrawer.newCustomers}</div>
                <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>New</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: 12, border: '1px solid var(--sg-color-border-secondary)', borderRadius: 6 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{detailDrawer.returningCustomers}</div>
                <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>Returning</div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}

function ChannelsTab() {
  const [channelDetail, setChannelDetail] = useState<ChannelMetric | null>(null)
  const tableData = useMemo(() => channelMetrics.map(channelToRow), [])

  const columns: TableColumn[] = [
    {
      key: 'channel', title: 'Channel', width: 160, sortable: true,
      render: (val) => <span style={{ fontWeight: 500 }}>{String(val)}</span>,
    },
    {
      key: 'visitors', title: 'Visitors', width: 100, sortable: true,
      render: (val) => Number(val).toLocaleString(),
    },
    {
      key: 'revenue', title: 'Revenue', width: 110, sortable: true, align: 'right',
      render: (val) => `$${Number(val).toLocaleString()}`,
    },
    {
      key: 'conversion', title: 'Conversion', width: 160, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Progress percent={Number(val) * 15} showInfo={false} style={{ width: 80 }}
            status={Number(val) >= 4 ? 'success' : 'active'} />
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
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const c = channelMetrics.find(x => x.channel === String(row.channel))
          if (c) setChannelDetail(c)
        }}>Details</Button>
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

      <Drawer
        open={!!channelDetail}
        onClose={() => setChannelDetail(null)}
        title={channelDetail?.channel ?? ''}
        width={400}
      >
        {channelDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Channel', children: channelDetail.channel },
                { label: 'Visitors', children: channelDetail.visitors.toLocaleString() },
                { label: 'Revenue', children: `$${channelDetail.revenue.toLocaleString()}` },
                { label: 'Conversion', children: `${channelDetail.conversion}%` },
                { label: 'Trend', children: <Tag color={channelDetail.trend === 'up' ? 'success' : channelDetail.trend === 'down' ? 'error' : 'default'}>{channelDetail.trend}</Tag> },
                { label: 'Revenue/Visitor', children: `$${(channelDetail.revenue / channelDetail.visitors).toFixed(2)}` },
              ]}
              column={1}
              size="small"
            />
            <h4>Traffic Share</h4>
            <Progress
              percent={Math.round((channelDetail.visitors / totalVisitors) * 100)}
              status="active"
            />
            <h4>Revenue Share</h4>
            <Progress
              percent={Math.round((channelDetail.revenue / totalRevenue) * 100)}
              status="success"
            />
          </div>
        )}
      </Drawer>
    </>
  )
}

function ProductsTab() {
  const [productDrawer, setProductDrawer] = useState<ProductMetric | null>(null)
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
      key: 'returnRate', title: 'Return Rate', width: 120, sortable: true,
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: Number(val) > 3 ? 'var(--sg-color-error, red)' : undefined }}>
            {val}%
          </span>
          {Number(val) > 3 && <Badge count="!" color="red" />}
        </div>
      ),
    },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const p = topProducts.find(x => String(x.id) === String(row.id))
          if (p) setProductDrawer(p)
        }}>Details</Button>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} data={tableData} size="small" />

      <Drawer
        open={!!productDrawer}
        onClose={() => setProductDrawer(null)}
        title={productDrawer?.name ?? ''}
        width={420}
      >
        {productDrawer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Product', children: productDrawer.name },
                { label: 'Units Sold', children: productDrawer.unitsSold.toLocaleString() },
                { label: 'Revenue', children: `$${productDrawer.revenue.toLocaleString()}` },
                { label: 'Avg Price', children: `$${(productDrawer.revenue / productDrawer.unitsSold).toFixed(2)}` },
                { label: 'Rating', children: `⭐ ${productDrawer.rating}` },
                { label: 'Return Rate', children: `${productDrawer.returnRate}%` },
              ]}
              column={1}
              size="small"
            />
            <h4>Rating</h4>
            <Rate value={productDrawer.rating} disabled allowHalf count={5} />
            <h4>Return Rate Health</h4>
            <Progress
              percent={productDrawer.returnRate * 10}
              status={productDrawer.returnRate > 3 ? 'error' : productDrawer.returnRate > 2 ? 'active' : 'success'}
            />
          </div>
        )}
      </Drawer>
    </>
  )
}

function AlertsTab() {
  const [createAlert, setCreateAlert] = useState(false)
  const [alerts] = useState([
    { id: 1, name: 'Revenue Drop Alert', metric: 'revenue', condition: 'below', threshold: 2000, enabled: true, channel: 'email' },
    { id: 2, name: 'Low Conversion', metric: 'conversion', condition: 'below', threshold: 2.0, enabled: true, channel: 'slack' },
    { id: 3, name: 'High Return Rate', metric: 'returnRate', condition: 'above', threshold: 5.0, enabled: false, channel: 'email' },
    { id: 4, name: 'Traffic Spike', metric: 'visitors', condition: 'above', threshold: 2000, enabled: true, channel: 'slack' },
  ])

  return (
    <>
      <div className="sc-toolbar">
        <div className="sc-toolbar-spacer" />
        <Button type="primary" onClick={() => setCreateAlert(true)}>+ Create Alert</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {alerts.map(a => (
          <div key={a.id} style={{
            border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8, padding: 16,
            opacity: a.enabled ? 1 : 0.5,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>{a.name}</span>
              <Tag color={a.enabled ? 'success' : 'default'}>{a.enabled ? 'Active' : 'Disabled'}</Tag>
            </div>
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)', marginBottom: 4 }}>
              When <code>{a.metric}</code> is {a.condition} <strong>{a.threshold}</strong>
            </div>
            <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
              Notify via: {a.channel}
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              <Button size="small" onClick={() => notification.info('Edit alert (mock)')}>Edit</Button>
              <Button size="small" onClick={() => notification.info('Test alert (mock)')}>Test</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={createAlert}
        onClose={() => setCreateAlert(false)}
        title="Create Alert"
        footer={null}
        width={480}
      >
        <Form onFinish={(values) => {
          notification.success('Alert created (mock)', JSON.stringify(values, null, 2))
          setCreateAlert(false)
        }}>
          <Field name="name" label="Alert Name" rules={[{ required: true }]}>
            <Input placeholder="Revenue Drop Alert" />
          </Field>
          <Field name="metric" label="Metric" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Revenue', value: 'revenue' },
                { label: 'Orders', value: 'orders' },
                { label: 'Visitors', value: 'visitors' },
                { label: 'Conversion Rate', value: 'conversion' },
                { label: 'AOV', value: 'avgOrderValue' },
                { label: 'Return Rate', value: 'returnRate' },
              ]}
              placeholder="Select metric"
            />
          </Field>
          <Field name="condition" label="Condition" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Is above', value: 'above' },
                { label: 'Is below', value: 'below' },
                { label: 'Changes by more than', value: 'change' },
              ]}
              placeholder="Select condition"
            />
          </Field>
          <Field name="threshold" label="Threshold" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter value" />
          </Field>
          <Field name="channel" label="Notification Channel" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Email', value: 'email' },
                { label: 'Slack', value: 'slack' },
                { label: 'Webhook', value: 'webhook' },
              ]}
              placeholder="Select channel"
            />
          </Field>
          <Field name="enabled" label="Enable immediately">
            <Switch />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setCreateAlert(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Create Alert</Button>
          </div>
        </Form>
      </Modal>
    </>
  )
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
    { key: 'alerts', label: 'Alerts', children: <AlertsTab /> },
    { key: 'reports', label: 'Custom Reports', children: <NoDataTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
