<script setup lang="ts">
/**
 * Every variant reads the semantic primary palette. Override
 * `--sg-color-primary*` on a wrapper to rebrand a whole subtree
 * without touching the Button itself — Link and Primary both
 * follow along.
 */
import type { CSSProperties } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    primaryGreen: 'Primary (green)',
    default: 'Default',
    link: 'Link',
  },
  ru: {
    primaryGreen: 'Основная (зелёная)',
    default: 'Обычная',
    link: 'Ссылка',
  },
} as const

const t = useDemoStrings(STRINGS)

const greenScope = {
  '--sg-color-primary': '#16a34a',
  '--sg-color-primary-hover': '#15803d',
  '--sg-color-primary-active': '#14532d',
  '--sg-color-primary-bg': '#dcfce7',
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
} as CSSProperties
</script>

<template>
  <div :style="greenScope">
    <SgButton type="primary">{{ t.primaryGreen }}</SgButton>
    <SgButton>{{ t.default }}</SgButton>
    <SgButton type="link">{{ t.link }}</SgButton>
  </div>
</template>
