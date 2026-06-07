<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes built from
 * the Switch tokens (`--sg-switch-bg`, `--sg-switch-bg-checked`) — each
 * scope rebrands the track in both states.
 */
import type { CSSProperties } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick', on: 'ON', off: 'OFF' },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    on: 'ВКЛ',
    off: 'ВЫКЛ',
  },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
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
const switchRow: CSSProperties = { display: 'flex', gap: '12px', alignItems: 'center' }

const greenScope = {
  '--sg-switch-bg-checked': '#059669',
  '--sg-switch-bg': 'rgba(5, 150, 105, 0.25)',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-switch-bg-checked': '#38bdf8',
  '--sg-switch-bg': '#475569',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#cbd5e1',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-switch-bg-checked': '#4f46e5',
  '--sg-switch-bg': 'rgba(30, 41, 59, 0.32)',
  '--sg-color-text': '#111827',
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
      <div :style="switchRow">
        <SgSwitch default-checked />
        <SgSwitch default-checked>
          <template #checkedChildren>{{ t.on }}</template>
          <template #unCheckedChildren>{{ t.off }}</template>
        </SgSwitch>
        <SgSwitch />
      </div>
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <div :style="switchRow">
        <SgSwitch default-checked />
        <SgSwitch default-checked>
          <template #checkedChildren>{{ t.on }}</template>
          <template #unCheckedChildren>{{ t.off }}</template>
        </SgSwitch>
        <SgSwitch />
      </div>
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <div :style="switchRow">
        <SgSwitch default-checked />
        <SgSwitch default-checked>
          <template #checkedChildren>{{ t.on }}</template>
          <template #unCheckedChildren>{{ t.off }}</template>
        </SgSwitch>
        <SgSwitch />
      </div>
    </div>
  </div>
</template>
