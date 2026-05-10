<script setup lang="ts">
/**
 * Select shares CSS variables with Input (height / radius / border).
 * Wrap one instance in a scoped style object and only that select
 * changes.
 */
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tallRounded: 'Tall & rounded',
    brandedGreen: 'Branded green',
    darkInput: 'Dark input',
    apple: 'Apple',
    pear: 'Pear',
    mango: 'Mango',
    kiwi: 'Kiwi',
  },
  ru: {
    tallRounded: 'Выше и со скруглением',
    brandedGreen: 'Зелёный бренд',
    darkInput: 'Тёмный input',
    apple: 'Яблоко',
    pear: 'Груша',
    mango: 'Манго',
    kiwi: 'Киви',
  },
} as const

const t = useDemoStrings(STRINGS)

const options = computed(() =>
  fruitOptions.map((o) => ({
    ...o,
    label: t.value[o.value as 'apple' | 'pear' | 'mango' | 'kiwi'],
  })),
)

const tall = { '--sg-input-height': '44px', '--sg-input-radius': '14px' } as CSSProperties
const green = {
  '--sg-color-primary': '#059669',
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-color-primary-hover': '#047857',
} as CSSProperties
const dark = {
  '--sg-input-bg': '#0f172a',
  '--sg-input-color': '#e2e8f0',
  '--sg-input-border': '#1e293b',
  '--sg-color-text-placeholder': '#64748b',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center">
    <div :style="tall">
      <SgSelect :placeholder="t.tallRounded" :options="options" />
    </div>
    <div :style="green">
      <SgSelect :placeholder="t.brandedGreen" :options="options" />
    </div>
    <div :style="dark">
      <SgSelect :placeholder="t.darkInput" :options="options" />
    </div>
  </div>
</template>
