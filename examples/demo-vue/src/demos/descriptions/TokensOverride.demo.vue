<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Rebrand by
 * scoping `--sg-color-bg-secondary` (label column), `--sg-color-border-
 * secondary` (dividers) and `--sg-border-radius` (outer corners).
 */
import type { CSSProperties } from 'vue'
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick', title: 'Profile' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick', title: 'Профиль' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '14px',
  borderRadius: '16px',
  flex: '1 1 360px',
  minWidth: '320px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '10px',
}

const greenScope = {
  '--sg-color-bg-secondary': '#ecfdf5',
  '--sg-color-border-secondary': '#bbf7d0',
  '--sg-color-text-secondary': '#047857',
  '--sg-border-radius': '12px',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-border-radius': '12px',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.75)',
  '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.58)',
  '--sg-color-border-secondary': 'rgba(255, 255, 255, 0.6)',
  '--sg-color-text': '#111827',
  '--sg-color-text-secondary': '#334155',
  '--sg-border-radius': '12px',
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
      <SgDescriptions bordered :title="t.title" :items="userItems" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgDescriptions bordered :title="t.title" :items="userItems" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgDescriptions bordered :title="t.title" :items="userItems" />
    </div>
  </div>
</template>
