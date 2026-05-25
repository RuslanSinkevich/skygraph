<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLabel: 'Default',
    overrideLabel: 'Token override',
    option1: 'Receive emails',
    option2: 'Indeterminate',
    option3: 'Remember me',
  },
  ru: {
    defaultLabel: 'По умолчанию',
    overrideLabel: 'Переопределение',
    option1: 'Получать письма',
    option2: 'Промежуточное',
    option3: 'Запомнить меня',
  },
} as const

const t = useDemoStrings(STRINGS)

const overrideStyle = {
  '--sg-checkbox-bg-checked': '#c026d3',
  '--sg-checkbox-border-hover': '#c026d3',
  '--sg-checkbox-color-checked': '#fff',
  '--sg-checkbox-radius': '50%',
  '--sg-checkbox-size': '18px',
  '--sg-color-text': '#6b0e4a',
  padding: '16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
  border: '1px solid #e9d5ff',
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
      <div style="display: grid; gap: 6px">
        <SgCheckbox default-checked>{{ t.option1 }}</SgCheckbox>
        <SgCheckbox indeterminate>{{ t.option2 }}</SgCheckbox>
        <SgCheckbox>{{ t.option3 }}</SgCheckbox>
      </div>
    </div>
    <div :style="overrideStyle">
      <div :style="{ ...labelStyle, color: '#6b0e4a' }">{{ t.overrideLabel }}</div>
      <div style="display: grid; gap: 6px">
        <SgCheckbox default-checked>{{ t.option1 }}</SgCheckbox>
        <SgCheckbox indeterminate>{{ t.option2 }}</SgCheckbox>
        <SgCheckbox>{{ t.option3 }}</SgCheckbox>
      </div>
    </div>
  </div>
</template>
