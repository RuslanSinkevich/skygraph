<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-primary': '#60a5fa',
}
</script>

<template>
  <div :style="dark">
    <SgTree :tree-data="orgTree" default-expand-all />
  </div>
</template>
