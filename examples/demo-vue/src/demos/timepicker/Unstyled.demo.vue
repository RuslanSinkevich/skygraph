<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class on the trigger, dropdown, and
 * scroll columns. The combobox role stays — style it however you like.
 */
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    note: 'Wrapper class hooks gone; consumer styles win.',
  },
  ru: {
    note: 'Классы-якоря убраны; потребительские стили побеждают.',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker unstyled default-value="11:20:00" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.note }}
    </span>
  </div>
</template>
