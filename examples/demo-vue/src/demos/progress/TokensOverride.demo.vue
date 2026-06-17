<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgProgress } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-bg-hover': '#1e293b',
  '--sg-color-text': '#e2e8f0',
}
</script>

<template>
  <div :style="dark" style="display: flex; flex-direction: column; gap: 10px">
    <SgProgress :percent="35" />
    <SgProgress :percent="75" status="active" />
  </div>
</template>
