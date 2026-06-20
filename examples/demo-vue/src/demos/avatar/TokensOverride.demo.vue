<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgAvatar } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-text-disabled': '#64748b',
}
</script>

<template>
  <div :style="dark" style="display: flex; gap: 12px; align-items: center">
    <SgAvatar size="large">A</SgAvatar>
    <SgAvatar size="large" shape="square">B</SgAvatar>
  </div>
</template>
