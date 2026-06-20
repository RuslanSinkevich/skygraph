<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgInputNumber } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
}
</script>

<template>
  <div :style="dark">
    <SgInputNumber :default-value="7" :min="0" :max="20" />
  </div>
</template>
