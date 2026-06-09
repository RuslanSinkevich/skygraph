<script setup lang="ts">
/**
 * Badge has no component-specific tokens — the count pulls `--sg-color-error`,
 * the status dot pulls the primary palette. Three scoped recipes — branded
 * green, dark field, glass pick — rebrand the counters.
 *
 * Mirrors React `examples/demo/src/demos/badge/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgBadge } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const box: CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: 'rgba(148, 163, 184, 0.35)',
  display: 'inline-block',
}

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-error': '#059669' } as CSSProperties,
  dark: { '--sg-color-error': '#60a5fa' } as CSSProperties,
  glass: { '--sg-color-error': '#6366f1' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div style="display: flex; gap: 20px; align-items: center">
        <SgBadge :count="5"><span :style="box" /></SgBadge>
        <SgBadge dot><span :style="box" /></SgBadge>
      </div>
    </template>
  </TokenScopeCards>
</template>
