<script setup lang="ts">
/**
 * TimePicker has no component-specific tokens — it composes global form
 * tokens for the input and global surface tokens for the dropdown.
 * Scope those globals on a wrapper to rebrand.
 */
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Mint theme',
  },
  ru: {
    placeholder: 'Мятная тема',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div
    :style="{
      '--sg-color-primary': '#10b981',
      '--sg-color-primary-hover': '#34d399',
      '--sg-color-primary-bg': 'rgba(16, 185, 129, 0.15)',
      '--sg-color-border': '#6ee7b7',
      '--sg-border-radius': '10px',
    }"
  >
    <SgTimePicker default-value="09:30:00" :placeholder="t.placeholder" />
  </div>
</template>
