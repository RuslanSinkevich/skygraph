<script setup lang="ts">
/**
 * Tag has no component-specific tokens — override the globals it
 * composes. Bumping `--sg-border-radius-sm` gives you rounded pills;
 * shifting `--sg-color-*-bg` and `--sg-color-*` rebrands the presets.
 */
import type { CSSProperties } from 'vue'
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    default: 'default',
    success: 'success',
    warning: 'warning',
    error: 'error',
    processing: 'processing',
  },
  ru: {
    default: 'обычный',
    success: 'успех',
    warning: 'предупреждение',
    error: 'ошибка',
    processing: 'в процессе',
  },
} as const

const t = useDemoStrings(STRINGS)

const scoped: CSSProperties = {
  ['--sg-border-radius-sm' as never]: '999px',
  ['--sg-padding-sm' as never]: '10px',
  ['--sg-color-success' as never]: '#16a34a',
  ['--sg-color-success-bg' as never]: '#dcfce7',
  ['--sg-color-warning' as never]: '#d97706',
  ['--sg-color-warning-bg' as never]: '#fef3c7',
  ['--sg-color-error' as never]: '#dc2626',
  ['--sg-color-error-bg' as never]: '#fee2e2',
  ['--sg-color-primary' as never]: '#7c3aed',
  ['--sg-color-primary-bg' as never]: '#ede9fe',
}
</script>

<template>
  <div :style="{ ...scoped, display: 'flex', gap: '8px', flexWrap: 'wrap' }">
    <SgTag>{{ t.default }}</SgTag>
    <SgTag color="success">{{ t.success }}</SgTag>
    <SgTag color="warning">{{ t.warning }}</SgTag>
    <SgTag color="error">{{ t.error }}</SgTag>
    <SgTag color="processing">{{ t.processing }}</SgTag>
  </div>
</template>
