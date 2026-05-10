<script setup lang="ts">
/**
 * Controlled numeric input with a live readout. Clearing the field
 * commits `null`, so make sure your state type accepts it.
 */
import { ref } from 'vue'
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { valuePrefix: 'value:', nullLabel: 'null' },
  ru: { valuePrefix: 'значение:', nullLabel: 'null' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<number | null>(3)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgInputNumber v-model="value" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.valuePrefix }} {{ value === null ? t.nullLabel : value }}
    </span>
  </div>
</template>
