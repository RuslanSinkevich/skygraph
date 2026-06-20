<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'

const dark = {
  background: '#0f172a',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
}
</script>

<template>
  <div :style="dark">
    <SgSteps :current="1" :items="basicSteps" direction="vertical" />
  </div>
</template>
