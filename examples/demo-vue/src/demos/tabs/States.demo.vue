<script setup lang="ts">
/**
 * Per-item flags:
 * - `loading`   shows a spinner in the tab label and blocks activation
 * - `disabled`  greys out and blocks activation
 */
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    ready: 'Ready',
    details: 'Details',
    syncing: 'Syncing…',
    deprecated: 'Deprecated',
    readyBody: 'This tab works.',
    detailsBody: 'Another selectable tab — switching works.',
    syncingBody: 'Loading content…',
    deprecatedBody: 'Not selectable.',
  },
  ru: {
    ready: 'Готово',
    details: 'Детали',
    syncing: 'Синхронизация…',
    deprecated: 'Устаревшее',
    readyBody: 'Эта вкладка активна.',
    detailsBody: 'Ещё одна доступная вкладка — переключение работает.',
    syncingBody: 'Загрузка содержимого…',
    deprecatedBody: 'Недоступно для выбора.',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="width: 100%">
    <SgTabs
      :items="
        [
          { key: 'ready', label: t.ready, content: t.readyBody },
          { key: 'details', label: t.details, content: t.detailsBody },
          { key: 'syncing', label: t.syncing, loading: true, content: t.syncingBody },
          { key: 'deprecated', label: t.deprecated, disabled: true, content: t.deprecatedBody },
        ] as TabItem[]
      "
    />
  </div>
</template>
