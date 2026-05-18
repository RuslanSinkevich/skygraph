import { useEffect, useState } from 'react'
import { LineChart } from '@skygraph/react'
import { cpuTrace } from './_data'

const TRACE = cpuTrace()
const WINDOW = 30
const TICK_MS = 500

export function RealtimeChart() {
  const [running, setRunning] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % TRACE.values.length)
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [running])

  // Sliding window of size WINDOW that wraps around the deterministic trace.
  const slice: number[] = []
  const cats: string[] = []
  for (let i = 0; i < WINDOW; i++) {
    const idx = (offset + i) % TRACE.values.length
    slice.push(TRACE.values[idx]!)
    cats.push(`t-${WINDOW - i}`)
  }
  cats[WINDOW - 1] = 'now'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            border: '1px solid var(--sg-color-border)',
            background: running ? 'var(--sg-color-warning)' : 'var(--sg-color-success)',
            color: 'var(--sg-color-white)',
            cursor: 'pointer',
          }}
        >
          {running ? '⏸ Pause' : '▶ Resume'}
        </button>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          Sliding window: {WINDOW} pts · tick: {TICK_MS}ms · current = {slice[WINDOW - 1]}%
        </span>
      </div>
      <LineChart
        categories={cats}
        series={[{ id: 'cpu', label: 'CPU usage (%)', values: slice }]}
        height={220}
        markers={false}
        animate={false}
        crosshair={{ valueFormatter: (v) => `${v}%` }}
        xAxis={{ tickCount: 6 }}
        yAxis={{ tickCount: 5, tickFormatter: (v) => `${v}%`, gridLines: true }}
        padding={[20, 24, 36, 48]}
      />
    </div>
  )
}
