<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built from
 * Button tokens (`--sg-btn-*`) plus the shared brand globals. Only paint
 * / shape changes — hover, focus ring and disabled behaviour stay intact.
 */
import type { CSSProperties } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    primary: 'Get started',
    secondary: 'Learn more',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    primary: 'Начать',
    secondary: 'Подробнее',
  },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
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
const rowStyle: CSSProperties = { display: 'flex', gap: '10px', flexWrap: 'wrap' }

const greenScope = {
  '--sg-color-primary': '#059669',
  '--sg-color-primary-hover': '#047857',
  '--sg-color-primary-active': '#065f46',
  '--sg-btn-border': '#6ee7b7',
  '--sg-btn-radius': '999px',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-btn-bg': '#1e293b',
  '--sg-btn-color': '#e2e8f0',
  '--sg-btn-border': '#334155',
  '--sg-color-primary': '#38bdf8',
  '--sg-color-primary-hover': '#0ea5e9',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-btn-bg': 'rgba(255, 255, 255, 0.5)',
  '--sg-btn-color': '#0f172a',
  '--sg-btn-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-primary': 'rgba(99, 102, 241, 0.85)',
  '--sg-btn-radius': '12px',
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
      <div :style="rowStyle">
        <SgButton type="primary">{{ t.primary }}</SgButton>
        <SgButton>{{ t.secondary }}</SgButton>
      </div>
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <div :style="rowStyle">
        <SgButton type="primary">{{ t.primary }}</SgButton>
        <SgButton>{{ t.secondary }}</SgButton>
      </div>
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <div :style="rowStyle">
        <SgButton type="primary">{{ t.primary }}</SgButton>
        <SgButton>{{ t.secondary }}</SgButton>
      </div>
    </div>
  </div>
</template>
