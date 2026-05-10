<script setup lang="ts">
/**
 * `format` controls both display and parsing. Tokens: `YYYY`, `MM`, `DD`,
 * `HH`, `mm`, `ss`. Anything outside the tokens is a literal separator.
 */
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    a: 'YYYY-MM-DD',
    b: 'DD.MM.YYYY',
    c: 'YYYY/MM/DD',
  },
  ru: {
    a: 'YYYY-MM-DD',
    b: 'DD.MM.YYYY',
    c: 'YYYY/MM/DD',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgDatePicker :placeholder="t.a" allow-clear />
    <SgDatePicker format="DD.MM.YYYY" :placeholder="t.b" allow-clear />
    <SgDatePicker format="YYYY/MM/DD" :placeholder="t.c" allow-clear />
  </div>
</template>
