<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { useConfigWithDefaults, useConfig } from './ConfigProvider.vue'

export interface PaginationProps {
  /** Current page number (1-based). */
  current: number
  /** Total number of records. */
  total: number
  /** Items per page. @default 10 */
  pageSize?: number
  /** Whether the total count is displayed. */
  showTotal?: boolean
  /** Disables all controls. */
  disabled?: boolean
  /** Renders prev/next with current/total only. */
  simple?: boolean
  /** Shows a select to change pageSize. */
  showSizeChanger?: boolean
  /** Options for the page size select. @default [10, 20, 50, 100] */
  pageSizeOptions?: number[]
  /** Shows a quick jump input. */
  showQuickJumper?: boolean
  /** Strips built-in styles when true. */
  unstyled?: boolean
}

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  pageSize: { type: Number, default: 10 },
  showTotal: { type: Boolean, default: false },
  disabled: { type: Boolean, default: undefined },
  simple: { type: Boolean, default: false },
  showSizeChanger: { type: Boolean, default: false },
  pageSizeOptions: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100],
  },
  showQuickJumper: { type: Boolean, default: false },
  unstyled: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'change', page: number): void
  (e: 'pageSizeChange', size: number): void
}>()

const { resolvedDisabled } = useConfigWithDefaults({ disabled: undefined }, {})
const disabled = computed(() => props.disabled ?? resolvedDisabled.value)
const cfg = useConfig()
const totalPrefix = computed(() => cfg.value.locale?.pagination?.totalPrefix ?? 'Total')
const itemsPerPageLabel = computed(
  () => cfg.value.locale?.pagination?.itemsPerPage ?? '/ page',
)
const jumpLabel = computed(() => cfg.value.locale?.pagination?.jump ?? 'Go to')

const jumpValue = ref('')

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const safeCurrent = computed(() =>
  Math.min(Math.max(1, props.current), totalPages.value),
)

function go(page: number) {
  if (
    disabled.value ||
    page < 1 ||
    page > totalPages.value ||
    page === safeCurrent.value
  ) {
    return
  }
  emit('change', page)
}

function handleJump() {
  const num = parseInt(jumpValue.value, 10)
  if (!Number.isNaN(num)) {
    go(num)
  }
  jumpValue.value = ''
}

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

const pages = computed(() => buildPages(safeCurrent.value, totalPages.value))

const rootClasses = computed(() =>
  ['sg-pagination', disabled.value ? 'sg-pagination-disabled' : '']
    .filter(Boolean)
    .join(' '),
)

const simpleClasses = computed(() =>
  [
    'sg-pagination',
    'sg-pagination-simple',
    disabled.value ? 'sg-pagination-disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <nav
    v-if="unstyled"
    aria-label="Pagination"
  >
    <button
      type="button"
      :disabled="safeCurrent <= 1"
      @click="go(safeCurrent - 1)"
    >
      ‹
    </button>
    <template v-for="(p, i) in pages" :key="`p${i}-${p}`">
      <span v-if="p === '...'">…</span>
      <button
        v-else
        type="button"
        :aria-current="p === safeCurrent ? 'page' : undefined"
        @click="go(p as number)"
      >
        {{ p }}
      </button>
    </template>
    <button
      type="button"
      :disabled="safeCurrent >= totalPages"
      @click="go(safeCurrent + 1)"
    >
      ›
    </button>
  </nav>
  <nav v-else-if="simple" :class="simpleClasses" aria-label="Pagination">
    <button
      type="button"
      class="sg-pagination-item sg-pagination-prev"
      :disabled="safeCurrent <= 1"
      @click="go(safeCurrent - 1)"
    >
      ‹
    </button>
    <span class="sg-pagination-simple-pager">{{ safeCurrent }} / {{ totalPages }}</span>
    <button
      type="button"
      class="sg-pagination-item sg-pagination-next"
      :disabled="safeCurrent >= totalPages"
      @click="go(safeCurrent + 1)"
    >
      ›
    </button>
  </nav>
  <nav v-else :class="rootClasses" aria-label="Pagination">
    <span v-if="showTotal" class="sg-pagination-total">{{ totalPrefix }} {{ total }}</span>
    <button
      type="button"
      class="sg-pagination-item sg-pagination-prev"
      :disabled="safeCurrent <= 1"
      @click="go(safeCurrent - 1)"
    >
      ‹
    </button>
    <template v-for="(p, i) in pages" :key="`p${i}-${p}`">
      <span v-if="p === '...'" class="sg-pagination-ellipsis">…</span>
      <button
        v-else
        type="button"
        :class="`sg-pagination-item${p === safeCurrent ? ' sg-pagination-item-active' : ''}`"
        :aria-current="p === safeCurrent ? 'page' : undefined"
        @click="go(p as number)"
      >
        {{ p }}
      </button>
    </template>
    <button
      type="button"
      class="sg-pagination-item sg-pagination-next"
      :disabled="safeCurrent >= totalPages"
      @click="go(safeCurrent + 1)"
    >
      ›
    </button>
    <select
      v-if="showSizeChanger"
      class="sg-pagination-size-changer"
      :value="pageSize"
      :disabled="disabled"
      @change="emit('pageSizeChange', Number(($event.target as HTMLSelectElement).value))"
    >
      <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
        {{ opt }} {{ itemsPerPageLabel }}
      </option>
    </select>
    <span v-if="showQuickJumper" class="sg-pagination-quick-jumper">
      {{ jumpLabel }}
      <input
        type="text"
        class="sg-pagination-jumper-input"
        :value="jumpValue"
        :disabled="disabled"
        @input="jumpValue = ($event.target as HTMLInputElement).value"
        @keydown.enter="handleJump"
        @blur="handleJump"
      />
    </span>
  </nav>
</template>
