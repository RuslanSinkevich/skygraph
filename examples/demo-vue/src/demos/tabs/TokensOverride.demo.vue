<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Tabs read
 * `--sg-color-primary` for the active ink bar / label and the surface
 * tokens for the strip, so each scope reskins one Tabs without bespoke
 * CSS.
 */
import { computed, type CSSProperties } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    tab1: 'Overview',
    tab2: 'Activity',
    tab3: 'Settings',
    panel1: 'High-level summary of the resource.',
    panel2: 'Recent events and audit log.',
    panel3: 'Configuration options.',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    tab1: 'Обзор',
    tab2: 'Активность',
    tab3: 'Настройки',
    panel1: 'Краткая сводка по объекту.',
    panel2: 'Недавние события и журнал.',
    panel3: 'Параметры и опции.',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<TabItem[]>(() => [
  { key: '1', label: t.value.tab1, content: t.value.panel1 },
  { key: '2', label: t.value.tab2, content: t.value.panel2 },
  { key: '3', label: t.value.tab3, content: t.value.panel3 },
])

const cardBase: CSSProperties = {
  padding: '16px',
  borderRadius: '16px',
  flex: '1 1 280px',
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
  '--sg-color-primary': '#059669',
  '--sg-color-primary-hover': '#047857',
  '--sg-color-bg-hover': '#ecfdf5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-border-secondary': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#6366f1',
  '--sg-color-text': '#1e1b4b',
  '--sg-color-border-secondary': 'rgba(255, 255, 255, 0.6)',
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
      <SgTabs type="line" :items="items" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgTabs type="line" :items="items" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgTabs type="line" :items="items" />
    </div>
  </div>
</template>
