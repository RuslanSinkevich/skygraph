<script setup lang="ts">
/**
 * Input exposes component-specific tokens (`--sg-input-*`) in addition
 * to the globals. Scope them on a parent to reshape a group of inputs
 * without touching the rest of the form.
 */
import type { CSSProperties } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    rounded: 'Rounded soft input',
    brand: 'Violet brand input',
  },
  ru: {
    rounded: 'Скруглённый input',
    brand: 'Фиолетовый брендовый input',
  },
} as const

const t = useDemoStrings(STRINGS)

const rounded = {
  '--sg-input-height': '44px',
  '--sg-input-radius': '14px',
  '--sg-input-font-size': '16px',
  '--sg-input-padding': '10px 16px',
} as CSSProperties

const brand = {
  '--sg-color-primary': '#7c3aed',
  '--sg-color-primary-hover': '#8b5cf6',
  '--sg-color-primary-bg': '#f3e8ff',
  '--sg-input-border': '#c4b5fd',
} as CSSProperties
</script>

<template>
  <div style="display: grid; gap: 16px; max-width: 360px">
    <div :style="rounded">
      <SgInput :placeholder="t.rounded" />
    </div>
    <div :style="brand">
      <SgInput :placeholder="t.brand" />
    </div>
  </div>
</template>
