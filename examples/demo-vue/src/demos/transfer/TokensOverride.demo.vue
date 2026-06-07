<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Transfer
 * has no component-local tokens — borders / headers / hover / selected
 * rely on `--sg-color-border`, `--sg-color-bg-secondary`,
 * `--sg-color-bg-hover` and `--sg-color-primary-bg`.
 */
import { ref, type CSSProperties } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const keys1 = ref<string[]>(['1', '3'])
const keys2 = ref<string[]>(['1', '3'])
const keys3 = ref<string[]>(['1', '3'])

const cardBase: CSSProperties = {
  padding: '16px',
  borderRadius: '16px',
  flex: '1 1 360px',
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
  '--sg-color-border': '#86efac',
  '--sg-color-border-secondary': '#bbf7d0',
  '--sg-color-bg-secondary': '#ecfdf5',
  '--sg-color-bg-hover': '#d1fae5',
  '--sg-color-primary': '#059669',
  '--sg-color-primary-bg': '#d1fae5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-border': '#334155',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-primary': '#38bdf8',
  '--sg-color-primary-bg': '#1e3a5f',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.55)',
  '--sg-color-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.4)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-primary': '#6366f1',
  '--sg-color-primary-bg': 'rgba(255, 255, 255, 0.6)',
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
      <SgTransfer v-model="keys1" :data-source="mockData" show-search />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgTransfer v-model="keys2" :data-source="mockData" show-search />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgTransfer v-model="keys3" :data-source="mockData" show-search />
    </div>
  </div>
</template>
