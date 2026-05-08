<script setup lang="ts">
import { computed, ref, watch, useSlots } from 'vue'
import { useTable } from '../../../composables/useTable'
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
  cell(props: { column: TableColumn; row: Record<string, unknown>; id: RowId; value: unknown }): unknown
}>()

const slots = useSlots()

const localeFull = computed(() => ({ ...DEFAULT_TABLE_LOCALE, ...props.locale }))
const sCls = computed(() => props.classNames ?? {})
const sSty = computed(() => props.styles ?? {})

const visibleColumns = computed(() => props.columns.filter((c) => !c.hidden))

const { table, visibleRows, tableState, setSort, clearSort, addFilter, clearFilters, setPage, setFilterFn, refresh } = useTable({
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

const sortIndicator = (column: TableColumn): string => {
  if (!column.sortable) return ''
  const cur = currentSort.value
  if (!cur || cur.column !== column.key) return ''
  return cur.direction === 'asc' ? localeFull.value.sortAsc : localeFull.value.sortDesc
}

const internalSelected = ref<RowId[]>([])
const selectedKeys = computed<RowId[]>(() => props.rowSelection?.selectedKeys ?? internalSelected.value)
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
  const extra = typeof props.rowClassName === 'function'
    ? props.rowClassName(row.data, row.id)
    : (props.rowClassName ?? '')
  const selected = selectedSet.value.has(row.id) ? 'sg-table-row-selected' : ''
  return ['sg-table-row', base, extra, selected].filter(Boolean).join(' ')
}

function handleRowClick(row: { id: RowId; data: Record<string, unknown> }) {
  emit('rowClick', row.id, row.data)
}

const wrapperClass = computed(() => {
  if (props.unstyled) return ''
  return [
    'sg-table',
    `sg-table-${props.size}`,
    props.bordered ? 'sg-table-bordered' : '',
    props.sticky ? 'sg-table-sticky' : '',
    sCls.value.root ?? '',
  ].filter(Boolean).join(' ')
})

const totalPages = computed(() => Math.max(1, Math.ceil(tableState.value.totalRows / (props.pageSize ?? Math.max(1, tableState.value.totalRows)))))

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
      <input
        v-if="searchable"
        v-model="searchQuery"
        class="sg-table-search-input"
        type="search"
        :placeholder="localeFull.searchPlaceholder"
        :aria-label="localeFull.searchPlaceholder"
      />
      <slot name="toolbar" />
    </div>

    <div
      :class="['sg-table-scroll', sCls.scroll].filter(Boolean).join(' ') || undefined"
      :style="sSty.scroll"
    >
      <table
        :class="['sg-table-grid', sCls.grid].filter(Boolean).join(' ') || undefined"
        :style="sSty.grid"
        role="table"
      >
        <thead>
          <tr :class="['sg-table-header-row', sCls.headerRow].filter(Boolean).join(' ') || undefined">
            <th
              v-if="rowSelection"
              class="sg-table-header-cell sg-table-cell-selection"
              scope="col"
            >
              <input
                v-if="rowSelection.type !== 'radio'"
                type="checkbox"
                :checked="allCurrentPageSelected"
                :indeterminate.prop="someCurrentPageSelected"
                aria-label="Select all"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="col in visibleColumns"
              :key="col.key"
              :class="[
                'sg-table-header-cell',
                col.sortable ? 'sg-table-header-cell-sortable' : '',
                col.align ? `sg-table-cell-align-${col.align}` : '',
                sCls.headerCell,
              ].filter(Boolean).join(' ') || undefined"
              :style="{ width: col.width ? `${col.width}px` : undefined, ...sSty.headerCell }"
              :role="col.sortable ? 'columnheader' : undefined"
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
              <span class="sg-table-header-cell-content">
                {{ col.title }}
                <span v-if="col.sortable" class="sg-table-sort-indicator">{{ sortIndicator(col) }}</span>
              </span>
              <span v-if="col.filters && col.filters.length > 0" class="sg-table-filter-trigger">
                <select
                  class="sg-table-filter-select"
                  :aria-label="`Filter ${col.title}`"
                  @click.stop
                  @change="(e: Event) => applyColumnFilter(col, (e.target as HTMLSelectElement).value || null)"
                >
                  <option value="">All</option>
                  <option v-for="f in col.filters" :key="String(f.value)" :value="String(f.value)">{{ f.text }}</option>
                </select>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="visibleRows.length === 0">
            <td
              :colspan="visibleColumns.length + (rowSelection ? 1 : 0)"
              :class="['sg-table-empty', sCls.empty].filter(Boolean).join(' ') || undefined"
              :style="sSty.empty"
            >
              <slot name="empty">{{ localeFull.emptyText }}</slot>
            </td>
          </tr>
          <tr
            v-for="row in visibleRows"
            :key="String(row.id)"
            :class="rowCls(row) || undefined"
            @click="handleRowClick(row)"
          >
            <td
              v-if="rowSelection"
              class="sg-table-cell sg-table-cell-selection"
              @click.stop
            >
              <input
                :type="rowSelection.type === 'radio' ? 'radio' : 'checkbox'"
                :checked="selectedSet.has(row.id)"
                :name="rowSelection.type === 'radio' ? 'sg-table-row-radio' : undefined"
                :aria-label="`Select row ${String(row.id)}`"
                @change="() => toggleRowSelected(row.id)"
              />
            </td>
            <td
              v-for="col in visibleColumns"
              :key="col.key"
              :class="[
                'sg-table-cell',
                col.align ? `sg-table-cell-align-${col.align}` : '',
                sCls.bodyCell,
              ].filter(Boolean).join(' ') || undefined"
              :style="sSty.bodyCell"
            >
              <slot name="cell" :column="col" :row="row.data" :id="row.id" :value="row.data[col.key]">
                {{ row.data[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showPagination && pageSize !== undefined && tableState.totalRows > pageSize"
      :class="['sg-table-pagination', sCls.pagination].filter(Boolean).join(' ') || undefined"
      :style="sSty.pagination"
    >
      <span class="sg-table-pagination-info">
        {{ localeFull.totalRows(tableState.totalRows) }}
      </span>
      <button
        type="button"
        class="sg-table-pagination-prev"
        :disabled="tableState.page <= 1"
        @click="gotoPage(tableState.page - 1)"
      >‹</button>
      <span class="sg-table-pagination-page">{{ tableState.page }} / {{ totalPages }}</span>
      <button
        type="button"
        class="sg-table-pagination-next"
        :disabled="tableState.page >= totalPages"
        @click="gotoPage(tableState.page + 1)"
      >›</button>
    </div>
  </div>
</template>
