<script setup lang="ts">
/**
 * `unstyled` drops all `sg-tooltip-*` classes. You keep the hover
 * behaviour, `role="tooltip"`, and `aria-describedby` wiring — you
 * own the painting on a wrapper class. (Vue's `title` is `string`,
 * so the tip itself renders as plain text — style the wrapper or
 * the bare `[role=tooltip]` selector.)
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tip: 'Fully custom look',
    button: 'Hover me',
  },
  ru: {
    tip: 'Полностью свой вид',
    button: 'Наведите курсор',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgTooltip unstyled :title="t.tip">
    <SgButton>{{ t.button }}</SgButton>
  </SgTooltip>
</template>
