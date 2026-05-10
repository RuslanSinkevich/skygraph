<script setup lang="ts">
/**
 * Underline-only tab strip — the previous default look. Use `type="line"`
 * when you want a flatter chrome (e.g. dense toolbars or nested navigation).
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
      type="line"
      :items="[
        { key: 'overview', label: t.overview, content: t.overviewBody },
        { key: 'activity', label: t.activity, content: t.activityBody },
        { key: 'settings', label: t.settings, content: t.settingsBody },
      ] as TabItem[]"
    />
  </div>
</template>
