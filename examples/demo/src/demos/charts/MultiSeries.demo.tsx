import { LineChart } from '@skygraph/react'
import { fivePalettes } from './_data'

const data = fivePalettes()

export function MultiSeriesChart() {
  return (
    <LineChart
      categories={data.categories}
      series={data.series}
      height={260}
      strokeWidth={2}
      legend
      crosshair
      xAxis={{ tickCount: 6, label: 'Hour' }}
      yAxis={{ tickCount: 5, gridLines: true }}
      padding={[20, 24, 36, 48]}
    />
  )
}
