<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-border-secondary': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgTimeline :items="releaseItems" pending="Awaiting…" />
  </div>
</template>
