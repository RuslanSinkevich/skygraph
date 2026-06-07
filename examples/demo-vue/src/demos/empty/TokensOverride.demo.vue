<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Empty has
 * no component-private tokens — the illustration uses
 * `--sg-color-text-disabled` and the caption `--sg-color-text-tertiary`,
 * so each scope tweaks the mood.
 */
import type { CSSProperties } from 'vue'
import { SgEmpty } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick', desc: 'Nothing here yet' },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    desc: 'Пока пусто',
  },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 220px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '8px',
}

const greenScope = {
  '--sg-color-text-disabled': '#059669',
  '--sg-color-text-tertiary': '#047857',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-text-disabled': '#38bdf8',
  '--sg-color-text-tertiary': '#94a3b8',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-text-disabled': 'rgba(99, 102, 241, 0.7)',
  '--sg-color-text-tertiary': '#4338ca',
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
      <SgEmpty :description="t.desc" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgEmpty :description="t.desc" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgEmpty :description="t.desc" />
    </div>
  </div>
</template>
