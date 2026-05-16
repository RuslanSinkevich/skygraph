<script setup lang="ts">
/**
 * Hover toolbar — Print + PNG download. Vue's `SgLineChart` exposes a
 * `print()` ref method (mirrors React `ChartRef`); PNG export uses the
 * shared `downloadSvgAsPng()` helper from `@skygraph/vue`.
 *
 * The chart stays a primitive — no `actions` prop. Toolbar is composed
 * around it as ordinary DOM.
 */
import { ref } from 'vue'
import { SgLineChart, downloadSvgAsPng } from '@skygraph/vue'
import { monthlyRevenue } from './_data'

const data = monthlyRevenue(7)

const wrapperRef = ref<HTMLDivElement | null>(null)
const chartRef = ref<{ print: (opts?: { fileName?: string }) => void } | null>(null)
const hover = ref(false)

const data2Seed = ref(7)
function refreshData() {
  data2Seed.value++
}
function resetData() {
  data2Seed.value = 7
}

const data2 = ref(monthlyRevenue(7))

function downloadPng() {
  const svg = wrapperRef.value?.querySelector('svg') ?? null
  if (svg) void downloadSvgAsPng(svg as SVGSVGElement, { fileName: 'chart.png' })
}
</script>

<template>
  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px"
  >
    <div
      ref="wrapperRef"
      style="
        position: relative;
        border: 1px solid var(--sg-color-border);
        border-radius: 8px;
        padding: 12px;
        background: var(--sg-color-bg-elevated);
      "
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div
        :style="{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          gap: '4px',
          padding: '4px',
          borderRadius: '6px',
          background: 'var(--sg-color-bg-container)',
          border: '1px solid var(--sg-color-border)',
          opacity: hover ? '1' : '0',
          pointerEvents: hover ? 'auto' : 'none',
          transition: 'opacity 120ms ease',
        }"
      >
        <button
          type="button"
          style="padding: 4px 10px; font-size: 12px; cursor: pointer"
          @click="chartRef?.print()"
        >
          🖨 Print
        </button>
        <button
          type="button"
          style="padding: 4px 10px; font-size: 12px; cursor: pointer"
          @click="downloadPng"
        >
          ⬇ PNG
        </button>
      </div>
      <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
        Default toolbar — Print / DownloadPng (hover the chart)
      </div>
      <SgLineChart
        ref="chartRef"
        :categories="data.categories"
        :series="data.series"
        :height="220"
        crosshair
        file-name="monthly-revenue"
        :x-axis="{ tickCount: 6 }"
        :y-axis="{ tickCount: 5, gridLines: true }"
      />
    </div>
    <div
      style="
        border: 1px solid var(--sg-color-border);
        border-radius: 8px;
        padding: 12px;
        background: var(--sg-color-bg-elevated);
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        "
      >
        <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
          Custom actions — your own buttons composed around the chart
        </div>
        <div style="display: flex; gap: 4px">
          <button
            type="button"
            style="padding: 4px 10px; font-size: 12px; cursor: pointer"
            @click="refreshData"
          >
            ↻ Refresh
          </button>
          <button
            type="button"
            style="padding: 4px 10px; font-size: 12px; cursor: pointer"
            @click="resetData"
          >
            ↺ Reset
          </button>
        </div>
      </div>
      <SgLineChart
        :key="data2Seed"
        :categories="data2.categories"
        :series="data2.series"
        :height="220"
        crosshair
        :x-axis="{ tickCount: 6 }"
        :y-axis="{ tickCount: 5, gridLines: true }"
      />
    </div>
  </div>
</template>
