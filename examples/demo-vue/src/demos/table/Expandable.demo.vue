<script setup lang="ts">
/**
 * Each row can be expanded to reveal arbitrary details. `expandable.expandedRowRender`
 * receives the row data and returns any VNode; in Vue we forward the rendered
 * content through the `#expandedRow` slot for full control.
 */
import { h } from 'vue'
import { SgTable, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180 },
  { key: 'age', title: 'Age', width: 80, align: 'center' },
  { key: 'city', title: 'City', width: 120 },
  { key: 'role', title: 'Role', width: 120 },
]

const expandable = {
  expandedRowRender: () => h('div'),
}
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="6" :expandable="expandable">
    <template #expandedRow="{ row }">
      <div style="padding: 4px 0">
        <strong>{{ row.name }}</strong>
        works as {{ row.role }} in {{ row.city }}. Email: {{ row.email ?? 'N/A' }}. Salary: ${{
          row.salary ?? 'N/A'
        }}.
      </div>
    </template>
  </SgTable>
</template>
