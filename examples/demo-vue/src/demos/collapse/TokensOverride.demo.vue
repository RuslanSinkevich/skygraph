<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'

const dark = {
  background: '#0f172a',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-border-secondary': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgCollapse :items="sampleItems" :default-active-key="['1']" />
  </div>
</template>
