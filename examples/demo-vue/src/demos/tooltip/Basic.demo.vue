<script setup lang="ts">
/**
 * The simplest Tooltip. Hover the child to reveal; leave to hide.
 * `aria-describedby` is wired up automatically so screen readers
 * read the tip once the child is focused.
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    title: 'Prompt text',
    button: 'Hover me',
  },
  ru: {
    title: 'Подсказка',
    button: 'Наведите курсор',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgTooltip :title="t.title">
    <SgButton>{{ t.button }}</SgButton>
  </SgTooltip>
</template>
