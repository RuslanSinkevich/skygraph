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
    syncing: 'Syncing…',
    deprecated: 'Deprecated',
    readyBody: 'This tab works.',
    syncingBody: 'Loading content…',
    deprecatedBody: 'Not selectable.',
  },
  ru: {
    ready: 'Готово',
    syncing: 'Синхронизация…',
    deprecated: 'Устаревшее',
    readyBody: 'Эта вкладка активна.',
    syncingBody: 'Загрузка содержимого…',
    deprecatedBody: 'Недоступно для выбора.',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="width: 100%">
    <SgTabs
      :items="[
        { key: 'ready', label: t.ready, content: t.readyBody },
        { key: 'syncing', label: t.syncing, loading: true, content: t.syncingBody },
        { key: 'deprecated', label: t.deprecated, disabled: true, content: t.deprecatedBody },
      ] as TabItem[]"
    />
  </div>
</template>
