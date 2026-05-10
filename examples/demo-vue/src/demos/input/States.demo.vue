<script setup lang="ts">
/**
 * Disabled greys out the field and blocks input. Loading shows an
 * inline spinner on the right and also blocks edits — great for
 * async lookups (e.g. checking a coupon code).
 */
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    disabled: 'Disabled',
    locked: 'Locked value',
    validating: 'Validating…',
  },
  ru: {
    disabled: 'Отключён',
    locked: 'Зафиксированное значение',
    validating: 'Проверка…',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgInput disabled :placeholder="t.disabled" />
    <SgInput disabled :value="t.locked" />
    <SgInput loading :placeholder="t.validating" />
  </div>
</template>
