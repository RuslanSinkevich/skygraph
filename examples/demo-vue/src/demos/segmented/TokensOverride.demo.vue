<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Segmented
 * reuses the global scale — `--sg-color-bg-secondary` for the track,
 * `--sg-color-bg-container` for the selected thumb and `--sg-shadow-sm`
 * for its lift, so each scope repaints the whole control.
 */
import type { CSSProperties } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
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

const greenScope = {
  '--sg-color-bg-secondary': '#dcfce7',
  '--sg-color-bg-container': '#059669',
  '--sg-color-text': '#065f46',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-container': '#0ea5e9',
  '--sg-color-text': '#ffffff',
  '--sg-color-text-secondary': 'rgba(255,255,255,0.75)',
  '--sg-shadow-sm': '0 1px 2px rgba(0,0,0,0.45)',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.35)',
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.85)',
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
      <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
    </div>
  </div>
</template>
