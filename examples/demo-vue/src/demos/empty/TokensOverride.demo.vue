<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgEmpty } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg': '#1e293b',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#cbd5e1',
}
</script>

<template>
  <div :style="dark">
    <SgEmpty description="No data" />
  </div>
</template>
