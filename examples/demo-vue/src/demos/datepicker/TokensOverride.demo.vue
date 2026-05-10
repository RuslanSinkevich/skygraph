<script setup lang="ts">
/**
 * DatePicker picks up `--sg-color-primary` for selected days, the Input
 * tokens for the control shell, and `--sg-shadow-lg` for the dropdown.
 */
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    red: 'Red accent',
    pill: 'Pill control',
    dark: 'Dark dropdown',
  },
  ru: {
    red: 'Красный акцент',
    pill: 'Скруглённый контрол',
    dark: 'Тёмный dropdown',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div
      :style="{
        '--sg-color-primary': '#ef4444',
        '--sg-color-primary-bg': '#fee2e2',
        '--sg-color-primary-hover': '#dc2626',
      }"
    >
      <SgDatePicker :placeholder="t.red" allow-clear />
    </div>
    <div :style="{ '--sg-border-radius': '999px' }">
      <SgDatePicker :placeholder="t.pill" allow-clear />
    </div>
    <div
      :style="{
        '--sg-color-bg-elevated': '#1f2937',
        '--sg-color-text': '#e5e7eb',
        '--sg-color-text-tertiary': '#9ca3af',
      }"
    >
      <SgDatePicker :placeholder="t.dark" allow-clear />
    </div>
  </div>
</template>
