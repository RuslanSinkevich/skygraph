<script setup lang="ts">
/**
 * Controlled single-line text input. v-model gives the raw string —
 * format / strip it before storing if needed.
 */
import { ref } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Type something…',
    empty: 'empty',
    valuePrefix: 'value:',
  },
  ru: {
    placeholder: 'Введите что-нибудь…',
    empty: 'пусто',
    valuePrefix: 'значение:',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('')
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgInput v-model="value" :placeholder="t.placeholder" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ value.length ? `${t.valuePrefix} "${value}"` : t.empty }}
    </span>
  </div>
</template>
