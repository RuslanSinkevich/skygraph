<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. List has
 * no component-local tokens — it reads the shared palette
 * (`--sg-color-bg-hover` for the row highlight, `--sg-color-border` for
 * the outline, `--sg-color-bg-secondary` for the header tint).
 */
import type { CSSProperties } from 'vue'
import { SgList } from '@skygraph/vue'
import { shortData } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick', header: 'List' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick', header: 'Список' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '16px',
  borderRadius: '16px',
  flex: '1 1 240px',
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
  '--sg-color-bg-hover': '#d1fae5',
  '--sg-color-border': '#86efac',
  '--sg-color-bg-secondary': '#ecfdf5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-border': '#334155',
  '--sg-color-bg-secondary': '#0f172a',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.55)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-border': 'rgba(255, 255, 255, 0.7)',
  '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.4)',
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
      <SgList bordered :header="t.header" :data-source="shortData">
        <template #default="{ item }">
          <div style="padding: 8px 0">{{ item }}</div>
        </template>
      </SgList>
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgList bordered :header="t.header" :data-source="shortData">
        <template #default="{ item }">
          <div style="padding: 8px 0">{{ item }}</div>
        </template>
      </SgList>
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgList bordered :header="t.header" :data-source="shortData">
        <template #default="{ item }">
          <div style="padding: 8px 0">{{ item }}</div>
        </template>
      </SgList>
    </div>
  </div>
</template>
