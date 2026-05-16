<script setup lang="ts">
/**
 * 30-point sliding window that ticks every 500 ms. `animate={false}`
 * disables the draw-in animation so it doesn't replay on every update.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SgLineChart } from '@skygraph/vue'
import { cpuTrace } from './_data'

const TRACE = cpuTrace()
const WINDOW = 30
const TICK_MS = 500

const running = ref(true)
const offset = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function start() {
  timer = setInterval(() => {
    offset.value = (offset.value + 1) % TRACE.values.length
  }, TICK_MS)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(start)
onUnmounted(stop)

function toggle() {
  running.value = !running.value
  if (running.value) start()
  else stop()
}

const slice = computed(() => {
  const out: number[] = []
  for (let i = 0; i < WINDOW; i++) {
    const idx = (offset.value + i) % TRACE.values.length
    out.push(TRACE.values[idx]!)
  }
  return out
})

const cats = computed(() => {
  const out: string[] = []
  for (let i = 0; i < WINDOW; i++) out.push(`t-${WINDOW - i}`)
  out[WINDOW - 1] = 'now'
  return out
})

const cpuSeries = computed(() => [{ id: 'cpu', label: 'CPU usage (%)', values: slice.value }])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 8px; align-items: center">
      <button
        type="button"
        :style="{
          padding: '4px 12px',
          borderRadius: '6px',
          border: '1px solid var(--sg-color-border)',
          background: running ? 'var(--sg-color-warning)' : 'var(--sg-color-success)',
          color: '#fff',
          cursor: 'pointer',
        }"
        @click="toggle"
      >
        {{ running ? '⏸ Pause' : '▶ Resume' }}
      </button>
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
        Sliding window: {{ WINDOW }} pts · tick: {{ TICK_MS }}ms · current =
        {{ slice[WINDOW - 1] }}%
      </span>
    </div>
    <SgLineChart
      :categories="cats"
      :series="cpuSeries"
      :height="220"
      :markers="false"
      :animate="false"
      :crosshair="{ valueFormatter: (v: number) => `${v}%` }"
      :x-axis="{ tickCount: 6 }"
      :y-axis="{ tickCount: 5, tickFormatter: (v: number) => `${v}%`, gridLines: true }"
      :padding="[20, 24, 36, 48]"
    />
  </div>
</template>
