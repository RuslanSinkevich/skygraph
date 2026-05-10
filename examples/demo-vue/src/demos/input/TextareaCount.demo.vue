<script setup lang="ts">
/**
 * `showCount` + `maxLength` display a live "N / max" counter under
 * the field. `maxLength` is enforced in the change handler — the user
 * can't type past it.
 */
import { ref } from 'vue'
import { SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Tweet-length update (max 140)' },
  ru: { placeholder: 'Короткое обновление (макс. 140 символов)' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref('')
</script>

<template>
  <SgTextarea
    v-model="value"
    :rows="4"
    :max-length="140"
    show-count
    :placeholder="t.placeholder"
    style="max-width: 420px"
  />
</template>
