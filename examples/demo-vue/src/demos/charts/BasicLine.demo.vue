<script setup lang="ts">
/**
 * Basic line chart with two series. Markers and the default palette
 * follow Skygraph tokens.
 */
import { SgLineChart } from '@skygraph/vue'

const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const series = [
  { id: 'visits', label: 'Visits', values: [120, 200, 150, 80, 70, 110, 130] },
  { id: 'orders', label: 'Orders', values: [40, 70, 50, 30, 25, 45, 60] },
]
</script>

<template>
  <SgLineChart :categories="categories" :series="series" :height="220" />
</template>
