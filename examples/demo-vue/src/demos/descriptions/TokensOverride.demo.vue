<script setup lang="ts">
/**
 * Descriptions reads `--sg-color-bg-secondary` (label column),
 * `--sg-color-border-secondary` (dividers) and `--sg-border-radius`. Three
 * scoped recipes — branded green, dark field, glass pick — reskin the table.
 * Cards are stacked vertically (one wide table per row).
 *
 * Mirrors React `examples/demo/src/demos/descriptions/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-secondary': '#ecfdf5' } as CSSProperties,
  dark: {
    '--sg-color-bg-secondary': '#1e293b',
    '--sg-color-border-secondary': '#475569',
  } as CSSProperties,
  glass: {
    '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.58)',
    '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.22)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra" :min-card-width="1200" :content-min-width="360">
    <template #default>
      <SgDescriptions bordered :items="userItems" />
    </template>
  </TokenScopeCards>
</template>
