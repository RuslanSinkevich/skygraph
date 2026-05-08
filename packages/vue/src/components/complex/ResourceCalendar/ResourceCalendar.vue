<script setup lang="ts">
import { computed } from 'vue'
import type { Assignment, CalendarScale, ResourceCalendarProps } from './types'

const props = withDefaults(defineProps<ResourceCalendarProps>(), {
  scale: 'week',
  columnWidth: 120,
  rowHeight: 56,
  sidebarWidth: 200,
  draggable: false,
  resizable: false,
  unstyled: false,
})

const emit = defineEmits<{
  (e: 'assignment-change', next: Assignment): void
  (e: 'conflict', conflicts: Array<{ a: Assignment; b: Assignment }>): void
}>()

const MS_PER_DAY = 24 * 60 * 60 * 1000

const stepMs = (scale: CalendarScale): number => {
  switch (scale) {
    case 'day':
      return MS_PER_DAY
    case 'week':
      return MS_PER_DAY * 7
    case 'month':
      return MS_PER_DAY * 30
  }
}

const toMs = (d: Date | number) => (d instanceof Date ? d.getTime() : d)

const computedRange = computed(() => {
  if (props.range) return { from: props.range.from.getTime(), to: props.range.to.getTime() }
  if (props.assignments.length === 0) {
    const now = Date.now()
    return { from: now, to: now + stepMs(props.scale) * 4 }
  }
  let min = Infinity
  let max = -Infinity
  for (const a of props.assignments) {
    const s = toMs(a.start)
    const e = toMs(a.end)
    if (s < min) min = s
    if (e > max) max = e
  }
  const step = stepMs(props.scale)
  return { from: min - step, to: max + step }
})

const totalMs = computed(() => computedRange.value.to - computedRange.value.from)
const totalSteps = computed(() => Math.max(1, Math.ceil(totalMs.value / stepMs(props.scale))))
const calWidth = computed(() => totalSteps.value * props.columnWidth)

const headerTicks = computed(() => {
  const arr: { x: number; label: string }[] = []
  const step = stepMs(props.scale)
  for (let i = 0; i < totalSteps.value; i++) {
    const t = computedRange.value.from + i * step
    const d = new Date(t)
    let label = ''
    switch (props.scale) {
      case 'day':
        label = `${d.getUTCDate()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`
        break
      case 'week':
        label = `W${Math.ceil((d.getUTCDate() + 6) / 7)} / ${d.getUTCFullYear()}`
        break
      case 'month':
        label = `${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`
        break
    }
    arr.push({ x: i * props.columnWidth, label })
  }
  return arr
})

const conflictsByAssignment = computed(() => {
  const map = new Map<string, boolean>()
  const byResource = new Map<string, Assignment[]>()
  for (const a of props.assignments) {
    const list = byResource.get(a.resourceId) ?? []
    list.push(a)
    byResource.set(a.resourceId, list)
  }
  for (const list of byResource.values()) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i]
        const b = list[j]
        const aS = toMs(a.start)
        const aE = toMs(a.end)
        const bS = toMs(b.start)
        const bE = toMs(b.end)
        if (aS < bE && bS < aE) {
          map.set(a.id, true)
          map.set(b.id, true)
        }
      }
    }
  }
  return map
})

const blockStyle = (a: Assignment) => {
  const start = toMs(a.start)
  const end = toMs(a.end)
  const x = ((start - computedRange.value.from) / totalMs.value) * calWidth.value
  const width = Math.max(8, ((end - start) / totalMs.value) * calWidth.value)
  const isConflict = conflictsByAssignment.value.get(a.id) === true
  return {
    left: `${x}px`,
    width: `${width}px`,
    background: isConflict ? 'var(--sg-color-error, #ff4d4f)' : 'var(--sg-color-primary, #1677ff)',
  }
}

interface DragSession {
  type: 'move' | 'resize-l' | 'resize-r'
  id: string
  startX: number
  origin: { start: number; end: number }
}

let dragSession: DragSession | null = null

const onBlockPointerDown = (e: PointerEvent, a: Assignment) => {
  if (!props.draggable) return
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  dragSession = { type: 'move', id: a.id, startX: e.clientX, origin: { start: toMs(a.start), end: toMs(a.end) } }
}

const onResizePointerDown = (e: PointerEvent, a: Assignment, side: 'l' | 'r') => {
  if (!props.resizable) return
  e.stopPropagation()
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  dragSession = {
    type: side === 'l' ? 'resize-l' : 'resize-r',
    id: a.id,
    startX: e.clientX,
    origin: { start: toMs(a.start), end: toMs(a.end) },
  }
}

const onPointerMove = (e: PointerEvent) => {
  const ds = dragSession
  if (!ds) return
  const dxPx = e.clientX - ds.startX
  const dxMs = (dxPx / calWidth.value) * totalMs.value
  const step = stepMs(props.scale)
  const snappedDx = Math.round(dxMs / step) * step
  const a = props.assignments.find((x) => x.id === ds.id)
  if (!a) return
  let next: Assignment
  if (ds.type === 'move') {
    next = { ...a, start: ds.origin.start + snappedDx, end: ds.origin.end + snappedDx }
  } else if (ds.type === 'resize-l') {
    next = { ...a, start: Math.min(ds.origin.end - step, ds.origin.start + snappedDx) }
  } else {
    next = { ...a, end: Math.max(ds.origin.start + step, ds.origin.end + snappedDx) }
  }
  emit('assignment-change', next)
}

const onPointerUp = () => {
  dragSession = null
}
</script>

<template>
  <div
    :class="[!props.unstyled && 'sg-rcal', props.className]"
    :style="{ display: 'flex', overflow: 'auto', ...(props.style ?? {}) }"
    role="grid"
    aria-label="Resource calendar"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <div :class="!props.unstyled ? 'sg-rcal-sidebar' : undefined" :style="{ width: `${props.sidebarWidth}px`, flexShrink: 0 }">
      <div
        :class="!props.unstyled ? 'sg-rcal-sidebar-header' : undefined"
        :style="{ height: `${props.rowHeight}px` }"
      >
        Resource
      </div>
      <div
        v-for="r in props.resources"
        :key="r.id"
        :class="!props.unstyled ? 'sg-rcal-sidebar-row' : undefined"
        :style="{
          height: `${props.rowHeight}px`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 8px',
        }"
      >
        <span
          v-if="r.color"
          class="sg-rcal-color"
          :style="{ width: '10px', height: '10px', borderRadius: '50%', background: r.color }"
        />
        {{ r.name }}
      </div>
    </div>
    <div :class="!props.unstyled ? 'sg-rcal-body' : undefined" :style="{ flex: 1, position: 'relative' }">
      <div
        :class="!props.unstyled ? 'sg-rcal-header' : undefined"
        :style="{
          height: `${props.rowHeight}px`,
          width: `${calWidth}px`,
          position: 'relative',
          borderBottom: '1px solid #e0e0e0',
        }"
      >
        <div
          v-for="(t, i) in headerTicks"
          :key="i"
          :style="{
            position: 'absolute',
            left: `${t.x}px`,
            top: 0,
            bottom: 0,
            width: `${props.columnWidth}px`,
            borderLeft: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: '#888',
          }"
        >
          {{ t.label }}
        </div>
      </div>
      <div
        v-for="r in props.resources"
        :key="r.id"
        :data-resource-id="r.id"
        :class="!props.unstyled ? 'sg-rcal-row' : undefined"
        :style="{
          position: 'relative',
          height: `${props.rowHeight}px`,
          width: `${calWidth}px`,
          borderBottom: '1px solid #f0f0f0',
        }"
      >
        <div
          v-for="a in props.assignments.filter((x) => x.resourceId === r.id)"
          :key="a.id"
          :data-assignment-id="a.id"
          :class="[
            !props.unstyled ? 'sg-rcal-block' : undefined,
            conflictsByAssignment.get(a.id) && 'sg-rcal-block--conflict',
          ]"
          :style="{
            position: 'absolute',
            top: '6px',
            height: `${props.rowHeight - 12}px`,
            color: '#fff',
            padding: '0 6px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
            cursor: props.draggable ? 'move' : 'default',
            ...blockStyle(a),
          }"
          @pointerdown="(e) => onBlockPointerDown(e, a)"
        >
          <div
            v-if="props.resizable"
            class="sg-rcal-resize-l"
            :style="{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', cursor: 'ew-resize' }"
            @pointerdown="(e) => onResizePointerDown(e, a, 'l')"
          />
          <span class="sg-rcal-block-title">{{ a.title }}</span>
          <div
            v-if="props.resizable"
            class="sg-rcal-resize-r"
            :style="{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6px', cursor: 'ew-resize' }"
            @pointerdown="(e) => onResizePointerDown(e, a, 'r')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
