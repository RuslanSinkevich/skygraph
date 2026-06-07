<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Avatar has
 * no component-specific tokens — the shape follows `--sg-border-radius`
 * and the fallback background `--sg-color-text-disabled`, so each scope
 * reshapes and recolours every avatar in the subtree.
 */
import type { CSSProperties } from 'vue'
import { SgAvatar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
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

const greenScope = {
  '--sg-border-radius': '12px',
  '--sg-color-text-disabled': '#059669',
  '--sg-color-white': '#ecfdf5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-border-radius': '12px',
  '--sg-color-text-disabled': '#38bdf8',
  '--sg-color-white': '#0f172a',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-border-radius': '12px',
  '--sg-color-text-disabled': 'rgba(99, 102, 241, 0.7)',
  '--sg-color-white': '#ffffff',
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
      <SgAvatar size="large">A</SgAvatar>
      <SgAvatar size="large" shape="square">B</SgAvatar>
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgAvatar size="large">A</SgAvatar>
      <SgAvatar size="large" shape="square">B</SgAvatar>
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgAvatar size="large">A</SgAvatar>
      <SgAvatar size="large" shape="square">B</SgAvatar>
    </div>
  </div>
</template>
