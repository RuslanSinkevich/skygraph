<script setup lang="ts">
/**
 * Tabs reads `--sg-color-primary` for the active underline / label and the
 * surface tokens for the nav. Three scoped recipes — branded green, dark
 * field, glass pick — reskin the strip.
 *
 * Mirrors React `examples/demo/src/demos/tabs/TokensOverride.demo.tsx`.
 */
import { computed, type CSSProperties } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { tab1: 'Overview', tab2: 'Activity', tab3: 'Settings', panel: 'Tab panel content.' },
  ru: { tab1: 'Обзор', tab2: 'Активность', tab3: 'Настройки', panel: 'Содержимое вкладки.' },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<TabItem[]>(() => [
  { key: '1', label: t.value.tab1, content: t.value.panel },
  { key: '2', label: t.value.tab2, content: t.value.panel },
  { key: '3', label: t.value.tab3, content: t.value.panel },
])

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-secondary': '#ecfdf5' } as CSSProperties,
  dark: {
    '--sg-color-bg-secondary': '#1e293b',
    '--sg-color-border-secondary': '#475569',
  } as CSSProperties,
  glass: {
    '--sg-color-bg': 'rgba(255, 255, 255, 0.72)',
    '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.48)',
    '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.18)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra" :min-card-width="360">
    <template #default>
      <SgTabs type="line" :items="items" />
    </template>
  </TokenScopeCards>
</template>
