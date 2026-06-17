<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#334155',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-border-secondary': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgDescriptions bordered :items="userItems" />
  </div>
</template>
