<script setup lang="ts">
/**
 * Dropdown has no component-specific tokens — scope the surface and
 * hover globals to restyle without editing the theme. The `danger`
 * row follows `--sg-color-error` + `--sg-color-error-bg`.
 */
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    button: 'Warm theme ▾',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    button: 'Тёплая тема ▾',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

const t = useDemoStrings(STRINGS)
const items = computed(() => makeActionItems(t.value))

const scoped = {
  '--sg-color-bg-elevated': '#fef3c7',
  '--sg-color-border-secondary': '#fcd34d',
  '--sg-color-bg-hover': '#fde68a',
  '--sg-border-radius-lg': '12px',
  '--sg-shadow-lg': '0 12px 30px rgba(202, 138, 4, 0.25)',
  '--sg-color-error': '#b91c1c',
  '--sg-color-error-bg': '#fecaca',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgDropdown :items="items" trigger="click">
      <SgButton>{{ t.button }}</SgButton>
    </SgDropdown>
  </div>
</template>
