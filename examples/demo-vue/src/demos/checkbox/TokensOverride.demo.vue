<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built from
 * the Checkbox tokens (`--sg-checkbox-*`) plus `--sg-color-text` — each
 * scope rebrands the box, tick and label.
 */
import type { CSSProperties } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    option1: 'Receive emails',
    option2: 'Indeterminate',
    option3: 'Remember me',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    option1: 'Получать письма',
    option2: 'Промежуточное',
    option3: 'Запомнить меня',
  },
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
const list: CSSProperties = { display: 'grid', gap: '6px' }

const greenScope = {
  '--sg-checkbox-bg-checked': '#059669',
  '--sg-checkbox-border-hover': '#059669',
  '--sg-checkbox-color-checked': '#fff',
  '--sg-color-text': '#065f46',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-checkbox-bg-checked': '#38bdf8',
  '--sg-checkbox-border-hover': '#38bdf8',
  '--sg-checkbox-color-checked': '#0f172a',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-checkbox-bg-checked': '#6366f1',
  '--sg-checkbox-border-hover': '#6366f1',
  '--sg-checkbox-color-checked': '#fff',
  '--sg-checkbox-radius': '50%',
  '--sg-color-text': '#1e1b4b',
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
      <div :style="list">
        <SgCheckbox default-checked>{{ t.option1 }}</SgCheckbox>
        <SgCheckbox indeterminate>{{ t.option2 }}</SgCheckbox>
        <SgCheckbox>{{ t.option3 }}</SgCheckbox>
      </div>
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <div :style="list">
        <SgCheckbox default-checked>{{ t.option1 }}</SgCheckbox>
        <SgCheckbox indeterminate>{{ t.option2 }}</SgCheckbox>
        <SgCheckbox>{{ t.option3 }}</SgCheckbox>
      </div>
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <div :style="list">
        <SgCheckbox default-checked>{{ t.option1 }}</SgCheckbox>
        <SgCheckbox indeterminate>{{ t.option2 }}</SgCheckbox>
        <SgCheckbox>{{ t.option3 }}</SgCheckbox>
      </div>
    </div>
  </div>
</template>
