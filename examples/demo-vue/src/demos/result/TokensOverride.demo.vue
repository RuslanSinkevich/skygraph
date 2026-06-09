<script setup lang="ts">
/**
 * Result has no component-private tokens — icon tints read
 * `--sg-color-success/primary`, the body panel reads `--sg-color-bg-secondary`.
 * Three scoped recipes — branded green, dark field, glass pick — rebrand it.
 *
 * Mirrors React `examples/demo/src/demos/result/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgResult, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { title: 'All good', subtitle: 'Scoped via tokens', cta: 'Continue' },
  ru: { title: 'Всё готово', subtitle: 'Скоуп через токены', cta: 'Продолжить' },
} as const

const t = useDemoStrings(STRINGS)

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-success': '#059669' } as CSSProperties,
  dark: { '--sg-color-success': '#34d399' } as CSSProperties,
  glass: { '--sg-color-success': '#6366f1' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgResult status="success" :title="t.title" :sub-title="t.subtitle">
        <template #extra>
          <SgButton type="primary">{{ t.cta }}</SgButton>
        </template>
      </SgResult>
    </template>
  </TokenScopeCards>
</template>
