<script setup lang="ts">
/**
 * Rate owns one dedicated token, `--sg-color-star`, for the filled symbol; the
 * empty colour comes from `--sg-color-border`. Three scoped recipes — branded
 * green, dark field, glass pick — recolour the stars.
 *
 * Mirrors React `examples/demo/src/demos/rate/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgRate } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-star': '#059669' } as CSSProperties,
  dark: { '--sg-color-star': '#60a5fa' } as CSSProperties,
  glass: { '--sg-color-star': '#6366f1' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgRate :default-value="3.5" allow-half />
    </template>
  </TokenScopeCards>
</template>
