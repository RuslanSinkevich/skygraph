<script setup lang="ts">
/**
 * "Stock terminal" look built purely from public props:
 *   - `classNames.root` enables tabular-num font + denser padding
 *   - ticker cell is a monospaced chip via `#cell` slot
 *   - delta / percent cells get green or red class based on sign
 *   - numbers are right-aligned and formatted with Intl.NumberFormat
 *
 * No CSS overrides on internal selectors — everything is slots + classNames.
 */
import { SgTable, type TableColumn } from '@skygraph/vue'
import { portfolio } from './_data'
import './styles.css'

const priceFmt = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const volumeFmt = new Intl.NumberFormat('en-US', { notation: 'compact' })

const columns: TableColumn[] = [
  { key: 'ticker', title: 'Ticker', width: 110 },
  { key: 'name', title: 'Company', width: 200 },
  { key: 'price', title: 'Last', width: 100, align: 'right', sortable: true },
  { key: 'delta', title: 'Change', width: 110, align: 'right', sortable: true },
  { key: 'pct', title: '%', width: 100, align: 'right', sortable: true },
  { key: 'volume', title: 'Volume', width: 110, align: 'right', sortable: true },
]
</script>

<template>
  <SgTable
    :columns="columns"
    :data="portfolio"
    :show-pagination="false"
    :class-names="{ root: 'demo-finance-root' }"
  >
    <template #cell="{ column, value }">
      <template v-if="column.key === 'ticker'">
        <span class="demo-ticker">{{ String(value) }}</span>
      </template>
      <template v-else-if="column.key === 'price'">
        {{ priceFmt.format(Number(value)) }}
      </template>
      <template v-else-if="column.key === 'delta'">
        <span :class="Number(value) >= 0 ? 'demo-delta-up' : 'demo-delta-down'">
          {{ priceFmt.format(Math.abs(Number(value))) }}
        </span>
      </template>
      <template v-else-if="column.key === 'pct'">
        <span :class="Number(value) >= 0 ? 'demo-delta-up' : 'demo-delta-down'">
          {{ priceFmt.format(Math.abs(Number(value))) }}%
        </span>
      </template>
      <template v-else-if="column.key === 'volume'">
        {{ volumeFmt.format(Number(value)) }}
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
