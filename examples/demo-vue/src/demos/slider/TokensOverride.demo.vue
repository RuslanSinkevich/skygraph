<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSlider } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-border': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgSlider :default-value="60" />
  </div>
</template>
