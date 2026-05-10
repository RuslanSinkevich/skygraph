<script setup lang="ts">
/**
 * 12-column grid with a line chart, KPI tile, bar chart and an
 * activity feed. Vue uses a single `#widget` slot and dispatches via
 * `widget.id`, so each widget body is rendered conditionally below.
 *
 * Mirrors React `examples/demo/src/demos/dashboard/Basic.demo.tsx`.
 */
import { SgDashboard, SgLineChart, SgBarChart } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

const widgets: DashboardWidget[] = [
  { id: 'visits', title: 'Daily visits', x: 1, y: 1, w: 8, h: 3 },
  { id: 'revenue', title: 'Revenue', x: 9, y: 1, w: 4, h: 1 },
  { id: 'orders', title: 'Orders', x: 9, y: 2, w: 4, h: 2 },
  { id: 'feed', title: 'Recent activity', x: 1, y: 4, w: 12, h: 2 },
]

const visitCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const visitSeries = [{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220, 90, 80] }]
const orderCategories = ['Q1', 'Q2', 'Q3', 'Q4']
const orderSeries = [{ id: 'o', label: 'Orders', values: [240, 320, 280, 410] }]
</script>

<template>
  <SgDashboard :widgets="widgets" :columns="12" :row-height="100" :gap="16">
    <template #widget="{ widget }">
      <SgLineChart
        v-if="widget.id === 'visits'"
        :categories="visitCategories"
        :series="visitSeries"
        :height="180"
      />
      <div
        v-else-if="widget.id === 'revenue'"
        style="font-size: 28px; font-weight: 700; color: var(--sg-color-text)"
      >
        $48.2k
      </div>
      <SgBarChart
        v-else-if="widget.id === 'orders'"
        :categories="orderCategories"
        :series="orderSeries"
        :height="140"
      />
      <ul v-else-if="widget.id === 'feed'" style="margin: 0; padding-left: 20px">
        <li>Order #1242 — paid</li>
        <li>New user — alice@example.com</li>
        <li>Refund #882 — processed</li>
      </ul>
    </template>
  </SgDashboard>
</template>
