<script setup lang="ts">
/**
 * `unstyled` keeps the semantics (radiogroup + native inputs) but drops
 * every SkyGraph class. Paint with your own CSS.
 */
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    first: 'First',
    second: 'Second',
    third: 'Third',
  },
  ru: {
    first: 'Первый',
    second: 'Второй',
    third: 'Третий',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgRadio
    unstyled
    default-value="first"
    :options="[
      { label: t.first, value: 'first' },
      { label: t.second, value: 'second' },
      { label: t.third, value: 'third' },
    ]"
  />
</template>
