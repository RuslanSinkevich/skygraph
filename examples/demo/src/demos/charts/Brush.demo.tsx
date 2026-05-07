import { useState } from 'react'
import { AreaChart, type ChartBrushRange } from '@skygraph/react'
import { priceSeries } from './_data'

const data = priceSeries(13)

export function BrushChart() {
  const [range, setRange] = useState<ChartBrushRange | null>({ from: 2, to: 8 })

  const summary = range
    ? `${data.categories[range.from] ?? ''} → ${data.categories[range.to] ?? ''} (${
        range.to - range.from + 1
      } pts)`
    : 'no selection'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setRange(null)}
          disabled={!range}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            border: '1px solid var(--sg-color-border)',
            background: 'var(--sg-color-bg-elevated)',
            color: 'var(--sg-color-text-primary)',
            cursor: range ? 'pointer' : 'not-allowed',
            opacity: range ? 1 : 0.5,
          }}
        >
          Reset selection
        </button>
        <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
          Drag inside the plot to select. Selection: <code>{summary}</code>
        </span>
      </div>
      <AreaChart
        categories={data.categories}
        series={data.series}
        height={240}
        stacked={false}
        brush={{ range, onRangeChange: setRange, defaultRange: null }}
        xAxis={{ tickCount: 7, label: 'Day' }}
        yAxis={{ tickCount: 5, gridLines: true }}
        padding={[20, 24, 36, 56]}
      />
    </div>
  )
}
