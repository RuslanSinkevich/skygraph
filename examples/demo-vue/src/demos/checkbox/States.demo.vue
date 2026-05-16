<script setup lang="ts">
/**
 * Every visual state in one place — use this to verify styling
 * overrides cover all cases when theming. The Vue `SgCheckbox` has no
 * `loading` prop yet, so the React-equivalent loading row is dropped
 * here.
 */
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    unchecked: 'Unchecked',
    checked: 'Checked',
    indeterminate: 'Indeterminate',
    disabled: 'Disabled',
    disabledChecked: 'Disabled + checked',
  },
  ru: {
    unchecked: 'Не отмечено',
    checked: 'Отмечено',
    indeterminate: 'Промежуточное',
    disabled: 'Отключено',
    disabledChecked: 'Отключено + отмечено',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px">
    <SgCheckbox>{{ t.unchecked }}</SgCheckbox>
    <SgCheckbox default-checked>{{ t.checked }}</SgCheckbox>
    <SgCheckbox indeterminate>{{ t.indeterminate }}</SgCheckbox>
    <SgCheckbox disabled>{{ t.disabled }}</SgCheckbox>
    <SgCheckbox disabled default-checked>{{ t.disabledChecked }}</SgCheckbox>
  </div>
</template>
