import { useState, useMemo } from 'react'
import {
  Table, Segmented, Progress, Button, Modal, Drawer,
  Form, Field, Select, Switch, Descriptions, notification,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { dailyMetrics, getSummary } from './data'
import type { MetricRow } from './data'
import { Toolbar, StatsRow, money, num, percent } from '../_shared'

function metricToRow(m: MetricRow) {
  return { id: String(m.id), data: m as unknown as Record<string, unknown> }
}

export function OverviewTab() {
  const [period, setPeriod] = useState<string>('30d')
  const [exportOpen, setExportOpen] = useState(false)
  const [detail, setDetail] = useState<MetricRow | null>(null)

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
      render: (val) => money(Number(val)),
    },
    { key: 'orders', title: 'Orders', width: 80, sortable: true, align: 'center' },
    {
      key: 'visitors', title: 'Visitors', width: 90, sortable: true, align: 'center',
      render: (val) => num(Number(val)),
    },
    {
      key: 'conversion', title: 'Conversion', width: 130, sortable: true,
      render: (val) => {
        const n = Number(val)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Progress percent={n * 20} showInfo={false} style={{ width: 60 }}
              status={n >= 3 ? 'success' : n >= 2 ? 'active' : 'error'} />
            <span style={{ color: n >= 3 ? 'var(--sg-color-success)' : undefined }}>{percent(n, 2)}</span>
          </div>
        )
      },
    },
    {
      key: 'avgOrderValue', title: 'AOV', width: 80, sortable: true, align: 'right',
      render: (val) => money(Number(val)),
    },
    { key: 'newCustomers', title: 'New', width: 60, sortable: true, align: 'center' },
    { key: 'returningCustomers', title: 'Returning', width: 80, sortable: true, align: 'center' },
    {
      key: 'actions', title: '', width: 60,
      render: (_, row) => (
        <Button size="small" onClick={() => {
          const m = filtered.find(x => String(x.id) === String(row.id))
          if (m) setDetail(m)
        }}>📊</Button>
      ),
    },
  ]

  const trendIcon = summary.revenueTrend >= 0 ? '↑' : '↓'
  const trendTone = summary.revenueTrend >= 0 ? 'success' : 'error'

  return (
    <>
      <Toolbar
        filters={
          <Segmented
            value={period}
            onChange={setPeriod}
            options={[
              { label: '7 days', value: '7d' },
              { label: '14 days', value: '14d' },
              { label: '30 days', value: '30d' },
            ]}
          />
        }
        actions={<Button size="small" onClick={() => setExportOpen(true)}>Export</Button>}
      />
      <StatsRow
        items={[
          {
            label: 'Revenue',
            value: money(summary.totalRevenue, { compact: true }),
            sub: `${trendIcon} ${Math.abs(summary.revenueTrend)}% vs prev period`,
            subTone: trendTone as 'success' | 'error',
          },
          {
            label: 'Orders',
            value: num(summary.totalOrders),
            sub: `avg ${money(summary.avgOrderValue)}/order`,
          },
          {
            label: 'Visitors',
            value: num(summary.totalVisitors, { compact: true }),
            sub: `${summary.avgConversion}% conversion`,
          },
          {
            label: 'New Customers',
            value: summary.totalNewCustomers,
            sub: 'acquisition',
          },
        ]}
      />
      <Table
        columns={columns}
        data={tableData}
        pageSize={10}
        size="small"
        summary={(rows) => {
          const totalRev = rows.reduce((s, r) => s + (Number(r.data.revenue) || 0), 0)
          const totalOrd = rows.reduce((s, r) => s + (Number(r.data.orders) || 0), 0)
          const totalVis = rows.reduce((s, r) => s + (Number(r.data.visitors) || 0), 0)
          const avgConv = rows.length ? (rows.reduce((s, r) => s + (Number(r.data.conversion) || 0), 0) / rows.length) : 0
          const avgAOV = totalOrd ? totalRev / totalOrd : 0
          const totalNew = rows.reduce((s, r) => s + (Number(r.data.newCustomers) || 0), 0)
          const totalRet = rows.reduce((s, r) => s + (Number(r.data.returningCustomers) || 0), 0)
          return [[
            { content: 'Total' },
            { content: money(totalRev), align: 'right' as const },
            { content: String(totalOrd), align: 'center' as const },
            { content: num(totalVis), align: 'center' as const },
            { content: percent(avgConv, 2) },
            { content: money(avgAOV), align: 'right' as const },
            { content: String(totalNew), align: 'center' as const },
            { content: String(totalRet), align: 'center' as const },
            { content: '' },
          ]]
        }}
      />

      <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Export Data" footer={null} width={440}>
        <Form onFinish={(values) => {
          notification.success(`Exported as ${values.format} (mock)`)
          setExportOpen(false)
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
            <Button onClick={() => setExportOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Export</Button>
          </div>
        </Form>
      </Modal>

      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={`Day Details — ${detail?.date ?? ''}`}
        width={420}
      >
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Descriptions
              items={[
                { label: 'Date', children: detail.date },
                { label: 'Revenue', children: money(detail.revenue) },
                { label: 'Orders', children: String(detail.orders) },
                { label: 'Visitors', children: num(detail.visitors) },
                { label: 'Conversion', children: percent(detail.conversion, 2) },
                { label: 'AOV', children: money(detail.avgOrderValue) },
                { label: 'New Customers', children: String(detail.newCustomers) },
                { label: 'Returning', children: String(detail.returningCustomers) },
              ]}
              column={1}
              size="small"
            />
            <h4>Revenue Performance</h4>
            <Progress
              percent={Math.min(100, Math.round((detail.revenue / 5000) * 100))}
              status={detail.revenue > 3000 ? 'success' : 'active'}
            />
            <h4>Conversion Rate</h4>
            <Progress
              percent={Math.round(detail.conversion * 20)}
              status={detail.conversion >= 3 ? 'success' : detail.conversion >= 2 ? 'active' : 'error'}
            />
          </div>
        )}
      </Drawer>
    </>
  )
}
