<script setup lang="ts">
/**
 * Multi-line text field with v-model two-way binding.
 */
import { ref } from 'vue'
import { SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Type a note' },
  ru: { placeholder: 'Введите заметку' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('Hello\nworld')
</script>

<template>
  <SgTextarea v-model="value" :placeholder="t.placeholder" style="max-width: 420px" />
</template>
