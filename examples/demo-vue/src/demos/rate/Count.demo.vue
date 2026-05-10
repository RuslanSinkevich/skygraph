<script setup lang="ts">
/**
 * `count` picks the number of symbols. Three for "quick sentiment",
 * ten for "NPS-ish" questions.
 */
import { SgRate } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    threeStars: '3 stars (bad / ok / great)',
    tenStars: '10 stars (NPS-like)',
  },
  ru: {
    threeStars: '3 звезды (плохо / ок / отлично)',
    tenStars: '10 звёзд (в духе NPS)',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: grid; gap: 16px">
    <div style="display: flex; gap: 12px; align-items: center">
      <SgRate :count="3" :default-value="2" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.threeStars }}</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: center">
      <SgRate :count="10" :default-value="7" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">{{ t.tenStars }}</span>
    </div>
  </div>
</template>
