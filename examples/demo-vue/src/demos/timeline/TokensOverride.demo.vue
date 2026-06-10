<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. The dot
 * ring reads `--sg-color-primary`, the connector
 * `--sg-color-border-secondary` and the pending text
 * `--sg-color-text-tertiary`, so each scope rebrands a whole timeline.
 */
import type { CSSProperties } from 'vue'
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    pending: 'Awaiting approval…',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    pending: 'Ожидает подтверждения…',
  },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 240px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '14px',
}

const greenScope = {
  '--sg-color-primary': '#059669',
  '--sg-color-border-secondary': '#bbf7d0',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-text-tertiary': '#64748b',
  '--sg-color-border-secondary': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#6366f1',
  '--sg-color-border-secondary': 'rgba(255, 255, 255, 0.7)',
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
      <SgTimeline :items="releaseItems" :pending="t.pending" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgTimeline :items="releaseItems" :pending="t.pending" />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgTimeline :items="releaseItems" :pending="t.pending" />
    </div>
  </div>
</template>
