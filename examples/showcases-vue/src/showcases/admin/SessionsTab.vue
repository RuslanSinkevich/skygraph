<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgPopconfirm,
  SgAvatar,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { activeSessions as initial, type ActiveSession } from './apiKeysData'
import { Toolbar, useFilteredList, initials, colorFromString, useAppLocale } from '../_shared'

const DEVICE_ICONS: Record<string, string> = {
  MacBook: '💻',
  Windows: '🖥️',
  iPad: '📱',
  iPhone: '📱',
  Android: '📱',
  Linux: '🐧',
}

function deviceIcon(device: string): string {
  for (const [key, icon] of Object.entries(DEVICE_ICONS)) {
    if (device.includes(key)) return icon
  }
  return '🌐'
}

const ses = useAppLocale('admin').sessions
const sessions = ref<ActiveSession[]>(initial)
const search = ref('')

const filtered = useFilteredList(sessions, search, ['userName', 'ip', 'location', 'browser'])
const tableData = computed(() =>
  (filtered.value as ActiveSession[]).map((s) => ({
    id: s.id,
    data: s as unknown as Record<string, unknown>,
  })),
)

const columns: TableColumn[] = [
  { key: 'userName', title: ses.columns.user, width: 200, sortable: true },
  { key: 'device', title: ses.columns.device, width: 200 },
  { key: 'location', title: ses.columns.location, width: 140 },
  { key: 'ip', title: ses.columns.ip, width: 130 },
  { key: 'createdAt', title: ses.columns.started, width: 150, sortable: true },
  { key: 'lastActive', title: ses.columns.lastActive, width: 150, sortable: true },
  { key: 'current', title: '', width: 80 },
  { key: 'actions', title: '', width: 110 },
]

function terminate(id: string) {
  sessions.value = sessions.value.filter((s) => s.id !== id)
  notification.success(ses.terminatedToast(id))
}

function terminateAll() {
  sessions.value = sessions.value.filter((s) => s.current)
  notification.warning(ses.terminateAllToast)
}
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="ses.searchPlaceholder">
    <template #actions>
      <SgPopconfirm :title="ses.terminateAllConfirm" @confirm="terminateAll">
        <SgButton danger>{{ ses.terminateAllBtn }}</SgButton>
      </SgPopconfirm>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="12" size="small" striped>
    <template #cell="{ column, row, value }">
      <template v-if="column.key === 'userName'">
        <div style="display: flex; align-items: center; gap: 8px">
          <SgAvatar size="small" :style="{ background: colorFromString(String(value)) }">{{
            initials(String(value))
          }}</SgAvatar>
          <span style="font-weight: 500">{{ value }}</span>
        </div>
      </template>
      <span v-else-if="column.key === 'device'">
        {{ deviceIcon(String(value)) }} {{ value }} ·
        <span style="color: var(--sg-color-text-secondary)">{{ row.browser }}</span>
      </span>
      <span v-else-if="column.key === 'ip'" style="font-family: monospace; font-size: 12px">{{
        value
      }}</span>
      <span v-else-if="column.key === 'lastActive'" style="color: var(--sg-color-text-secondary)">{{
        value
      }}</span>
      <SgTag v-else-if="column.key === 'current' && value" color="success">{{
        ses.currentTag
      }}</SgTag>
      <div v-else-if="column.key === 'actions'">
        <SgButton v-if="row.current" size="small" disabled>{{ ses.youBtn }}</SgButton>
        <SgPopconfirm
          v-else
          :title="ses.terminateConfirm(String(row.userName))"
          @confirm="terminate(String(row.id))"
        >
          <SgButton size="small" danger>{{ ses.terminate }}</SgButton>
        </SgPopconfirm>
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
