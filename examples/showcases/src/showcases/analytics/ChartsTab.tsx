import { useMemo, useState } from 'react'
import {
  LineChart, BarChart, AreaChart, PieChart, ChartLegend, Segmented,
} from '@skygraph/react'
import type { ChartSeries, PieChartSlice } from '@skygraph/react'
import { dailyMetrics, channelMetrics, topProducts } from './data'
import { money, num } from '../_shared'

/** NEW: previously absent — full Charts dashboard. */
export function ChartsTab() {
  const [period, setPeriod] = useState<'7d' | '14d' | '30d'>('14d')

  const slice = useMemo(() => {
    const days = period === '7d' ? 7 : period === '14d' ? 14 : 30
    return dailyMetrics.slice(-days)
  }, [period])

  const dateCategories = useMemo(() => slice.map(m => m.date.slice(5)), [slice])

  const revenueOrdersSeries: ChartSeries[] = [
    { id: 'revenue', label: 'Revenue ($)', values: slice.map(m => m.revenue) },
    { id: 'visitors', label: 'Visitors', values: slice.map(m => m.visitors) },
  ]

  const ordersSeries: ChartSeries[] = [
    { id: 'orders', label: 'Orders', values: slice.map(m => m.orders), color: 'var(--sg-color-success)' },
  ]

  const customerMixSeries: ChartSeries[] = [
    { id: 'new', label: 'New', values: slice.map(m => m.newCustomers), color: 'var(--sg-color-primary)' },
    { id: 'returning', label: 'Returning', values: slice.map(m => m.returningCustomers), color: 'var(--sg-color-warning)' },
  ]

  const channelSlices: PieChartSlice[] = channelMetrics.map((c, i) => ({
    id: c.channel,
    label: c.channel,
    value: c.revenue,
    color: ['var(--sg-color-primary)', 'var(--sg-color-success)', 'var(--sg-color-warning)', 'var(--sg-color-error)', 'var(--sg-blue-4)', 'var(--sg-green-5)'][i % 6]!,
  }))

  const channelLegendSeries: ChartSeries[] = channelSlices.map(s => ({
    id: s.id,
    label: s.label,
    color: s.color,
    values: [s.value],
  }))

  const topRevenueProducts = [...topProducts].sort((a, b) => b.revenue - a.revenue).slice(0, 6)
  const productSeries: ChartSeries[] = [
    { id: 'rev', label: 'Revenue', values: topRevenueProducts.map(p => p.revenue), color: 'var(--sg-color-primary)' },
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>Visual Analytics</h3>
        <Segmented
          value={period}
          onChange={(v) => setPeriod(v as typeof period)}
          options={[
            { label: '7d', value: '7d' },
            { label: '14d', value: '14d' },
            { label: '30d', value: '30d' },
          ]}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card chart-card--wide">
          <div className="chart-card-header">
            <h4>Revenue & Visitors</h4>
            <span>Period totals: <strong>{money(slice.reduce((s, m) => s + m.revenue, 0), { compact: true })}</strong></span>
          </div>
          <LineChart
            categories={dateCategories}
            series={revenueOrdersSeries}
            height={240}
            legend
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h4>Orders / day</h4>
            <span>Total: <strong>{num(slice.reduce((s, m) => s + m.orders, 0))}</strong></span>
          </div>
          <BarChart
            categories={dateCategories}
            series={ordersSeries}
            height={240}
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h4>Customer Mix (stacked)</h4>
          </div>
          <AreaChart
            categories={dateCategories}
            series={customerMixSeries}
            height={240}
            legend
          />
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h4>Revenue by Channel</h4>
          </div>
          <PieChart
            data={channelSlices}
            width={240}
            height={240}
            innerRadius={60}
          />
          <ChartLegend series={channelLegendSeries} />
        </div>

        <div className="chart-card chart-card--wide">
          <div className="chart-card-header">
            <h4>Top Products by Revenue</h4>
          </div>
          <BarChart
            categories={topRevenueProducts.map(p => p.name)}
            series={productSeries}
            height={240}
          />
        </div>
      </div>

      <style>{chartsStyles}</style>
    </>
  )
}

const chartsStyles = `
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.chart-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  padding: 16px;
  background: var(--sg-color-bg);
}
.chart-card--wide {
  grid-column: span 2;
}
.chart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}
.chart-card-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.chart-card-header span {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
}
@media (max-width: 900px) {
  .charts-grid { grid-template-columns: 1fr; }
  .chart-card--wide { grid-column: span 1; }
}
`
