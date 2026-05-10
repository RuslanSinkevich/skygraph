<script setup lang="ts">
/** Three sizes — match the surrounding form density. */
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    middle: 'Default',
    large: 'Large',
  },
  ru: {
    small: 'Small',
    middle: 'Default',
    large: 'Large',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center">
    <SgDatePicker size="small" :placeholder="t.small" allow-clear />
    <SgDatePicker :placeholder="t.middle" allow-clear />
    <SgDatePicker size="large" :placeholder="t.large" allow-clear />
  </div>
</template>
