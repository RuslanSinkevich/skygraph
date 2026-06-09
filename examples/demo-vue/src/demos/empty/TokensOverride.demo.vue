<script setup lang="ts">
/**
 * Empty has no component-private tokens — the illustration uses
 * `--sg-color-text-disabled`, the caption uses `--sg-color-text-tertiary`.
 * Three scoped recipes — branded green, dark field, glass pick — set the mood.
 *
 * Mirrors React `examples/demo/src/demos/empty/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgEmpty } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { desc: 'No data' },
  ru: { desc: 'Нет данных' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-text-disabled': '#6ee7b7' } as CSSProperties,
  dark: { '--sg-color-text-disabled': '#475569' } as CSSProperties,
  glass: { '--sg-color-text-disabled': '#a5b4fc' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgEmpty :description="t.desc" />
    </template>
  </TokenScopeCards>
</template>
