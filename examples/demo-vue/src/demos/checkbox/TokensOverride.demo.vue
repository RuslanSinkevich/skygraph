<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCheckbox } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text': '#e2e8f0',
  '--sg-checkbox-border': '#475569',
  '--sg-checkbox-bg-checked': '#60a5fa',
  '--sg-checkbox-border-hover': '#60a5fa',
}
</script>

<template>
  <div :style="dark" style="display: grid; gap: 6px">
    <SgCheckbox default-checked>Receive emails</SgCheckbox>
    <SgCheckbox>Remember me</SgCheckbox>
  </div>
</template>
