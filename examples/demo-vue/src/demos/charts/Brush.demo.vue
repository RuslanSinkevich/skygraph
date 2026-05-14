<script setup lang="ts">
/**
 * Drag inside the plot to brush an X range. Double-click resets. Use the
 * "Reset selection" button for a programmatic reset.
 */
import { ref } from 'vue'
import { SgAreaChart, type ChartBrushRange } from '@skygraph/vue'
import { priceSeries } from './_data'

const data = priceSeries(13)
const range = ref<ChartBrushRange | null>({ from: 2, to: 8 })

function onChange(next: ChartBrushRange | null) {
  range.value = next
}

function reset() {
  range.value = null
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
      <button
        type="button"
        :disabled="!range"
        :style="{
          padding: '4px 12px',
          borderRadius: '6px',
          border: '1px solid var(--sg-color-border)',
          background: 'var(--sg-color-bg-elevated)',
          color: 'var(--sg-color-text-primary)',
          cursor: range ? 'pointer' : 'not-allowed',
          opacity: range ? 1 : 0.5,
        }"
        @click="reset"
      >
        Reset selection
      </button>
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
        Drag inside the plot to select. Selection:
        <code>{{
          range
            ? `${data.categories[range.from] ?? ''} → ${data.categories[range.to] ?? ''} (${
                range.to - range.from + 1
              } pts)`
            : 'no selection'
        }}</code>
      </span>
    </div>
    <SgAreaChart
      :categories="data.categories"
      :series="data.series"
      :height="240"
      :stacked="false"
      :brush="{ range, onRangeChange: onChange, defaultRange: null }"
      :x-axis="{ tickCount: 7, label: 'Day' }"
      :y-axis="{ tickCount: 5, gridLines: true }"
      :padding="[20, 24, 36, 56]"
    />
  </div>
</template>
