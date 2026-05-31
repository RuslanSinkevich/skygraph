<script setup lang="ts">
/**
 * Two ready-to-use Button themes built purely from component tokens
 * (`--sg-btn-*`). Scope them on any wrapper — hover / focus / disabled
 * behaviour stays intact because only the paint tokens change.
 * Mirrors React `button/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    emeraldLabel: 'Emerald · pill',
    sunsetLabel: 'Sunset · sharp',
    primary: 'Primary',
    secondary: 'Secondary',
    dashed: 'Dashed',
  },
  ru: {
    emeraldLabel: 'Изумруд · pill',
    sunsetLabel: 'Закат · острый',
    primary: 'Основная',
    secondary: 'Вторичная',
    dashed: 'Пунктир',
  },
} as const

const t = useDemoStrings(STRINGS)

const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
} as CSSProperties

const emeraldScope = {
  '--sg-btn-radius': '999px',
  '--sg-btn-height': '40px',
  '--sg-btn-padding': '0 20px',
  '--sg-btn-font-size': '14px',
  '--sg-btn-bg': '#059669',
  '--sg-btn-color': '#ffffff',
  '--sg-btn-border': '#059669',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 240px',
  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  border: '1px solid #a7f3d0',
} as CSSProperties

const sunsetScope = {
  '--sg-btn-radius': '4px',
  '--sg-btn-height': '40px',
  '--sg-btn-padding': '0 18px',
  '--sg-btn-font-size': '14px',
  '--sg-btn-bg': '#ea580c',
  '--sg-btn-color': '#ffffff',
  '--sg-btn-border': '#ea580c',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '20px',
  borderRadius: '16px',
  flex: '1 1 240px',
  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
  border: '1px solid #fed7aa',
} as CSSProperties

const rowStyle = { display: 'flex', gap: '10px', flexWrap: 'wrap' } as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div :style="emeraldScope">
      <span :style="{ ...labelStyle, color: '#047857' }">{{ t.emeraldLabel }}</span>
      <div :style="rowStyle">
        <SgButton type="primary">{{ t.primary }}</SgButton>
        <SgButton>{{ t.secondary }}</SgButton>
        <SgButton type="dashed">{{ t.dashed }}</SgButton>
      </div>
    </div>
    <div :style="sunsetScope">
      <span :style="{ ...labelStyle, color: '#c2410c' }">{{ t.sunsetLabel }}</span>
      <div :style="rowStyle">
        <SgButton type="primary">{{ t.primary }}</SgButton>
        <SgButton>{{ t.secondary }}</SgButton>
        <SgButton type="dashed">{{ t.dashed }}</SgButton>
      </div>
    </div>
  </div>
</template>
