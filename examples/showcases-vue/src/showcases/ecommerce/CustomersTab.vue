<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgAvatar,
  SgButton,
  SgDrawer,
  SgDescriptions,
  SgBadge,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { customerList, customerToRow, orders, type Customer } from './data'
import {
  Toolbar,
  useFilteredList,
  money,
  statusColor,
  initials,
  colorFromString,
  useAppLocale,
} from '../_shared'

const lc = useAppLocale('ecommerce')
const c = lc.customers
function orderStatusLabel(s: string) {
  return (lc.orders.statusLabel as Record<string, string>)[s] ?? s
}

const search = ref('')
const drawer = ref<Customer | null>(null)

const customersRef = ref<Customer[]>(customerList)
const filtered = useFilteredList(customersRef, search, ['name', 'email'])
const tableData = computed(() => (filtered.value as Customer[]).map(customerToRow))

function statusLabelFor(status: string): string {
  const lbl = c.statusLabel as Record<string, string>
  if (status === 'vip') return `⭐ ${c.vipBadge}`
  return lbl[status] ?? status
}

const columns: TableColumn[] = [
  { key: 'name', title: c.columns.customer, width: 200, sortable: true },
  { key: 'status', title: c.columns.status, width: 80 },
  { key: 'totalOrders', title: c.columns.orders, width: 80, sortable: true, align: 'center' },
  { key: 'totalSpent', title: c.columns.totalSpent, width: 120, sortable: true, align: 'right' },
  { key: 'avgOrderValue', title: c.columns.aov, width: 90, sortable: true, align: 'right' },
  { key: 'lastOrder', title: c.columns.lastOrder, width: 110, sortable: true },
  { key: 'registeredAt', title: c.columns.registered, width: 110, sortable: true },
  { key: 'actions', title: '', width: 80 },
]

function findCustomer(id: string): Customer | undefined {
  return customerList.find((x) => x.id === id)
}

const drawerOrders = computed(() =>
  drawer.value ? orders.filter((o) => o.customer === drawer.value!.name).slice(0, 8) : [],
)
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="c.searchPlaceholder">
    <template #actions>
      <SgButton size="small" @click="notification.info(c.exportToast)">{{ c.exportBtn }}</SgButton>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="10" size="small" striped>
    <template #cell="{ column, row, id, value }">
      <template v-if="column.key === 'name'">
        <div style="display: flex; align-items: center; gap: 8px">
          <SgAvatar size="small" :style="{ background: colorFromString(String(value)) }">{{
            initials(String(value))
          }}</SgAvatar>
          <div>
            <div style="font-weight: 500">{{ value }}</div>
            <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
              {{ row.email }}
            </div>
          </div>
        </div>
      </template>
      <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">{{
        statusLabelFor(String(value))
      }}</SgTag>
      <SgBadge v-else-if="column.key === 'totalOrders'" :count="Number(value)" />
      <template v-else-if="column.key === 'totalSpent' || column.key === 'avgOrderValue'">
        {{ money(Number(value)) }}
      </template>
      <div v-else-if="column.key === 'actions'">
        <SgButton
          size="small"
          @click="
            () => {
              const cu = findCustomer(String(id))
              if (cu) drawer = cu
            }
          "
          >{{ c.viewBtn }}</SgButton
        >
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <SgDrawer :open="!!drawer" :title="drawer?.name ?? ''" :width="480" @close="drawer = null">
    <template v-if="drawer">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div style="display: flex; align-items: center; gap: 12px">
          <SgAvatar size="large" :style="{ background: colorFromString(drawer.name) }">{{
            initials(drawer.name)
          }}</SgAvatar>
          <div>
            <div style="font-weight: 600; font-size: 16px">{{ drawer.name }}</div>
            <SgTag :color="statusColor(drawer.status)">{{ statusLabelFor(drawer.status) }}</SgTag>
          </div>
        </div>
        <SgDescriptions
          :items="[
            { label: c.drawer.email, value: drawer.email },
            { label: c.drawer.registered, value: drawer.registeredAt },
            { label: c.drawer.totalOrders, value: String(drawer.totalOrders) },
            { label: c.drawer.totalSpent, value: money(drawer.totalSpent) },
            { label: c.drawer.aov, value: money(drawer.avgOrderValue) },
            { label: c.drawer.lastOrder, value: drawer.lastOrder },
          ]"
          :column="1"
          size="small"
        />
        <h4>{{ c.drawer.orderHistoryHeading }}</h4>
        <div v-for="ord of drawerOrders" :key="ord.id" class="ec-customer-order-row">
          <span style="font-family: monospace">{{ ord.id }}</span>
          <span>{{ money(ord.total) }}</span>
          <SgTag :color="statusColor(ord.status)">{{ orderStatusLabel(ord.status) }}</SgTag>
          <span style="color: var(--sg-color-text-secondary)">{{ ord.date }}</span>
        </div>
      </div>
    </template>
  </SgDrawer>
</template>

<style scoped>
.ec-customer-order-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  font-size: 13px;
}
</style>
