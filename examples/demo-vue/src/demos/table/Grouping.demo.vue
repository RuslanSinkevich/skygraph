<script setup lang="ts">
/**
 * Sales rows aggregated via per-column `aggregate` config. Vue's SgTable
 * exposes the same aggregate API as React's (`'sum' | 'avg' | 'count' |
 * 'min' | 'max'` or a custom reducer); enable the table-level footer to see
 * the running totals at the bottom of the dataset.
 *
 * Full `groupBy` rendering is on the roadmap; in the meantime the footer
 * row + sortable columns let you slice the same data without managing the
 * group state by hand.
 */
import { computed } from 'vue'
import { SgTable, type TableColumn } from '@skygraph/vue'
import { makeSales } from './_data'

const data = computed(() => makeSales(120))

const columns: TableColumn[] = [
  { key: 'region', title: 'Region', width: 120, sortable: true },
  { key: 'product', title: 'Product', width: 150, sortable: true },
  { key: 'salesperson', title: 'Salesperson', width: 180, sortable: true },
  { key: 'amount', title: 'Amount', width: 130, align: 'right', sortable: true, aggregate: 'sum' },
  { key: 'units', title: 'Units', width: 100, align: 'right', sortable: true, aggregate: 'sum' },
  {
    key: 'date',
    title: 'Last sale',
    width: 130,
    sortable: true,
    aggregate: (values: unknown[]) => {
      let max = ''
      for (const v of values) {
        const s = String(v ?? '')
        if (s > max) max = s
      }
      return max || '—'
    },
  },
]
</script>

<template>
  <SgTable
    :columns="columns"
    :data="data"
    :show-pagination="false"
    footer
    bordered
    sticky
    :scroll="{ y: 480 }"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'amount'">${{ Number(value).toFixed(2) }}</template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
