<script setup lang="ts">
/**
 * Select shares the input tokens (`--sg-input-*`) with `Input` and listens to
 * the global colour / surface families. Three scoped recipes — branded green,
 * dark field and frosted glass — reskin the same component without touching
 * its behaviour.
 *
 * Mirrors React `examples/demo/src/demos/select/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { apple: 'Apple', pear: 'Pear', mango: 'Mango', kiwi: 'Kiwi', placeholder: 'Pick a fruit' },
  ru: {
    apple: 'Яблоко',
    pear: 'Груша',
    mango: 'Манго',
    kiwi: 'Киви',
    placeholder: 'Выберите фрукт',
  },
} as const

const t = useDemoStrings(STRINGS)

const options = computed(() =>
  fruitOptions.map((o) => ({
    ...o,
    label: t.value[o.value as 'apple' | 'pear' | 'mango' | 'kiwi'],
  })),
)

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
      <SgSelect :placeholder="t.placeholder" :options="options" />
    </template>
  </TokenScopeCards>
</template>
