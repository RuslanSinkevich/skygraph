<script setup lang="ts">
/**
 * Controlled star rating. Clicking the currently-selected star clears
 * the value (toggles back to 0) — a common UX pattern for "undo".
 */
import { ref } from 'vue'
import { SgRate } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { valuePrefix: 'value:' },
  ru: { valuePrefix: 'значение:' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref(3)
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgRate v-model="value" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.valuePrefix }} {{ value }}
    </span>
  </div>
</template>
