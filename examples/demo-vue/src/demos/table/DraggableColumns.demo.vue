<script setup lang="ts">
/**
 * `draggable` enables column reordering via drag-and-drop on the header.
 * The component manages internal order; listen to `@column-order-change`
 * to persist it (URL, localStorage, server) and reflect the new order in
 * other UI. Mirrors React `DraggableColumns.demo.tsx`.
 */
import { ref } from 'vue'
import { SgTable, SgTag, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const order = ref<string[]>(['name', 'age', 'city', 'role', 'status'])

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true, width: 180 },
  { key: 'age', title: 'Age', sortable: true, width: 90, align: 'center' },
  { key: 'city', title: 'City', sortable: true, width: 140 },
  { key: 'role', title: 'Role', width: 140 },
  { key: 'status', title: 'Status', width: 120 },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <div
      style="
        padding: 8px 12px;
        border-radius: var(--sg-border-radius, 6px);
        background: var(--sg-color-bg-secondary);
        border: 1px solid var(--sg-color-border-secondary);
        font-size: 12px;
        font-family: var(--sg-font-mono, monospace);
        color: var(--sg-color-text-secondary);
      "
    >
      order: [{{ order.join(', ') }}]
    </div>
    <SgTable
      :columns="columns"
      :data="people"
      :page-size="6"
      draggable
      bordered
      @column-order-change="order = $event"
    >
      <template #cell="{ column, value }">
        <template v-if="column.key === 'status'">
          <SgTag :color="value === 'active' ? 'success' : 'default'">{{ String(value) }}</SgTag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>
