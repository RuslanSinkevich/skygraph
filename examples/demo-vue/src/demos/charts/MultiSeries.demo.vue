<script setup lang="ts">
/**
 * Five series share the default palette tokens — re-theme by
 * overriding `--sg-color-*` instead of editing the chart itself.
 */
import { SgLineChart } from '@skygraph/vue'
import { fivePalettes } from './_data'

const data = fivePalettes()
</script>

<template>
  <SgLineChart
    :categories="data.categories"
    :series="data.series"
    :height="260"
    :stroke-width="2"
    legend
    crosshair
    :x-axis="{ tickCount: 6, label: 'Hour' }"
    :y-axis="{ tickCount: 5, gridLines: true }"
    :padding="[20, 24, 36, 48]"
  />
</template>
