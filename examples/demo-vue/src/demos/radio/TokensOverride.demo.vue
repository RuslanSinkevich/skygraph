<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    defaultLabel: 'Default',
    overrideLabel: 'Token override',
    brandA: 'Brand A',
    brandB: 'Brand B',
    brandC: 'Brand C',
  },
  ru: {
    defaultLabel: 'По умолчанию',
    overrideLabel: 'Переопределение',
    brandA: 'Бренд A',
    brandB: 'Бренд B',
    brandC: 'Бренд C',
  },
} as const

const t = useDemoStrings(STRINGS)

const overrideStyle = {
  '--sg-radio-bg-checked': '#059669',
  '--sg-radio-border-hover': '#059669',
  '--sg-radio-dot-color': '#fff',
  '--sg-color-text': '#065f46',
  padding: '16px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  border: '1px solid #a7f3d0',
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
      <SgRadio
        default-value="b"
        :options="[
          { label: t.brandA, value: 'a' },
          { label: t.brandB, value: 'b' },
          { label: t.brandC, value: 'c' },
        ]"
      />
    </div>
    <div :style="overrideStyle">
      <div :style="{ ...labelStyle, color: '#065f46' }">{{ t.overrideLabel }}</div>
      <SgRadio
        default-value="b"
        :options="[
          { label: t.brandA, value: 'a' },
          { label: t.brandB, value: 'b' },
          { label: t.brandC, value: 'c' },
        ]"
      />
    </div>
  </div>
</template>
