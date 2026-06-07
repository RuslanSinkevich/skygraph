<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Select
 * shares the `--sg-input-*` field tokens with Input and adds the
 * dropdown surface tokens (`--sg-color-bg-elevated`, `--sg-shadow-lg`),
 * so each scope reshapes both the trigger and its panel.
 */
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark field',
    glass: 'Glass pick',
    apple: 'Apple',
    pear: 'Pear',
    mango: 'Mango',
    kiwi: 'Kiwi',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмное поле',
    glass: 'Glass pick',
    apple: 'Яблоко',
    pear: 'Груша',
    mango: 'Манго',
    kiwi: 'Киви',
  },
} as const

const t = useDemoStrings(STRINGS)

const options = computed(() =>
  fruitOptions.map((o) => ({
    ...o,
    label: t.value[o.value as 'apple' | 'pear' | 'mango' | 'kiwi'],
  })),
)

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
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-placeholder': '#64748b',
  '--sg-color-bg-elevated': '#0f172a',
  '--sg-color-primary-bg': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-input-bg': 'rgba(255, 255, 255, 0.45)',
  '--sg-input-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-input-color': '#0f172a',
  '--sg-color-text-placeholder': 'rgba(15, 23, 42, 0.55)',
  '--sg-color-bg-elevated': 'rgba(255, 255, 255, 0.75)',
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
      <SgSelect :placeholder="t.green" :options="options" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgSelect :placeholder="t.dark" :options="options" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgSelect :placeholder="t.glass" :options="options" />
    </div>
  </div>
</template>
