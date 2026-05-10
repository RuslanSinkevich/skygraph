<script setup lang="ts">
/**
 * `unstyled` drops the `sg-avatar-*` classes and the inline sizing —
 * you get a plain `<span>` with the `<img>` (or icon / text) inside.
 * Size and shape are up to your own CSS.
 */
import { SgAvatar } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    alt: 'Custom',
  },
  ru: {
    alt: 'Свой стиль',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px">
    <SgAvatar
      unstyled
      src="https://api.dicebear.com/7.x/miniavs/svg?seed=24"
      :alt="t.alt"
      :style="{
        display: 'inline-block',
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 6px 16px rgba(15, 23, 42, 0.2)',
        background: '#0f172a',
      }"
    />
  </div>
</template>
