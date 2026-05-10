<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class on both the input and the
 * dropdown. Bring your own CSS — semantics (role="combobox",
 * aria-expanded, aria-autocomplete="list") stay in place.
 */
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Headless combobox' },
  ru: { placeholder: 'Headless-комбобокс' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgAutoComplete
    unstyled
    :options="frameworkOptions"
    :placeholder="t.placeholder"
    style="max-width: 320px"
  />
</template>
