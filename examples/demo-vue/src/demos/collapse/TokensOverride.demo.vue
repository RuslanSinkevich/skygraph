<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Collapse
 * has no dedicated tokens — it reads the global surface palette
 * (`--sg-color-bg-container` / `-secondary` / `-hover`) and the border
 * tokens, so each scope reshapes the whole accordion.
 */
import type { CSSProperties } from 'vue'
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '16px',
  borderRadius: '16px',
  flex: '1 1 320px',
  minWidth: '280px',
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
  '--sg-color-bg-container': '#ffffff',
  '--sg-color-bg-secondary': '#ecfdf5',
  '--sg-color-bg-hover': '#d1fae5',
  '--sg-color-border-secondary': '#bbf7d0',
  '--sg-color-primary': '#059669',
  '--sg-border-radius-lg': '10px',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-bg-container': '#1f2937',
  '--sg-color-bg-secondary': '#111827',
  '--sg-color-bg-hover': '#374151',
  '--sg-color-text': '#f9fafb',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
  '--sg-border-radius-lg': '10px',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.76)',
  '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.58)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.86)',
  '--sg-color-border-secondary': 'rgba(255, 255, 255, 0.6)',
  '--sg-color-primary': '#6366f1',
  '--sg-color-text': '#111827',
  '--sg-color-text-secondary': '#334155',
  '--sg-border-radius-lg': '10px',
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
      <SgCollapse :items="sampleItems" :default-active-key="['1']" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgCollapse :items="sampleItems" :default-active-key="['1']" />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgCollapse :items="sampleItems" :default-active-key="['1']" />
    </div>
  </div>
</template>
