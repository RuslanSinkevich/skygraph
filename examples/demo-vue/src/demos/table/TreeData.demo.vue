<script setup lang="ts">
/**
 * Pass `tree` to enable hierarchical rendering from nested `data.children`.
 * Expand arrows appear in the first column automatically.
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { treeData } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Organization Unit', width: 280 },
  { key: 'head', title: 'Head', width: 220 },
  { key: 'employees', title: 'People', width: 90, align: 'center' },
  { key: 'budget', title: 'Budget', width: 140, align: 'right' },
]
</script>

<template>
  <SgTable
    :columns="columns"
    :data="treeData"
    :tree="{ defaultExpandAllRows: true, indentSize: 22 }"
    :show-pagination="false"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'budget'">${{ Number(value).toLocaleString() }}</template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
