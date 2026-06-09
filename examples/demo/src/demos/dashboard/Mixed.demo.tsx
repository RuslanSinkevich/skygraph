import { Dashboard, LineChart, BarChart } from '@skygraph/react'
import type { DashboardWidget } from '@skygraph/react'

const tableRows = [
  { country: 'US', visits: 4220, share: '42%' },
  { country: 'DE', visits: 1830, share: '18%' },
  { country: 'JP', visits: 1410, share: '14%' },
  { country: 'BR', visits: 980, share: '10%' },
  { country: 'IN', visits: 740, share: '7%' },
]

const geoRegions = [
  { region: 'North America', value: 42, color: 'var(--sg-color-primary)' },
  { region: 'Europe', value: 28, color: 'var(--sg-color-success)' },
  { region: 'Asia Pacific', value: 21, color: 'var(--sg-color-warning)' },
  { region: 'Latin America', value: 6, color: 'var(--sg-color-error)' },
  { region: 'Other', value: 3, color: 'var(--sg-color-text-tertiary)' },
]

const widgets: DashboardWidget[] = [
  {
    id: 'kpi-revenue',
    title: 'Revenue',
    x: 1,
    y: 1,
    w: 3,
    h: 2,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--sg-color-text)' }}>
          $128.4k
        </span>
        <span style={{ fontSize: 12, color: 'var(--sg-color-success)' }}>
          +12.4% vs prev. month
        </span>
      </div>
    ),
  },
  {
    id: 'kpi-orders',
    title: 'Orders',
    x: 4,
    y: 1,
    w: 3,
    h: 2,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--sg-color-text)' }}>3 412</span>
        <span style={{ fontSize: 12, color: 'var(--sg-color-error)' }}>-2.1% vs prev. month</span>
      </div>
    ),
  },
  {
    id: 'visits',
    title: 'Visits — last 7 days',
    x: 7,
    y: 1,
    w: 6,
    h: 3,
    children: (
      <LineChart
        categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        series={[
          { id: 'a', label: 'Web', values: [120, 200, 150, 180, 220, 90, 80] },
          { id: 'b', label: 'Mobile', values: [60, 90, 110, 120, 180, 70, 60] },
        ]}
        height={200}
      />
    ),
  },
  {
    id: 'orders-quarterly',
    title: 'Orders by quarter',
    x: 1,
    y: 3,
    w: 6,
    h: 3,
    children: (
      <BarChart
        categories={['Q1', 'Q2', 'Q3', 'Q4']}
        series={[{ id: 'o', label: 'Orders', values: [240, 320, 280, 410] }]}
        height={200}
      />
    ),
  },
  {
    id: 'top-countries',
    title: 'Top countries',
    x: 7,
    y: 4,
    w: 6,
    h: 3,
    children: (
      <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'var(--sg-color-text-secondary)' }}>
            <th style={{ padding: '4px 6px', borderBottom: '1px solid var(--sg-color-border)' }}>
              Country
            </th>
            <th style={{ padding: '4px 6px', borderBottom: '1px solid var(--sg-color-border)' }}>
              Visits
            </th>
            <th style={{ padding: '4px 6px', borderBottom: '1px solid var(--sg-color-border)' }}>
              Share
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((r) => (
            <tr key={r.country}>
              <td style={{ padding: '4px 6px' }}>{r.country}</td>
              <td style={{ padding: '4px 6px' }}>{r.visits.toLocaleString()}</td>
              <td style={{ padding: '4px 6px', color: 'var(--sg-color-text-secondary)' }}>
                {r.share}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    id: 'map',
    title: 'Geo distribution',
    x: 1,
    y: 6,
    w: 12,
    h: 4,
    children: (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 220,
          borderRadius: 8,
          padding: 20,
          boxSizing: 'border-box',
          background:
            'radial-gradient(circle at 25% 35%, var(--sg-color-primary-bg, rgba(22,119,255,0.18)) 0, transparent 45%),' +
            'radial-gradient(circle at 72% 62%, var(--sg-color-success-bg, rgba(82,196,26,0.16)) 0, transparent 50%),' +
            'linear-gradient(135deg, var(--sg-color-bg-container) 0%, var(--sg-color-fill) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 14,
        }}
      >
        {geoRegions.map((r) => (
          <div key={r.region} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 130,
                fontSize: 13,
                color: 'var(--sg-color-text)',
                flexShrink: 0,
              }}
            >
              {r.region}
            </span>
            <div
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                background: 'var(--sg-color-fill-secondary, rgba(0,0,0,0.06))',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${r.value}%`,
                  height: '100%',
                  borderRadius: 4,
                  background: r.color,
                }}
              />
            </div>
            <span
              style={{
                width: 44,
                textAlign: 'right',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--sg-color-text)',
                flexShrink: 0,
              }}
            >
              {r.value}%
            </span>
          </div>
        ))}
      </div>
    ),
  },
]

export function MixedDashboard() {
  return <Dashboard widgets={widgets} columns={12} rowHeight={70} gap={12} />
}
