<script setup lang="ts">
/**
 * Checkbox has no component-specific tokens — the native `accent-color`
 * is pinned to `--sg-color-primary`, and label text inherits global text
 * tokens. Scope the globals to re-skin a single group.
 */
import type { CSSProperties } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    magenta: 'Magenta brand',
    indeterminate: 'Indeterminate',
    smallMagenta: 'Small + magenta',
  },
  ru: {
    magenta: 'Бренд Magenta',
    indeterminate: 'Промежуточное',
    smallMagenta: 'Маленький + magenta',
  },
} as const

const t = useDemoStrings(STRINGS)

const scoped = {
  '--sg-color-primary': 'var(--sg-magenta-6)',
  '--sg-color-text': 'var(--sg-magenta-9, #6b0e4a)',
  '--sg-font-size': '13px',
  display: 'grid',
  gap: '6px',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgCheckbox default-checked>{{ t.magenta }}</SgCheckbox>
    <SgCheckbox indeterminate>{{ t.indeterminate }}</SgCheckbox>
    <SgCheckbox>{{ t.smallMagenta }}</SgCheckbox>
  </div>
</template>
