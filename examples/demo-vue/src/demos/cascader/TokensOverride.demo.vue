<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Cascader
 * is styled entirely through the global palette (control shell, panels
 * and the active branch), so each scope overrides the relevant globals
 * on a wrapper to re-skin one Cascader without touching the page.
 */
import type { CSSProperties } from 'vue'
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
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
  flex: '1 1 240px',
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
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-color-border': '#6ee7b7',
  '--sg-input-border': '#6ee7b7',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-border': '#334155',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-placeholder': '#64748b',
  '--sg-color-bg-elevated': '#0f172a',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-primary-bg': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-input-bg': 'rgba(255, 255, 255, 0.45)',
  '--sg-input-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-text-placeholder': 'rgba(15, 23, 42, 0.55)',
  '--sg-color-bg-elevated': 'rgba(255, 255, 255, 0.9)',
  '--sg-shadow-lg': '0 8px 32px rgba(31, 38, 135, 0.25)',
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
      <SgCascader :options="regionOptions" :placeholder="t.green" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgCascader :options="regionOptions" :placeholder="t.dark" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgCascader :options="regionOptions" :placeholder="t.glass" />
    </div>
  </div>
</template>
