<script setup lang="ts">
/**
 * `range-selection` switches the grid to range mode. Click once to pin
 * the start, a second click commits the end. Everything in between gets
 * a highlight. Use `range-value` / `@range-change` to drive it from a
 * store.
 */
import { ref } from 'vue'
import { SgCalendar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { empty: 'Pick a start and an end' },
  ru: { empty: 'Выберите начало и конец' },
} as const

const t = useDemoStrings(STRINGS)
const range = ref<[Date | null, Date | null]>([null, null])

function format() {
  const [s, e] = range.value
  if (s && e) {
    return `From ${s.toLocaleDateString()} to ${e.toLocaleDateString()}`
  }
  return t.value.empty
}
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ format() }}</div>
    <SgCalendar
      :fullscreen="false"
      range-selection
      :range-value="range"
      @range-change="range = $event"
    />
  </div>
</template>
