<script setup lang="ts">
/**
 * Checkbox exposes `--sg-checkbox-*` paint tokens on top of the globals. Three
 * scoped recipes — branded green, dark field, glass pick — recolour the box.
 *
 * Mirrors React `examples/demo/src/demos/checkbox/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { emails: 'Receive emails', remember: 'Remember me' },
  ru: { emails: 'Получать письма', remember: 'Запомнить меня' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: {
    '--sg-checkbox-bg-checked': '#059669',
    '--sg-checkbox-border-hover': '#059669',
  } as CSSProperties,
  dark: {
    '--sg-checkbox-bg-checked': '#60a5fa',
    '--sg-checkbox-border-hover': '#60a5fa',
  } as CSSProperties,
  glass: {
    '--sg-checkbox-bg-checked': '#6366f1',
    '--sg-checkbox-border-hover': '#6366f1',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div style="display: grid; gap: 6px">
        <SgCheckbox default-checked>{{ t.emails }}</SgCheckbox>
        <SgCheckbox>{{ t.remember }}</SgCheckbox>
      </div>
    </template>
  </TokenScopeCards>
</template>
