<script setup lang="ts">
/**
 * `type` maps directly to native HTML input types — pick the right one
 * for keyboard, autofill and password managers to do their jobs.
 */
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    text: 'Plain text',
    email: 'name@example.com',
    password: '••••••••',
    number: '42',
  },
  ru: {
    text: 'Обычный текст',
    email: 'имя@example.com',
    password: '••••••••',
    number: '42',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgInput type="text" :placeholder="t.text" />
    <SgInput type="email" :placeholder="t.email" />
    <SgInput type="password" :placeholder="t.password" />
    <SgInput type="number" :placeholder="t.number" />
  </div>
</template>
