<script setup lang="ts" generic="T extends { id: string | number }">
import { ref } from 'vue'

/**
 * Lightweight Vue Kanban board with HTML5 drag-and-drop.
 * Mirrors `examples/showcases/src/showcases/_shared/Kanban.tsx`.
 *
 * Use the default slot `#card` to render a card; receives `{ item, columnKey }`.
 */
export interface KanbanColumn<T> {
  key: string
  title?: string
  color?: string
  items: T[]
  meta?: string | number
}

export interface KanbanProps<T> {
  columns: KanbanColumn<T>[]
  minColumnWidth?: number
}

const props = withDefaults(defineProps<KanbanProps<T>>(), {
  minColumnWidth: 240,
})

const emit = defineEmits<{
  drop: [itemId: string | number, fromColumn: string, toColumn: string]
  cardClick: [item: T]
}>()

interface DragData {
  itemId: string | number
  fromColumn: string
}

const dragOver = ref<string | null>(null)
const dragging = ref<DragData | null>(null)

function handleDragStart(e: DragEvent, itemId: string | number, fromColumn: string) {
  const data: DragData = { itemId, fromColumn }
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('application/json', JSON.stringify(data))
  }
  dragging.value = data
}

function handleDragOver(e: DragEvent, key: string) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  dragOver.value = key
}

function handleDragLeave() {
  dragOver.value = null
}

function handleDrop(e: DragEvent, toColumn: string) {
  e.preventDefault()
  dragOver.value = null
  let data: DragData | null = dragging.value
  try {
    const raw = e.dataTransfer?.getData('application/json') ?? ''
    if (raw) data = JSON.parse(raw) as DragData
  } catch {
    /* fall back to in-memory state */
  }
  dragging.value = null
  if (!data) return
  if (data.fromColumn === toColumn) return
  emit('drop', data.itemId, data.fromColumn, toColumn)
}

function cardKey(item: T): string | number {
  return item.id
}
</script>

<template>
  <div
    class="kanban-board"
    :style="{
      gridTemplateColumns: `repeat(${props.columns.length}, minmax(${props.minColumnWidth}px, 1fr))`,
    }"
  >
    <div
      v-for="col of props.columns"
      :key="col.key"
      :class="['kanban-col', dragOver === col.key ? 'kanban-col--over' : '']"
      @dragover="(e) => handleDragOver(e, col.key)"
      @dragleave="handleDragLeave"
      @drop="(e) => handleDrop(e, col.key)"
    >
      <div
        class="kanban-col-header"
        :style="col.color ? { borderTop: `3px solid ${col.color}` } : undefined"
      >
        <div class="kanban-col-title">{{ col.title }}</div>
        <div class="kanban-col-meta">{{ col.meta ?? col.items.length }}</div>
      </div>
      <div class="kanban-col-body">
        <div
          v-for="item of col.items"
          :key="cardKey(item)"
          class="kanban-card"
          draggable="true"
          @dragstart="(e) => handleDragStart(e, item.id, col.key)"
          @click="emit('cardClick', item)"
        >
          <slot name="card" :item="item" :columnKey="col.key">
            <span>{{ String(item.id) }}</span>
          </slot>
        </div>
        <div v-if="col.items.length === 0" class="kanban-col-empty">Drop items here</div>
      </div>
    </div>
  </div>
</template>
