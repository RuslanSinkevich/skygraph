<script setup lang="ts">
import { SgConfigProvider, SgTable } from '@skygraph/vue'

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status' },
]

const data = [
  { id: '1', data: { name: 'Alice', role: 'Designer', status: 'Active' } },
  { id: '2', data: { name: 'Bob', role: 'Engineer', status: 'Away' } },
  { id: '3', data: { name: 'Carol', role: 'PM', status: 'Active' } },
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <p style="margin: 0; font-size: 13px; color: var(--sg-color-text-secondary)">
      Currently only <code>SgTable</code> reads <code>bordered</code> from the
      provider. Other components keep their own defaults.
    </p>
    <SgConfigProvider :bordered="true">
      <SgTable :columns="columns" :data="data" :show-pagination="false" />
    </SgConfigProvider>
  </div>
</template>
