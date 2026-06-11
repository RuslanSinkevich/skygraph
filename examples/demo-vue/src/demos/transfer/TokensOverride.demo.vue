<script setup lang="ts">
/**
 * Transfer has no component-local tokens — borders, headers, hover and
 * selection read the global palette. Three scoped recipes — branded green,
 * dark field, glass pick — reskin both columns.
 *
 * Mirrors React `examples/demo/src/demos/transfer/TokensOverride.demo.tsx`.
 */
import { reactive, type CSSProperties } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const targetKeys = reactive<Record<TokenScopeKey, string[]>>({
  brand: ['1', '3'],
  dark: ['1', '3'],
  glass: ['1', '3'],
})

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-secondary': '#ecfdf5' } as CSSProperties,
  dark: { '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.28)' } as CSSProperties,
  glass: {
    '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.7)',
    '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.18)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards
    :extra="extra"
    :min-card-width="620"
    :content-min-width="560"
    content-align="center"
  >
    <template #default="{ scope }">
      <SgTransfer v-model="targetKeys[scope]" :data-source="mockData" />
    </template>
  </TokenScopeCards>
</template>
