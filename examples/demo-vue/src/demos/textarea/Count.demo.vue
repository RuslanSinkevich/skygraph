<script setup lang="ts">
/**
 * `showCount` + `maxLength` render a live "N / max" counter under
 * the field. `maxLength` is enforced in the input handler — users
 * can't type past it.
 */
import { ref } from 'vue'
import { SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Up to 40 characters' },
  ru: { placeholder: 'До 40 символов' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('Counted')
</script>

<template>
  <SgTextarea
    v-model="value"
    :max-length="40"
    show-count
    :placeholder="t.placeholder"
    style="max-width: 420px"
  />
</template>
