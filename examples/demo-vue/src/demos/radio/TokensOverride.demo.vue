<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built from
 * the Radio tokens (`--sg-radio-*`) plus `--sg-color-text` — each scope
 * rebrands the ring, dot and label.
 */
import { computed, type CSSProperties } from 'vue'
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    brandA: 'Brand A',
    brandB: 'Brand B',
    brandC: 'Brand C',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    brandA: 'Бренд A',
    brandB: 'Бренд B',
    brandC: 'Бренд C',
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

const options = computed(() => [
  { label: t.value.brandA, value: 'a' },
  { label: t.value.brandB, value: 'b' },
  { label: t.value.brandC, value: 'c' },
])

const greenScope = {
  '--sg-radio-bg-checked': '#059669',
  '--sg-radio-border-hover': '#059669',
  '--sg-radio-dot-color': '#fff',
  '--sg-color-text': '#065f46',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-radio-bg-checked': '#38bdf8',
  '--sg-radio-border-hover': '#38bdf8',
  '--sg-radio-dot-color': '#0f172a',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-radio-bg-checked': '#6366f1',
  '--sg-radio-border-hover': '#6366f1',
  '--sg-radio-dot-color': '#fff',
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
    <div :style="greenScope">
      <span :style="{ ...labelBase, color: '#047857' }">{{ t.green }}</span>
      <SgRadio default-value="b" :options="options" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgRadio default-value="b" :options="options" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgRadio default-value="b" :options="options" />
    </div>
  </div>
</template>
