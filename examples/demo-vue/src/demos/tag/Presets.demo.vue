<script setup lang="ts">
/**
 * Five semantic presets map directly to palette tokens:
 * `success`, `error`, `warning`, `processing`, and `default`. These
 * are the *only* strings that resolve to tokens — anything else is
 * treated as a raw CSS colour (see CustomColor demo).
 */
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'default',
    success: 'success',
    processing: 'processing',
    warning: 'warning',
    error: 'error',
  },
  ru: {
    default: 'обычный',
    success: 'успех',
    processing: 'в процессе',
    warning: 'предупреждение',
    error: 'ошибка',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag color="default">{{ t.default }}</SgTag>
    <SgTag color="success">{{ t.success }}</SgTag>
    <SgTag color="processing">{{ t.processing }}</SgTag>
    <SgTag color="warning">{{ t.warning }}</SgTag>
    <SgTag color="error">{{ t.error }}</SgTag>
  </div>
</template>
