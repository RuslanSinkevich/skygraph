<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgButton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border': '#475569',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text-disabled': '#64748b',
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
