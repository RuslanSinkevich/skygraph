import { useState } from 'react'
import { Dashboard, LineChart } from '@skygraph/react'
import type { DashboardWidget, WidgetAction } from '@skygraph/react'

export function WithActionsDashboard() {
  const [log, setLog] = useState<string[]>([])

  const append = (msg: string) => {
    console.log('[Dashboard]', msg)
    setLog((l) => [msg, ...l].slice(0, 6))
  }

  const sharedActions: WidgetAction[] = [
    { id: 'refresh', label: 'Refresh', onClick: (w) => append(`refresh: ${w.id}`) },
    { id: 'export', label: 'Export CSV', onClick: (w) => append(`export: ${w.id}`) },
    { id: 'pin', label: 'Pin', onClick: (w) => append(`pin: ${w.id}`) },
  ]

  const widgets: DashboardWidget[] = [
    {
      id: 'visits',
      title: 'Daily visits',
      x: 1,
      y: 1,
      w: 7,
      h: 3,
      children: (
        <LineChart
          categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
          series={[{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220] }]}
          height={180}
        />
      ),
      actions: [
        ...sharedActions,
        {
          id: 'archive',
          label: 'Archive',
          variant: 'danger',
          onClick: (w) => append(`archive: ${w.id}`),
        },
      ],
    },
    {
      id: 'kpi',
      title: 'Revenue',
      x: 8,
      y: 1,
      w: 5,
      h: 2,
      children: (
        <div style={{ display: 'grid', gap: 4 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--sg-color-text)' }}>$48.2k</div>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
            +12.4% vs previous week
          </div>
        </div>
      ),
      actions: sharedActions,
    },
    {
      id: 'no-actions',
      title: 'No actions',
      x: 8,
      y: 3,
      w: 5,
      h: 2,
      children: (
        <div style={{ color: 'var(--sg-color-text-secondary)' }}>
          This widget defines `actions: []` — no `⋯` menu shown.
        </div>
      ),
      actions: [],
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Dashboard widgets={widgets} columns={12} rowHeight={80} gap={12} />
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          padding: 8,
          background: 'var(--sg-color-bg-container)',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 'var(--sg-border-radius)',
          minHeight: 60,
        }}
      >
        {log.length === 0 ? (
          <span style={{ color: 'var(--sg-color-text-tertiary)' }}>Hover a widget, click `⋯`…</span>
        ) : (
          log.map((line, i) => <div key={i}>{line}</div>)
        )}
      </div>
    </div>
  )
}
