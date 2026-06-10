<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built only
 * from `--sg-skeleton-bg`, `--sg-skeleton-shimmer` and
 * `--sg-border-radius-sm`.
 */
import type { CSSProperties } from 'vue'
import { SgSkeleton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 240px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '12px',
}

const greenScope = {
  '--sg-skeleton-bg': '#bbf7d0',
  '--sg-skeleton-shimmer': '#dcfce7',
  '--sg-border-radius-sm': '8px',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-skeleton-bg': 'rgba(148, 163, 184, 0.18)',
  '--sg-skeleton-shimmer': 'rgba(226, 232, 240, 0.45)',
  '--sg-border-radius-sm': '6px',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-skeleton-bg': 'rgba(255, 255, 255, 0.45)',
  '--sg-skeleton-shimmer': 'rgba(255, 255, 255, 0.85)',
  '--sg-border-radius-sm': '999px',
  ...cardBase,
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(236, 72, 153, 0.3))',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div :style="greenScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#047857' }">{{ t.green }}</span>
      <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
    </div>
  </div>
</template>
