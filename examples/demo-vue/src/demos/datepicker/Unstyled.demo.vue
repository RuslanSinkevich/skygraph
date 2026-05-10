<script setup lang="ts">
/**
 * `unstyled` strips the wrapper class hooks from the root, so global
 * `.sg-datepicker-*` selectors no longer apply. The dropdown markup is
 * still rendered — bring your own scoped styles to skin it.
 */
import { ref } from 'vue'
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Pick a date',
    note: 'Wrapper class hooks gone; consumer styles win.',
  },
  ru: {
    placeholder: 'Выберите дату',
    note: 'Классы-якоря убраны; потребительские стили побеждают.',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<Date | null>(null)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgDatePicker v-model="value" unstyled :placeholder="t.placeholder" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.note }}
    </span>
  </div>
</template>
