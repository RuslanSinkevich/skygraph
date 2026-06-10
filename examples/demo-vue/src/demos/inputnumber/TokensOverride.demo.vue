<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes.
 * InputNumber has no component-specific tokens — it reuses the global
 * form sizing, border, background and stepper-hover tokens, so each
 * scope reshapes the whole control (field + steppers).
 */
import type { CSSProperties } from 'vue'
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark field', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмное поле', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
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
  '--sg-color-primary': '#059669',
  '--sg-color-primary-hover': '#047857',
  '--sg-color-border': '#6ee7b7',
  '--sg-color-bg-hover': '#d1fae5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-border': '#334155',
  '--sg-color-text': '#e2e8f0',
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.45)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.6)',
  '--sg-color-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-text': '#0f172a',
  '--sg-input-bg': 'rgba(255, 255, 255, 0.45)',
  '--sg-input-color': '#0f172a',
  '--sg-input-border': 'rgba(255, 255, 255, 0.7)',
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
      <SgInputNumber :default-value="7" :min="0" :max="20" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgInputNumber :default-value="42" :min="0" :max="100" />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgInputNumber :default-value="1.25" :step="0.25" :precision="2" />
    </div>
  </div>
</template>
