import { useState } from 'react'
import { DashboardEditor, LineChart, BarChart } from '@skygraph/react'
import type { DashboardWidget } from '@skygraph/react'

const initial: DashboardWidget[] = [
  {
    id: 'visits',
    title: 'Daily visits',
    x: 1, y: 1, w: 7, h: 3,
    children: (
      <LineChart
        categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        series={[{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220, 90, 80] }]}
        height={180}
      />
    ),
  },
  {
    id: 'orders',
    title: 'Orders',
    x: 8, y: 1, w: 5, h: 3,
    children: (
      <BarChart
        categories={['Q1', 'Q2', 'Q3', 'Q4']}
        series={[{ id: 'o', label: 'Orders', values: [240, 320, 280, 410] }]}
        height={180}
      />
    ),
  },
]

export function EditorDashboard() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(initial)
  const [log, setLog] = useState<string[]>([])
  const [counter, setCounter] = useState(1)

  const addWidget = () => {
    const id = `w-${counter}`
    setCounter((c) => c + 1)
    setWidgets((cur) => [
      ...cur,
      {
        id,
        title: `New widget ${counter}`,
        x: 1, y: 4, w: 4, h: 2,
        children: <div style={{ color: 'var(--sg-color-text-secondary)' }}>Drag me, resize me.</div>,
      },
    ])
    setLog((l) => [`+ added ${id}`, ...l].slice(0, 8))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          type="button"
          onClick={addWidget}
          style={{
            padding: '6px 14px',
            border: '1px solid var(--sg-color-border)',
            borderRadius: 'var(--sg-border-radius)',
            background: 'var(--sg-color-primary)',
            color: 'var(--sg-color-text-light-solid, #fff)',
            cursor: 'pointer',
          }}
        >
          + Add widget
        </button>
        <span style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
          {widgets.length} widgets
        </span>
      </div>
      <DashboardEditor
        widgets={widgets}
        columns={12}
        rowHeight={80}
        gap={12}
        onLayoutChange={(next, meta) => {
          setWidgets(next)
          const patch = Object.entries(meta.patch)
            .map(([k, v]) => `${k}=${v}`)
            .join(' ')
          setLog((l) =>
            [`${meta.widgetId}: ${patch || 'removed'}`, ...l].slice(0, 8),
          )
        }}
      />
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          padding: 8,
          background: 'var(--sg-color-bg-container)',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 'var(--sg-border-radius)',
          minHeight: 80,
        }}
      >
        {log.length === 0
          ? <span style={{ color: 'var(--sg-color-text-tertiary)' }}>onLayoutChange log…</span>
          : log.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    </div>
  )
}
