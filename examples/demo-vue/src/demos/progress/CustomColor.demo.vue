<script setup lang="ts">
/**
 * `strokeColor` wins over the theme for the filled portion. The
 * trail keeps using `--sg-color-bg-hover` so contrast stays
 * consistent with the surrounding surface.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <div style="flex: 1; max-width: 300px">
      <SgProgress :percent="50" stroke-color="#722ed1" />
    </div>
    <SgProgress type="circle" :percent="75" stroke-color="#eb2f96" />
  </div>
</template>
