<script setup lang="ts">
/**
 * Pure-CSS mount animation with a custom duration. The replay button
 * bumps a `key` so Vue re-mounts the chart subtree to play from the
 * start.
 */
import { ref } from 'vue'
import { SgLineChart, SgBarChart } from '@skygraph/vue'
import { monthlyRevenue, quarterlyMarkets } from './_data'

const lineData = monthlyRevenue(3)
const barData = quarterlyMarkets(5)
const tick = ref(0)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <button
      type="button"
      style="
        padding: 6px 14px;
        border-radius: 6px;
        border: 1px solid var(--sg-color-border);
        background: var(--sg-color-primary);
        color: #fff;
        cursor: pointer;
        font-weight: 500;
        align-self: flex-start;
      "
      @click="tick++"
    >
      ▶ Replay animation
    </button>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px">
      <div>
        <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
          LineChart · animate.duration = 800ms
        </div>
        <SgLineChart
          :key="`line-${tick}`"
          :categories="lineData.categories"
          :series="lineData.series"
          :animate="{ duration: 800 }"
          :height="220"
        />
      </div>
      <div>
        <div style="font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 6px">
          BarChart · animate.duration = 800ms
        </div>
        <SgBarChart
          :key="`bar-${tick}`"
          :categories="barData.categories"
          :series="barData.series"
          :animate="{ duration: 800 }"
          :height="220"
        />
      </div>
    </div>
  </div>
</template>
