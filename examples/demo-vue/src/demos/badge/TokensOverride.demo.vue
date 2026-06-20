<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgBadge } from '@skygraph/vue'

const box = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: 'rgba(148, 163, 184, 0.35)',
  display: 'inline-block',
}

const dark = {
  background: '#0f172a',
  '--sg-color-bg': '#0f172a',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text': '#f8fafc',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-error': '#f87171',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark" style="display: flex; gap: 20px; align-items: center">
    <SgBadge :count="5"><span :style="box" /></SgBadge>
    <SgBadge dot><span :style="box" /></SgBadge>
  </div>
</template>
