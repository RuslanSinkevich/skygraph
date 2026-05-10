<script setup lang="ts">
/**
 * `disabledDate` is called for every rendered cell — return `true` to
 * grey-out and block the day. Handy for "no past dates" or "only
 * weekdays" pickers.
 */
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    noPast: 'No past dates',
    weekdays: 'Weekdays only',
  },
  ru: {
    noPast: 'Без прошлых дат',
    weekdays: 'Только будни',
  },
} as const

const t = useDemoStrings(STRINGS)

const today = new Date()
today.setHours(0, 0, 0, 0)

function disablePast(d: Date) {
  return d.getTime() < today.getTime()
}

function disableWeekend(d: Date) {
  return d.getDay() === 0 || d.getDay() === 6
}
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgDatePicker :placeholder="t.noPast" :disabled-date="disablePast" allow-clear />
    <SgDatePicker :placeholder="t.weekdays" :disabled-date="disableWeekend" allow-clear />
  </div>
</template>
