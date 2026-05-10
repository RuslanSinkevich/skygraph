<script setup lang="ts">
/**
 * Disabled blocks all interaction. The Vue `SgInputNumber` has no
 * `loading` prop yet (see `findings/T-Vue-Demo-Forms.md` →
 * `inputnumber-loading-not-in-vue`); only the disabled variants are
 * shown to keep parity with the available API.
 */
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'no value' },
  ru: { placeholder: 'нет значения' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="display: flex; gap: 16px; align-items: center">
      <SgInputNumber disabled :default-value="5" />
      <SgInputNumber disabled :placeholder="t.placeholder" />
    </div>
  </div>
</template>
