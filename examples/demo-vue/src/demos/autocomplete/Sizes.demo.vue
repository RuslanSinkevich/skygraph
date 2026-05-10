<script setup lang="ts">
/**
 * Three sizes mirror Input / Select. Line them up in the same row and
 * the heights, paddings and font sizes align.
 */
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'small',
    middle: 'middle (default)',
    large: 'large',
  },
  ru: {
    small: 'маленький',
    middle: 'средний (по умолчанию)',
    large: 'большой',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgAutoComplete size="small" :options="frameworkOptions" :placeholder="t.small" />
    <SgAutoComplete :options="frameworkOptions" :placeholder="t.middle" />
    <SgAutoComplete size="large" :options="frameworkOptions" :placeholder="t.large" />
  </div>
</template>
