<script setup lang="ts">
/**
 * Three skeleton skins built only from `--sg-skeleton-bg`,
 * `--sg-skeleton-shimmer` and `--sg-border-radius-sm`.
 * Mirrors React `skeleton/TokensOverride.demo.tsx`.
 */
import { SgSkeleton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    cardLabel: 'Light · card',
    brandLabel: 'Indigo · branded',
    darkLabel: 'Dark mode',
  },
  ru: {
    cardLabel: 'Светлая · карточка',
    brandLabel: 'Индиго · фирменная',
    darkLabel: 'Тёмная тема',
  },
} as const

const t = useDemoStrings(STRINGS)

const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  marginBottom: '12px',
  display: 'block',
}

const cardScope = {
  '--sg-skeleton-bg': '#e2e8f0',
  '--sg-skeleton-shimmer': '#f8fafc',
  '--sg-border-radius-sm': '8px',
  padding: '18px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '14px',
  boxShadow: '0 8px 24px -10px rgba(15, 23, 42, 0.12)',
} as Record<string, string>

const brandScope = {
  '--sg-skeleton-bg': '#c7d2fe',
  '--sg-skeleton-shimmer': '#e0e7ff',
  '--sg-border-radius-sm': '999px',
  padding: '18px',
  background: 'linear-gradient(135deg, #eef2ff 0%, #ddd6fe 100%)',
  borderRadius: '14px',
} as Record<string, string>

const darkScope = {
  '--sg-skeleton-bg': 'rgba(148, 163, 184, 0.18)',
  '--sg-skeleton-shimmer': 'rgba(226, 232, 240, 0.45)',
  '--sg-border-radius-sm': '6px',
  padding: '18px',
  background: '#0f172a',
  borderRadius: '14px',
} as Record<string, string>
</script>

<template>
  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px"
  >
    <div :style="cardScope">
      <span :style="{ ...labelStyle, color: '#475569' }">{{ t.cardLabel }}</span>
      <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
    </div>
    <div :style="brandScope">
      <span :style="{ ...labelStyle, color: '#4338ca' }">{{ t.brandLabel }}</span>
      <SgSkeleton active :paragraph="{ rows: 3 }" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelStyle, color: '#cbd5e1' }">{{ t.darkLabel }}</span>
      <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
    </div>
  </div>
</template>
