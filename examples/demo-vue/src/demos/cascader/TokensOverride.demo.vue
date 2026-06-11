<script setup lang="ts">
/**
 * Cascader composes the global form tokens for the trigger and the surface /
 * primary families for the panels. Three scoped recipes — branded green, dark
 * field, glass pick — reskin one instance.
 *
 * Mirrors React `examples/demo/src/demos/cascader/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-input-border': '#6ee7b7' } as CSSProperties,
  dark: {
    '--sg-input-bg': '#0f172a',
    '--sg-input-color': '#e2e8f0',
    '--sg-input-border': '#1e293b',
  } as CSSProperties,
  glass: {
    '--sg-input-bg': 'rgba(255, 255, 255, 0.55)',
    '--sg-input-border': 'rgba(15, 23, 42, 0.08)',
    '--sg-input-radius': '12px',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgCascader :options="regionOptions" placeholder="Select region" />
    </template>
  </TokenScopeCards>
</template>
