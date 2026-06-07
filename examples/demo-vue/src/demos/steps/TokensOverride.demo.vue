<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Finished /
 * process steps pull from `--sg-color-primary` for the fill and tail,
 * errors from `--sg-color-error`, so each scope rebrands a whole wizard.
 */
import type { CSSProperties } from 'vue'
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 300px',
  minWidth: '280px',
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
  '--sg-color-error': '#dc2626',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-error': '#f87171',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-border-secondary': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#4f46e5',
  '--sg-color-error': '#be123c',
  '--sg-color-text': '#111827',
  '--sg-color-text-secondary': '#334155',
  '--sg-color-border-secondary': 'rgba(30, 41, 59, 0.28)',
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
      <SgSteps :current="1" :items="basicSteps" direction="vertical" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgSteps :current="1" :items="basicSteps" direction="vertical" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgSteps :current="1" :items="basicSteps" direction="vertical" />
    </div>
  </div>
</template>
