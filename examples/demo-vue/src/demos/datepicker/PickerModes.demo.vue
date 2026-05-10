<script setup lang="ts">
/**
 * `picker` changes the grid granularity: full calendar, months in a year,
 * or years in a decade. Vue delta: no `picker="week"` (see
 * `findings/T-Vue-Demo-Forms.md` → `datepicker-vue-feature-gaps`).
 */
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    date: 'Date',
    month: 'Month',
    year: 'Year',
  },
  ru: {
    date: 'Дата',
    month: 'Месяц',
    year: 'Год',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgDatePicker picker="date" :placeholder="t.date" allow-clear />
    <SgDatePicker picker="month" format="YYYY-MM" :placeholder="t.month" allow-clear />
    <SgDatePicker picker="year" format="YYYY" :placeholder="t.year" allow-clear />
  </div>
</template>
