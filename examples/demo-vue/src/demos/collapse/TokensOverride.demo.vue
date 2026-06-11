<script setup lang="ts">
/**
 * Collapse reads the global surface palette (`--sg-color-bg-container`,
 * `--sg-color-bg-secondary`, `--sg-color-bg-hover`) and border tokens. Three
 * scoped recipes — branded green, dark field, glass pick — reskin the panels.
 *
 * Mirrors React `examples/demo/src/demos/collapse/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-secondary': '#ecfdf5' } as CSSProperties,
  dark: {
    '--sg-color-bg-secondary': '#1e293b',
    '--sg-color-border-secondary': '#475569',
  } as CSSProperties,
  glass: {
    '--sg-color-bg-container': 'rgba(255, 255, 255, 0.72)',
    '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.52)',
    '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.18)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra" :min-card-width="360">
    <template #default>
      <SgCollapse :items="sampleItems" :default-active-key="['1']" />
    </template>
  </TokenScopeCards>
</template>
