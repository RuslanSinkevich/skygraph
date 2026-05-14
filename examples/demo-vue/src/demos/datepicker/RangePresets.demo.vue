<script setup lang="ts">
/** Presets work for ranges too — tuple values fill both ends at once. */
import { SgRangePicker } from '@skygraph/vue'
import type { DatePreset } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    start: 'Start',
    end: 'End',
    last7: 'Last 7 days',
    last30: 'Last 30 days',
    thisMonth: 'This month',
    thisQuarter: 'This quarter',
  },
  ru: {
    start: 'Начало',
    end: 'Конец',
    last7: 'Последние 7 дней',
    last30: 'Последние 30 дней',
    thisMonth: 'Этот месяц',
    thisQuarter: 'Этот квартал',
  },
} as const

const t = useDemoStrings(STRINGS)

const today = new Date()
today.setHours(0, 0, 0, 0)

function offsetDays(base: Date, diff: number): Date {
  const d = new Date(base)
  d.setDate(base.getDate() + diff)
  return d
}
function startOfMonth(base: Date): Date {
  return new Date(base.getFullYear(), base.getMonth(), 1)
}

const presets: DatePreset[] = [
  { label: t.value.last7, value: [offsetDays(today, -6), today] },
  { label: t.value.last30, value: [offsetDays(today, -29), today] },
  { label: t.value.thisMonth, value: [startOfMonth(today), today] },
  {
    label: t.value.thisQuarter,
    value: [new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1), today],
  },
]
</script>

<template>
  <SgRangePicker :presets="presets" :placeholder="[t.start, t.end]" allow-clear />
</template>
