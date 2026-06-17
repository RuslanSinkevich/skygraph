<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgTag } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.22)',
}
</script>

<template>
  <div :style="dark" style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag>default</SgTag>
    <SgTag color="processing">active</SgTag>
  </div>
</template>
