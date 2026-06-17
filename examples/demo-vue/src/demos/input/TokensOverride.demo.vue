<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgInput } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgInput placeholder="Search anything…" />
  </div>
</template>
