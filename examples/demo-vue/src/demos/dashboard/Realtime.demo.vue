<script setup lang="ts">
/**
 * `setInterval` pumps fresh values into the chart every 2 s. Pause to
 * freeze the stream. Mirrors React `Realtime.demo.tsx`.
 */
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { SgDashboard, SgLineChart, SgButton } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

const POINTS = 24
const TICK_MS = 2000

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

function nextSeries(prev: readonly number[]) {
  const last = prev[prev.length - 1] ?? 100
  const drift = rand(-30, 30)
  const v = Math.max(0, Math.min(500, last + drift))
  return [...prev.slice(1), v]
}

const values = ref<number[]>(Array.from({ length: POINTS }, () => rand(80, 220)))
const bars = ref<number[]>(Array.from({ length: 7 }, () => rand(40, 220)))
const paused = ref(false)
let timer: number | null = null

function start() {
  if (timer != null) return
  timer = window.setInterval(() => {
    values.value = nextSeries(values.value)
    bars.value = bars.value.map((v) => Math.max(0, Math.min(300, v + rand(-30, 30))))
  }, TICK_MS)
}

function stop() {
  if (timer != null) {
    window.clearInterval(timer)
    timer = null
  }
}

watch(
  paused,
  (p) => {
    if (p) stop()
    else start()
  },
  { immediate: true },
)

onBeforeUnmount(stop)

const tickLabels = computed(() => Array.from({ length: POINTS }, (_, i) => `t-${POINTS - 1 - i}`))

const widgets = computed<DashboardWidget[]>(() => [
  {
    id: 'live',
    title: `Live throughput · ${paused.value ? 'paused' : 'streaming'}`,
    x: 1, y: 1, w: 12, h: 4,
  },
  { id: 'recent', title: 'Last 7 ticks', x: 1, y: 5, w: 6, h: 2 },
  { id: 'now', title: 'Current value', x: 7, y: 5, w: 6, h: 2 },
])

const liveSeries = computed(() => [{ id: 't', label: 'Throughput', values: values.value }])
</script>

<template>
  <SgDashboard :widgets="widgets" :columns="12" :row-height="70" :gap="12">
    <template #widget="{ widget }">
      <SgLineChart
        v-if="widget.id === 'live'"
        :categories="tickLabels"
        :series="liveSeries"
        :height="220"
      />
      <div
        v-else-if="widget.id === 'recent'"
        style="display: flex; align-items: flex-end; gap: 4px; height: 100%"
      >
        <div
          v-for="(v, i) in bars"
          :key="i"
          :style="{
            flex: 1,
            height: ((v / 300) * 100) + '%',
            background: 'var(--sg-color-primary)',
            borderRadius: '2px',
            transition: 'height 240ms ease',
          }"
        />
      </div>
      <div
        v-else-if="widget.id === 'now'"
        style="display: flex; align-items: center; justify-content: space-between; height: 100%"
      >
        <span style="font-size: 32px; font-weight: 700; color: var(--sg-color-text)">
          {{ values[values.length - 1] }}
        </span>
        <SgButton :type="paused ? 'primary' : 'default'" @click="paused = !paused">
          {{ paused ? 'Resume' : 'Pause' }}
        </SgButton>
      </div>
    </template>
  </SgDashboard>
</template>
