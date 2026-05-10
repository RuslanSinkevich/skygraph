<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class — you get the bare semantics
 * (combobox, columns, items) so you can paint from scratch with your
 * own design system.
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Unstyled' },
  ru: { placeholder: 'Без стилей' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="max-width: 340px">
    <SgCascader :options="regionOptions" unstyled :placeholder="t.placeholder" />
  </div>
</template>
