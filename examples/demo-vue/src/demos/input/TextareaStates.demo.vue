<script setup lang="ts">
/**
 * Disabled mirrors the single-line Input. The Vue `SgTextarea` has no
 * `loading` prop yet (see `findings/T-Vue-Demo-Forms.md` →
 * `textarea-loading-not-in-vue`); this demo shows two disabled cases
 * to keep the example useful without mutating `packages/vue/**`.
 */
import { SgTextarea } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    locked: 'This textarea is read-only for now.',
    saved: 'Saved draft — open to edit.',
  },
  ru: {
    locked: 'Это поле сейчас только для чтения.',
    saved: 'Черновик сохранён — откройте для редактирования.',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <SgTextarea disabled :model-value="t.locked" :rows="2" />
    <SgTextarea disabled :model-value="t.saved" :rows="2" />
  </div>
</template>
