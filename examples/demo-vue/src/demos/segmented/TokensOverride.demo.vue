<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSegmented } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-container': '#334155',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
}
</script>

<template>
  <div :style="dark">
    <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
  </div>
</template>
