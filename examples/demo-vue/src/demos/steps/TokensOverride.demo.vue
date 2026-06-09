<script setup lang="ts">
/**
 * Finished / process steps pull `--sg-color-primary` for the fill and tail.
 * Three scoped recipes — branded green, dark field, glass pick — rebrand the
 * whole wizard.
 *
 * Mirrors React `examples/demo/src/demos/steps/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-border-secondary': '#a7f3d0' } as CSSProperties,
  dark: {
    '--sg-color-border': '#64748b',
    '--sg-color-border-secondary': '#475569',
  } as CSSProperties,
  glass: { '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.24)' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra" :min-card-width="420">
    <template #default>
      <SgSteps :current="1" :items="basicSteps" direction="vertical" />
    </template>
  </TokenScopeCards>
</template>
