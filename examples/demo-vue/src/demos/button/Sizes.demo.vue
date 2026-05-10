<script setup lang="ts">
/**
 * Three sizes scale height, padding and font size in one step.
 * Prefer `ConfigProvider` to broadcast the same size to a subtree
 * instead of threading `size` through every form control.
 */
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    smallPrimary: 'Small primary',
    middle: 'Middle',
    middlePrimary: 'Middle primary',
    large: 'Large',
    largePrimary: 'Large primary',
  },
  ru: {
    small: 'Маленькая',
    smallPrimary: 'Маленькая основная',
    middle: 'Средняя',
    middlePrimary: 'Средняя основная',
    large: 'Большая',
    largePrimary: 'Большая основная',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center">
    <SgButton size="small">{{ t.small }}</SgButton>
    <SgButton type="primary" size="small">{{ t.smallPrimary }}</SgButton>
    <SgButton>{{ t.middle }}</SgButton>
    <SgButton type="primary">{{ t.middlePrimary }}</SgButton>
    <SgButton size="large">{{ t.large }}</SgButton>
    <SgButton type="primary" size="large">{{ t.largePrimary }}</SgButton>
  </div>
</template>
