<script setup lang="ts">
/**
 * `multiple-selection` toggles dates on click. Perfect for scheduling
 * availability ("pick every working day this month").
 */
import { computed, ref } from 'vue'
import { SgCalendar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    one: 'Selected 1 date',
    many: 'Selected {n} dates',
  },
  ru: {
    one: 'Выбрана 1 дата',
    many: 'Выбрано дат: {n}',
  },
} as const

const t = useDemoStrings(STRINGS)
const dates = ref<Date[]>([])

const summary = computed(() =>
  dates.value.length === 1 ? t.value.one : t.value.many.replace('{n}', String(dates.value.length)),
)
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ summary }}
    </div>
    <SgCalendar
      :fullscreen="false"
      multiple-selection
      :multiple-value="dates"
      @multiple-change="dates = $event"
    />
  </div>
</template>
