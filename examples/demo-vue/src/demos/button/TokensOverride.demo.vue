<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgButton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-btn-bg': '#1e293b',
  '--sg-btn-color': '#e2e8f0',
  '--sg-btn-border': '#334155',
}
</script>

<template>
  <div :style="dark" style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton type="primary">Get started</SgButton>
    <SgButton>Learn more</SgButton>
  </div>
</template>
