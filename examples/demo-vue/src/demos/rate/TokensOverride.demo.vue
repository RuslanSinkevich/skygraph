<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgRate } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-star': '#60a5fa',
  '--sg-color-border': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgRate :default-value="3.5" allow-half />
  </div>
</template>
