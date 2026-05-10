<script setup lang="ts">
/**
 * `type="circle"` swaps the bar for an SVG ring. `width` sets
 * the outer size, `strokeWidth` controls ring thickness. Use for
 * status dashboards where space is dear.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap">
    <SgProgress type="circle" :percent="30" />
    <SgProgress type="circle" :percent="70" />
    <SgProgress type="circle" :percent="100" />
    <SgProgress type="circle" :percent="60" status="error" />
    <SgProgress type="circle" :percent="80" :width="64" :stroke-width="4" />
  </div>
</template>
