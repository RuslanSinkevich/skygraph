<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgInputNumber } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-primary': '#60a5fa',
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgInputNumber :default-value="7" :min="0" :max="20" />
  </div>
</template>
