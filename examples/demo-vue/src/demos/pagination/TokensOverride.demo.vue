<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Pagination
 * reads `--sg-color-primary` for the active chip and `--sg-border-radius`
 * for the chip shape, so each scope rebrands the whole pager.
 */
import { ref, type CSSProperties } from 'vue'
import { SgPagination } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const p1 = ref(2)
const p2 = ref(2)
const p3 = ref(2)

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 280px',
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
  '--sg-border-radius': '999px',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-primary-hover': '#0ea5e9',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-border': '#334155',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#6366f1',
  '--sg-color-primary-hover': '#4f46e5',
  '--sg-border-radius': '999px',
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
      <SgPagination :current="p1" :total="50" @change="(p: number) => (p1 = p)" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgPagination :current="p2" :total="50" @change="(p: number) => (p2 = p)" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgPagination :current="p3" :total="50" @change="(p: number) => (p3 = p)" />
    </div>
  </div>
</template>
