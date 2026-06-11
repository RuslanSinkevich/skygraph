<script setup lang="ts">
/**
 * Button reads the global `--sg-color-primary*` palette plus its own
 * `--sg-btn-*` paint tokens. Three scoped recipes — branded green, dark field
 * and frosted glass — reskin the same Button; hover / focus / disabled
 * behaviour stays intact.
 *
 * Mirrors React `examples/demo/src/demos/button/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { primary: 'Get started', secondary: 'Learn more' },
  ru: { primary: 'Начать', secondary: 'Подробнее' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-btn-border': '#6ee7b7' } as CSSProperties,
  dark: { '--sg-btn-border': '#1e293b' } as CSSProperties,
  glass: {
    '--sg-btn-bg': 'rgba(255, 255, 255, 0.6)',
    '--sg-btn-border': 'rgba(15, 23, 42, 0.08)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <SgButton type="primary">{{ t.primary }}</SgButton>
        <SgButton>{{ t.secondary }}</SgButton>
      </div>
    </template>
  </TokenScopeCards>
</template>
