<script setup lang="ts">
/** Three sizes — small, middle (default), large. */
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    overview: 'Overview',
    members: 'Members',
    settings: 'Settings',
    first: 'First panel',
    second: 'Second panel',
    third: 'Third panel',
  },
  ru: {
    overview: 'Обзор',
    members: 'Участники',
    settings: 'Настройки',
    first: 'Первая панель',
    second: 'Вторая панель',
    third: 'Третья панель',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgTabs
      size="small"
      :items="[
        { key: '1', label: t.overview, content: t.first },
        { key: '2', label: t.members, content: t.second },
        { key: '3', label: t.settings, content: t.third },
      ] as TabItem[]"
    />
    <SgTabs
      :items="[
        { key: '1', label: t.overview, content: t.first },
        { key: '2', label: t.members, content: t.second },
        { key: '3', label: t.settings, content: t.third },
      ] as TabItem[]"
    />
    <SgTabs
      size="large"
      :items="[
        { key: '1', label: t.overview, content: t.first },
        { key: '2', label: t.members, content: t.second },
        { key: '3', label: t.settings, content: t.third },
      ] as TabItem[]"
    />
  </div>
</template>
