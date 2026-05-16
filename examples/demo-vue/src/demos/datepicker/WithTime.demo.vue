<script setup lang="ts">
/**
 * `showTime` adds hour/minute columns. Vue delta: `show-time` is
 * boolean-only — granularity (`hourStep`, `minuteStep`) and the "Now"
 * shortcut are not implemented yet.
 */
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Date + time',
    note: 'No `hourStep` / `minuteStep` / `showNow` in Vue.',
  },
  ru: {
    placeholder: 'Дата + время',
    note: 'В Vue нет `hourStep` / `minuteStep` / `showNow`.',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgDatePicker show-time format="YYYY-MM-DD HH:mm" :placeholder="t.placeholder" allow-clear />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.note }}
    </span>
  </div>
</template>
