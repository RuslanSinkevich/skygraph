import { AreaChart } from '@skygraph/react'
import { preStackSeries, weeklyTrafficByDevice } from './_data'

const raw = weeklyTrafficByDevice()

// Side B: stacked aggregation done in user data; SkyGraph stays composable.
// We feed cumulative sums per category to a regular (non-stacked) AreaChart,
// reproducing what `stacked` does internally.
const preStacked = {
  categories: raw.categories,
  series: preStackSeries(raw.series),
}

export function StackedChart() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
      <div>
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
          AreaChart · <code>stacked</code> prop
        </div>
        <AreaChart
          categories={raw.categories}
          series={raw.series}
          stacked
          height={220}
          yAxis={{ gridLines: true }}
          legend
        />
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
          AreaChart · pre-aggregated data (cumulative sums)
        </div>
        <AreaChart
          categories={preStacked.categories}
          series={preStacked.series}
          height={220}
          yAxis={{ gridLines: true }}
          legend
        />
      </div>
    </div>
  )
}
