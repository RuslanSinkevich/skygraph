<script setup lang="ts">
/**
 * Realistic mixed layout: KPIs, line + bar charts, mini-table, map
 * placeholder. Same widget set as React `Mixed.demo.tsx`.
 */
import { SgDashboard, SgLineChart, SgBarChart } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

const tableRows = [
  { country: 'US', visits: 4220, share: '42%' },
  { country: 'DE', visits: 1830, share: '18%' },
  { country: 'JP', visits: 1410, share: '14%' },
  { country: 'BR', visits: 980, share: '10%' },
  { country: 'IN', visits: 740, share: '7%' },
]

const widgets: DashboardWidget[] = [
  { id: 'kpi-revenue', title: 'Revenue', x: 1, y: 1, w: 3, h: 2 },
  { id: 'kpi-orders', title: 'Orders', x: 4, y: 1, w: 3, h: 2 },
  { id: 'visits', title: 'Visits — last 7 days', x: 7, y: 1, w: 6, h: 3 },
  { id: 'orders-q', title: 'Orders by quarter', x: 1, y: 3, w: 6, h: 3 },
  { id: 'top-countries', title: 'Top countries', x: 7, y: 4, w: 6, h: 3 },
  { id: 'map', title: 'Geo distribution', x: 1, y: 6, w: 12, h: 4 },
]

const visitCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const visitSeries = [
  { id: 'a', label: 'Web', values: [120, 200, 150, 180, 220, 90, 80] },
  { id: 'b', label: 'Mobile', values: [60, 90, 110, 120, 180, 70, 60] },
]
const ordersCategories = ['Q1', 'Q2', 'Q3', 'Q4']
const ordersSeries = [{ id: 'o', label: 'Orders', values: [240, 320, 280, 410] }]
</script>

<template>
  <SgDashboard :widgets="widgets" :columns="12" :row-height="70" :gap="12">
    <template #widget="{ widget }">
      <div v-if="widget.id === 'kpi-revenue'" style="display: flex; flex-direction: column; gap: 4px">
        <span style="font-size: 28px; font-weight: 700; color: var(--sg-color-text)">$128.4k</span>
        <span style="font-size: 12px; color: var(--sg-color-success)">+12.4% vs prev. month</span>
      </div>
      <div v-else-if="widget.id === 'kpi-orders'" style="display: flex; flex-direction: column; gap: 4px">
        <span style="font-size: 28px; font-weight: 700; color: var(--sg-color-text)">3 412</span>
        <span style="font-size: 12px; color: var(--sg-color-error)">-2.1% vs prev. month</span>
      </div>
      <SgLineChart
        v-else-if="widget.id === 'visits'"
        :categories="visitCategories"
        :series="visitSeries"
        :height="200"
      />
      <SgBarChart
        v-else-if="widget.id === 'orders-q'"
        :categories="ordersCategories"
        :series="ordersSeries"
        :height="200"
      />
      <table
        v-else-if="widget.id === 'top-countries'"
        style="width: 100%; font-size: 13px; border-collapse: collapse"
      >
        <thead>
          <tr style="text-align: left; color: var(--sg-color-text-secondary)">
            <th style="padding: 4px 6px; border-bottom: 1px solid var(--sg-color-border)">Country</th>
            <th style="padding: 4px 6px; border-bottom: 1px solid var(--sg-color-border)">Visits</th>
            <th style="padding: 4px 6px; border-bottom: 1px solid var(--sg-color-border)">Share</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in tableRows" :key="r.country">
            <td style="padding: 4px 6px">{{ r.country }}</td>
            <td style="padding: 4px 6px">{{ r.visits.toLocaleString() }}</td>
            <td style="padding: 4px 6px; color: var(--sg-color-text-secondary)">{{ r.share }}</td>
          </tr>
        </tbody>
      </table>
      <div
        v-else-if="widget.id === 'map'"
        style="
          width: 100%;
          height: 100%;
          min-height: 220px;
          border-radius: 8px;
          background:
            radial-gradient(circle at 30% 40%, var(--sg-color-primary-bg, rgba(22, 119, 255, 0.18)) 0, transparent 45%),
            radial-gradient(circle at 70% 60%, var(--sg-color-success-bg, rgba(82, 196, 26, 0.16)) 0, transparent 50%),
            linear-gradient(135deg, var(--sg-color-bg-container) 0%, var(--sg-color-fill, #f5f5f5) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sg-color-text-secondary);
          font-size: 13px;
          letter-spacing: 0.5px;
        "
      >
        [ Map placeholder — drop your map component here ]
      </div>
    </template>
  </SgDashboard>
</template>
