<script setup lang="ts">
/**
 * Stress demo — 12 widgets pinned to a 6×6 grid. Mix of KPI / table /
 * mini-charts / heartbeat to show layout density.
 */
import { SgDashboard } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

interface KpiData {
  value: string
  delta: string
  tone: 'success' | 'error' | 'muted'
}

const kpiMap: Record<string, KpiData> = {
  w1: { value: '12.4k', delta: '+3.2%', tone: 'success' },
  w2: { value: '38%', delta: '-1.1%', tone: 'success' },
  w3: { value: '$72', delta: '+$4', tone: 'success' },
  w4: { value: '142ms', delta: '+8ms', tone: 'error' },
  w5: { value: '0.4%', delta: '+0.1%', tone: 'error' },
  w6: { value: '99.97%', delta: '0', tone: 'muted' },
}

const rowMap: Record<string, { k: string; v: string }> = {
  w7: { k: 'us-east-1', v: '42%' },
  w8: { k: 'iPhone 15', v: '28%' },
}

const barMap: Record<string, number> = {
  w10: 62,
  w11: 41,
}

function toneColor(tone: KpiData['tone']) {
  if (tone === 'success') return 'var(--sg-color-success)'
  if (tone === 'error') return 'var(--sg-color-error)'
  return 'var(--sg-color-text-tertiary)'
}

const widgets: DashboardWidget[] = [
  { id: 'w1', title: 'Sessions', x: 1, y: 1, w: 2, h: 2 },
  { id: 'w2', title: 'Bounce rate', x: 3, y: 1, w: 2, h: 2 },
  { id: 'w3', title: 'AOV', x: 5, y: 1, w: 2, h: 2 },
  { id: 'w4', title: 'Latency', x: 1, y: 3, w: 2, h: 1 },
  { id: 'w5', title: 'Error rate', x: 3, y: 3, w: 2, h: 1 },
  { id: 'w6', title: 'Uptime', x: 5, y: 3, w: 2, h: 1 },
  { id: 'w7', title: 'Top region', x: 1, y: 4, w: 3, h: 1 },
  { id: 'w8', title: 'Top device', x: 4, y: 4, w: 3, h: 1 },
  { id: 'w9', title: 'Active jobs', x: 1, y: 5, w: 4, h: 2 },
  { id: 'w10', title: 'Disk usage', x: 5, y: 5, w: 2, h: 1 },
  { id: 'w11', title: 'Memory', x: 5, y: 6, w: 2, h: 1 },
  { id: 'w12', title: 'Heartbeat', x: 1, y: 7, w: 6, h: 1 },
]
</script>

<template>
  <SgDashboard :widgets="widgets" :columns="6" :row-height="90" :gap="10">
    <template #widget="{ widget }">
      <div v-if="kpiMap[widget.id]" style="display: flex; flex-direction: column; gap: 2px">
        <strong style="font-size: 20px; line-height: 1.2; color: var(--sg-color-text)">
          {{ kpiMap[widget.id].value }}
        </strong>
        <span
          :style="{ fontSize: '12px', lineHeight: 1.2, color: toneColor(kpiMap[widget.id].tone) }"
        >
          {{ kpiMap[widget.id].delta }}
        </span>
      </div>
      <div
        v-else-if="rowMap[widget.id]"
        style="display: flex; justify-content: space-between; align-items: center; height: 100%"
      >
        <span style="color: var(--sg-color-text)">{{ rowMap[widget.id].k }}</span>
        <span style="color: var(--sg-color-text-secondary)">{{ rowMap[widget.id].v }}</span>
      </div>
      <ul
        v-else-if="widget.id === 'w9'"
        style="
          margin: 0;
          padding-left: 18px;
          color: var(--sg-color-text-secondary);
          font-size: 13px;
        "
      >
        <li>etl/customer-sync — running</li>
        <li>etl/orders-aggregate — queued</li>
        <li>ml/score-batch-7 — running</li>
        <li>cron/cleanup-old-sessions — done</li>
      </ul>
      <div
        v-else-if="barMap[widget.id] != null"
        style="display: flex; flex-direction: column; gap: 6px"
      >
        <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
          {{ barMap[widget.id] }}% used
        </span>
        <div
          style="
            height: 8px;
            background: var(--sg-color-fill-secondary, #f0f0f0);
            border-radius: 4px;
            overflow: hidden;
          "
        >
          <div
            :style="{
              width: barMap[widget.id] + '%',
              height: '100%',
              background:
                barMap[widget.id] > 75 ? 'var(--sg-color-error)' : 'var(--sg-color-primary)',
            }"
          />
        </div>
      </div>
      <svg
        v-else-if="widget.id === 'w12'"
        viewBox="0 0 600 40"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <polyline
          fill="none"
          stroke="var(--sg-color-primary)"
          stroke-width="2"
          points="0,20 40,20 60,5 80,35 100,15 130,25 160,20 200,20 230,8 250,32 270,15 310,25 340,20 380,20 400,5 420,35 440,15 470,25 500,20 540,20 560,8 580,32 600,20"
        />
      </svg>
    </template>
  </SgDashboard>
</template>
