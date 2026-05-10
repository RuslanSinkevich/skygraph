<script setup lang="ts">
/**
 * Use the `#cell` scoped slot to render rich content — colored
 * badges, inline progress bars, action buttons. Slot context exposes
 * `column`, `row`, `id`, and the precomputed `value`.
 */
import { computed } from 'vue'
import { SgTable, type TableColumn } from '@skygraph/vue'
import { makeUserRows } from './_data'

const data = makeUserRows(6)

const columns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'team', title: 'Team' },
  { key: 'status', title: 'Status', align: 'center' },
  { key: 'progress', title: 'Progress', align: 'left' },
])

function statusColor(s: string): string {
  if (s === 'active') return 'var(--sg-color-success, #16a34a)'
  if (s === 'paused') return 'var(--sg-color-warning, #d97706)'
  return 'var(--sg-color-text-secondary)'
}
</script>

<template>
  <SgTable :columns="columns" :data="data">
    <template #cell="{ column, value }">
      <template v-if="column.key === 'status'">
        <span
          :style="{
            display: 'inline-block',
            padding: '1px 8px',
            borderRadius: '999px',
            fontSize: '11px',
            color: '#fff',
            background: statusColor(String(value)),
          }"
        >{{ value }}</span>
      </template>
      <template v-else-if="column.key === 'progress'">
        <div
          style="
            position: relative;
            height: 6px;
            border-radius: 999px;
            background: var(--sg-color-border);
            overflow: hidden;
          "
        >
          <div
            :style="{
              position: 'absolute',
              inset: 0,
              width: `${Number(value)}%`,
              background: 'var(--sg-color-primary, #2563eb)',
            }"
          />
        </div>
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
