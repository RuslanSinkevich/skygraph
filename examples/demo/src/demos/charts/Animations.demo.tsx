import { useState } from 'react'
import { BarChart, LineChart } from '@skygraph/react'
import { monthlyRevenue, quarterlyMarkets } from './_data'

const lineData = monthlyRevenue(3)
const barData = quarterlyMarkets(5)

export function AnimationsChart() {
  // Bumping a counter forces React to re-mount the chart subtree, which makes
  // the CSS animation play from the start (animations are pure CSS, no rAF).
  const [tick, setTick] = useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <button
          type="button"
          onClick={() => setTick((n) => n + 1)}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            border: '1px solid var(--sg-color-border)',
            background: 'var(--sg-color-primary)',
            color: 'var(--sg-color-text-inverse)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          ▶ Replay animation
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
            LineChart · animate.duration = 800ms
          </div>
          <LineChart
            key={`line-${tick}`}
            categories={lineData.categories}
            series={lineData.series}
            animate={{ duration: 800 }}
            height={220}
          />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
            BarChart · animate.duration = 800ms
          </div>
          <BarChart
            key={`bar-${tick}`}
            categories={barData.categories}
            series={barData.series}
            animate={{ duration: 800 }}
            height={220}
          />
        </div>
      </div>
    </div>
  )
}
