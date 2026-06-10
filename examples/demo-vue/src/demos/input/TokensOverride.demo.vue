<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built only
 * from Input tokens (`--sg-input-*`) plus the shared brand/surface
 * globals. Focus ring, disabled and validation states keep their
 * semantic behaviour — only paint / shape tokens change.
 */
import { ref, type CSSProperties } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark field',
    glass: 'Glass pick',
    greenPh: 'Search…',
    darkPh: 'your@email.com',
    glassPh: 'Frosted input',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмное поле',
    glass: 'Glass pick',
    greenPh: 'Поиск…',
    darkPh: 'your@email.com',
    glassPh: 'Матовое поле',
  },
} as const

const t = useDemoStrings(STRINGS)

const green = ref('')
const dark = ref('')
const glass = ref('')

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
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

const greenScope = {
  '--sg-color-primary': '#059669',
  '--sg-color-primary-hover': '#047857',
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-input-border': '#6ee7b7',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-input-bg': '#1e293b',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#334155',
  '--sg-color-text-placeholder': '#64748b',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-input-bg': 'rgba(255, 255, 255, 0.45)',
  '--sg-input-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-input-color': '#0f172a',
  '--sg-color-text-placeholder': 'rgba(15, 23, 42, 0.55)',
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
      <SgInput v-model="green" :placeholder="t.greenPh" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgInput v-model="dark" :placeholder="t.darkPh" />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgInput v-model="glass" :placeholder="t.glassPh" />
    </div>
  </div>
</template>
