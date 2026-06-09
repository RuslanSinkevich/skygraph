<script setup lang="ts">
/**
 * Spin reads `--sg-spin-color` for the ring (defaulting to the primary
 * palette) and `--sg-spin-overlay-bg` for the backdrop. Three scoped recipes —
 * branded green, dark field, glass pick — recolour the spinner.
 *
 * Mirrors React `examples/demo/src/demos/spin/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgSpin } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-spin-color': '#059669' } as CSSProperties,
  dark: { '--sg-spin-color': '#60a5fa' } as CSSProperties,
  glass: { '--sg-spin-color': '#6366f1' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div style="display: flex; justify-content: center; padding: 8px 0">
        <SgSpin spinning size="large" />
      </div>
    </template>
  </TokenScopeCards>
</template>
