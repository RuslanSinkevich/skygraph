<script setup lang="ts">
/**
 * `unstyled` strips Skygraph's `sg-chart*` classes — bring your own
 * design system around the bare SVG.
 */
import { SgLineChart } from '@skygraph/vue'
import { monthlyRevenue } from './_data'

const data = monthlyRevenue(11)
</script>

<template>
  <SgLineChart
    :categories="data.categories"
    :series="data.series"
    :height="220"
    unstyled
    :style="{
      background: 'var(--sg-color-bg-container)',
      border: '1px dashed var(--sg-color-border)',
      borderRadius: '8px',
      padding: '8px',
    }"
  />
</template>
