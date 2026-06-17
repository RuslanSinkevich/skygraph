<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-border-secondary': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgCollapse :items="sampleItems" :default-active-key="['1']" />
  </div>
</template>
