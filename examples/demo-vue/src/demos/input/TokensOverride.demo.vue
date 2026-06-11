<script setup lang="ts">
/**
 * Input exposes its own `--sg-input-*` tokens on top of the globals. Each card
 * scopes a different subset — branded green, dark field and frosted glass —
 * reshaping only the paint while the focus ring, disabled and validation states
 * keep their semantic behaviour.
 *
 * Mirrors React `examples/demo/src/demos/input/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { placeholder: 'Search anything…' },
  ru: { placeholder: 'Поиск чего угодно…' },
} as const

const t = useDemoStrings(STRINGS)

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
    <template #default="{ scope }">
      <SgInput :key="scope" :placeholder="t.placeholder" />
    </template>
  </TokenScopeCards>
</template>
