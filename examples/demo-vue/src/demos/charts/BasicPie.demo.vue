<script setup lang="ts">
/**
 * Pie + donut. Vue's `SgPieChart` reads `categories` + a single
 * `series` (one entry per slice value) — different shape from React's
 * `data={[{ id, label, value }]}` array. See
 * `findings/T-Vue-Demo-Complex.md` → `pie-categories-vs-data`.
 */
import { SgPieChart } from '@skygraph/vue'

const browsers = ['Desktop', 'Mobile', 'Tablet']
const browserSeries = [{ id: 'share', label: 'Share', values: [60, 30, 10] }]

const status = ['Success', 'Pending', 'Failed']
const statusSeries = [{ id: 'count', label: 'Count', values: [72, 18, 10] }]
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap">
    <SgPieChart legend :categories="browsers" :series="browserSeries" />
    <SgPieChart
      legend
      :inner-radius="0.55"
      :categories="status"
      :series="statusSeries"
    />
  </div>
</template>
