<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. The active
 * dot reads `--sg-color-primary`, idle dots `--sg-color-text-disabled`
 * and hover `--sg-color-text-tertiary`, so each scope rebrands the dots.
 */
import type { CSSProperties } from 'vue'
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '14px',
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
  '--sg-color-primary': '#059669',
  '--sg-color-text-disabled': 'rgba(5, 150, 105, 0.3)',
  '--sg-color-text-tertiary': 'rgba(5, 150, 105, 0.6)',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-text-disabled': 'rgba(148, 163, 184, 0.4)',
  '--sg-color-text-tertiary': 'rgba(148, 163, 184, 0.7)',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#ffffff',
  '--sg-color-text-disabled': 'rgba(255, 255, 255, 0.4)',
  '--sg-color-text-tertiary': 'rgba(255, 255, 255, 0.7)',
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
      <SgCarousel>
        <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
          {{ i + 1 }}
        </div>
      </SgCarousel>
    </div>
    <div :style="darkScope" data-sg-theme="dark">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgCarousel>
        <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
          {{ i + 1 }}
        </div>
      </SgCarousel>
    </div>
    <div :style="glassScope" data-sg-theme="light">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgCarousel>
        <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
          {{ i + 1 }}
        </div>
      </SgCarousel>
    </div>
  </div>
</template>
