<script setup lang="ts">
/**
 * Hover crosshair on a `LineChart` — a vertical guide + per-series tooltip
 * with currency formatting.
 */
import { SgLineChart } from '@skygraph/vue'
import { priceSeries } from './_data'

const data = priceSeries()
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
      Hover the chart — vertical guide + per-series tooltip with currency formatting.
    </div>
    <SgLineChart
      :categories="data.categories"
      :series="data.series"
      :height="260"
      :crosshair="{ valueFormatter: (v: number) => usd.format(v) }"
      :x-axis="{ label: 'Day' }"
      :y-axis="{ tickCount: 5, tickFormatter: (v: number) => usd.format(v), gridLines: true }"
      :padding="[20, 24, 36, 80]"
      legend
    />
  </div>
</template>
