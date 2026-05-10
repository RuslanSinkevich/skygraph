<script setup lang="ts">
/**
 * Three panels, no controlled state — Tabs remembers the active key on
 * its own and activates the first tab by default. Default `type` is
 * `card` (bordered classic tabs); use `type="line"` for the underline-only strip.
 */
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    overview: 'Overview',
    activity: 'Activity',
    settings: 'Settings',
    overviewBody: 'High-level summary of the resource.',
    activityBody: 'Recent events and audit log.',
    settingsBody: 'Configuration options.',
  },
  ru: {
    overview: 'Обзор',
    activity: 'Активность',
    settings: 'Настройки',
    overviewBody: 'Сводка по ресурсу верхнего уровня.',
    activityBody: 'Последние события и журнал.',
    settingsBody: 'Параметры конфигурации.',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="width: 100%">
    <SgTabs
      :items="[
        { key: 'overview', label: t.overview, content: t.overviewBody },
        { key: 'activity', label: t.activity, content: t.activityBody },
        { key: 'settings', label: t.settings, content: t.settingsBody },
      ] as TabItem[]"
    />
  </div>
</template>
