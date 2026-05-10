<script setup lang="ts">
/**
 * Checkbox row selection — controlled via `rowSelection.selectedKeys`
 * and `onChange`. Header checkbox toggles all visible rows.
 */
import { ref } from 'vue'
import { SgTable, type RowId } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(6)
const selected = ref<RowId[]>([])
</script>

<template>
  <div>
    <SgTable
      :columns="userColumns"
      :data="data"
      :row-selection="{
        selectedKeys: selected,
        onChange: (keys: RowId[]) => (selected = keys),
      }"
    />
    <div style="margin-top: 8px; font-size: 12px; color: var(--sg-color-text-secondary)">
      Selected keys: <code>{{ selected }}</code>
    </div>
  </div>
</template>
