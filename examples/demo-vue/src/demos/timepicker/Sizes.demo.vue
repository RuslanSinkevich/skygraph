<script setup lang="ts">
/** Three sizes match Input / Select / DatePicker heights. */
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'small',
    middle: 'middle (default)',
    large: 'large',
  },
  ru: {
    small: 'small',
    middle: 'middle (default)',
    large: 'large',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker size="small" :placeholder="t.small" format="HH:mm" :show-second="false" />
    <SgTimePicker :placeholder="t.middle" format="HH:mm" :show-second="false" />
    <SgTimePicker size="large" :placeholder="t.large" format="HH:mm" :show-second="false" />
  </div>
</template>
