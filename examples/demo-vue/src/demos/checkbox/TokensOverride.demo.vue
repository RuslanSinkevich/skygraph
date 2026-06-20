<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCheckbox } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border': '#475569',
  '--sg-color-bg': '#0f172a',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark" style="display: grid; gap: 6px">
    <SgCheckbox default-checked>Receive emails</SgCheckbox>
    <SgCheckbox>Remember me</SgCheckbox>
  </div>
</template>
