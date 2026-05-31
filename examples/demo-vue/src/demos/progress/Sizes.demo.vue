<script setup lang="ts">
/**
 * `size="small"` thins the line bar (6px default vs 8px).
 * Override `strokeWidth` for any bespoke thickness independent
 * of size.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 400px">
    <SgProgress size="small" :percent="40" />
    <SgProgress :percent="40" />
    <SgProgress :percent="40" :stroke-width="14" />
  </div>
</template>
