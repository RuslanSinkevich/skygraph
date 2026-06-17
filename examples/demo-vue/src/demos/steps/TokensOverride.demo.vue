<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-border': '#64748b',
  '--sg-color-border-secondary': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgSteps :current="1" :items="basicSteps" direction="vertical" />
  </div>
</template>
