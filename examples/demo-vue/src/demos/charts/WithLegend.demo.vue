<script setup lang="ts">
/**
 * Built-in `legend` prop renders below the SVG. For top / left / right
 * placements compose `<SgChartLegend>` outside the chart with flexbox.
 */
import { ref, computed } from 'vue'
import { SgBarChart, SgChartLegend } from '@skygraph/vue'
import { quarterlyMarkets } from './_data'

const data = quarterlyMarkets()
type Placement = 'top' | 'right' | 'bottom' | 'left'
const placement = ref<Placement>('bottom')
const placements: Placement[] = ['top', 'right', 'bottom', 'left']

const direction = computed(() =>
  placement.value === 'top'
    ? 'column'
    : placement.value === 'bottom'
    ? 'column-reverse'
    : placement.value === 'left'
    ? 'row-reverse'
    : 'row',
)
const isVertical = computed(
  () => placement.value === 'left' || placement.value === 'right',
)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <button
        v-for="p in placements"
        :key="p"
        type="button"
        :aria-pressed="placement === p"
        :style="{
          padding: '4px 10px',
          borderRadius: '6px',
          border: '1px solid var(--sg-color-border)',
          background:
            placement === p ? 'var(--sg-color-primary)' : 'var(--sg-color-bg-elevated)',
          color: placement === p ? '#fff' : 'var(--sg-color-text)',
          cursor: 'pointer',
        }"
        @click="placement = p"
      >
        {{ p }}
      </button>
    </div>
    <div
      style="
        border: 1px solid var(--sg-color-border);
        border-radius: 8px;
        padding: 12px;
        background: var(--sg-color-bg-elevated);
      "
    >
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 8px">
        legend = <code>{{ placement }}</code>
      </div>
      <div :style="{ display: 'flex', flexDirection: direction, gap: '12px', alignItems: 'stretch' }">
        <div style="flex: 1; min-width: 0">
          <SgBarChart :categories="data.categories" :series="data.series" :height="180" />
        </div>
        <SgChartLegend
          :series="data.series"
          :style="
            isVertical
              ? { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', minWidth: '80px' }
              : undefined
          "
        />
      </div>
    </div>
  </div>
</template>
