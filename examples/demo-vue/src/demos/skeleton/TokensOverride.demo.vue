<script setup lang="ts">
/**
 * Skeleton reads `--sg-color-bg-hover` for the placeholder fill
 * and `--sg-color-bg-secondary` for the animation highlight.
 * Scope both on a wrapper for a bespoke palette (dark example).
 */
import { SgSkeleton } from '@skygraph/vue'

const scoped = {
  '--sg-color-bg-hover': 'rgba(124, 58, 237, 0.18)',
  '--sg-color-bg-secondary': 'rgba(124, 58, 237, 0.32)',
  '--sg-border-radius-sm': '6px',
  padding: '16px',
  background: '#0f172a',
  borderRadius: '12px',
} as Record<string, string>
</script>

<template>
  <div :style="scoped">
    <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
  </div>
</template>
