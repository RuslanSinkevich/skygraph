<script setup lang="ts">
/**
 * Radio exposes `--sg-radio-*` paint tokens on top of the globals. Three
 * scoped recipes — branded green, dark field, glass pick — recolour the dot.
 *
 * Mirrors React `examples/demo/src/demos/radio/TokensOverride.demo.tsx`.
 */
import { computed, type CSSProperties } from 'vue'
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { a: 'Brand A', b: 'Brand B', c: 'Brand C' },
  ru: { a: 'Бренд A', b: 'Бренд B', c: 'Бренд C' },
} as const

const t = useDemoStrings(STRINGS)

const options = computed(() => [
  { label: t.value.a, value: 'a' },
  { label: t.value.b, value: 'b' },
  { label: t.value.c, value: 'c' },
])

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: {
    '--sg-radio-bg-checked': '#059669',
    '--sg-radio-border-hover': '#059669',
  } as CSSProperties,
  dark: {
    '--sg-radio-border': '#64748b',
    '--sg-radio-bg': '#111827',
    '--sg-radio-bg-checked': '#60a5fa',
    '--sg-radio-border-hover': '#60a5fa',
  } as CSSProperties,
  glass: {
    '--sg-radio-border': 'rgba(30, 41, 59, 0.26)',
    '--sg-radio-bg': 'rgba(255, 255, 255, 0.58)',
    '--sg-radio-bg-checked': '#6366f1',
    '--sg-radio-border-hover': '#6366f1',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgRadio default-value="b" :options="options" />
    </template>
  </TokenScopeCards>
</template>
