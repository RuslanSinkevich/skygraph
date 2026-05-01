import { AreaChart } from '@skygraph/react'

export function BasicAreaChart() {
  return (
    <AreaChart
      categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
      series={[
        { id: 'mobile', label: 'Mobile', values: [40, 60, 50, 80, 90] },
        { id: 'desktop', label: 'Desktop', values: [80, 100, 110, 90, 120] },
      ]}
      stacked
      height={220}
    />
  )
}
