<script setup lang="ts">
import { ref } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { ShowcaseShell, StatsRow, type StatItem, money, useAppLocale } from '../_shared'
import { products, orders, customerList } from './data'
import ProductsTab from './ProductsTab.vue'
import OrdersTab from './OrdersTab.vue'
import CustomersTab from './CustomersTab.vue'
import InventoryTab from './InventoryTab.vue'
import AnalyticsTab from './AnalyticsTab.vue'

const lc = useAppLocale('ecommerce')
const tStats = lc.stats
const tTabs = lc.tabs

const active = ref('products')

const tabs: TabItem[] = [
  { key: 'products', label: tTabs.products },
  { key: 'orders', label: tTabs.orders },
  { key: 'customers', label: tTabs.customers },
  { key: 'inventory', label: tTabs.inventory },
  { key: 'analytics', label: tTabs.analytics },
]

const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
const pending = orders.filter((o) => o.status === 'pending').length
const activeProducts = products.filter((p) => p.status === 'active').length
const lowStock = products.filter((p) => p.stock < 10).length
const vip = customerList.filter((c) => c.status === 'vip').length

const statItems: StatItem[] = [
  {
    key: 'revenue',
    label: tStats.revenue,
    value: money(totalRevenue, { compact: true }),
    sub: tStats.revenueSub(orders.length),
  },
  { key: 'pending', label: tStats.pending, value: pending, sub: tStats.pendingSub },
  {
    key: 'active',
    label: tStats.activeProducts,
    value: activeProducts,
    sub: tStats.activeProductsSub(products.length),
  },
  {
    key: 'lowStock',
    label: tStats.lowStock,
    value: lowStock,
    subTone: lowStock > 0 ? 'error' : 'default',
    sub: tStats.lowStockSub,
  },
  { key: 'vip', label: tStats.vip, value: vip, sub: tStats.vipSub(customerList.length) },
]
</script>

<template>
  <ShowcaseShell>
    <template #header>
      <StatsRow :items="statItems" />
    </template>
    <SgTabs :items="tabs" :active-key="active" @change="(k) => (active = String(k))">
      <template #panel="{ item }">
        <ProductsTab v-if="item.key === 'products'" />
        <OrdersTab v-else-if="item.key === 'orders'" />
        <CustomersTab v-else-if="item.key === 'customers'" />
        <InventoryTab v-else-if="item.key === 'inventory'" />
        <AnalyticsTab v-else-if="item.key === 'analytics'" />
      </template>
    </SgTabs>
  </ShowcaseShell>
</template>
