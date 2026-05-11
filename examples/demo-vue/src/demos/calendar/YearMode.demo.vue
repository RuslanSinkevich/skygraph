<script setup lang="ts">
/**
 * `mode="year"` renders a 12-cell month overview grid. Clicking a month
 * jumps back to the month view focused on that month. `@panelChange`
 * fires whenever the visible panel or mode changes.
 */
import { ref } from 'vue'
import { SgCalendar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    note: 'Current mode:',
  },
  ru: {
    note: 'Текущий mode:',
  },
} as const

const t = useDemoStrings(STRINGS)
const mode = ref<'month' | 'year'>('year')

function onPanelChange(_d: Date, m: 'month' | 'year') {
  mode.value = m
}
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 520px">
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.note }} {{ mode }}
    </div>
    <SgCalendar :mode="mode" @panel-change="onPanelChange" />
  </div>
</template>
