<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgTag } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.16)',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.16)',
  '--sg-color-border': '#475569',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
}
</script>

<template>
  <div :style="dark" style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag>default</SgTag>
    <SgTag color="processing">active</SgTag>
  </div>
</template>
