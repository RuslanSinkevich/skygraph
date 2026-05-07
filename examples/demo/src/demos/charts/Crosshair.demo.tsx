import { LineChart } from '@skygraph/react'
import { priceSeries } from './_data'

const data = priceSeries()

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function CrosshairChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Hover the chart — vertical guide + per-series tooltip with currency formatting.
      </div>
      <LineChart
        categories={data.categories}
        series={data.series}
        height={260}
        crosshair={{ valueFormatter: (v) => usd.format(v) }}
        xAxis={{ label: 'Day' }}
        yAxis={{ tickCount: 5, tickFormatter: (v) => usd.format(v), gridLines: true }}
        padding={[20, 24, 36, 80]}
        legend
      />
    </div>
  )
}
