<script setup lang="ts">
/**
 * Tabs draw their underline + active label from `--sg-color-primary`.
 * Scope the token to one container to re-skin a single tab strip.
 */
import type { CSSProperties } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    amber: 'Amber',
    second: 'Second',
    third: 'Third',
    amberBody: 'Amber theme',
    sameBody: 'Same primary token',
    skinBody: 'Just re-skinned',
  },
  ru: {
    amber: 'Янтарь',
    second: 'Второй',
    third: 'Третий',
    amberBody: 'Янтарная тема',
    sameBody: 'Тот же primary',
    skinBody: 'Просто перекрашено',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = [
  { key: '1', label: t.value.amber, content: t.value.amberBody },
  { key: '2', label: t.value.second, content: t.value.sameBody },
  { key: '3', label: t.value.third, content: t.value.skinBody },
] satisfies TabItem[]

const amberScope = {
  '--sg-color-primary': '#f59e0b',
  '--sg-color-primary-hover': '#fbbf24',
} as CSSProperties

const violetScope = {
  '--sg-color-primary': '#8b5cf6',
  '--sg-color-primary-hover': '#a78bfa',
} as CSSProperties
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <div :style="amberScope">
      <SgTabs :items="items" />
    </div>
    <div :style="violetScope">
      <SgTabs :items="items" />
    </div>
  </div>
</template>
