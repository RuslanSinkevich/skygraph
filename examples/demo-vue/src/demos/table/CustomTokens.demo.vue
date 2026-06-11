<script setup lang="ts">
/**
 * Override `--sg-table-*` tokens on a local wrapper to restyle ONE table
 * without touching the globals. The two tables below share the same columns
 * and data — only the CSS variables on the right-hand wrapper differ, so the
 * per-instance restyle is obvious side by side.
 *
 * The full list of table tokens lives in `styles/components/table.css`.
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', width: 160 },
  { key: 'age', title: 'Age', width: 70, align: 'center' },
  { key: 'salary', title: 'Salary', width: 120, align: 'right' },
]

// Custom per-instance tokens — intentionally bold so the difference reads.
const customTokens: Record<string, string> = {
  '--sg-table-header-bg': 'var(--sg-color-primary)',
  '--sg-table-header-color': 'var(--sg-color-white)',
  '--sg-table-row-hover-bg': 'var(--sg-color-primary-bg)',
  '--sg-table-border-color': 'var(--sg-color-primary-border)',
  '--sg-table-cell-padding': '12px 14px',
  '--sg-border-radius': '12px',
}

const captionStyle: Record<string, string | number> = {
  fontSize: '12px',
  fontWeight: 600,
  marginBottom: '8px',
  color: 'var(--sg-color-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.4px',
}

const gridStyle: Record<string, string> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
  gap: '24px',
  width: '100%',
}
</script>

<template>
  <div :style="gridStyle">
    <div>
      <div :style="captionStyle">Default tokens</div>
      <SgTable :columns="columns" :data="people" :page-size="5" bordered>
        <template #cell="{ column, value }">
          <template v-if="column.key === 'salary'">${{ Number(value).toLocaleString() }}</template>
          <template v-else>{{ value }}</template>
        </template>
      </SgTable>
    </div>
    <div :style="customTokens">
      <div :style="captionStyle">Custom --sg-table-* tokens</div>
      <SgTable :columns="columns" :data="people" :page-size="5" bordered>
        <template #cell="{ column, value }">
          <template v-if="column.key === 'salary'">${{ Number(value).toLocaleString() }}</template>
          <template v-else>{{ value }}</template>
        </template>
      </SgTable>
    </div>
  </div>
</template>
