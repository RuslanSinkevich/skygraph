<script setup lang="ts">
/**
 * Derive the suggestion list from the current input — here we take the
 * part before "@" and prepend it to every known domain. This is the
 * pattern behind mail clients that suggest "me@gmail.com" as you type.
 */
import { computed, ref } from 'vue'
import { SgAutoComplete } from '@skygraph/vue'
import { emailDomains } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'name@…' },
  ru: { placeholder: 'имя@…' },
} as const

const t = useDemoStrings(STRINGS)
const email = ref('')

const options = computed(() => {
  const at = email.value.indexOf('@')
  const prefix = at === -1 ? email.value : email.value.slice(0, at)
  if (!prefix) return []
  return emailDomains.map((d) => ({
    value: `${prefix}@${d.value}`,
    label: `${prefix}@${d.label}`,
  }))
})
</script>

<template>
  <SgAutoComplete
    v-model="email"
    :options="options"
    :placeholder="t.placeholder"
    style="max-width: 320px"
  />
</template>
