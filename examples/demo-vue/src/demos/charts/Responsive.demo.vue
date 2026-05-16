<script setup lang="ts">
/**
 * Responsive container — wrap the chart in a CSS-resizable box.
 * `SgLineChart` measures its SVG via `useChartSize` so the plot
 * rescales without pulling points off the grid.
 */
import { SgLineChart } from '@skygraph/vue'
import { monthlyRevenue } from './_data'

const data = monthlyRevenue()
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
      Drag the bottom-right corner to resize the box.
    </div>
    <div
      style="
        resize: both;
        overflow: hidden;
        width: 480px;
        height: 280px;
        min-width: 280px;
        min-height: 180px;
        max-width: 100%;
        border: 1px dashed var(--sg-color-border);
        border-radius: 8px;
        padding: 12px;
        background: var(--sg-color-bg-elevated);
      "
    >
      <SgLineChart
        :categories="data.categories"
        :series="data.series"
        width="100%"
        :height="220"
        crosshair
        :x-axis="{ tickCount: 6 }"
        :y-axis="{ tickCount: 5, gridLines: true }"
      />
    </div>
  </div>
</template>
