<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSwitch } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-text': '#f8fafc',
  padding: '24px',
  borderRadius: '12px',
  '--sg-switch-bg': '#475569',
  '--sg-switch-bg-checked': '#60a5fa',
}
</script>

<template>
  <div :style="dark" style="display: flex; gap: 12px; align-items: center">
    <SgSwitch default-checked />
    <SgSwitch default-checked checked-children="ON" un-checked-children="OFF" />
  </div>
</template>
