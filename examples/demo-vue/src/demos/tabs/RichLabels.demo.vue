<script setup lang="ts">
/**
 * `label` is rendered through the `#tab` slot — you can embed icons,
 * badges, status dots, or custom layouts. Keep the label width consistent
 * to avoid jitter when a badge count changes.
 */
import { SgTabs, SgBadge, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    inbox: 'Inbox',
    flagged: 'Flagged',
    archive: 'Archive',
    inboxBody: '12 new messages',
    flaggedBody: 'Items needing attention',
    archiveBody: 'Archived conversations',
  },
  ru: {
    inbox: 'Входящие',
    flagged: 'С флагом',
    archive: 'Архив',
    inboxBody: '12 новых сообщений',
    flaggedBody: 'Требуют внимания',
    archiveBody: 'Архивированные переписки',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = [
  { key: 'inbox', label: 'inbox', content: t.value.inboxBody },
  { key: 'flagged', label: 'flagged', content: t.value.flaggedBody },
  { key: 'archive', label: 'archive', content: t.value.archiveBody },
] satisfies TabItem[]
</script>

<template>
  <div style="width: 100%">
    <SgTabs :items="items">
      <template #tab="{ item }">
        <span v-if="item.key === 'inbox'" style="display: inline-flex; gap: 6px; align-items: center">
          {{ t.inbox }}
          <SgBadge :count="12" />
        </span>
        <span
          v-else-if="item.key === 'flagged'"
          style="display: inline-flex; gap: 6px; align-items: center"
        >
          <span
            aria-hidden="true"
            style="width: 8px; height: 8px; border-radius: 50%; background: var(--sg-color-warning)"
          />
          {{ t.flagged }}
        </span>
        <span v-else>{{ t.archive }}</span>
      </template>
    </SgTabs>
  </div>
</template>
