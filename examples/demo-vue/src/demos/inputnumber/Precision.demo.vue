<script setup lang="ts">
/**
 * `precision` rounds the value to a fixed number of decimal places
 * after clamping — useful for currencies or percentages where you
 * don't want "0.30000000000000004" slipping through.
 */
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    p0: 'precision = 0',
    p2: 'precision = 2',
    p4: 'precision = 4',
  },
  ru: {
    p0: 'точность = 0',
    p2: 'точность = 2',
    p4: 'точность = 4',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.p0 }}</span>
      <SgInputNumber :default-value="10" :step="0.5" :precision="0" />
    </label>
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.p2 }}</span>
      <SgInputNumber :default-value="1.25" :step="0.05" :precision="2" />
    </label>
    <label style="display: grid; gap: 4px">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.p4 }}</span>
      <SgInputNumber :default-value="0.1234" :step="0.0001" :precision="4" />
    </label>
  </div>
</template>
