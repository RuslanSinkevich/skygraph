<script setup lang="ts">
/**
 * AutoComplete reuses `--sg-input-*` for the field and global tokens for the
 * dropdown. Three scoped recipes — branded green, dark field, glass pick —
 * reskin the same control.
 *
 * Mirrors React `examples/demo/src/demos/autocomplete/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { placeholder: 'Search framework…' },
  ru: { placeholder: 'Поиск фреймворка…' },
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
    <template #default>
      <SgAutoComplete :options="frameworkOptions" :placeholder="t.placeholder" />
    </template>
  </TokenScopeCards>
</template>
