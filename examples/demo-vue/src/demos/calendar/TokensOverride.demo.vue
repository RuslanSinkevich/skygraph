<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCalendar } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-border': '#475569',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgCalendar :fullscreen="false" />
  </div>
</template>
