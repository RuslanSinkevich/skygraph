<script setup lang="ts">
/**
 * Controlled row selection. `selectedKeys` and `onChange` drive the
 * state; a header checkbox toggles all visible rows.
 */
import { ref } from 'vue'
import { SgTable, SgButton, type RowId, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const selected = ref<RowId[]>([])

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180 },
  { key: 'age', title: 'Age', width: 80, align: 'center' },
  { key: 'email', title: 'Email', width: 220 },
  { key: 'role', title: 'Role', width: 120 },
]
</script>

<template>
  <div style="width: 100%">
    <div style="margin-bottom: 8px; font-size: 13px; color: var(--sg-color-text-secondary)">
      Selected: {{ selected.length }}
      <SgButton
        v-if="selected.length > 0"
        size="small"
        type="text"
        style="margin-left: 8px"
        @click="selected = []"
      >
        Clear
      </SgButton>
    </div>
    <SgTable
      :columns="columns"
      :data="people"
      :page-size="6"
      :row-selection="{
        selectedKeys: selected,
        onChange: (keys: RowId[]) => (selected = keys),
      }"
    />
  </div>
</template>
