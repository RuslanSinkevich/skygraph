<script setup lang="ts">
/**
 * Set `searchable` to render a debounced search box in the toolbar. It does
 * substring match across every visible column (stringified).
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180 },
  { key: 'email', title: 'Email', width: 220 },
  { key: 'city', title: 'City', width: 150 },
  { key: 'role', title: 'Role', width: 150 },
]
</script>

<template>
  <SgTable :columns="columns" :data="people" :page-size="6" searchable />
</template>
