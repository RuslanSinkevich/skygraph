<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. Hover the button to reveal the tip.
import { SgTooltip, SgButton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text': '#f8fafc',
}
</script>

<template>
  <div :style="dark">
    <SgTooltip title="Press ⌘K to search" placement="top">
      <SgButton type="primary">Hover me</SgButton>
    </SgTooltip>
  </div>
</template>
