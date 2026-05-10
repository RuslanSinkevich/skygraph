<script setup lang="ts">
/**
 * Default Tag renders as a neutral pill using `--sg-color-bg-secondary`
 * for the background and `--sg-color-border` for the edge.
 */
import { SgTag } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tag1: 'Tag 1',
    tag2: 'Tag 2',
    neutral: 'Neutral label',
  },
  ru: {
    tag1: 'Тег 1',
    tag2: 'Тег 2',
    neutral: 'Нейтральная метка',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag>{{ t.tag1 }}</SgTag>
    <SgTag>{{ t.tag2 }}</SgTag>
    <SgTag>{{ t.neutral }}</SgTag>
  </div>
</template>
