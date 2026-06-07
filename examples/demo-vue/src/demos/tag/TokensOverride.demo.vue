<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Tag has
 * no component-specific tokens — it composes the global semantic palette
 * (`--sg-color-*` / `--sg-color-*-bg`) and `--sg-border-radius-sm`, so
 * each scope rebrands the presets without editing the theme.
 */
import type { CSSProperties } from 'vue'
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    default: 'default',
    success: 'success',
    warning: 'warning',
    error: 'error',
    processing: 'processing',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    default: 'обычный',
    success: 'успех',
    warning: 'предупреждение',
    error: 'ошибка',
    processing: 'в процессе',
  },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 220px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}
const tagRow: CSSProperties = { display: 'flex', gap: '8px', flexWrap: 'wrap' }

const greenScope = {
  '--sg-border-radius-sm': '999px',
  '--sg-color-primary': '#059669',
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-color-success': '#16a34a',
  '--sg-color-success-bg': '#dcfce7',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-text': '#e2e8f0',
  '--sg-color-fill-secondary': '#475569',
  '--sg-color-border': '#64748b',
  '--sg-color-primary': '#38bdf8',
  '--sg-color-primary-bg': '#1e3a5f',
  '--sg-color-success': '#4ade80',
  '--sg-color-success-bg': '#14532d',
  '--sg-color-warning': '#facc15',
  '--sg-color-warning-bg': '#713f12',
  '--sg-color-error': '#f87171',
  '--sg-color-error-bg': '#7f1d1d',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-border-radius-sm': '999px',
  '--sg-color-text': '#111827',
  '--sg-color-border': 'rgba(30, 41, 59, 0.25)',
  '--sg-color-fill-secondary': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-primary': '#4f46e5',
  '--sg-color-primary-bg': 'rgba(99, 102, 241, 0.14)',
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
      <div :style="tagRow">
        <SgTag>{{ t.default }}</SgTag>
        <SgTag color="success">{{ t.success }}</SgTag>
        <SgTag color="processing">{{ t.processing }}</SgTag>
      </div>
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <div :style="tagRow">
        <SgTag>{{ t.default }}</SgTag>
        <SgTag color="warning">{{ t.warning }}</SgTag>
        <SgTag color="error">{{ t.error }}</SgTag>
      </div>
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <div :style="tagRow">
        <SgTag>{{ t.default }}</SgTag>
        <SgTag color="success">{{ t.success }}</SgTag>
        <SgTag color="processing">{{ t.processing }}</SgTag>
      </div>
    </div>
  </div>
</template>
