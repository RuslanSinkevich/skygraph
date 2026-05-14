<script setup lang="ts">
/**
 * Per-series context menu — `SgBarChart` doesn't expose
 * `onSeriesContextMenu` (charts stay composable primitives). The menu
 * is built at the demo level: render legend chips, hook
 * `@contextmenu.prevent`, run mutations on local state.
 *
 * See `findings/T-Vue-Demo-Complex.md` → `charts-no-context-menu-prop`.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SgBarChart, colorForSeries } from '@skygraph/vue'
import { quarterlyMarkets, toCsv } from './_data'

const data = quarterlyMarkets()
const hidden = ref<string[]>([])
const menu = ref<{ seriesId: string; x: number; y: number } | null>(null)
const toast = ref<string | null>(null)

function close() {
  menu.value = null
}

onMounted(() => {
  window.addEventListener('click', close)
})
onUnmounted(() => {
  window.removeEventListener('click', close)
})

const visibleSeries = computed(() => data.series.filter((s) => !hidden.value.includes(s.id)))
const target = computed(() =>
  menu.value ? (data.series.find((s) => s.id === menu.value!.seriesId) ?? null) : null,
)

function showToast(text: string) {
  toast.value = text
  setTimeout(() => (toast.value = null), 1800)
}

function handleHide() {
  if (!target.value) return
  if (!hidden.value.includes(target.value.id)) hidden.value.push(target.value.id)
  menu.value = null
}
function handleShow() {
  if (!target.value) return
  hidden.value = hidden.value.filter((id) => id !== target.value!.id)
  menu.value = null
}
async function handleCopyCsv() {
  if (!target.value) return
  const csv = toCsv({ categories: data.categories, series: [target.value] })
  try {
    await navigator.clipboard.writeText(csv)
    showToast(`Copied "${target.value.label}" CSV to clipboard`)
  } catch {
    showToast('Clipboard not available')
  }
  menu.value = null
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; position: relative">
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
        Right-click a series chip:
      </span>
      <span
        v-for="(s, idx) in data.series"
        :key="s.id"
        role="button"
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '999px',
          border: '1px solid var(--sg-color-border)',
          background: 'var(--sg-color-bg-elevated)',
          fontSize: '12px',
          cursor: 'context-menu',
          opacity: hidden.includes(s.id) ? '0.45' : '1',
          textDecoration: hidden.includes(s.id) ? 'line-through' : 'none',
        }"
        @contextmenu.prevent="(e) => (menu = { seriesId: s.id, x: e.clientX, y: e.clientY })"
      >
        <span
          :style="{
            width: '10px',
            height: '10px',
            borderRadius: '2px',
            background: colorForSeries(s, idx),
          }"
        />
        {{ s.label }}
      </span>
    </div>

    <SgBarChart
      :categories="data.categories"
      :series="visibleSeries"
      :height="220"
      :y-axis="{ gridLines: true }"
    />

    <div
      v-if="toast"
      style="
        align-self: flex-start;
        padding: 4px 10px;
        background: var(--sg-color-success);
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
      "
    >
      {{ toast }}
    </div>

    <div
      v-if="menu && target"
      :style="{
        position: 'fixed',
        top: `${menu.y}px`,
        left: `${menu.x}px`,
        zIndex: 1000,
        minWidth: '180px',
        padding: '4px',
        background: 'var(--sg-color-bg-container)',
        border: '1px solid var(--sg-color-border)',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }"
      role="menu"
      @click.stop
    >
      <div style="padding: 4px 10px; font-size: 11px; color: var(--sg-color-text-secondary)">
        {{ target.label }}
      </div>
      <button
        v-if="hidden.includes(target.id)"
        type="button"
        class="demo-ctx-menu-item"
        @click="handleShow"
      >
        Show series
      </button>
      <button v-else type="button" class="demo-ctx-menu-item" @click="handleHide">
        Hide series
      </button>
      <button type="button" class="demo-ctx-menu-item" @click="handleCopyCsv">Copy as CSV</button>
    </div>
  </div>
</template>

<style scoped>
.demo-ctx-menu-item {
  padding: 6px 10px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
}
.demo-ctx-menu-item:hover {
  background: var(--sg-color-bg-hover);
}
</style>
