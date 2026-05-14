<script setup lang="ts">
/**
 * Per-widget actions — Vue uses inline buttons inside the `#widget`
 * slot (no `actions` array on `DashboardWidget` in `@skygraph/vue`).
 * Captures the same intent as React `WithActions.demo.tsx`.
 *
 * See `findings/T-Vue-Demo-Complex.md` → `dashboard-no-widget-actions-api`.
 */
import { ref } from 'vue'
import { SgDashboard, SgLineChart, SgButton } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

const log = ref<string[]>([])
function append(msg: string) {
  log.value = [msg, ...log.value].slice(0, 6)
}

const widgets: DashboardWidget[] = [
  { id: 'visits', title: 'Daily visits', x: 1, y: 1, w: 7, h: 3 },
  { id: 'kpi', title: 'Revenue', x: 8, y: 1, w: 5, h: 1 },
  { id: 'no-actions', title: 'No actions', x: 8, y: 2, w: 5, h: 2 },
]

const visitCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const visitSeries = [{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220] }]

const actionsForVisits = ['refresh', 'export', 'pin', 'archive'] as const
const actionsForKpi = ['refresh', 'export', 'pin'] as const
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgDashboard :widgets="widgets" :columns="12" :row-height="80" :gap="12">
      <template #widget="{ widget }">
        <SgLineChart
          v-if="widget.id === 'visits'"
          :categories="visitCategories"
          :series="visitSeries"
          :height="180"
        />
        <div
          v-else-if="widget.id === 'kpi'"
          style="font-size: 24px; font-weight: 700; color: var(--sg-color-text)"
        >
          $48.2k
        </div>
        <div v-else style="color: var(--sg-color-text-secondary)">
          This widget has no inline action buttons.
        </div>

        <div
          v-if="widget.id === 'visits'"
          style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px"
        >
          <SgButton
            v-for="a in actionsForVisits"
            :key="a"
            type="text"
            size="small"
            :danger="a === 'archive'"
            @click="append(`${a}: ${widget.id}`)"
          >
            {{ a }}
          </SgButton>
        </div>

        <div
          v-else-if="widget.id === 'kpi'"
          style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px"
        >
          <SgButton
            v-for="a in actionsForKpi"
            :key="a"
            type="text"
            size="small"
            @click="append(`${a}: ${widget.id}`)"
          >
            {{ a }}
          </SgButton>
        </div>
      </template>
    </SgDashboard>

    <div
      style="
        font-family: monospace;
        font-size: 12px;
        padding: 8px;
        background: var(--sg-color-bg-container);
        border: 1px solid var(--sg-color-border);
        border-radius: var(--sg-border-radius);
        min-height: 60px;
      "
    >
      <span v-if="log.length === 0" style="color: var(--sg-color-text-tertiary)">
        Click an inline action…
      </span>
      <div v-for="(line, i) in log" :key="i">{{ line }}</div>
    </div>
  </div>
</template>
