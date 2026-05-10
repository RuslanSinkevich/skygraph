<script setup lang="ts">
/**
 * `stacked` prop on AreaChart vs the same data manually pre-aggregated
 * (cumulative sums per category). Visually identical — Skygraph stays
 * composable.
 */
import { SgAreaChart } from '@skygraph/vue'
import { weeklyTrafficByDevice, preStackSeries } from './_data'

const raw = weeklyTrafficByDevice()
const preStacked = {
  categories: raw.categories,
  series: preStackSeries(raw.series),
}
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px">
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        AreaChart · <code>stacked</code> prop
      </div>
      <SgAreaChart
        :categories="raw.categories"
        :series="raw.series"
        stacked
        :height="220"
        :y-axis="{ gridLines: true }"
        legend
      />
    </div>
    <div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        AreaChart · pre-aggregated data (cumulative sums)
      </div>
      <SgAreaChart
        :categories="preStacked.categories"
        :series="preStacked.series"
        :height="220"
        :y-axis="{ gridLines: true }"
        legend
      />
    </div>
  </div>
</template>
