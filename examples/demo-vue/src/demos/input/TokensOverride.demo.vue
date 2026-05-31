<script setup lang="ts">
/**
 * Two ready-to-use Input themes built purely from component tokens
 * (`--sg-input-*`). Only paint / shape tokens change — focus ring,
 * disabled and validation states keep their semantic behaviour.
 * Mirrors React `input/TokensOverride.demo.tsx`.
 */
import { ref, type CSSProperties } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    softLabel: 'Soft · rounded',
    amberLabel: 'Amber · filled',
    softPlaceholder: 'Search anything…',
    amberPlaceholder: 'your@email.com',
  },
  ru: {
    softLabel: 'Мягкий · скруглённый',
    amberLabel: 'Янтарь · заливка',
    softPlaceholder: 'Поиск чего угодно…',
    amberPlaceholder: 'your@email.com',
  },
} as const

const t = useDemoStrings(STRINGS)

const soft = ref('')
const amber = ref('')

const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
} as CSSProperties

const softScope = {
  '--sg-input-radius': '999px',
  '--sg-input-height': '44px',
  '--sg-input-padding': '0 18px',
  '--sg-input-bg': '#ffffff',
  '--sg-input-border': '#ddd6fe',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 240px',
  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
  border: '1px solid #ddd6fe',
} as CSSProperties

const amberScope = {
  '--sg-input-radius': '8px',
  '--sg-input-height': '44px',
  '--sg-input-padding': '0 14px',
  '--sg-input-bg': '#fffbeb',
  '--sg-input-border': '#fcd34d',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 240px',
  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  border: '1px solid #fde68a',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div :style="softScope">
      <span :style="{ ...labelStyle, color: '#6d28d9' }">{{ t.softLabel }}</span>
      <SgInput v-model="soft" :placeholder="t.softPlaceholder" />
    </div>
    <div :style="amberScope">
      <span :style="{ ...labelStyle, color: '#b45309' }">{{ t.amberLabel }}</span>
      <SgInput v-model="amber" :placeholder="t.amberPlaceholder" />
    </div>
  </div>
</template>
