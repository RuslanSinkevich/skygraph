<script setup lang="ts">
/**
 * Notification cards render in a global container, so the demo passes the
 * scoped recipe as per-toast CSS variables. Click each card's button to see
 * the real popup styled with that recipe.
 *
 * Mirrors React `examples/demo/src/demos/notification/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgButton, notification } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: {
    title: 'Backup complete',
    desc: 'Tint follows --sg-color-success.',
    fire: 'Open styled toast',
  },
  ru: {
    title: 'Бэкап завершён',
    desc: 'Оттенок следует за --sg-color-success.',
    fire: 'Открыть styled toast',
  },
} as const

const t = useDemoStrings(STRINGS)

const TOAST_SCOPE: Record<TokenScopeKey, CSSProperties> = {
  brand: {
    '--sg-color-success': '#059669',
    '--sg-color-success-bg': '#d1fae5',
  } as CSSProperties,
  dark: {
    '--sg-color-bg-elevated': '#1f2937',
    '--sg-color-border-secondary': '#475569',
    '--sg-color-text': '#f8fafc',
    '--sg-color-text-secondary': '#cbd5e1',
    '--sg-color-text-tertiary': '#94a3b8',
    '--sg-color-success': '#34d399',
    '--sg-color-success-bg': 'rgba(52, 211, 153, 0.18)',
    '--sg-shadow-lg': '0 18px 38px -16px rgba(0, 0, 0, 0.55)',
  } as CSSProperties,
  glass: {
    '--sg-color-bg-elevated': 'rgba(255, 255, 255, 0.9)',
    '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.18)',
    '--sg-color-success': '#6366f1',
    '--sg-color-success-bg': 'rgba(99, 102, 241, 0.16)',
    '--sg-shadow-lg': '0 18px 38px -16px rgba(15, 23, 42, 0.4)',
  } as CSSProperties,
}

function fire(scope: TokenScopeKey) {
  notification.open({
    type: 'success',
    message: t.value.title,
    description: t.value.desc,
    style: TOAST_SCOPE[scope],
  })
}
</script>

<template>
  <TokenScopeCards :extra="TOAST_SCOPE">
    <template #default="{ scope }">
      <SgButton type="primary" @click="fire(scope)">{{ t.fire }}</SgButton>
    </template>
  </TokenScopeCards>
</template>
