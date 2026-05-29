<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgSegmented, SgTag, SgProgress, SgBarChart, SgLineChart, SgPieChart } from '@skygraph/vue'
import { products, orders, customerList } from './data'
import { money, num, percent, useAppLocale } from '../_shared'
import { emojiForProduct } from './common'

type Period = '7d' | '30d' | '90d' | 'all'

function withinPeriod(dateStr: string, period: Period): boolean {
  if (period === 'all') return true
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const d = new Date(dateStr).getTime()
  return Date.now() - d <= days * 86400000
}

const a = useAppLocale('ecommerce').analytics
const period = ref<Period>('30d')

const filteredOrders = computed(() =>
  orders.filter((o) => o.status !== 'cancelled' && withinPeriod(o.date, period.value)),
)

const stats = computed(() => {
  const revenue = filteredOrders.value.reduce((s, o) => s + o.total, 0)
  const items = filteredOrders.value.reduce((s, o) => s + o.items.length, 0)
  const aov = filteredOrders.value.length ? revenue / filteredOrders.value.length : 0
  const inventory = products.reduce((s, p) => s + p.cost * p.stock, 0)
  return {
    revenue,
    orders: filteredOrders.value.length,
    items,
    aov,
    inventory,
    vipShare: customerList.length
      ? (customerList.filter((c) => c.status === 'vip').length / customerList.length) * 100
      : 0,
  }
})

const dailySeries = computed(() => {
  const buckets = new Map<string, number>()
  for (const o of filteredOrders.value) {
    buckets.set(o.date, (buckets.get(o.date) ?? 0) + o.total)
  }
  const sorted = [...buckets.entries()].sort((x, y) => x[0].localeCompare(y[0])).slice(-14)
  return {
    categories: sorted.map(([d]) => d.slice(5)),
    values: sorted.map(([, v]) => Math.round(v)),
  }
})

const topProducts = computed(() => [...products].sort((x, y) => y.revenue - x.revenue).slice(0, 8))

const categorySplit = computed(() => {
  const map = new Map<string, number>()
  for (const p of products) {
    map.set(p.category, (map.get(p.category) ?? 0) + p.revenue)
  }
  return [...map.entries()].map(([label, value]) => ({
    id: label,
    label,
    value: Math.round(value),
  }))
})

const statusSplit = computed(() => {
  const map = new Map<string, number>()
  for (const o of orders) {
    map.set(o.status, (map.get(o.status) ?? 0) + 1)
  }
  return [...map.entries()].map(([label, value]) => ({ id: label, label, value }))
})

const dailyLineSeries = computed(() => [
  { id: 'revenue', label: a.stats.revenue, values: dailySeries.value.values },
])

const categoryBarSeries = computed(() => [
  {
    id: 'revenue',
    label: a.stats.revenue,
    values: categorySplit.value.map((c) => c.value),
  },
])

const pieSeries = computed(() =>
  statusSplit.value.map((s) => ({ id: s.id, label: s.label, values: [s.value] })),
)
</script>

<template>
  <div class="ana-toolbar">
    <SgSegmented
      :value="period"
      :options="[
        { label: a.periods.d7, value: '7d' },
        { label: a.periods.d30, value: '30d' },
        { label: a.periods.d90, value: '90d' },
        { label: a.periods.all, value: 'all' },
      ]"
      @change="(v: string | number) => (period = String(v) as Period)"
    />
  </div>

  <div class="ana-stats">
    <div class="ana-stat">
      <div class="ana-stat-label">{{ a.stats.revenue }}</div>
      <div class="ana-stat-value">{{ money(stats.revenue, { compact: true }) }}</div>
      <div class="ana-stat-sub">{{ a.stats.ordersSub(stats.orders) }}</div>
    </div>
    <div class="ana-stat">
      <div class="ana-stat-label">{{ a.stats.aov }}</div>
      <div class="ana-stat-value">{{ money(stats.aov) }}</div>
      <div class="ana-stat-sub">{{ a.stats.itemsSub(num(stats.items)) }}</div>
    </div>
    <div class="ana-stat">
      <div class="ana-stat-label">{{ a.stats.inventoryValue }}</div>
      <div class="ana-stat-value">{{ money(stats.inventory, { compact: true }) }}</div>
      <div class="ana-stat-sub">{{ a.stats.inventorySub(products.length) }}</div>
    </div>
    <div class="ana-stat">
      <div class="ana-stat-label">{{ a.stats.vipShare }}</div>
      <div class="ana-stat-value">{{ percent(stats.vipShare) }}</div>
      <div class="ana-stat-sub">{{ a.stats.vipSub }}</div>
    </div>
  </div>

  <div class="ana-grid">
    <div class="ana-card" style="grid-column: span 2">
      <div class="ana-card-title">{{ a.cards.revenueTrend }}</div>
      <SgLineChart
        v-if="dailySeries.categories.length > 0"
        :categories="dailySeries.categories"
        :series="dailyLineSeries"
        :height="220"
        legend
        :y-axis="{ tickCount: 4 }"
        animate
        file-name="ecommerce-revenue"
      />
      <div v-else class="ana-empty">{{ a.cards.noData }}</div>
    </div>

    <div class="ana-card">
      <div class="ana-card-title">{{ a.cards.ordersByStatus }}</div>
      <div style="display: flex; gap: 16px; align-items: center; justify-content: center">
        <SgPieChart
          :categories="statusSplit.map((s) => s.label)"
          :series="pieSeries"
          :height="180"
          file-name="ecommerce-orders-status"
          animate
        />
        <div style="display: flex; flex-direction: column; gap: 4px">
          <div
            v-for="s of statusSplit"
            :key="s.id"
            style="display: flex; align-items: center; gap: 6px; font-size: 12px"
          >
            <SgTag color="default" :style="{ margin: 0 }">{{ s.label }}</SgTag>
            <span>{{ s.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="ana-card">
      <div class="ana-card-title">{{ a.cards.revenueByCategory }}</div>
      <SgBarChart
        :categories="categorySplit.map((c) => c.label)"
        :series="categoryBarSeries"
        :height="220"
        legend
        :y-axis="{ tickCount: 4 }"
        animate
        file-name="ecommerce-revenue-by-category"
      />
    </div>

    <div class="ana-card" style="grid-column: span 2">
      <div class="ana-card-title">{{ a.cards.topProducts }}</div>
      <div class="ana-list">
        <div v-for="(p, i) of topProducts" :key="p.id" class="ana-list-row">
          <span style="font-size: 22px">{{ emojiForProduct(p.name, p.category) }}</span>
          <div style="flex: 1; min-width: 0">
            <div class="ana-list-name">{{ p.name }}</div>
            <div class="ana-list-meta">
              {{ p.brand }} · {{ num(p.sold) }} {{ a.soldSuffix }} · ⭐ {{ p.rating }}
            </div>
            <SgProgress
              :percent="Math.round((p.revenue / (topProducts[0].revenue || 1)) * 100)"
              size="small"
              :show-info="false"
            />
          </div>
          <div style="text-align: right; min-width: 100px">
            <div style="font-weight: 600">{{ money(p.revenue, { compact: true }) }}</div>
            <SgTag :color="p.margin > 50 ? 'success' : 'warning'" :style="{ fontSize: '10px' }">
              {{ percent(p.margin) }} {{ a.marginSuffix }}
            </SgTag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ana-toolbar {
  margin-bottom: 16px;
}
.ana-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.ana-stat {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  padding: 12px 14px;
  background: var(--sg-color-bg-container);
}
.ana-stat-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 4px;
}
.ana-stat-value {
  font-size: 22px;
  font-weight: 600;
}
.ana-stat-sub {
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  margin-top: 4px;
}
.ana-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.ana-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius-lg);
  padding: 16px;
  background: var(--sg-color-bg-container);
}
.ana-card-title {
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 13px;
}
.ana-empty {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
}
.ana-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ana-list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
}
.ana-list-row:last-child {
  border-bottom: none;
}
.ana-list-name {
  font-weight: 500;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ana-list-meta {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .ana-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
