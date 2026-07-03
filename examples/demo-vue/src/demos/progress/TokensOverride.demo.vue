<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgProgress } from '@skygraph/vue'

const dark = {
  width: '100%',
  background: '#0f172a',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#f8fafc',
}
</script>

<template>
  <div :style="dark" style="display: flex; flex-direction: column; gap: 10px">
    <SgProgress :percent="35" />
    <SgProgress :percent="75" status="active" />
  </div>
</template>
