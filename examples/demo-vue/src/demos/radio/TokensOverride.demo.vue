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
  '--sg-color-border': '#475569',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-bg': '#0f172a',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text': '#f8fafc',
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
