<script setup lang="ts">
/**
 * `loading` shows an overlay and disables interactions while true. Toggle
 * the button to see the spinner appear and disappear.
 */
import { ref } from 'vue'
import { SgTable, SgButton, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const loading = ref(true)
const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 180 },
  { key: 'age', title: 'Age', width: 80, align: 'center' },
  { key: 'city', title: 'City', width: 150 },
  { key: 'role', title: 'Role', width: 120 },
]
</script>

<template>
  <div style="width: 100%">
    <div style="margin-bottom: 8px">
      <SgButton size="small" @click="loading = !loading">
        {{ loading ? 'Stop loading' : 'Start loading' }}
      </SgButton>
    </div>
    <SgTable
      :columns="columns"
      :data="people.slice(0, 4)"
      :loading="loading"
      :show-pagination="false"
    />
  </div>
</template>
