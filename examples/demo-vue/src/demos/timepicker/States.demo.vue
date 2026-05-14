<script setup lang="ts">
/**
 * `disabled` blocks the dropdown entirely. `loading` swaps the clock
 * icon for a spinner and keeps the trigger inert.
 */
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Loading…' },
  ru: { placeholder: 'Загрузка…' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker disabled default-value="10:30:00" />
    <SgTimePicker loading :placeholder="t.placeholder" />
  </div>
</template>
