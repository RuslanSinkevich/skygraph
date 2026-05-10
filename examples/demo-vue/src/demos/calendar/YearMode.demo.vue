<script setup lang="ts">
/**
 * `mode="year"` is accepted by `SgCalendar` and reported via
 * `@panelChange`, but the current Vue implementation reuses the same
 * month grid for all modes (no dedicated 12-month overview yet). Vue
 * delta documented in `findings/T-Vue-Demo-Forms.md` →
 * `calendar-vue-feature-gaps`.
 */
import { ref } from 'vue'
import { SgCalendar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    note: 'Current mode:',
    flag: 'Vue: year mode renders the same grid as month — feature gap.',
  },
  ru: {
    note: 'Текущий mode:',
    flag: 'Vue: year-режим рисует ту же сетку, что и month — feature gap.',
  },
} as const

const t = useDemoStrings(STRINGS)
const mode = ref<'month' | 'week' | 'year'>('year')

function onPanelChange(_d: Date, m: 'month' | 'week' | 'year') {
  mode.value = m
}
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 520px">
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.note }} {{ mode }}
    </div>
    <SgCalendar :mode="mode" @panel-change="onPanelChange" />
    <div style="font-size: 11px; color: var(--sg-color-text-tertiary)">
      {{ t.flag }}
    </div>
  </div>
</template>
