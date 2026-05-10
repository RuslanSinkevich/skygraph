<script setup lang="ts">
/**
 * Multiline variant. `rows` sets the initial height; users can still
 * drag the corner to resize because the textarea uses native
 * `resize: vertical`.
 */
import { ref } from 'vue'
import { SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Leave a comment…' },
  ru: { placeholder: 'Оставьте комментарий…' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('')
</script>

<template>
  <SgTextarea
    v-model="value"
    :rows="3"
    :placeholder="t.placeholder"
    style="max-width: 420px"
  />
</template>
