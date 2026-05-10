<script setup lang="ts">
/**
 * Controlled TimePicker. The value is a **string** matching the active
 * format — not a Date — which makes it trivial to persist and diff.
 */
import { ref } from 'vue'
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    committed: 'Committed value:',
    empty: 'No value yet.',
  },
  ru: {
    committed: 'Текущее значение:',
    empty: 'Значения пока нет.',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('')
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker v-model="value" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ value ? `${t.committed} "${value}"` : t.empty }}
    </span>
  </div>
</template>
