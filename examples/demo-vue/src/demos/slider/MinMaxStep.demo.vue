<script setup lang="ts">
/**
 * `min` / `max` set the range. `step` quantises both pointer drags
 * and arrow-key presses — handy for ratings, rounded pricing, etc.
 */
import { SgSlider } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    one: '0 – 10, step 1',
    five: '−50 – 50, step 5',
    fraction: '0 – 1, step 0.05',
  },
  ru: {
    one: '0 – 10, шаг 1',
    five: '−50 – 50, шаг 5',
    fraction: '0 – 1, шаг 0.05',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 24px; max-width: 360px">
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.one }}</span>
      <SgSlider :min="0" :max="10" :default-value="4" />
    </label>
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.five }}</span>
      <SgSlider :min="-50" :max="50" :step="5" :default-value="0" />
    </label>
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.fraction }}</span>
      <SgSlider :min="0" :max="1" :step="0.05" :default-value="0.25" />
    </label>
  </div>
</template>
