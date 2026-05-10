<script setup lang="ts">
/**
 * `disabled` on the group blocks every option. Disable individual
 * options via `options[].disabled`. The Vue `SgRadio` has no `loading`
 * prop yet (see `findings/T-Vue-Demo-Forms.md` →
 * `radio-loading-not-in-vue`); the React-equivalent loading row is
 * dropped here.
 */
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    mediumSoldOut: 'Medium (sold out)',
    large: 'Large',
    yes: 'Yes',
    no: 'No',
  },
  ru: {
    small: 'Маленький',
    mediumSoldOut: 'Средний (нет в наличии)',
    large: 'Большой',
    yes: 'Да',
    no: 'Нет',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 12px">
    <SgRadio
      default-value="small"
      :options="[
        { label: t.small, value: 'small' },
        { label: t.mediumSoldOut, value: 'medium', disabled: true },
        { label: t.large, value: 'large' },
      ]"
    />
    <SgRadio
      disabled
      default-value="yes"
      :options="[
        { label: t.yes, value: 'yes' },
        { label: t.no, value: 'no' },
      ]"
    />
  </div>
</template>
