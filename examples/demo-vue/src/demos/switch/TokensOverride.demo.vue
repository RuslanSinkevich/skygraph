<script setup lang="ts">
/**
 * Switch exposes `--sg-switch-bg-checked` for the on-state track. Three scoped
 * recipes — branded green, dark field, glass pick — recolour the control.
 *
 * Mirrors React `examples/demo/src/demos/switch/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { on: 'ON', off: 'OFF' },
  ru: { on: 'ВКЛ', off: 'ВЫКЛ' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-switch-bg-checked': '#059669' } as CSSProperties,
  dark: {
    '--sg-switch-bg': '#475569',
    '--sg-switch-bg-checked': '#60a5fa',
  } as CSSProperties,
  glass: {
    '--sg-switch-bg': 'rgba(30, 41, 59, 0.34)',
    '--sg-switch-bg-checked': '#6366f1',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <div style="display: flex; gap: 12px; align-items: center">
        <SgSwitch default-checked />
        <SgSwitch default-checked :checked-children="t.on" :un-checked-children="t.off" />
      </div>
    </template>
  </TokenScopeCards>
</template>
