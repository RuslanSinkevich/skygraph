<script setup lang="ts">
/**
 * A text field backed by a list of suggestions. The typed value is the
 * source of truth — picking a row writes its `value` into the input.
 * Filtering is case-insensitive and done by label.
 */
import { ref } from 'vue'
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Type to filter…',
    currentPrefix: 'Current:',
    hint: 'Start typing to see suggestions.',
  },
  ru: {
    placeholder: 'Начните вводить для фильтра…',
    currentPrefix: 'Сейчас:',
    hint: 'Начните вводить, чтобы увидеть подсказки.',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('')
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgAutoComplete v-model="value" :options="frameworkOptions" :placeholder="t.placeholder" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ value ? `${t.currentPrefix} "${value}"` : t.hint }}
    </span>
  </div>
</template>
