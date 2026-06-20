<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'

const dark = {
  background: '#0f172a',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg': '#0f172a',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-border-secondary': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgTimeline :items="releaseItems" pending="Awaiting…" />
  </div>
</template>
