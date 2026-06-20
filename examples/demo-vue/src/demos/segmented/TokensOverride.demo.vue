<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSegmented } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
}
</script>

<template>
  <div :style="dark">
    <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
  </div>
</template>
