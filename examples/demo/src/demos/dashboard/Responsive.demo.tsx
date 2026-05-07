import { useState } from 'react'
import { Dashboard, LineChart } from '@skygraph/react'
import type { DashboardWidget } from '@skygraph/react'

type Mode = 'mobile' | 'tablet' | 'desktop'

const modes: Record<Mode, { cols: number; maxWidth: number; rowH: number }> = {
  mobile: { cols: 2, maxWidth: 320, rowH: 90 },
  tablet: { cols: 6, maxWidth: 720, rowH: 80 },
  desktop: { cols: 12, maxWidth: 9999, rowH: 80 },
}

function buildWidgets(cols: number): DashboardWidget[] {
  // For each mode we span widgets across the full grid width so the
  // demo reads cleanly regardless of `cols`.
  const half = Math.max(1, Math.floor(cols / 2))
  return [
    {
      id: 'kpi-1',
      title: 'Revenue',
      x: 1, y: 1, w: cols >= 4 ? half : cols, h: 1,
      children: <strong style={{ fontSize: 22 }}>$128.4k</strong>,
    },
    {
      id: 'kpi-2',
      title: 'Orders',
      x: cols >= 4 ? half + 1 : 1,
      y: cols >= 4 ? 1 : 2,
      w: cols >= 4 ? cols - half : cols,
      h: 1,
      children: <strong style={{ fontSize: 22 }}>3 412</strong>,
    },
    {
      id: 'chart',
      title: 'Visits',
      x: 1,
      y: cols >= 4 ? 2 : 3,
      w: cols,
      h: 3,
      children: (
        <LineChart
          categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          series={[{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220, 90, 80] }]}
          height={180}
        />
      ),
    },
  ]
}

export function ResponsiveDashboard() {
  const [mode, setMode] = useState<Mode>('desktop')
  const cfg = modes[mode]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {(Object.keys(modes) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            style={{
              padding: '4px 12px',
              border: '1px solid var(--sg-color-border)',
              borderRadius: 'var(--sg-border-radius)',
              background: mode === m ? 'var(--sg-color-primary)' : 'var(--sg-color-bg-elevated)',
              color: mode === m ? 'var(--sg-color-text-light-solid, #fff)' : 'var(--sg-color-text)',
              cursor: 'pointer',
              fontSize: 13,
              textTransform: 'capitalize',
            }}
          >
            {m} ({modes[m].cols} cols)
          </button>
        ))}
      </div>
      <div
        style={{
          maxWidth: cfg.maxWidth,
          width: '100%',
          margin: '0 auto',
          padding: 8,
          border: '1px dashed var(--sg-color-border)',
          borderRadius: 'var(--sg-border-radius)',
          background: 'var(--sg-color-bg-container)',
          transition: 'max-width 200ms ease',
        }}
      >
        <Dashboard
          widgets={buildWidgets(cfg.cols)}
          columns={cfg.cols}
          rowHeight={cfg.rowH}
          gap={10}
        />
      </div>
    </div>
  )
}
