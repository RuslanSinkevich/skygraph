<script setup lang="ts">
/**
 * The default slot accepts any markup — drop an icon + text combo
 * for a status pill. The gap between inline children is already 4px.
 */
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    verified: 'Verified',
    syncing: 'Syncing…',
    review: 'Review',
    failed: 'Failed',
  },
  ru: {
    verified: 'Подтверждено',
    syncing: 'Синхронизация…',
    review: 'На проверке',
    failed: 'Ошибка',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag color="success">
      <span aria-hidden="true">✓</span> {{ t.verified }}
    </SgTag>
    <SgTag color="processing">
      <span aria-hidden="true">⟳</span> {{ t.syncing }}
    </SgTag>
    <SgTag color="warning">
      <span aria-hidden="true">⚠</span> {{ t.review }}
    </SgTag>
    <SgTag color="error">
      <span aria-hidden="true">✕</span> {{ t.failed }}
    </SgTag>
  </div>
</template>
