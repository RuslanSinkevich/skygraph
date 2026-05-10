<script setup lang="ts">
/**
 * `unstyled` strips all `sg-tag-*` classes — you get just a `<span>`
 * with the slot content and an optional close button. Style it with
 * your own classes or utility CSS.
 */
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Custom gradient',
  },
  ru: {
    label: 'Свой градиент',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 8px">
    <SgTag
      unstyled
      closable
      :style="{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 10px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #f472b6, #7c3aed)',
        color: '#fff',
        fontSize: '12px',
      }"
    >
      {{ t.label }}
    </SgTag>
  </div>
</template>
