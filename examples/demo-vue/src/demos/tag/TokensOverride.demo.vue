<script setup lang="ts">
/**
 * Tag has no component-specific tokens — it composes the globals. The
 * `processing` preset follows `--sg-color-primary`, the radius follows
 * `--sg-border-radius-sm`. Three scoped recipes — branded green, dark field,
 * glass pick — rebrand the pills.
 *
 * Mirrors React `examples/demo/src/demos/tag/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { default: 'default', active: 'active' },
  ru: { default: 'обычный', active: 'активный' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-secondary': '#ecfdf5' } as CSSProperties,
  dark: {
    '--sg-color-bg-secondary': '#1e293b',
    '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.22)',
  } as CSSProperties,
  glass: {
    '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.58)',
    '--sg-color-border': 'rgba(79, 70, 229, 0.2)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra" :min-card-width="260">
    <template #default>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <SgTag>{{ t.default }}</SgTag>
        <SgTag color="processing">{{ t.active }}</SgTag>
      </div>
    </template>
  </TokenScopeCards>
</template>
