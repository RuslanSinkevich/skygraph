<script setup lang="ts">
/**
 * The `#filterDropdown` slot replaces the entire per-column filter popover
 * with your own UI. The slot receives helpers to read/write the active
 * selection, confirm it, clear it, or close without applying.
 */
import { SgTable, SgInput, SgButton, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    width: 200,
    onFilter: (value, row) => String(row.name).toLowerCase().includes(String(value).toLowerCase()),
  },
  { key: 'age', title: 'Age', width: 80, align: 'center' },
  { key: 'city', title: 'City', width: 150 },
  { key: 'role', title: 'Role', width: 120 },
]
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="6">
    <template #filterDropdown="{ column, selectedKeys, setSelectedKeys, confirm, clearFilters }">
      <div
        v-if="column.key === 'name'"
        style="padding: 8px; display: flex; flex-direction: column; gap: 8px; min-width: 200px"
        @click.stop
      >
        <SgInput
          placeholder="Search name..."
          size="small"
          :model-value="(selectedKeys[0] as string) ?? ''"
          @update:model-value="(v: string) => setSelectedKeys(v ? [v] : [])"
        />
        <div style="display: flex; gap: 4px; justify-content: space-between">
          <SgButton size="small" @click="clearFilters">Reset</SgButton>
          <SgButton size="small" type="primary" @click="confirm">Search</SgButton>
        </div>
      </div>
    </template>
  </SgTable>
</template>
