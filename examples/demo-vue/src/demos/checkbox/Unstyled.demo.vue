<script setup lang="ts">
/**
 * `unstyled` removes SkyGraph classes — you get the native checkbox +
 * label wrapper. Use it inside a larger design-system wrapper.
 */
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    checked: 'Unstyled checked',
    indeterminate: 'Unstyled indeterminate',
    disabled: 'Unstyled disabled',
  },
  ru: {
    checked: 'Без стилей, отмечено',
    indeterminate: 'Без стилей, промежуточное',
    disabled: 'Без стилей, отключено',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 6px">
    <SgCheckbox unstyled default-checked>{{ t.checked }}</SgCheckbox>
    <SgCheckbox unstyled indeterminate>{{ t.indeterminate }}</SgCheckbox>
    <SgCheckbox unstyled disabled>{{ t.disabled }}</SgCheckbox>
  </div>
</template>
