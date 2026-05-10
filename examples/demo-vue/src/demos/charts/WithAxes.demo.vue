<script setup lang="ts">
/**
 * Configurable axes — tick count, tick formatter, axis label and
 * horizontal grid lines. Off by default; opt in via the `xAxis` /
 * `yAxis` props.
 */
import { SgLineChart } from '@skygraph/vue'
import { monthlyRevenue } from './_data'

const data = monthlyRevenue()
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
</script>

<template>
  <SgLineChart
    :categories="data.categories"
    :series="data.series"
    :height="260"
    :padding="[20, 24, 36, 56]"
    :x-axis="{ tickCount: 6, tickFormatter: (cat) => String(cat).slice(0, 3), label: 'Month' }"
    :y-axis="{ tickCount: 5, tickFormatter: (v: number) => currency.format(v), label: 'USD', gridLines: true }"
  />
</template>
