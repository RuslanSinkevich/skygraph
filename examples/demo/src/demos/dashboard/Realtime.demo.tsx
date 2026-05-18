import { useEffect, useRef, useState } from 'react'
import { Dashboard, LineChart } from '@skygraph/react'
import type { DashboardWidget } from '@skygraph/react'

const POINTS = 24
const TICK_MS = 2000

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

function nextSeries(prev: readonly number[]) {
  const last = prev[prev.length - 1] ?? 100
  const drift = rand(-30, 30)
  const v = Math.max(0, Math.min(500, last + drift))
  return [...prev.slice(1), v]
}

export function RealtimeDashboard() {
  const startRef = useRef(Array.from({ length: POINTS }, () => rand(80, 220)))
  const [values, setValues] = useState<number[]>(startRef.current)
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 7 }, () => rand(40, 220)))
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setValues((cur) => nextSeries(cur))
      setBars((cur) => cur.map((v) => Math.max(0, Math.min(300, v + rand(-30, 30)))))
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [paused])

  const tickLabels = Array.from({ length: POINTS }, (_, i) => `t-${POINTS - 1 - i}`)

  const widgets: DashboardWidget[] = [
    {
      id: 'live',
      title: `Live throughput · ${paused ? 'paused' : 'streaming'}`,
      x: 1,
      y: 1,
      w: 12,
      h: 4,
      children: (
        <LineChart
          categories={tickLabels}
          series={[{ id: 't', label: 'Throughput', values }]}
          height={220}
        />
      ),
    },
    {
      id: 'recent',
      title: 'Last 7 ticks',
      x: 1,
      y: 5,
      w: 6,
      h: 2,
      children: (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '100%' }}>
          {bars.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${(v / 300) * 100}%`,
                background: 'var(--sg-color-primary)',
                borderRadius: 2,
                transition: 'height 240ms ease',
              }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'now',
      title: 'Current value',
      x: 7,
      y: 5,
      w: 6,
      h: 2,
      children: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--sg-color-text)' }}>
            {values[values.length - 1]}
          </span>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            style={{
              padding: '6px 14px',
              border: '1px solid var(--sg-color-border)',
              borderRadius: 'var(--sg-border-radius)',
              background: paused ? 'var(--sg-color-success)' : 'var(--sg-color-bg-elevated)',
              color: paused ? 'var(--sg-color-white)' : 'var(--sg-color-text)',
              cursor: 'pointer',
            }}
          >
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>
      ),
    },
  ]

  return <Dashboard widgets={widgets} columns={12} rowHeight={70} gap={12} />
}
