<script setup lang="ts">
/**
 * `unstyled` strips every SkyGraph class — you get a bare native
 * input/textarea with the semantics preserved. Drop in your own CSS
 * (or Tailwind classes via `class`) on the parent / element.
 */
import { SgInput, SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    inputPlaceholder: 'Native input + custom class',
    textareaPlaceholder: 'Native textarea + custom class',
  },
  ru: {
    inputPlaceholder: 'Нативный input + кастомный класс',
    textareaPlaceholder: 'Нативный textarea + кастомный класс',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 360px">
    <SgInput unstyled class="demo-unstyled-input" :placeholder="t.inputPlaceholder" />
    <SgTextarea
      unstyled
      class="demo-unstyled-input"
      :placeholder="t.textareaPlaceholder"
      :rows="3"
    />
  </div>
</template>
