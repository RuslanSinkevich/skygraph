<script setup lang="ts">
/**
 * `allow-half` lets users pick 0.5-step ratings. The half is detected
 * by pointer position on the star — clicking the left side commits
 * `N − 0.5`, the right side commits `N`.
 */
import { ref } from 'vue'
import { SgRate } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { valuePrefix: 'value:' },
  ru: { valuePrefix: 'значение:' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref(2.5)
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgRate v-model="value" allow-half />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.valuePrefix }} {{ value }}
    </span>
  </div>
</template>
