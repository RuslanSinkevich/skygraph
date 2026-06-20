<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSpin } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-spin-color': '#60a5fa',
  '--sg-color-text': '#f8fafc',
}
</script>

<template>
  <div :style="dark" style="display: flex; justify-content: center">
    <SgSpin spinning size="large" />
  </div>
</template>
