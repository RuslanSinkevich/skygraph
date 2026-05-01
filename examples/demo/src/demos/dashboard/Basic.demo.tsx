import { Dashboard, LineChart, BarChart } from '@skygraph/react'
import type { DashboardWidget } from '@skygraph/react'

const widgets: DashboardWidget[] = [
  {
    id: 'visits',
    title: 'Daily visits',
    x: 1, y: 1, w: 8, h: 3,
    children: (
      <LineChart
        categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        series={[{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220, 90, 80] }]}
        height={180}
      />
    ),
  },
  {
    id: 'revenue',
    title: 'Revenue',
    x: 9, y: 1, w: 4, h: 1,
    children: (
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--sg-color-text)' }}>$48.2k</div>
    ),
  },
  {
    id: 'orders',
    title: 'Orders',
    x: 9, y: 2, w: 4, h: 2,
    children: (
      <BarChart
        categories={['Q1', 'Q2', 'Q3', 'Q4']}
        series={[{ id: 'o', label: 'Orders', values: [240, 320, 280, 410] }]}
        height={140}
      />
    ),
  },
  {
    id: 'feed',
    title: 'Recent activity',
    x: 1, y: 4, w: 12, h: 2,
    children: (
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <li>Order #1242 — paid</li>
        <li>New user — alice@example.com</li>
        <li>Refund #882 — processed</li>
      </ul>
    ),
  },
]

export function BasicDashboard() {
  return <Dashboard widgets={widgets} columns={12} rowHeight={100} gap={16} />
}
