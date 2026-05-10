<script setup lang="ts">
/**
 * Basic grouped bar chart per quarter. Bars sit on a zero baseline.
 */
import { SgBarChart } from '@skygraph/vue'

const categories = ['Q1', 'Q2', 'Q3', 'Q4']
const series = [
  { id: 'revenue', label: 'Revenue', values: [240, 320, 280, 410] },
  { id: 'cost', label: 'Cost', values: [180, 210, 200, 260] },
]
</script>

<template>
  <SgBarChart :categories="categories" :series="series" :height="220" />
</template>
