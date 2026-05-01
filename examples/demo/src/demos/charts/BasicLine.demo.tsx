import { LineChart } from '@skygraph/react'

export function BasicLineChart() {
  return (
    <LineChart
      categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      series={[
        { id: 'visits', label: 'Visits', values: [120, 200, 150, 80, 70, 110, 130] },
        { id: 'orders', label: 'Orders', values: [40, 70, 50, 30, 25, 45, 60] },
      ]}
      height={220}
    />
  )
}
