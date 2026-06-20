<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgSkeleton } from '@skygraph/vue'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-skeleton-bg': '#334155',
  '--sg-skeleton-shimmer': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgSkeleton active avatar :paragraph="{ rows: 2 }" />
  </div>
</template>
