<script setup lang="ts">
/**
 * `disabled` locks the input. Vue `SgAutoComplete` has no `loading`
 * prop yet, so the loading row is dropped.
 */
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { disabled: 'Disabled', alsoDisabled: 'Disabled (with prefilled value)' },
  ru: { disabled: 'Отключено', alsoDisabled: 'Отключено (со значением)' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgAutoComplete disabled :options="frameworkOptions" :placeholder="t.disabled" />
    <SgAutoComplete
      disabled
      :options="frameworkOptions"
      default-value="vue"
      :placeholder="t.alsoDisabled"
    />
  </div>
</template>
