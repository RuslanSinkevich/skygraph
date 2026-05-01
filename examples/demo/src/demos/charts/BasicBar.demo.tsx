import { BarChart } from '@skygraph/react'

export function BasicBarChart() {
  return (
    <BarChart
      categories={['Q1', 'Q2', 'Q3', 'Q4']}
      series={[
        { id: 'revenue', label: 'Revenue', values: [240, 320, 280, 410] },
        { id: 'cost', label: 'Cost', values: [180, 210, 200, 260] },
      ]}
      height={220}
    />
  )
}
