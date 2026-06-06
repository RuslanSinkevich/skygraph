import { Dashboard } from '@skygraph/react'
import type { DashboardWidget } from '@skygraph/react'

/**
 * Stress demo: 12 widgets pinned to a 6-column grid. Spans intentionally
 * mix wide / square / tall blocks so the grid renders all combinations
 * without overlap.
 *
 * Single-number KPIs sit in `h: 1` cells; only content that genuinely
 * needs the vertical room (the jobs list) spans `h: 2`. The `rowHeight`
 * below is tuned so each KPI value + delta fits inside its cell without
 * clipping or an inner scrollbar.
 */
const widgets: DashboardWidget[] = [
  {
    id: 'w1',
    title: 'Sessions',
    x: 1,
    y: 1,
    w: 2,
    h: 1,
    children: <KpiBlock value="12.4k" delta="+3.2%" tone="success" />,
  },
  {
    id: 'w2',
    title: 'Bounce rate',
    x: 3,
    y: 1,
    w: 2,
    h: 1,
    children: <KpiBlock value="38%" delta="-1.1%" tone="success" />,
  },
  {
    id: 'w3',
    title: 'AOV',
    x: 5,
    y: 1,
    w: 2,
    h: 1,
    children: <KpiBlock value="$72" delta="+$4" tone="success" />,
  },
  {
    id: 'w4',
    title: 'Latency',
    x: 1,
    y: 2,
    w: 2,
    h: 1,
    children: <KpiBlock value="142ms" delta="+8ms" tone="error" />,
  },
  {
    id: 'w5',
    title: 'Error rate',
    x: 3,
    y: 2,
    w: 2,
    h: 1,
    children: <KpiBlock value="0.4%" delta="+0.1%" tone="error" />,
  },
  {
    id: 'w6',
    title: 'Uptime',
    x: 5,
    y: 2,
    w: 2,
    h: 1,
    children: <KpiBlock value="99.97%" delta="0" tone="muted" />,
  },
  {
    id: 'w7',
    title: 'Top region',
    x: 1,
    y: 3,
    w: 3,
    h: 1,
    children: <Row k="us-east-1" v="42%" />,
  },
  {
    id: 'w8',
    title: 'Top device',
    x: 4,
    y: 3,
    w: 3,
    h: 1,
    children: <Row k="iPhone 15" v="28%" />,
  },
  { id: 'w9', title: 'Active jobs', x: 1, y: 4, w: 4, h: 2, children: <JobsList /> },
  { id: 'w10', title: 'Disk usage', x: 5, y: 4, w: 2, h: 1, children: <Bar pct={62} /> },
  { id: 'w11', title: 'Memory', x: 5, y: 5, w: 2, h: 1, children: <Bar pct={41} /> },
  { id: 'w12', title: 'Heartbeat', x: 1, y: 6, w: 6, h: 1, children: <Heartbeat /> },
]

function KpiBlock({
  value,
  delta,
  tone,
}: {
  value: string
  delta: string
  tone: 'success' | 'error' | 'muted'
}) {
  const color =
    tone === 'success'
      ? 'var(--sg-color-success)'
      : tone === 'error'
        ? 'var(--sg-color-error)'
        : 'var(--sg-color-text-tertiary)'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        height: '100%',
      }}
    >
      <strong style={{ fontSize: 20, lineHeight: 1.2, color: 'var(--sg-color-text)' }}>
        {value}
      </strong>
      <span style={{ fontSize: 12, lineHeight: 1.2, color }}>{delta}</span>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <span style={{ color: 'var(--sg-color-text)' }}>{k}</span>
      <span style={{ color: 'var(--sg-color-text-secondary)' }}>{v}</span>
    </div>
  )
}

function JobsList() {
  return (
    <ul
      style={{ margin: 0, paddingLeft: 18, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}
    >
      <li>etl/customer-sync — running</li>
      <li>etl/orders-aggregate — queued</li>
      <li>ml/score-batch-7 — running</li>
      <li>cron/cleanup-old-sessions — done</li>
    </ul>
  )
}

function Bar({ pct }: { pct: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{pct}% used</span>
      <div
        style={{
          height: 8,
          background: 'var(--sg-color-fill-secondary)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: pct > 75 ? 'var(--sg-color-error)' : 'var(--sg-color-primary)',
          }}
        />
      </div>
    </div>
  )
}

function Heartbeat() {
  // Decorative inline SVG — small ECG-style pulse line.
  return (
    <svg viewBox="0 0 600 40" preserveAspectRatio="none" width="100%" height="100%">
      <polyline
        fill="none"
        stroke="var(--sg-color-primary)"
        strokeWidth="2"
        points="
          0,20 40,20 60,5 80,35 100,15 130,25 160,20 200,20 230,8 250,32 270,15 310,25 340,20 380,20
          400,5 420,35 440,15 470,25 500,20 540,20 560,8 580,32 600,20"
      />
    </svg>
  )
}

export function LargeGridDashboard() {
  return <Dashboard widgets={widgets} columns={6} rowHeight={108} gap={12} />
}
