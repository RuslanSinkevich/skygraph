<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgRadio } from '@skygraph/vue'

const options = [
  { label: 'Brand A', value: 'a' },
  { label: 'Brand B', value: 'b' },
  { label: 'Brand C', value: 'c' },
]

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text': '#e2e8f0',
  '--sg-radio-border': '#64748b',
  '--sg-radio-bg': '#111827',
  '--sg-radio-bg-checked': '#60a5fa',
  '--sg-radio-border-hover': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgRadio default-value="b" :options="options" />
  </div>
</template>
