<script setup lang="ts">
/**
 * `expand-trigger="hover"` opens the next column when the cursor moves
 * over a row — handy for fast drill-down without extra clicks.
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Hover to expand' },
  ru: { placeholder: 'Наведите для раскрытия' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="max-width: 340px">
    <SgCascader :options="regionOptions" expand-trigger="hover" :placeholder="t.placeholder" />
  </div>
</template>
