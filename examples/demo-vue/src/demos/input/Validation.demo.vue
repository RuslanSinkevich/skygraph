<script setup lang="ts">
/**
 * `aria-invalid` flips the visual error state *and* tells assistive
 * tech. No separate `status` prop is needed — the styling follows the
 * ARIA attribute.
 */
import { computed, ref } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'email',
    error: 'Please enter a valid email.',
  },
  ru: {
    placeholder: 'email',
    error: 'Введите корректный email.',
  },
} as const

const t = useDemoStrings(STRINGS)
const email = ref('not-an-email')
const invalid = computed(() => !email.value.includes('@'))
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgInput
      v-model="email"
      :aria-invalid="invalid || undefined"
      aria-required
      :placeholder="t.placeholder"
    />
    <span v-if="invalid" style="font-size: 12px; color: var(--sg-color-error)">
      {{ t.error }}
    </span>
  </div>
</template>
