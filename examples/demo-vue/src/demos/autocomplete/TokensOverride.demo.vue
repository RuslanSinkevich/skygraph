<script setup lang="ts">
/**
 * AutoComplete reuses `--sg-input-*` for the field and global tokens
 * for the dropdown. Scope both on a wrapper to rebrand a single group.
 */
import type { CSSProperties } from 'vue'
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { placeholder: 'Scoped amber theme' },
  ru: { placeholder: 'Янтарная тема в скоупе' },
} as const

const t = useDemoStrings(STRINGS)

const scoped = {
  '--sg-input-border': '#f59e0b',
  '--sg-input-radius': '12px',
  '--sg-color-bg-elevated': '#fff7ed',
  '--sg-color-bg-hover': '#fed7aa',
  '--sg-color-text': '#7c2d12',
  maxWidth: '320px',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgAutoComplete :options="frameworkOptions" :placeholder="t.placeholder" />
  </div>
</template>
