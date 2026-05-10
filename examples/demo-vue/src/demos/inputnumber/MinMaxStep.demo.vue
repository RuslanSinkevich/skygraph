<script setup lang="ts">
/**
 * `min` / `max` clamp the value both on type and via the stepper, and
 * also gray out the relevant `+` or `−` button when the limit is hit.
 * `step` controls what the buttons add/subtract.
 */
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    bounded: '0 – 10, step 1',
    step5: 'step 5',
    negative: 'negative allowed',
  },
  ru: {
    bounded: '0 – 10, шаг 1',
    step5: 'шаг 5',
    negative: 'разрешены отрицательные',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{
        t.bounded
      }}</span>
      <SgInputNumber :default-value="5" :min="0" :max="10" />
    </label>
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{
        t.step5
      }}</span>
      <SgInputNumber :default-value="25" :step="5" />
    </label>
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{
        t.negative
      }}</span>
      <SgInputNumber :default-value="-3" :min="-10" :max="10" />
    </label>
  </div>
</template>
