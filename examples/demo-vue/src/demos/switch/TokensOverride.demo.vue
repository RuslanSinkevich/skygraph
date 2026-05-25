<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLabel: 'Default',
    overrideLabel: 'Token override',
    on: 'ON',
    off: 'OFF',
  },
  ru: {
    defaultLabel: 'По умолчанию',
    overrideLabel: 'Переопределение',
    on: 'ВКЛ',
    off: 'ВЫКЛ',
  },
} as const

const t = useDemoStrings(STRINGS)

const overrideStyle = {
  '--sg-switch-bg-checked': '#e11d48',
  '--sg-switch-bg': 'rgba(225, 29, 72, 0.2)',
  padding: '16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
  border: '1px solid #fecdd3',
} as CSSProperties

const defaultStyle = {
  padding: '16px',
  borderRadius: '12px',
  background: 'var(--sg-color-bg-secondary)',
  border: '1px solid var(--sg-color-border-secondary)',
} as CSSProperties

const labelStyle = {
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '8px',
  color: 'var(--sg-color-text-secondary)',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div :style="defaultStyle">
      <div :style="labelStyle">{{ t.defaultLabel }}</div>
      <div style="display: flex; gap: 12px; align-items: center">
        <SgSwitch default-checked />
        <SgSwitch default-checked>
          <template #checkedChildren>{{ t.on }}</template>
          <template #unCheckedChildren>{{ t.off }}</template>
        </SgSwitch>
        <SgSwitch />
      </div>
    </div>
    <div :style="overrideStyle">
      <div :style="{ ...labelStyle, color: '#9f1239' }">{{ t.overrideLabel }}</div>
      <div style="display: flex; gap: 12px; align-items: center">
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
