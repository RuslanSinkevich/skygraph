<script setup lang="ts">
/**
 * Mobile / tablet / desktop preset switcher. Recomputes widget spans so
 * the demo reads cleanly at every column count.
 */
import { ref, computed } from 'vue'
import { SgDashboard, SgLineChart } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

type Mode = 'mobile' | 'tablet' | 'desktop'

const modes: Record<Mode, { cols: number; maxWidth: number; rowH: number }> = {
  mobile: { cols: 2, maxWidth: 320, rowH: 90 },
  tablet: { cols: 6, maxWidth: 720, rowH: 80 },
  desktop: { cols: 12, maxWidth: 9999, rowH: 80 },
}

const mode = ref<Mode>('desktop')
const cfg = computed(() => modes[mode.value])

const widgets = computed<DashboardWidget[]>(() => {
  const cols = cfg.value.cols
  const half = Math.max(1, Math.floor(cols / 2))
  return [
    { id: 'kpi-1', title: 'Revenue', x: 1, y: 1, w: cols >= 4 ? half : cols, h: 1 },
    {
      id: 'kpi-2',
      title: 'Orders',
      x: cols >= 4 ? half + 1 : 1,
      y: cols >= 4 ? 1 : 2,
      w: cols >= 4 ? cols - half : cols,
      h: 1,
    },
    { id: 'chart', title: 'Visits', x: 1, y: cols >= 4 ? 2 : 3, w: cols, h: 3 },
  ]
})

const visitCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const visitSeries = [{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220, 90, 80] }]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 8px">
      <button
        v-for="m in (Object.keys(modes) as Mode[])"
        :key="m"
        type="button"
        :aria-pressed="mode === m"
        :style="{
          padding: '4px 12px',
          border: '1px solid var(--sg-color-border)',
          borderRadius: 'var(--sg-border-radius)',
          background:
            mode === m ? 'var(--sg-color-primary)' : 'var(--sg-color-bg-elevated)',
          color: mode === m ? 'var(--sg-color-text-light-solid, #fff)' : 'var(--sg-color-text)',
          cursor: 'pointer',
          fontSize: '13px',
          textTransform: 'capitalize',
        }"
        @click="mode = m"
      >
        {{ m }} ({{ modes[m].cols }} cols)
      </button>
    </div>

    <div
      :style="{
        maxWidth: cfg.maxWidth + 'px',
        width: '100%',
        margin: '0 auto',
        padding: '8px',
        border: '1px dashed var(--sg-color-border)',
        borderRadius: 'var(--sg-border-radius)',
        background: 'var(--sg-color-bg-container)',
        transition: 'max-width 200ms ease',
      }"
    >
      <SgDashboard
        :widgets="widgets"
        :columns="cfg.cols"
        :row-height="cfg.rowH"
        :gap="10"
      >
        <template #widget="{ widget }">
          <strong v-if="widget.id === 'kpi-1'" style="font-size: 22px">$128.4k</strong>
          <strong v-else-if="widget.id === 'kpi-2'" style="font-size: 22px">3 412</strong>
          <SgLineChart
            v-else-if="widget.id === 'chart'"
            :categories="visitCategories"
            :series="visitSeries"
            :height="180"
          />
        </template>
      </SgDashboard>
    </div>
  </div>
</template>
