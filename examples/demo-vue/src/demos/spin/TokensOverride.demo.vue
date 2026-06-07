<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built from
 * the Spin tokens (`--sg-spin-color` for the ring, `--sg-spin-overlay-bg`
 * for the backdrop) — each scope rebrands the spinner and overlay.
 */
import type { CSSProperties } from 'vue'
import { SgSpin } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick', tip: 'Loading…' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick', tip: 'Загрузка…' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 200px',
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
  '--sg-spin-color': '#059669',
  '--sg-spin-overlay-bg': 'rgba(5, 150, 105, 0.18)',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-spin-color': '#38bdf8',
  '--sg-spin-overlay-bg': 'rgba(15, 23, 42, 0.55)',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-spin-color': '#6366f1',
  '--sg-spin-overlay-bg': 'rgba(255, 255, 255, 0.35)',
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
      <SgSpin spinning :tip="t.tip"><div style="padding: 20px" /></SgSpin>
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgSpin spinning :tip="t.tip"><div style="padding: 20px" /></SgSpin>
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgSpin spinning :tip="t.tip"><div style="padding: 20px" /></SgSpin>
    </div>
  </div>
</template>
