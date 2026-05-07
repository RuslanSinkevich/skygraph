import { LineChart } from '@skygraph/react'
import { monthlyRevenue } from './_data'

const data = monthlyRevenue()

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function WithAxesChart() {
  return (
    <LineChart
      categories={data.categories}
      series={data.series}
      height={260}
      padding={[20, 24, 36, 56]}
      xAxis={{
        tickCount: 6,
        tickFormatter: (cat) => String(cat).slice(0, 3),
        label: 'Month',
      }}
      yAxis={{
        tickCount: 5,
        tickFormatter: (v) => currency.format(v),
        label: 'USD',
        gridLines: true,
      }}
    />
  )
}
