<script setup lang="ts">
/**
 * `presets` renders a sidebar with named shortcuts — clicking applies
 * the value without leaving the calendar open.
 */
import { SgDatePicker } from '@skygraph/vue'
import type { DatePreset } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Pick or use a preset',
    today: 'Today',
    tomorrow: 'Tomorrow',
    nextMonday: 'Next Monday',
    inMonth: 'In a month',
  },
  ru: {
    placeholder: 'Выберите дату или пресет',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    nextMonday: 'Следующий понедельник',
    inMonth: 'Через месяц',
  },
} as const

const t = useDemoStrings(STRINGS)

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

const presets: DatePreset[] = [
  { label: t.value.today, value: today },
  {
    label: t.value.tomorrow,
    value: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  },
  {
    label: t.value.nextMonday,
    value: (() => {
      const d = new Date(today)
      d.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7))
      return d
    })(),
  },
  {
    label: t.value.inMonth,
    value: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
  },
]
</script>

<template>
  <SgDatePicker :presets="presets" :placeholder="t.placeholder" allow-clear />
</template>
