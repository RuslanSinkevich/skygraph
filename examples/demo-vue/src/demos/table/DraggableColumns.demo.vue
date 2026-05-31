<script setup lang="ts">
/**
 * Drag-and-drop column reordering — user-side pattern.
 *
 * Vue `SgTable` does not (yet) expose `draggable` on the header, so this
 * demo shows the next-best pattern: a small "column manager" strip above
 * the table where each column appears as a draggable chip. The order of
 * the chips drives `:columns`, so reordering chips reorders the table.
 *
 * Drag-and-drop is implemented via native HTML5 events on the chips
 * themselves — no extra dependencies, full keyboard fallback via
 * "left/right" arrow buttons inside each chip.
 */
import { computed, ref } from 'vue'
import { SgTable, SgTag, type TableColumn } from '@skygraph/vue'
import { people } from './_data'

const ALL_COLUMNS: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true, width: 180 },
  { key: 'age', title: 'Age', sortable: true, width: 90, align: 'center' },
  { key: 'city', title: 'City', sortable: true, width: 140 },
  { key: 'role', title: 'Role', width: 140 },
  { key: 'status', title: 'Status', width: 120 },
]

const order = ref<string[]>(ALL_COLUMNS.map((c) => c.key))
const byKey = new Map(ALL_COLUMNS.map((c) => [c.key, c]))

const columns = computed<TableColumn[]>(() => order.value.map((k) => byKey.get(k)!).filter(Boolean))

const dragKey = ref<string | null>(null)
const overKey = ref<string | null>(null)

function onDragStart(key: string, e: DragEvent) {
  dragKey.value = key
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', key)
  }
}
function onDragOver(key: string, e: DragEvent) {
  e.preventDefault()
  overKey.value = key
}
function onDragLeave() {
  overKey.value = null
}
function onDrop(target: string, e: DragEvent) {
  e.preventDefault()
  const from = dragKey.value
  if (!from || from === target) {
    overKey.value = null
    dragKey.value = null
    return
  }
  const next = [...order.value]
  const fromIdx = next.indexOf(from)
  const toIdx = next.indexOf(target)
  if (fromIdx === -1 || toIdx === -1) return
  next.splice(fromIdx, 1)
  next.splice(toIdx, 0, from)
  order.value = next
  dragKey.value = null
  overKey.value = null
}
function onDragEnd() {
  dragKey.value = null
  overKey.value = null
}
function move(key: string, delta: number) {
  const next = [...order.value]
  const idx = next.indexOf(key)
  const target = idx + delta
  if (idx < 0 || target < 0 || target >= next.length) return
  ;[next[idx], next[target]] = [next[target], next[idx]]
  order.value = next
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border: 1px solid var(--sg-color-border-secondary);
        border-radius: var(--sg-border-radius, 6px);
        background: var(--sg-color-bg-secondary);
      "
    >
      <span
        style="
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
        "
      >
        Column order
      </span>
      <div
        v-for="(key, i) in order"
        :key="key"
        draggable="true"
        :class="[
          'demo-col-chip',
          { 'demo-col-chip-dragging': dragKey === key, 'demo-col-chip-over': overKey === key },
        ]"
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 6px 4px 10px',
          fontSize: '12px',
          borderRadius: '999px',
          background: overKey === key ? 'var(--sg-color-primary-bg)' : 'var(--sg-color-bg)',
          border: `1px solid ${overKey === key ? 'var(--sg-color-primary)' : 'var(--sg-color-border-secondary)'}`,
          color: 'var(--sg-color-text)',
          cursor: 'grab',
          userSelect: 'none',
          opacity: dragKey === key ? 0.5 : 1,
          transition: 'background .15s, border-color .15s, opacity .15s',
        }"
        @dragstart="(e) => onDragStart(key, e)"
        @dragover="(e) => onDragOver(key, e)"
        @dragleave="onDragLeave"
        @drop="(e) => onDrop(key, e)"
        @dragend="onDragEnd"
      >
        <span aria-hidden="true" style="opacity: 0.5">⋮⋮</span>
        <span>{{ byKey.get(key)?.title ?? key }}</span>
        <button
          type="button"
          :aria-label="`Move ${byKey.get(key)?.title} left`"
          :disabled="i === 0"
          @click="move(key, -1)"
          style="
            all: unset;
            cursor: pointer;
            padding: 0 4px;
            font-size: 11px;
            color: var(--sg-color-text-secondary);
            opacity: 0.7;
          "
        >
          ‹
        </button>
        <button
          type="button"
          :aria-label="`Move ${byKey.get(key)?.title} right`"
          :disabled="i === order.length - 1"
          @click="move(key, 1)"
          style="
            all: unset;
            cursor: pointer;
            padding: 0 4px;
            font-size: 11px;
            color: var(--sg-color-text-secondary);
            opacity: 0.7;
          "
        >
          ›
        </button>
      </div>
    </div>
    <SgTable :columns="columns" :data="people" :page-size="6" bordered>
      <template #cell="{ column, value }">
        <template v-if="column.key === 'status'">
          <SgTag :color="value === 'active' ? 'success' : 'default'">{{ String(value) }}</SgTag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </SgTable>
  </div>
</template>
