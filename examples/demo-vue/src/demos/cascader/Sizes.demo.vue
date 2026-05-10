<script setup lang="ts">
/**
 * Matches Input/Select sizing. `small` and `large` simply override
 * `--sg-height-*` + `--sg-font-size-*` so the Cascader stays aligned
 * with the rest of the form row.
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    middle: 'Middle (default)',
    large: 'Large',
  },
  ru: {
    small: 'Маленький',
    middle: 'Средний (по умолчанию)',
    large: 'Большой',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 340px">
    <SgCascader size="small" :options="regionOptions" :placeholder="t.small" />
    <SgCascader :options="regionOptions" :placeholder="t.middle" />
    <SgCascader size="large" :options="regionOptions" :placeholder="t.large" />
  </div>
</template>
