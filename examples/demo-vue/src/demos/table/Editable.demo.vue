<script setup lang="ts">
/**
 * Double-click a cell marked `editable` to start editing. Enter commits,
 * Escape cancels. `@cellEdit` fires with (rowId, columnKey, newValue).
 */
import { ref } from 'vue'
import { SgTable, type TableColumn, type RowId } from '@skygraph/vue'
import { people } from './_data'

const rows = ref(people.slice(0, 5).map((r) => ({ id: r.id, data: { ...r.data } })))

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180, editable: true },
  { key: 'age', title: 'Age', width: 80, align: 'center', editable: true },
  { key: 'city', title: 'City', width: 150, editable: true },
  { key: 'role', title: 'Role', width: 150 },
]

function onCellEdit(id: RowId, col: string, val: unknown) {
  rows.value = rows.value.map((r) => (r.id === id ? { ...r, data: { ...r.data, [col]: val } } : r))
}
</script>

<template>
  <SgTable :columns="columns" :data="rows" :show-pagination="false" :on-cell-edit="onCellEdit" />
</template>
