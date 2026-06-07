<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Badge has
 * no component-specific tokens — the count pulls from `--sg-color-error`
 * and the status dots from the semantic palette, so each scope rebrands
 * the counters without editing the theme.
 */
import type { CSSProperties } from 'vue'
import { SgBadge } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick', live: 'Live' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick', live: 'В эфире' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 200px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}
const box: CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  background: 'var(--sg-color-bg-container)',
  border: '1px solid rgba(148, 163, 184, 0.4)',
  display: 'inline-block',
}

const greenScope = {
  '--sg-color-error': '#059669',
  '--sg-color-primary': '#16a34a',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-error': '#f87171',
  '--sg-color-primary': '#38bdf8',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-error': '#ec4899',
  '--sg-color-primary': '#6366f1',
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.6)',
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
    <div :style="greenScope">
      <span :style="{ ...labelBase, color: '#047857' }">{{ t.green }}</span>
      <SgBadge :count="5"><div :style="box" /></SgBadge>
      <SgBadge status="success" :text="t.live" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgBadge :count="8"><div :style="box" /></SgBadge>
      <SgBadge status="processing" :text="t.live" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgBadge :count="3"><div :style="box" /></SgBadge>
      <SgBadge dot><div :style="box" /></SgBadge>
    </div>
  </div>
</template>
