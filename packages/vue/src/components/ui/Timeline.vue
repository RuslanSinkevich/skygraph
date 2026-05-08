<script setup lang="ts">
import { computed } from 'vue'

export interface TimelineItem {
  /** Main body text content. */
  content: string
  /** Optional label text. */
  label?: string
  /** Border/text color when no custom dot is set. */
  color?: string
  /** Custom marker text (replaces default dot). */
  dot?: string
  /** Forces this item to one side. */
  position?: 'left' | 'right'
}

export interface TimelineProps {
  /** Ordered timeline steps. */
  items: TimelineItem[]
  /** Layout. @default 'left' */
  mode?: 'left' | 'right' | 'alternate'
  /** Pending tail content. Pass `true` for synthetic empty item. */
  pending?: string | boolean
  /** Reverse visual order. */
  reverse?: boolean
  /** Strips built-in styles when true. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<TimelineProps>(), {
  mode: 'left',
})

const computedItems = computed<TimelineItem[]>(() => {
  let arr = [...props.items]
  if (props.pending) {
    arr.push({
      content: typeof props.pending === 'boolean' ? '' : props.pending,
    })
  }
  if (props.reverse) arr = arr.reverse()
  return arr
})

const isPending = computed(() => !!props.pending)

function getPosition(item: TimelineItem, index: number): 'left' | 'right' {
  if (item.position) return item.position
  if (props.mode === 'alternate') return index % 2 === 0 ? 'left' : 'right'
  return props.mode
}

function itemClasses(item: TimelineItem, index: number, isLast: boolean) {
  const pos = getPosition(item, index)
  return [
    'sg-timeline-item',
    `sg-timeline-item-${pos}`,
    isPending.value && isLast ? 'sg-timeline-item-pending' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

const rootClasses = computed(() => `sg-timeline sg-timeline-${props.mode}`)
</script>

<template>
  <ul v-if="unstyled">
    <li v-for="(item, i) in computedItems" :key="i">
      <span v-if="item.label">{{ item.label }}</span>
      <span>{{ item.dot ?? '●' }}</span>
      <span>{{ item.content }}</span>
    </li>
  </ul>
  <ul v-else :class="rootClasses" role="list">
    <li
      v-for="(item, i) in computedItems"
      :key="i"
      :class="itemClasses(item, i, i === computedItems.length - 1)"
      role="listitem"
    >
      <div v-if="item.label !== undefined" class="sg-timeline-item-label">
        {{ item.label }}
      </div>
      <div class="sg-timeline-item-head-wrapper">
        <div
          :class="['sg-timeline-item-head', item.dot ? 'sg-timeline-item-head-custom' : '']"
          :style="item.color && !item.dot ? { borderColor: item.color, color: item.color } : undefined"
        >
          {{ item.dot ?? '' }}
        </div>
        <div v-if="i < computedItems.length - 1" class="sg-timeline-item-tail" />
      </div>
      <div class="sg-timeline-item-content">{{ item.content }}</div>
    </li>
  </ul>
</template>
