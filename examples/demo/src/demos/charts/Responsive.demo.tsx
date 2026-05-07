import { LineChart } from '@skygraph/react'
import { monthlyRevenue } from './_data'

const data = monthlyRevenue()

export function ResponsiveChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Drag the bottom-right corner to resize. After the SVG sizing fix the
        plot rescales without pulling points off the grid.
      </div>
      <div
        style={{
          resize: 'both',
          overflow: 'hidden',
          width: 480,
          height: 280,
          minWidth: 280,
          minHeight: 180,
          maxWidth: '100%',
          border: '1px dashed var(--sg-color-border)',
          borderRadius: 8,
          padding: 12,
          background: 'var(--sg-color-bg-elevated)',
        }}
      >
        <LineChart
          categories={data.categories}
          series={data.series}
          width="100%"
          height={220}
          xAxis={{ tickCount: 6 }}
          yAxis={{ tickCount: 5, gridLines: true }}
          markers
          crosshair
        />
      </div>
    </div>
  )
}
