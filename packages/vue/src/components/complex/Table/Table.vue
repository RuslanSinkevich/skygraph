<script setup lang="ts">
import { computed, ref, watch, useSlots } from 'vue'
import { useTable } from '../../../composables/useTable'
import SgInput from '../../ui/Input.vue'
import SgCheckbox from '../../ui/Checkbox.vue'
import SgSelect from '../../ui/Select.vue'
import SgPagination from '../../ui/Pagination.vue'
import {
  DEFAULT_TABLE_LOCALE,
  type TableProps,
  type TableColumn,
  type RowId,
  type SortDirection,
} from './types'

const props = withDefaults(defineProps<TableProps>(), {
  bordered: false,
  size: 'middle',
  sticky: false,
  searchable: false,
  showPagination: true,
  unstyled: false,
})

const emit = defineEmits<{
  (e: 'rowClick', id: RowId, data: Record<string, unknown>): void
  (e: 'pageChange', page: number): void
  (e: 'sortChange', column: string, direction: SortDirection | null): void
}>()

defineSlots<{
  toolbar(props: Record<string, never>): unknown
  empty(props: Record<string, never>): unknown
  cell(props: {
    column: TableColumn
    row: Record<string, unknown>
    id: RowId
    value: unknown
  }): unknown
}>()

const slots = useSlots()

const localeFull = computed(() => ({ ...DEFAULT_TABLE_LOCALE, ...props.locale }))
const sCls = computed(() => props.classNames ?? {})
const sSty = computed(() => props.styles ?? {})

const visibleColumns = computed(() => props.columns.filter((c) => !c.hidden))

const {
  table,
  visibleRows,
  tableState,
  setSort,
  clearSort,
  addFilter,
  clearFilters,
  setPage,
  setFilterFn,
  refresh,
} = useTable({
  pageSize: props.pageSize,
  data: props.data,
})

watch(
  () => props.pageSize,
  (next) => {
    if (next !== undefined) {
      table.setPageSize(next)
      refresh()
    }
  },
)

watch(
  () => props.data,
  (next) => {
    table.reset()
    if (next) table.addRows(next)
    refresh()
  },
)

const searchQuery = ref('')

watch(searchQuery, (q) => {
  if (!q) {
    setFilterFn(null)
    return
  }
  const lower = q.toLowerCase()
  setFilterFn((row) => {
    return visibleColumns.value.some((col) => {
      const v = row[col.key]
      if (v === null || v === undefined) return false
      return String(v).toLowerCase().includes(lower)
    })
  })
})

const currentSort = computed(() => tableState.value.sorts[0] ?? null)

function handleSortClick(column: TableColumn) {
  if (!column.sortable) return
  const cur = currentSort.value
  let next: SortDirection | null = 'asc'
  if (cur && cur.column === column.key) {
    if (cur.direction === 'asc') next = 'desc'
    else if (cur.direction === 'desc') next = null
  }
  if (next === null) {
    clearSort()
  } else {
    setSort(column.key, next)
  }
  emit('sortChange', column.key, next)
}

const internalSelected = ref<RowId[]>([])
const selectedKeys = computed<RowId[]>(
  () => props.rowSelection?.selectedKeys ?? internalSelected.value,
)
const selectedSet = computed<Set<RowId>>(() => new Set(selectedKeys.value))

function toggleRowSelected(id: RowId) {
  if (!props.rowSelection) return
  let next: RowId[]
  if (props.rowSelection.type === 'radio') {
    next = selectedSet.value.has(id) ? [] : [id]
  } else {
    next = selectedSet.value.has(id)
      ? selectedKeys.value.filter((k) => k !== id)
      : [...selectedKeys.value, id]
  }
  internalSelected.value = next
  const rows = props.data.filter((r) => next.includes(r.id)).map((r) => r.data)
  props.rowSelection.onChange?.(next, rows)
}

const allCurrentPageSelected = computed(() => {
  if (visibleRows.value.length === 0) return false
  return visibleRows.value.every((r) => selectedSet.value.has(r.id))
})

const someCurrentPageSelected = computed(() => {
  return !allCurrentPageSelected.value && visibleRows.value.some((r) => selectedSet.value.has(r.id))
})

function toggleSelectAll() {
  if (!props.rowSelection) return
  const ids = visibleRows.value.map((r) => r.id)
  let next: RowId[]
  if (allCurrentPageSelected.value) {
    next = selectedKeys.value.filter((k) => !ids.includes(k))
  } else {
    const set = new Set(selectedKeys.value)
    for (const id of ids) set.add(id)
    next = Array.from(set)
  }
  internalSelected.value = next
  const rows = props.data.filter((r) => next.includes(r.id)).map((r) => r.data)
  props.rowSelection.onChange?.(next, rows)
}

function rowCls(row: { id: RowId; data: Record<string, unknown> }): string {
  const base = sCls.value.row ?? ''
  const extra =
    typeof props.rowClassName === 'function'
      ? props.rowClassName(row.data, row.id)
      : (props.rowClassName ?? '')
  const selected = selectedSet.value.has(row.id) ? 'sg-table-row-selected' : ''
  const clickable = 'sg-table-row-clickable'
  return ['sg-table-row', clickable, base, extra, selected].filter(Boolean).join(' ')
}

function handleRowClick(row: { id: RowId; data: Record<string, unknown> }) {
  emit('rowClick', row.id, row.data)
}

const wrapperClass = computed(() => {
  if (props.unstyled) return ''
  return [
    'sg-table-wrapper',
    'sg-table-hoverable',
    `sg-table-${props.size}`,
    props.bordered ? 'sg-table-bordered' : '',
    props.sticky ? 'sg-table-sticky' : '',
    sCls.value.root ?? '',
  ]
    .filter(Boolean)
    .join(' ')
})

const SELECTION_COL_WIDTH = '48px'

const gridTemplateColumns = computed(() => {
  const parts: string[] = []
  if (props.rowSelection) parts.push(SELECTION_COL_WIDTH)
  for (const col of visibleColumns.value) {
    parts.push(col.width ? `${col.width}px` : 'minmax(0, 1fr)')
  }
  return parts.join(' ')
})

const gridStyle = computed(() => ({
  gridTemplateColumns: gridTemplateColumns.value,
  ...(sSty.value.grid ?? {}),
}))

const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(
      tableState.value.totalRows / (props.pageSize ?? Math.max(1, tableState.value.totalRows)),
    ),
  ),
)

function gotoPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  setPage(page)
  emit('pageChange', page)
}

function applyColumnFilter(column: TableColumn, value: unknown | null) {
  if (value === null || value === undefined || value === '') {
    table.removeFilter(column.key)
  } else if (column.onFilter) {
    table.removeFilter(column.key)
    setFilterFn((row) => column.onFilter!(value, row))
  } else {
    addFilter({ column: column.key, value, operator: 'eq' })
  }
  refresh()
}

defineExpose({
  table,
  refresh,
  /** Programmatically clear all sort / filter / search state. */
  clearAll: () => {
    clearSort()
    clearFilters()
    searchQuery.value = ''
  },
})
</script>

<template>
  <div :class="wrapperClass || undefined" :style="sSty.root">
    <div
      v-if="searchable || slots.toolbar"
      :class="['sg-table-toolbar', sCls.toolbar].filter(Boolean).join(' ') || undefined"
      :style="sSty.toolbar"
    >
      <SgInput
        v-if="searchable"
        v-model="searchQuery"
        size="small"
        class="sg-table-search-input"
        :placeholder="localeFull.searchPlaceholder"
        :aria-label="localeFull.searchPlaceholder"
        allow-clear
      />
      <slot name="toolbar" />
    </div>

    <div
      :class="['sg-table-scroll', sCls.scroll].filter(Boolean).join(' ') || undefined"
      :style="sSty.scroll"
    >
      <div
        :class="['sg-table-grid', sCls.grid].filter(Boolean).join(' ') || undefined"
        :style="gridStyle"
        role="table"
      >
        <div
          :class="
            ['sg-table-row', 'sg-table-header-row', sCls.headerRow].filter(Boolean).join(' ') ||
            undefined
          "
          role="row"
          style="display: contents"
        >
          <div v-if="rowSelection" class="sg-table-th sg-table-cell-selection" role="columnheader">
            <SgCheckbox
              v-if="rowSelection.type !== 'radio'"
              :checked="allCurrentPageSelected"
              :indeterminate="someCurrentPageSelected"
              aria-label="Select all"
              @change="toggleSelectAll"
            />
          </div>
          <div
            v-for="col in visibleColumns"
            :key="col.key"
            :class="
              ['sg-table-th', col.sortable ? 'sg-table-th-sortable' : '', sCls.headerCell]
                .filter(Boolean)
                .join(' ') || undefined
            "
            :style="{
              ...(col.align
                ? {
                    justifyContent:
                      col.align === 'center'
                        ? 'center'
                        : col.align === 'right'
                          ? 'flex-end'
                          : 'flex-start',
                  }
                : {}),
              ...(sSty.headerCell ?? {}),
            }"
            role="columnheader"
            :aria-sort="
              currentSort && currentSort.column === col.key
                ? currentSort.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : col.sortable
                  ? 'none'
                  : undefined
            "
            @click="handleSortClick(col)"
          >
            <span class="sg-table-th-content">
              <span>{{ col.title }}</span>
              <span v-if="col.sortable" class="sg-table-sort-arrows">
                <span
                  :class="
                    [
                      'sg-table-sort-asc',
                      currentSort &&
                      currentSort.column === col.key &&
                      currentSort.direction === 'asc'
                        ? 'sg-table-sort-current'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  "
                  >{{ localeFull.sortAsc }}</span
                >
                <span
                  :class="
                    [
                      'sg-table-sort-desc',
                      currentSort &&
                      currentSort.column === col.key &&
                      currentSort.direction === 'desc'
                        ? 'sg-table-sort-current'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  "
                  >{{ localeFull.sortDesc }}</span
                >
              </span>
            </span>
            <span
              v-if="col.filters && col.filters.length > 0"
              class="sg-table-filter-trigger"
              @click.stop
            >
              <SgSelect
                size="small"
                class="sg-table-filter-select"
                :placeholder="localeFull.filterAll"
                :options="[
                  { label: localeFull.filterAll, value: '' },
                  ...col.filters.map((f) => ({ label: String(f.text), value: String(f.value) })),
                ]"
                :aria-label="`Filter ${col.title}`"
                @change="(v: unknown) => applyColumnFilter(col, (v as string) || null)"
              />
            </span>
          </div>
        </div>

        <div
          v-if="visibleRows.length === 0"
          class="sg-table-row sg-table-row-empty"
          role="row"
          style="display: contents"
        >
          <div
            :class="
              ['sg-table-td', 'sg-table-empty', sCls.empty].filter(Boolean).join(' ') || undefined
            "
            :style="{ gridColumn: '1 / -1', ...(sSty.empty ?? {}) }"
            role="cell"
          >
            <slot name="empty">{{ localeFull.emptyText }}</slot>
          </div>
        </div>

        <div
          v-for="row in visibleRows"
          :key="String(row.id)"
          :class="rowCls(row) || undefined"
          role="row"
          style="display: contents"
          @click="handleRowClick(row)"
        >
          <div
            v-if="rowSelection"
            class="sg-table-td sg-table-cell-selection"
            role="cell"
            @click.stop
          >
            <SgCheckbox
              v-if="rowSelection.type !== 'radio'"
              :checked="selectedSet.has(row.id)"
              :aria-label="`Select row ${String(row.id)}`"
              @change="() => toggleRowSelected(row.id)"
            />
            <input
              v-else
              type="radio"
              class="sg-table-row-radio"
              :checked="selectedSet.has(row.id)"
              name="sg-table-row-radio"
              :aria-label="`Select row ${String(row.id)}`"
              @change="() => toggleRowSelected(row.id)"
            />
          </div>
          <div
            v-for="col in visibleColumns"
            :key="col.key"
            :class="['sg-table-td', sCls.bodyCell].filter(Boolean).join(' ') || undefined"
            :style="{
              ...(col.align
                ? {
                    justifyContent:
                      col.align === 'center'
                        ? 'center'
                        : col.align === 'right'
                          ? 'flex-end'
                          : 'flex-start',
                  }
                : {}),
              ...(sSty.bodyCell ?? {}),
            }"
            role="cell"
          >
            <slot name="cell" :column="col" :row="row.data" :id="row.id" :value="row.data[col.key]">
              {{ row.data[col.key] }}
            </slot>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showPagination && pageSize !== undefined && tableState.totalRows > pageSize"
      :class="['sg-table-pagination', sCls.pagination].filter(Boolean).join(' ') || undefined"
      :style="sSty.pagination"
    >
      <span class="sg-table-pagination-total">
        {{ localeFull.totalRows(tableState.totalRows) }}
      </span>
      <SgPagination
        class="sg-table-pagination-controls"
        :current="tableState.page"
        :total="tableState.totalRows"
        :page-size="pageSize"
        simple
        @change="gotoPage"
      />
    </div>
  </div>
</template>
