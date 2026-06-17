<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSkeleton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-skeleton-bg': 'rgba(148, 163, 184, 0.18)',
  '--sg-skeleton-shimmer': 'rgba(226, 232, 240, 0.45)',
}
</script>

<template>
  <div :style="dark">
    <SgSkeleton active avatar :paragraph="{ rows: 2 }" />
  </div>
</template>
