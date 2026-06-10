<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Rate owns
 * one dedicated token (`--sg-color-star` for the filled colour); the
 * empty colour comes from `--sg-color-border` and the symbol size from
 * `--sg-font-size-xl`, so each scope rebrands the whole control.
 */
import type { CSSProperties } from 'vue'
import { SgRate } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 200px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const greenScope = {
  '--sg-color-star': '#059669',
  '--sg-color-border': '#86efac',
  '--sg-rate-symbol-empty-opacity': '0.7',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-star': '#facc15',
  '--sg-color-border': '#64748b',
  '--sg-rate-symbol-empty-opacity': '0.72',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-star': '#be185d',
  '--sg-color-border': 'rgba(30, 41, 59, 0.45)',
  '--sg-rate-symbol-empty-opacity': '0.72',
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
      <SgRate :default-value="4" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgRate :default-value="3.5" allow-half />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgRate :default-value="3.5" allow-half character="♥" />
    </div>
  </div>
</template>
