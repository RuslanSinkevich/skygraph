<script setup lang="ts">
/**
 * Three sizes share the same paddings and radius as Select / DatePicker
 * so a row of mixed controls aligns perfectly.
 */
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'small',
    middle: 'middle (default)',
    large: 'large',
  },
  ru: {
    small: 'маленький',
    middle: 'средний (по умолчанию)',
    large: 'большой',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgInput size="small" :placeholder="t.small" />
    <SgInput :placeholder="t.middle" />
    <SgInput size="large" :placeholder="t.large" />
  </div>
</template>
