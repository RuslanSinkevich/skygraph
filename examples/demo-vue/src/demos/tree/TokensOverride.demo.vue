<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Tree has
 * no Tree-specific tokens — it inherits the global palette
 * (`--sg-color-primary` for the selected row, the surface / text tokens
 * for the rest), so each scope skins one Tree.
 */
import type { CSSProperties } from 'vue'
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '16px',
  borderRadius: '16px',
  flex: '1 1 220px',
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
  '--sg-color-primary': '#059669',
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-color-bg-hover': '#ecfdf5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-primary-bg': '#1e3a5f',
  '--sg-color-bg-hover': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#6366f1',
  '--sg-color-primary-bg': 'rgba(255, 255, 255, 0.5)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.4)',
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
      <SgTree :tree-data="orgTree" default-expand-all />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgTree :tree-data="orgTree" default-expand-all />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgTree :tree-data="orgTree" default-expand-all />
    </div>
  </div>
</template>
