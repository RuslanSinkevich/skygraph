<script setup lang="ts">
/**
 * Basic stacked area chart. Top stroke + filled body share the series
 * colour at 25% opacity.
 */
import { SgAreaChart } from '@skygraph/vue'

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const series = [
  { id: 'mobile', label: 'Mobile', values: [40, 60, 50, 80, 90] },
  { id: 'desktop', label: 'Desktop', values: [80, 100, 110, 90, 120] },
]
</script>

<template>
  <SgAreaChart :categories="categories" :series="series" stacked :height="220" />
</template>
