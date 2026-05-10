<script setup lang="ts">
/**
 * `:bordered="false"` removes the outline while keeping the tinted
 * background — handy for dense lists where borders feel noisy.
 */
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'default',
    success: 'success',
    processing: 'processing',
    error: 'error',
  },
  ru: {
    default: 'обычный',
    success: 'успех',
    processing: 'в процессе',
    error: 'ошибка',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag :bordered="false">{{ t.default }}</SgTag>
    <SgTag :bordered="false" color="success">{{ t.success }}</SgTag>
    <SgTag :bordered="false" color="processing">{{ t.processing }}</SgTag>
    <SgTag :bordered="false" color="error">{{ t.error }}</SgTag>
  </div>
</template>
