<script setup lang="ts">
/**
 * InputNumber composes the global form tokens (border, radius, background,
 * text). Three scoped recipes — branded green, dark field, glass pick —
 * reskin the same control; the stepper keeps working.
 *
 * Mirrors React `examples/demo/src/demos/inputnumber/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgInputNumber } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  dark: { '--sg-color-bg-secondary': '#1e293b' } as CSSProperties,
  glass: { '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.4)' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgInputNumber :default-value="7" :min="0" :max="20" />
    </template>
  </TokenScopeCards>
</template>
