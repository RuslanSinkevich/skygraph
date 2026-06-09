<script setup lang="ts">
/**
 * Avatar has no component-specific tokens — corners follow `--sg-border-radius`
 * and the fallback background follows the colour palette
 * (`--sg-color-text-disabled`). Three scoped recipes — branded green, dark
 * field, glass pick — reshape and recolour the avatars.
 *
 * Mirrors React `examples/demo/src/demos/avatar/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgAvatar } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-text-disabled': '#059669' } as CSSProperties,
  dark: { '--sg-color-text-disabled': '#3b82f6' } as CSSProperties,
  glass: { '--sg-color-text-disabled': '#6366f1' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div style="display: flex; gap: 12px; align-items: center">
        <SgAvatar size="large">A</SgAvatar>
        <SgAvatar size="large" shape="square">B</SgAvatar>
      </div>
    </template>
  </TokenScopeCards>
</template>
