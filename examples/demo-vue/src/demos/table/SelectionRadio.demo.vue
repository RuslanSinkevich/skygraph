<script setup lang="ts">
/**
 * Radio-mode selection — only one row may be selected at a time. Set
 * `rowSelection.type = 'radio'`.
 */
import { ref } from 'vue'
import { SgTable, type RowId } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(5)
const selected = ref<RowId[]>([])
</script>

<template>
  <div>
    <SgTable
      :columns="userColumns"
      :data="data"
      :row-selection="{
        type: 'radio',
        selectedKeys: selected,
        onChange: (keys: RowId[]) => (selected = keys),
      }"
    />
    <div style="margin-top: 8px; font-size: 12px; color: var(--sg-color-text-secondary)">
      Selected: <code>{{ selected[0] ?? 'none' }}</code>
    </div>
  </div>
</template>
