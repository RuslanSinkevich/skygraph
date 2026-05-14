<script setup lang="ts">
/**
 * `SgRangePicker` returns a tuple `[start, end]` — either end can be `null`
 * until the range is committed.
 */
import { computed, ref } from 'vue'
import { SgRangePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    start: 'Start',
    end: 'End',
    noRange: 'no range',
  },
  ru: {
    start: 'Начало',
    end: 'Конец',
    noRange: 'нет диапазона',
  },
} as const

const t = useDemoStrings(STRINGS)
const range = ref<[Date | null, Date | null]>([null, null])

const summary = computed(() => {
  const [s, e] = range.value
  if (s && e) return `${s.toLocaleDateString()} → ${e.toLocaleDateString()}`
  return t.value.noRange
})
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
    <SgRangePicker v-model="range" :placeholder="[t.start, t.end]" allow-clear />
    <span style="font-size: 13px; color: var(--sg-color-text-secondary); align-self: center">
      {{ summary }}
    </span>
  </div>
</template>
