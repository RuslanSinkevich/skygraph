<script setup lang="ts">
/**
 * Skeleton reads `--sg-skeleton-bg` and `--sg-skeleton-shimmer` for the sweep.
 * Three scoped recipes — branded green, dark field, glass pick — recolour the
 * placeholders.
 *
 * Mirrors React `examples/demo/src/demos/skeleton/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgSkeleton } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: {
    '--sg-skeleton-bg': '#a7f3d0',
    '--sg-skeleton-shimmer': '#d1fae5',
  } as CSSProperties,
  dark: {
    '--sg-skeleton-bg': 'rgba(148, 163, 184, 0.18)',
    '--sg-skeleton-shimmer': 'rgba(226, 232, 240, 0.45)',
  } as CSSProperties,
  glass: {
    '--sg-skeleton-bg': 'rgba(99, 102, 241, 0.18)',
    '--sg-skeleton-shimmer': 'rgba(199, 210, 254, 0.6)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgSkeleton active avatar :paragraph="{ rows: 2 }" />
    </template>
  </TokenScopeCards>
</template>
