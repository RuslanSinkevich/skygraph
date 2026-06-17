<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgColorPicker } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-border': '#334155',
  '--sg-color-primary': '#60a5fa',
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgColorPicker default-value="#10b981" show-text />
  </div>
</template>
