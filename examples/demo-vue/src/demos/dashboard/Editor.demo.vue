<script setup lang="ts">
/**
 * Editor — drag/resize widgets. Adds an "Add widget" button and a log
 * of `@layout-change` events.
 *
 * Mirrors React `Editor.demo.tsx`. Vue uses an `@layout-change` emit
 * (no per-widget metadata) — the log just shows the new array length.
 */
import { ref } from 'vue'
import { SgDashboardEditor, SgLineChart, SgBarChart, SgButton } from '@skygraph/vue'
import type { DashboardWidget } from '@skygraph/vue'

const initial: DashboardWidget[] = [
  { id: 'visits', title: 'Daily visits', x: 1, y: 1, w: 7, h: 3 },
  { id: 'orders', title: 'Orders', x: 8, y: 1, w: 5, h: 3 },
]

const widgets = ref<DashboardWidget[]>([...initial])
const log = ref<string[]>([])
const counter = ref(1)

const visitCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const visitSeries = [{ id: 'v', label: 'Visits', values: [120, 200, 150, 180, 220, 90, 80] }]
const orderCategories = ['Q1', 'Q2', 'Q3', 'Q4']
const orderSeries = [{ id: 'o', label: 'Orders', values: [240, 320, 280, 410] }]

function addWidget() {
  const id = `w-${counter.value}`
  counter.value += 1
  widgets.value = [
    ...widgets.value,
    { id, title: `New widget ${counter.value - 1}`, x: 1, y: 4, w: 4, h: 2 },
  ]
  log.value = [`+ added ${id}`, ...log.value].slice(0, 8)
}

function onLayoutChange(next: DashboardWidget[]) {
  widgets.value = next
  log.value = [`layout updated (${next.length} widgets)`, ...log.value].slice(0, 8)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px; align-items: center">
      <SgButton type="primary" @click="addWidget">+ Add widget</SgButton>
      <span style="color: var(--sg-color-text-secondary); font-size: 13px">
        {{ widgets.length }} widgets
      </span>
    </div>

    <SgDashboardEditor
      :widgets="widgets"
      :columns="12"
      :row-height="80"
      :gap="12"
      @layout-change="onLayoutChange"
    >
      <template #widget="{ widget }">
        <SgLineChart
          v-if="widget.id === 'visits'"
          :categories="visitCategories"
          :series="visitSeries"
          :height="180"
        />
        <SgBarChart
          v-else-if="widget.id === 'orders'"
          :categories="orderCategories"
          :series="orderSeries"
          :height="180"
        />
        <div v-else style="color: var(--sg-color-text-secondary)">Drag me, resize me.</div>
      </template>
    </SgDashboardEditor>

    <div
      style="
        font-family: monospace;
        font-size: 12px;
        padding: 8px;
        background: var(--sg-color-bg-container);
        border: 1px solid var(--sg-color-border);
        border-radius: var(--sg-border-radius);
        min-height: 80px;
      "
    >
      <span v-if="log.length === 0" style="color: var(--sg-color-text-tertiary)">
        layout-change log…
      </span>
      <div v-for="(line, i) in log" :key="i">{{ line }}</div>
    </div>
  </div>
</template>
