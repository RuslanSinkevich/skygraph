<script setup lang="ts">
/**
 * Virtualised message log with **dynamic** row heights — short / long messages
 * alternate, so the engine asks `rowHeight(row)` for each one and uses
 * `estimateRowHeight` for off-screen rows it has not measured yet.
 */
import { ref } from 'vue'
import { SgTable, SgAvatar, SgButton, type TableColumn } from '@skygraph/vue'
import { makeMessages } from './_data'

const data = ref(makeMessages(3000, 0))

const columns: TableColumn[] = [
  { key: 'id', title: '#', width: 80, align: 'right' },
  { key: 'author', title: 'Author', width: 200 },
  { key: 'preview', title: 'Preview' },
  { key: 'timestamp', title: 'Time', width: 150, align: 'right' },
]

function rowHeight(row: Record<string, unknown>): number {
  return (row as { long?: boolean }).long ? 120 : 48
}

const virtualCfg = {
  rowHeight,
  estimateRowHeight: () => 64,
  height: 600,
  overscan: 5,
}

function isLong(row: Record<string, unknown>): boolean {
  return !!(row as { long?: boolean }).long
}

function loadMore() {
  data.value = [...data.value, ...makeMessages(1000, data.value.length)]
}
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px">
      <SgButton size="small" type="primary" @click="loadMore">Load more (+1000)</SgButton>
      <span style="color: var(--sg-color-text-secondary); font-size: 13px">
        Total rows: <strong>{{ data.length }}</strong
        >. Mounted DOM stays ≈viewport + overscan thanks to virtualisation.
      </span>
    </div>
    <SgTable
      :columns="columns"
      :data="data"
      :show-pagination="false"
      bordered
      :virtual="virtualCfg"
    >
      <template #cell="{ column, row, value }">
        <template v-if="column.key === 'author'">
          <span style="display: inline-flex; align-items: center; gap: 8px">
            <SgAvatar :size="28" :aria-label="String(value)">{{
              String(value).slice(0, 1).toUpperCase()
            }}</SgAvatar>
            <span>{{ value }}</span>
          </span>
        </template>
        <template v-else-if="column.key === 'preview'">
          <span
            :style="{
              display: 'block',
              whiteSpace: 'normal',
              lineHeight: 1.45,
              color: isLong(row) ? 'var(--sg-color-text)' : 'var(--sg-color-text-secondary)',
            }"
            >{{ value }}</span
          >
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>
