<script setup lang="ts">
/**
 * `hour-step` / `minute-step` / `second-step` thin out each column —
 * use them for appointment slots ("every 15 minutes") or to hide
 * seconds from unneeded places.
 */
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    quarter: '15-minute slots',
    twoHours: 'Every 2 hours',
  },
  ru: {
    quarter: 'Слоты по 15 минут',
    twoHours: 'Каждые 2 часа',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker
      default-value="09:00"
      format="HH:mm"
      :minute-step="15"
      :show-second="false"
      :placeholder="t.quarter"
    />
    <SgTimePicker
      default-value="00:00"
      format="HH:mm"
      :hour-step="2"
      :show-second="false"
      :placeholder="t.twoHours"
    />
  </div>
</template>
