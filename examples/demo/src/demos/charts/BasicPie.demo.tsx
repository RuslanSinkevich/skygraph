import { PieChart } from '@skygraph/react'

export function BasicPieChart() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <PieChart
        data={[
          { id: 'desktop', label: 'Desktop', value: 60 },
          { id: 'mobile', label: 'Mobile', value: 30 },
          { id: 'tablet', label: 'Tablet', value: 10 },
        ]}
      />
      <PieChart
        innerRadius={45}
        outerRadius={80}
        data={[
          { id: 'success', label: 'Success', value: 72 },
          { id: 'pending', label: 'Pending', value: 18 },
          { id: 'failed', label: 'Failed', value: 10 },
        ]}
      />
    </div>
  )
}
