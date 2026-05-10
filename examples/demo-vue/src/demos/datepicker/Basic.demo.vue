<script setup lang="ts">
/**
 * Controlled single date. `@change` delivers the parsed `Date` *and* the
 * formatted string — use whichever fits the server contract.
 */
import { ref } from 'vue'
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Pick a date',
    isoLabel: 'ISO:',
    isoNull: 'null',
  },
  ru: {
    placeholder: 'Выберите дату',
    isoLabel: 'ISO:',
    isoNull: 'null',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<Date | null>(null)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
    <SgDatePicker v-model="value" :placeholder="t.placeholder" allow-clear />
    <span
      style="font-size: 13px; color: var(--sg-color-text-secondary); align-self: center"
    >
      {{ t.isoLabel }} <code>{{ value?.toISOString() ?? t.isoNull }}</code>
    </span>
  </div>
</template>
