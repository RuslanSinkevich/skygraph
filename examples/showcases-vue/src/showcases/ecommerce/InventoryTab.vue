<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgModal,
  SgForm,
  SgField,
  SgInputNumber,
  SgSelect,
  SgSegmented,
  SgProgress,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { products as initial, type Product } from './data'
import { Toolbar, useFilteredList, statusColor, useAppLocale } from '../_shared'
import { emojiForProduct } from './common'

type StockBucket = 'all' | 'out' | 'low' | 'healthy'

function bucketOf(p: Product): Exclude<StockBucket, 'all'> {
  if (p.stock <= 0) return 'out'
  if (p.stock < 10) return 'low'
  return 'healthy'
}

function bucketColor(b: Exclude<StockBucket, 'all'>): string {
  return b === 'out' ? 'error' : b === 'low' ? 'warning' : 'success'
}

const inv = useAppLocale('ecommerce').inventory
const products = ref<Product[]>(initial)
const search = ref('')
const bucket = ref<StockBucket>('all')
const restock = ref<Product | null>(null)

const buckets = computed(() => {
  const out = products.value.filter((p) => bucketOf(p) === 'out').length
  const low = products.value.filter((p) => bucketOf(p) === 'low').length
  const healthy = products.value.filter((p) => bucketOf(p) === 'healthy').length
  return { out, low, healthy, total: products.value.length }
})

const visible = computed(() =>
  products.value.filter((p) => bucket.value === 'all' || bucketOf(p) === bucket.value),
)

const filtered = useFilteredList(visible, search, ['name', 'sku', 'brand'])

const tableData = computed(() =>
  (filtered.value as Product[]).map((p) => ({
    id: p.id,
    data: p as unknown as Record<string, unknown>,
  })),
)

function statusLabel(status: string): string {
  return (inv.statusLabel as Record<string, string>)[status] ?? status
}

const columns: TableColumn[] = [
  { key: 'name', title: inv.columns.product, width: 280, sortable: true },
  { key: 'brand', title: inv.columns.brand, width: 120, sortable: true },
  { key: 'category', title: inv.columns.category, width: 130, sortable: true },
  { key: 'stock', title: inv.columns.onHand, width: 100, sortable: true, align: 'right' },
  { key: 'reserved', title: inv.columns.reserved, width: 100, sortable: true, align: 'right' },
  { key: 'available', title: inv.columns.available, width: 110, sortable: true, align: 'right' },
  { key: 'health', title: inv.columns.health, width: 130 },
  { key: 'status', title: inv.columns.status, width: 100 },
  { key: 'actions', title: '', width: 100 },
]

function findById(id: string): Product | undefined {
  return products.value.find((x) => x.id === id)
}

function onRestockFinish(values: Record<string, unknown>) {
  if (!restock.value) return
  const qty = Number(values.quantity ?? 0)
  products.value = products.value.map((p) =>
    p.id === restock.value!.id ? { ...p, stock: p.stock + qty, available: p.available + qty } : p,
  )
  notification.success(inv.restockedToast(qty, restock.value.name))
  restock.value = null
}
</script>

<template>
  <div class="inv-cards">
    <div class="inv-card">
      <div class="inv-card-label">{{ inv.cards.out }}</div>
      <div class="inv-card-value" style="color: var(--sg-color-error)">{{ buckets.out }}</div>
    </div>
    <div class="inv-card">
      <div class="inv-card-label">{{ inv.cards.low }}</div>
      <div class="inv-card-value" style="color: var(--sg-color-warning)">{{ buckets.low }}</div>
    </div>
    <div class="inv-card">
      <div class="inv-card-label">{{ inv.cards.healthy }}</div>
      <div class="inv-card-value" style="color: var(--sg-color-success)">
        {{ buckets.healthy }}
      </div>
    </div>
    <div class="inv-card">
      <div class="inv-card-label">{{ inv.cards.total }}</div>
      <div class="inv-card-value">{{ buckets.total }}</div>
    </div>
  </div>

  <Toolbar v-model:searchValue="search" :search-placeholder="inv.searchPlaceholder">
    <template #filters>
      <SgSegmented
        :value="bucket"
        :options="[
          { label: inv.bucketAll(buckets.total), value: 'all' },
          { label: inv.bucketOut(buckets.out), value: 'out' },
          { label: inv.bucketLow(buckets.low), value: 'low' },
          { label: inv.bucketHealthy(buckets.healthy), value: 'healthy' },
        ]"
        @change="(v: string | number) => (bucket = String(v) as StockBucket)"
      />
    </template>
    <template #actions>
      <SgButton size="small" @click="notification.info(inv.exportToast)">{{
        inv.exportBtn
      }}</SgButton>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="12" size="small" striped>
    <template #cell="{ column, row, id, value }">
      <template v-if="column.key === 'name'">
        <div style="display: flex; align-items: center; gap: 10px">
          <span style="font-size: 24px">{{
            emojiForProduct(String(value), String(row.category))
          }}</span>
          <div>
            <div style="font-weight: 500">{{ value }}</div>
            <div class="inv-sku">{{ row.sku }}</div>
          </div>
        </div>
      </template>
      <SgTag
        v-else-if="column.key === 'stock'"
        :color="bucketColor(bucketOf(row as unknown as Product))"
        >{{ Number(value) }}</SgTag
      >
      <template v-else-if="column.key === 'reserved'">{{
        Number(value).toLocaleString()
      }}</template>
      <strong v-else-if="column.key === 'available'">{{ Number(value).toLocaleString() }}</strong>
      <SgProgress
        v-else-if="column.key === 'health'"
        :percent="Math.min(100, Math.round((Number(row.stock) / 100) * 100))"
        size="small"
        :status="Number(row.stock) <= 0 ? 'error' : Number(row.stock) < 10 ? 'active' : 'success'"
        :show-info="false"
      />
      <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">{{
        statusLabel(String(value))
      }}</SgTag>
      <SgButton
        v-else-if="column.key === 'actions'"
        size="small"
        @click="
          () => {
            const p = findById(String(id))
            if (p) restock = p
          }
        "
        >{{ inv.restockBtn }}</SgButton
      >
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <SgModal
    :open="!!restock"
    :title="restock ? inv.restockTitle(restock.name) : ''"
    footer="none"
    :width="420"
    @close="restock = null"
  >
    <template v-if="restock">
      <SgForm :initial-values="{ quantity: 50, supplier: 'primary' }" @finish="onRestockFinish">
        <SgField name="quantity" :label="inv.quantity" :rules="[{ required: true }]">
          <template #default="{ value, onChange }">
            <SgInputNumber
              :value="value as number"
              :min="1"
              :max="1000"
              :style="{ width: '100%' }"
              @update:model-value="onChange"
            />
          </template>
        </SgField>
        <SgField name="supplier" :label="inv.supplier">
          <template #default="{ value, onChange }">
            <SgSelect
              :value="value as string"
              :options="[
                { label: inv.supplierOptions.primary, value: 'primary' },
                { label: inv.supplierOptions.backup, value: 'backup' },
                { label: inv.supplierOptions.local, value: 'local' },
              ]"
              @update:model-value="onChange"
            />
          </template>
        </SgField>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
          <SgButton @click="restock = null">{{ inv.cancel }}</SgButton>
          <SgButton type="primary" html-type="submit">{{ inv.orderRestock }}</SgButton>
        </div>
      </SgForm>
    </template>
  </SgModal>
</template>

<style scoped>
.inv-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.inv-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  padding: 12px 14px;
  background: var(--sg-color-bg-container);
}
.inv-card-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 4px;
}
.inv-card-value {
  font-size: 22px;
  font-weight: 600;
}
.inv-sku {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  font-family: monospace;
}
</style>
