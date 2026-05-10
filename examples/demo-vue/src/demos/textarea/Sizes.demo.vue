<script setup lang="ts">
/**
 * Three sizes share their token base with `<SgInput>` — small / middle / large
 * line up in mixed-control rows.
 */
import { SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { small: 'Small', middle: 'Middle', large: 'Large' },
  ru: { small: 'Маленький', middle: 'Средний', large: 'Большой' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 420px">
    <SgTextarea size="small" :rows="2" :placeholder="t.small" />
    <SgTextarea size="middle" :rows="2" :placeholder="t.middle" />
    <SgTextarea size="large" :rows="2" :placeholder="t.large" />
  </div>
</template>
