import { useRef } from 'react'
import { LineChart, BarChart, AreaChart, PieChart, Button } from '@skygraph/react'
import type { ChartRef } from '@skygraph/react'

/**
 * Демонстрация печати графиков. Каждый chart экспонирует одинаковый
 * `ChartRef` через `forwardRef` — `chartRef.current.print({ fileName })`.
 * SVG отлично печатается as-is; `print.css` дополнительно скрывает hover
 * crosshair / brush overlay в `@media print`.
 */
export function ChartPrintDemo() {
  const lineRef = useRef<ChartRef>(null)
  const barRef = useRef<ChartRef>(null)
  const areaRef = useRef<ChartRef>(null)
  const pieRef = useRef<ChartRef>(null)

  const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const series = [
    { id: 'visits', label: 'Visits', values: [120, 200, 150, 80, 70, 110, 130] },
    { id: 'orders', label: 'Orders', values: [40, 70, 50, 30, 25, 45, 60] },
  ]

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => lineRef.current?.print({ fileName: 'line-chart' })}>
          Print Line
        </Button>
        <Button onClick={() => barRef.current?.print({ fileName: 'bar-chart' })}>
          Print Bar
        </Button>
        <Button onClick={() => areaRef.current?.print({ fileName: 'area-chart' })}>
          Print Area
        </Button>
        <Button onClick={() => pieRef.current?.print({ fileName: 'pie-chart' })}>
          Print Pie
        </Button>
      </div>
      <LineChart ref={lineRef} categories={categories} series={series} height={200} printable />
      <BarChart ref={barRef} categories={categories} series={series} height={200} printable />
      <AreaChart ref={areaRef} categories={categories} series={series} height={200} printable />
      <PieChart
        ref={pieRef}
        data={[
          { id: 'a', label: 'Mobile', value: 45 },
          { id: 'b', label: 'Desktop', value: 35 },
          { id: 'c', label: 'Tablet', value: 20 },
        ]}
        printable
      />
    </div>
  )
}
