<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch, useSlots } from 'vue'
import { useTable } from '../../../composables/useTable'
import SgInput from '../../ui/Input.vue'
import SgCheckbox from '../../ui/Checkbox.vue'
import SgSelect from '../../ui/Select.vue'
import SgPagination from '../../ui/Pagination.vue'
import SgSpin from '../../ui/Spin.vue'
import {
  DEFAULT_TABLE_LOCALE,
  type TableProps,
  type TableColumn,
  type RowId,
  type SortDirection,
  type FilterDropdownSlotProps,
  type SummaryCell,
} from './types'

const props = withDefaults(defineProps<TableProps>(), {
  bordered: false,
  size: 'middle',
  sticky: false,
  searchable: false,
  showPagination: true,
  unstyled: false,
  loading: false,
  highlightOnHover: true,
})

const emit = defineEmits<{
  (e: 'rowClick', id: RowId, data: Record<string, unknown>): void
  (e: 'pageChange', page: number): void
  (e: 'sortChange', column: string, direction: SortDirection | null): void
  (e: 'cellEdit', id: RowId, column: string, value: unknown): void
  (e: 'expand', expanded: boolean, id: RowId): void
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
  expandedRow(props: { row: Record<string, unknown>; id: RowId }): unknown
  filterDropdown(props: FilterDropdownSlotProps & { column: TableColumn }): unknown
}>()

const slots = useSlots()

const localeFull = computed(() => ({ ...DEFAULT_TABLE_LOCALE, ...props.locale }))
const sCls = computed(() => props.classNames ?? {})
const sSty = computed(() => props.styles ?? {})

/* -------------------------------------------------------------------------- */
/* Column flattening + header grid                                            */
/* -------------------------------------------------------------------------- */

interface HeaderCell {
  col: TableColumn
  colSpan: number
  rowSpan: number
}

function getColumnDepth(col: TableColumn): number {
  if (!col.children || col.children.length === 0) return 1
  return 1 + Math.max(...col.children.map(getColumnDepth))
}

function getLeafCount(col: TableColumn): number {
  if (!col.children || col.children.length === 0) return col.hidden ? 0 : 1
  return col.children.reduce((sum, c) => sum + getLeafCount(c), 0)
}

const headerDepth = computed(() => {
  if (props.columns.length === 0) return 1
  return Math.max(...props.columns.map(getColumnDepth))
})

const leafColumns = computed<TableColumn[]>(() => {
  const out: TableColumn[] = []
  const visit = (col: TableColumn) => {
    if (col.hidden) return
    if (!col.children || col.children.length === 0) out.push(col)
    else col.children.forEach(visit)
  }
  props.columns.forEach(visit)
  return out
})

const headerRows = computed<HeaderCell[][]>(() => {
  const depth = headerDepth.value
  const rows: HeaderCell[][] = Array.from({ length: depth }, () => [])
  const visit = (col: TableColumn, level: number) => {
    if (col.hidden) return
    const hasChildren = !!(col.children && col.children.length > 0)
    if (hasChildren) {
      const span = getLeafCount(col)
      if (span > 0) {
        rows[level].push({ col, colSpan: span, rowSpan: 1 })
        col.children!.forEach((c) => visit(c, level + 1))
      }
    } else {
      rows[level].push({ col, colSpan: 1, rowSpan: depth - level })
    }
  }
  props.columns.forEach((c) => visit(c, 0))
  return rows
})

const visibleColumns = computed(() => leafColumns.value)

/* -------------------------------------------------------------------------- */
/* Engine wiring                                                              */
/* -------------------------------------------------------------------------- */

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
  columnWidths,
  setColumnWidth,
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

/* -------------------------------------------------------------------------- */
/* Global search                                                              */
/* -------------------------------------------------------------------------- */

const internalSearch = ref('')

const searchQuery = computed<string>({
  get: () => (props.searchValue !== undefined ? props.searchValue : internalSearch.value),
  set: (v) => {
    if (props.searchValue === undefined) internalSearch.value = v
  },
})

watch(
  searchQuery,
  (q) => {
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
  },
  { immediate: true },
)

/* -------------------------------------------------------------------------- */
/* Sorting                                                                    */
/* -------------------------------------------------------------------------- */

const currentSort = computed(() => tableState.value.sorts[0] ?? null)

function handleSortClick(column: TableColumn) {
  if (!column.sortable) return
  const cur = currentSort.value
  let next: SortDirection | null = 'asc'
  if (cur && cur.column === column.key) {
    if (cur.direction === 'asc') next = 'desc'
    else if (cur.direction === 'desc') next = null
  }
  if (next === null) clearSort()
  else setSort(column.key, next)
  emit('sortChange', column.key, next)
}

/* -------------------------------------------------------------------------- */
/* Selection                                                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Tree mode (children rows)                                                  */
/* -------------------------------------------------------------------------- */

interface FlatRow {
  id: RowId
  data: Record<string, unknown>
  depth: number
  hasChildren: boolean
  parentIds: RowId[]
}

const treeChildField = computed(() => props.tree?.childrenColumnName ?? 'children')
const treeIndent = computed(() => props.tree?.indentSize ?? 16)

const treeExpanded = ref<Set<RowId>>(new Set())

function initTreeExpanded() {
  if (!props.tree) return
  if (props.tree.defaultExpandAllRows) {
    const ids = new Set<RowId>()
    const visit = (rows: Array<{ id: RowId; data: Record<string, unknown> }>) => {
      for (const r of rows) {
        const children = (r.data as Record<string, unknown>)[treeChildField.value] as
          | Array<{ id: RowId; data: Record<string, unknown> }>
          | undefined
        if (children && children.length > 0) {
          ids.add(r.id)
          visit(children)
        }
      }
    }
    visit(props.data ?? [])
    treeExpanded.value = ids
  }
}
onMounted(initTreeExpanded)
watch(() => props.tree?.defaultExpandAllRows, initTreeExpanded)

function toggleTreeRow(id: RowId) {
  const next = new Set(treeExpanded.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  treeExpanded.value = next
}

const flatRows = computed<FlatRow[]>(() => {
  if (!props.tree) {
    return visibleRows.value.map((r) => ({
      id: r.id,
      data: r.data,
      depth: 0,
      hasChildren: false,
      parentIds: [],
    }))
  }
  const out: FlatRow[] = []
  const childField = treeChildField.value
  const visit = (
    rows: Array<{ id: RowId; data: Record<string, unknown> }>,
    depth: number,
    parentIds: RowId[],
  ) => {
    for (const r of rows) {
      const children = r.data[childField] as
        | Array<{ id: RowId; data: Record<string, unknown> }>
        | undefined
      const has = !!(children && children.length > 0)
      out.push({ id: r.id, data: r.data, depth, hasChildren: has, parentIds })
      if (has && treeExpanded.value.has(r.id)) {
        visit(children!, depth + 1, [...parentIds, r.id])
      }
    }
  }
  visit(visibleRows.value, 0, [])
  return out
})

/* -------------------------------------------------------------------------- */
/* Expandable rows                                                            */
/* -------------------------------------------------------------------------- */

const internalExpanded = ref<Set<RowId>>(new Set())

onMounted(() => {
  const exp = props.expandable
  if (exp?.defaultExpandedRowKeys) {
    internalExpanded.value = new Set(exp.defaultExpandedRowKeys)
  }
})

const expandedSet = computed<Set<RowId>>(() => {
  const exp = props.expandable
  if (exp?.expandedKeys) return new Set(exp.expandedKeys)
  return internalExpanded.value
})

function toggleExpand(id: RowId) {
  const exp = props.expandable
  if (!exp) return
  const wasExpanded = expandedSet.value.has(id)
  const isControlled = exp.expandedKeys !== undefined
  if (!isControlled) {
    const next = new Set(internalExpanded.value)
    if (wasExpanded) next.delete(id)
    else next.add(id)
    internalExpanded.value = next
  }
  exp.onExpand?.(!wasExpanded, id)
  emit('expand', !wasExpanded, id)
}

function isRowExpandable(row: Record<string, unknown>): boolean {
  const exp = props.expandable
  if (!exp) return false
  if (exp.rowExpandable) return exp.rowExpandable(row)
  return true
}

/* -------------------------------------------------------------------------- */
/* Per-column filters                                                         */
/* -------------------------------------------------------------------------- */

interface ColumnFilterState {
  values: unknown[]
}

const colFilterState = ref<Map<string, ColumnFilterState>>(new Map())

const customFns = ref<Map<string, (row: Record<string, unknown>) => boolean>>(new Map())

function rebuildCustomFilter() {
  const fns = Array.from(customFns.value.values())
  if (fns.length === 0 && !searchQuery.value) {
    setFilterFn(null)
    return
  }
  const lowerSearch = searchQuery.value.toLowerCase()
  setFilterFn((row) => {
    if (lowerSearch) {
      const matchSearch = visibleColumns.value.some((col) => {
        const v = row[col.key]
        return v != null && String(v).toLowerCase().includes(lowerSearch)
      })
      if (!matchSearch) return false
    }
    for (const fn of fns) {
      if (!fn(row)) return false
    }
    return true
  })
}

function applyColumnFilter(column: TableColumn, values: unknown[]) {
  if (!values || values.length === 0) {
    colFilterState.value.delete(column.key)
    customFns.value.delete(column.key)
    table.removeFilter(column.key)
  } else {
    colFilterState.value.set(column.key, { values })
    if (column.onFilter) {
      const onFilter = column.onFilter
      customFns.value.set(column.key, (row) => values.some((v) => onFilter(v, row)))
    } else {
      customFns.value.delete(column.key)
      addFilter({ column: column.key, value: values[0], operator: 'eq' })
    }
  }
  rebuildCustomFilter()
  refresh()
}

const openFilterColumn = ref<string | null>(null)

function toggleFilterDropdown(key: string) {
  openFilterColumn.value = openFilterColumn.value === key ? null : key
}

function closeFilterDropdown() {
  openFilterColumn.value = null
}

const headerRefs = ref<Map<string, HTMLElement>>(new Map())
function setHeaderRef(key: string, el: Element | null) {
  if (el) headerRefs.value.set(key, el as HTMLElement)
  else headerRefs.value.delete(key)
}

function onDocClick(ev: MouseEvent) {
  if (!openFilterColumn.value) return
  const el = headerRefs.value.get(openFilterColumn.value)
  if (el && el.contains(ev.target as Node)) return
  closeFilterDropdown()
}
onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))

/* -------------------------------------------------------------------------- */
/* Resizable columns                                                          */
/* -------------------------------------------------------------------------- */

const resizingKey = ref<string | null>(null)
let resizeStartX = 0
let resizeStartWidth = 0

function onResizeStart(col: TableColumn, ev: MouseEvent) {
  ev.preventDefault()
  ev.stopPropagation()
  resizingKey.value = col.key
  resizeStartX = ev.clientX
  resizeStartWidth =
    columnWidths.value[col.key] ??
    col.width ??
    headerRefs.value.get(col.key)?.getBoundingClientRect().width ??
    150
  document.addEventListener('mousemove', onResizeMove)
  document.addEventListener('mouseup', onResizeEnd)
}
function onResizeMove(ev: MouseEvent) {
  if (!resizingKey.value) return
  const delta = ev.clientX - resizeStartX
  const min = props.columns.find((c) => c.key === resizingKey.value)?.minWidth ?? 50
  const next = Math.max(min, resizeStartWidth + delta)
  setColumnWidth(resizingKey.value, next)
}
function onResizeEnd() {
  resizingKey.value = null
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
}

/* -------------------------------------------------------------------------- */
/* Editable cells                                                             */
/* -------------------------------------------------------------------------- */

const editingCell = ref<{ id: RowId; key: string } | null>(null)
const editingValue = ref<string>('')

function startEdit(id: RowId, key: string, value: unknown) {
  editingCell.value = { id, key }
  editingValue.value = value == null ? '' : String(value)
  void nextTick(() => {
    const input = document.querySelector<HTMLInputElement>('.sg-table-edit-input')
    input?.focus()
    input?.select()
  })
}

function commitEdit() {
  if (!editingCell.value) return
  const { id, key } = editingCell.value
  const value = editingValue.value
  emit('cellEdit', id, key, value)
  props.onCellEdit?.(id, key, value)
  editingCell.value = null
}

function cancelEdit() {
  editingCell.value = null
}

/* -------------------------------------------------------------------------- */
/* Layout / grid template                                                     */
/* -------------------------------------------------------------------------- */

const SELECTION_COL_WIDTH = '48px'
const EXPAND_COL_WIDTH = '40px'

function colWidth(col: TableColumn): string {
  const w = columnWidths.value[col.key] ?? col.width
  if (w) return `${w}px`
  return 'minmax(0, 1fr)'
}

const gridTemplateColumns = computed(() => {
  const parts: string[] = []
  if (props.expandable) parts.push(EXPAND_COL_WIDTH)
  if (props.rowSelection) parts.push(SELECTION_COL_WIDTH)
  for (const col of leafColumns.value) parts.push(colWidth(col))
  return parts.join(' ')
})

const gridStyle = computed(() => ({
  gridTemplateColumns: gridTemplateColumns.value,
  ...(sSty.value.grid ?? {}),
}))

/* -------------------------------------------------------------------------- */
/* Fixed columns offsets                                                      */
/* -------------------------------------------------------------------------- */

interface FixedOffsets {
  left: Record<string, number>
  right: Record<string, number>
}

const fixedOffsets = computed<FixedOffsets>(() => {
  const left: Record<string, number> = {}
  const right: Record<string, number> = {}
  let leftSum = 0
  if (props.expandable) leftSum += parseInt(EXPAND_COL_WIDTH)
  if (props.rowSelection) leftSum += parseInt(SELECTION_COL_WIDTH)
  for (const col of leafColumns.value) {
    if (col.fixed === 'left') {
      left[col.key] = leftSum
      leftSum += columnWidths.value[col.key] ?? col.width ?? 150
    }
  }
  let rightSum = 0
  for (const col of [...leafColumns.value].reverse()) {
    if (col.fixed === 'right') {
      right[col.key] = rightSum
      rightSum += columnWidths.value[col.key] ?? col.width ?? 150
    }
  }
  return { left, right }
})

function colFixedStyle(col: TableColumn) {
  if (col.fixed === 'left') {
    return {
      position: 'sticky',
      left: `${fixedOffsets.value.left[col.key] ?? 0}px`,
      zIndex: 2,
      background: 'var(--sg-color-bg-elevated, #fff)',
    }
  }
  if (col.fixed === 'right') {
    return {
      position: 'sticky',
      right: `${fixedOffsets.value.right[col.key] ?? 0}px`,
      zIndex: 2,
      background: 'var(--sg-color-bg-elevated, #fff)',
    }
  }
  return {}
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Summary / footer aggregates                                                */
/* -------------------------------------------------------------------------- */

const summaryRows = computed<SummaryCell[][]>(() =>
  props.summary ? props.summary(visibleRows.value) : [],
)

function aggregateValue(col: TableColumn): unknown {
  if (!col.aggregate) return null
  const values = visibleRows.value.map((r) => r.data[col.key])
  if (typeof col.aggregate === 'function') return col.aggregate(values)
  switch (col.aggregate) {
    case 'sum': {
      let s = 0
      for (const v of values) {
        const n = Number(v)
        if (!Number.isNaN(n)) s += n
      }
      return s
    }
    case 'avg': {
      let s = 0
      let c = 0
      for (const v of values) {
        const n = Number(v)
        if (!Number.isNaN(n)) {
          s += n
          c += 1
        }
      }
      return c > 0 ? Math.round((s / c) * 100) / 100 : 0
    }
    case 'count':
      return values.length
    case 'min': {
      let m = Infinity
      for (const v of values) {
        const n = Number(v)
        if (!Number.isNaN(n) && n < m) m = n
      }
      return m === Infinity ? 0 : m
    }
    case 'max': {
      let m = -Infinity
      for (const v of values) {
        const n = Number(v)
        if (!Number.isNaN(n) && n > m) m = n
      }
      return m === -Infinity ? 0 : m
    }
  }
  return null
}

/* -------------------------------------------------------------------------- */
/* Virtual scroll                                                             */
/* -------------------------------------------------------------------------- */

const virtualConfig = computed(() => {
  if (!props.virtual) return null
  const v = props.virtual
  const isObj = typeof v === 'object'
  return {
    rowHeight: isObj ? (v.rowHeight ?? 40) : 40,
    estimateRowHeight: isObj ? v.estimateRowHeight : undefined,
    overscan: isObj ? (v.overscan ?? 6) : 6,
    height: isObj ? v.height : undefined,
  }
})

const scrollEl = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const viewportHeight = ref(0)

function onVirtualScroll(ev: Event) {
  scrollTop.value = (ev.target as HTMLElement).scrollTop
}

onMounted(() => {
  if (!virtualConfig.value || !scrollEl.value) return
  viewportHeight.value =
    typeof virtualConfig.value.height === 'number'
      ? virtualConfig.value.height
      : scrollEl.value.clientHeight || 320
})

watch(virtualConfig, () => {
  if (virtualConfig.value && scrollEl.value) {
    viewportHeight.value =
      typeof virtualConfig.value.height === 'number'
        ? virtualConfig.value.height
        : scrollEl.value.clientHeight || 320
  }
})

function rowHeightAt(row: FlatRow): number {
  const cfg = virtualConfig.value
  if (!cfg) return 40
  if (typeof cfg.rowHeight === 'function') return cfg.rowHeight(row.data, row.id)
  return cfg.rowHeight as number
}

const virtualWindow = computed(() => {
  const cfg = virtualConfig.value
  if (!cfg) return null
  const rows = flatRows.value
  let total = 0
  const offsets: number[] = []
  for (const r of rows) {
    offsets.push(total)
    total += rowHeightAt(r)
  }
  const top = scrollTop.value
  const bottom = top + viewportHeight.value
  let start = 0
  while (start < rows.length && offsets[start] + rowHeightAt(rows[start]) < top) start++
  let end = start
  while (end < rows.length && offsets[end] < bottom) end++
  start = Math.max(0, start - cfg.overscan)
  end = Math.min(rows.length, end + cfg.overscan)
  return { start, end, totalHeight: total, offsets }
})

const visibleVirtualRows = computed(() => {
  if (!virtualWindow.value) return null
  const { start, end, offsets } = virtualWindow.value
  return flatRows.value.slice(start, end).map((row, i) => ({
    row,
    offset: offsets[start + i],
  }))
})

/* -------------------------------------------------------------------------- */
/* Misc layout                                                                */
/* -------------------------------------------------------------------------- */

function rowCls(row: FlatRow, idx: number): string {
  const base = sCls.value.row ?? ''
  const extra =
    typeof props.rowClassName === 'function'
      ? props.rowClassName(row.data, row.id)
      : (props.rowClassName ?? '')
  const selected = selectedSet.value.has(row.id) ? 'sg-table-row-selected' : ''
  const striped = props.striped && idx % 2 === 1 ? 'sg-table-row-striped' : ''
  const clickable = 'sg-table-row-clickable'
  return ['sg-table-row', clickable, base, extra, selected, striped].filter(Boolean).join(' ')
}

function handleRowClick(row: FlatRow) {
  emit('rowClick', row.id, row.data)
}

const wrapperClass = computed(() => {
  if (props.unstyled) return ''
  return [
    'sg-table-wrapper',
    props.highlightOnHover ? 'sg-table-hoverable' : '',
    `sg-table-${props.size}`,
    props.bordered ? 'sg-table-bordered' : '',
    props.sticky ? 'sg-table-sticky' : '',
    props.loading ? 'sg-table-loading' : '',
    props.striped ? 'sg-table-striped' : '',
    sCls.value.root ?? '',
  ]
    .filter(Boolean)
    .join(' ')
})

const scrollStyle = computed<Record<string, string | number>>(() => {
  const out: Record<string, string | number> = { ...(sSty.value.scroll ?? {}) }
  if (props.scroll?.x) out.maxWidth = '100%'
  if (props.scroll?.y) {
    out.maxHeight = typeof props.scroll.y === 'number' ? `${props.scroll.y}px` : props.scroll.y
    out.overflowY = 'auto'
  }
  if (virtualConfig.value) {
    const h = virtualConfig.value.height
    out.maxHeight = h !== undefined ? (typeof h === 'number' ? `${h}px` : h) : '320px'
    out.height = out.maxHeight
    out.overflowY = 'auto'
  }
  return out
})

const innerWidthStyle = computed<Record<string, string>>(() => {
  if (!props.scroll?.x) return {} as Record<string, string>
  return { minWidth: typeof props.scroll.x === 'number' ? `${props.scroll.x}px` : props.scroll.x }
})

defineExpose({
  table,
  refresh,
  clearAll: () => {
    clearSort()
    clearFilters()
    customFns.value.clear()
    colFilterState.value.clear()
    internalSearch.value = ''
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
      ref="scrollEl"
      :class="['sg-table-scroll', sCls.scroll].filter(Boolean).join(' ') || undefined"
      :style="scrollStyle"
      :aria-busy="loading || undefined"
      @scroll="onVirtualScroll"
    >
      <div :style="innerWidthStyle">
        <div
          :class="['sg-table-grid', sCls.grid].filter(Boolean).join(' ') || undefined"
          :style="gridStyle"
          role="table"
        >
          <!-- HEADER (multi-row supported via columnGroups) -->
          <template v-for="(headerRow, rowIdx) in headerRows" :key="`hr-${rowIdx}`">
            <div
              :class="
                ['sg-table-row', 'sg-table-header-row', sCls.headerRow].filter(Boolean).join(' ') ||
                undefined
              "
              role="row"
              style="display: contents"
            >
              <!-- expand placeholder header -->
              <div
                v-if="rowIdx === 0 && expandable"
                class="sg-table-th sg-table-cell-expand"
                role="columnheader"
                :style="{
                  gridRow: `span ${headerDepth}`,
                  position: 'sticky',
                  left: '0',
                  zIndex: 3,
                  background: 'var(--sg-color-bg-elevated, #fff)',
                }"
              />
              <!-- selection placeholder header -->
              <div
                v-if="rowIdx === 0 && rowSelection"
                class="sg-table-th sg-table-cell-selection"
                role="columnheader"
                :style="{
                  gridRow: `span ${headerDepth}`,
                  ...(expandable
                    ? {}
                    : {
                        position: 'sticky',
                        left: '0',
                        zIndex: 3,
                        background: 'var(--sg-color-bg-elevated, #fff)',
                      }),
                }"
              >
                <SgCheckbox
                  v-if="rowSelection.type !== 'radio'"
                  :checked="allCurrentPageSelected"
                  :indeterminate="someCurrentPageSelected"
                  aria-label="Select all"
                  @change="toggleSelectAll"
                />
              </div>
              <div
                v-for="cell in headerRow"
                :key="`${rowIdx}-${cell.col.key}`"
                :ref="(el) => setHeaderRef(cell.col.key, el as Element | null)"
                :class="
                  [
                    'sg-table-th',
                    cell.col.sortable ? 'sg-table-th-sortable' : '',
                    cell.col.children ? 'sg-table-th-group' : '',
                    cell.col.fixed ? `sg-table-th-fixed sg-table-th-fixed-${cell.col.fixed}` : '',
                    sCls.headerCell,
                  ]
                    .filter(Boolean)
                    .join(' ') || undefined
                "
                :style="{
                  gridColumn: `span ${cell.colSpan}`,
                  ...(cell.rowSpan > 1 ? { gridRow: `span ${cell.rowSpan}` } : {}),
                  ...(cell.col.align
                    ? {
                        justifyContent:
                          cell.col.align === 'center'
                            ? 'center'
                            : cell.col.align === 'right'
                              ? 'flex-end'
                              : 'flex-start',
                      }
                    : {}),
                  ...(colFixedStyle(cell.col) as any),
                  ...(sSty.headerCell ?? {}),
                }"
                role="columnheader"
                :aria-sort="
                  currentSort && currentSort.column === cell.col.key
                    ? currentSort.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : cell.col.sortable
                      ? 'none'
                      : undefined
                "
                @click="handleSortClick(cell.col)"
              >
                <span class="sg-table-th-content">
                  <span>{{ cell.col.title }}</span>
                  <span v-if="cell.col.sortable" class="sg-table-sort-arrows">
                    <span
                      :class="
                        [
                          'sg-table-sort-asc',
                          currentSort &&
                          currentSort.column === cell.col.key &&
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
                          currentSort.column === cell.col.key &&
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

                <!-- preset filters (built-in) -->
                <span
                  v-if="cell.col.filters && cell.col.filters.length > 0 && !slots.filterDropdown"
                  class="sg-table-filter-trigger"
                  @click.stop
                >
                  <SgSelect
                    size="small"
                    class="sg-table-filter-select"
                    :placeholder="localeFull.filterAll"
                    :options="[
                      { label: localeFull.filterAll, value: '' },
                      ...cell.col.filters.map((f) => ({
                        label: String(f.text),
                        value: String(f.value),
                      })),
                    ]"
                    :aria-label="`Filter ${cell.col.title}`"
                    @change="(v: unknown) => applyColumnFilter(cell.col, v ? [v as string] : [])"
                  />
                </span>

                <!-- custom filter dropdown via slot -->
                <span v-if="slots.filterDropdown" class="sg-table-filter-trigger" @click.stop>
                  <button
                    type="button"
                    class="sg-table-filter-icon"
                    :class="{
                      'sg-table-filter-icon-active': colFilterState.get(cell.col.key),
                    }"
                    :aria-label="`Filter ${cell.col.title}`"
                    @click="toggleFilterDropdown(cell.col.key)"
                  >
                    {{ localeFull.filterIcon }}
                  </button>
                  <div v-if="openFilterColumn === cell.col.key" class="sg-table-filter-dropdown">
                    <slot
                      name="filterDropdown"
                      :column="cell.col"
                      :selected-keys="colFilterState.get(cell.col.key)?.values ?? []"
                      :set-selected-keys="
                        (keys: unknown[]) => colFilterState.set(cell.col.key, { values: keys })
                      "
                      :confirm="
                        () => {
                          const v = colFilterState.get(cell.col.key)?.values ?? []
                          applyColumnFilter(cell.col, v)
                          closeFilterDropdown()
                        }
                      "
                      :clear-filters="
                        () => {
                          applyColumnFilter(cell.col, [])
                          closeFilterDropdown()
                        }
                      "
                      :close="closeFilterDropdown"
                    />
                  </div>
                </span>

                <span
                  v-if="cell.col.resizable"
                  class="sg-table-resize-handle"
                  :class="{ 'sg-table-resize-active': resizingKey === cell.col.key }"
                  @click.stop
                  @mousedown="onResizeStart(cell.col, $event)"
                />
              </div>
            </div>
          </template>

          <!-- EMPTY -->
          <div
            v-if="flatRows.length === 0"
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

          <!-- BODY (non-virtual) -->
          <template v-if="!virtualConfig">
            <template v-for="(row, idx) in flatRows" :key="`r-${row.id}`">
              <div
                :class="rowCls(row, idx) || undefined"
                role="row"
                style="display: contents"
                @click="handleRowClick(row)"
              >
                <!-- expand cell -->
                <div
                  v-if="expandable"
                  class="sg-table-td sg-table-cell-expand"
                  role="cell"
                  :style="{
                    position: 'sticky',
                    left: '0',
                    zIndex: 1,
                    background: 'inherit',
                  }"
                  @click.stop
                >
                  <button
                    v-if="isRowExpandable(row.data)"
                    type="button"
                    class="sg-table-expand-btn"
                    :class="{ 'sg-table-expand-btn-open': expandedSet.has(row.id) }"
                    :aria-expanded="expandedSet.has(row.id)"
                    :aria-label="expandedSet.has(row.id) ? 'Collapse row' : 'Expand row'"
                    @click="toggleExpand(row.id)"
                  >
                    {{ localeFull.expandIcon }}
                  </button>
                </div>

                <!-- selection cell -->
                <div
                  v-if="rowSelection"
                  class="sg-table-td sg-table-cell-selection"
                  role="cell"
                  :style="
                    expandable
                      ? {}
                      : {
                          position: 'sticky',
                          left: '0',
                          zIndex: 1,
                          background: 'inherit',
                        }
                  "
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
                  v-for="(col, cIdx) in visibleColumns"
                  :key="col.key"
                  :class="
                    [
                      'sg-table-td',
                      col.fixed ? `sg-table-td-fixed sg-table-td-fixed-${col.fixed}` : '',
                      col.editable ? 'sg-table-td-editable' : '',
                      sCls.bodyCell,
                    ]
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
                    ...(cIdx === 0 && tree && row.depth > 0
                      ? { paddingLeft: `${row.depth * treeIndent + 8}px` }
                      : {}),
                    ...(colFixedStyle(col) as any),
                    ...(sSty.bodyCell ?? {}),
                  }"
                  role="cell"
                  @dblclick="
                    col.editable && onCellEdit
                      ? startEdit(row.id, col.key, row.data[col.key])
                      : null
                  "
                >
                  <!-- tree expand button (first column only) -->
                  <button
                    v-if="cIdx === 0 && tree && row.hasChildren"
                    type="button"
                    class="sg-table-tree-toggle"
                    :class="{ 'sg-table-tree-toggle-open': treeExpanded.has(row.id) }"
                    :aria-label="treeExpanded.has(row.id) ? 'Collapse' : 'Expand'"
                    @click.stop="toggleTreeRow(row.id)"
                  >
                    {{ localeFull.expandIcon }}
                  </button>

                  <span
                    v-if="editingCell && editingCell.id === row.id && editingCell.key === col.key"
                    class="sg-table-cell-editor"
                    @click.stop
                  >
                    <input
                      v-model="editingValue"
                      class="sg-table-edit-input"
                      @keydown.enter="commitEdit"
                      @keydown.esc="cancelEdit"
                      @blur="commitEdit"
                    />
                  </span>
                  <slot
                    v-else
                    name="cell"
                    :column="col"
                    :row="row.data"
                    :id="row.id"
                    :value="row.data[col.key]"
                  >
                    {{ row.data[col.key] }}
                  </slot>
                </div>
              </div>

              <!-- expanded row body -->
              <div
                v-if="expandable && expandedSet.has(row.id)"
                class="sg-table-row sg-table-row-expanded"
                role="row"
                style="display: contents"
              >
                <div
                  class="sg-table-td sg-table-cell-expanded"
                  :style="{ gridColumn: '1 / -1' }"
                  role="cell"
                >
                  <slot name="expandedRow" :row="row.data" :id="row.id">
                    <component :is="expandable.expandedRowRender(row.data, row.id) as any" />
                  </slot>
                </div>
              </div>
            </template>
          </template>

          <!-- BODY (virtual) -->
          <template v-else-if="visibleVirtualRows && virtualWindow">
            <div
              :style="{
                gridColumn: '1 / -1',
                height: `${virtualWindow.totalHeight}px`,
                position: 'relative',
              }"
            >
              <div
                v-for="entry in visibleVirtualRows"
                :key="String(entry.row.id)"
                :class="
                  [
                    'sg-table-row',
                    'sg-table-row-virtual',
                    'sg-table-row-clickable',
                    selectedSet.has(entry.row.id) ? 'sg-table-row-selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                "
                :style="{
                  position: 'absolute',
                  top: `${entry.offset}px`,
                  left: 0,
                  right: 0,
                  height: `${rowHeightAt(entry.row)}px`,
                  display: 'grid',
                  gridTemplateColumns,
                }"
                role="row"
                @click="handleRowClick(entry.row)"
              >
                <div
                  v-if="expandable"
                  class="sg-table-td sg-table-cell-expand"
                  role="cell"
                  @click.stop
                />
                <div
                  v-if="rowSelection"
                  class="sg-table-td sg-table-cell-selection"
                  role="cell"
                  @click.stop
                >
                  <SgCheckbox
                    v-if="rowSelection.type !== 'radio'"
                    :checked="selectedSet.has(entry.row.id)"
                    :aria-label="`Select row ${String(entry.row.id)}`"
                    @change="() => toggleRowSelected(entry.row.id)"
                  />
                </div>
                <div
                  v-for="col in visibleColumns"
                  :key="col.key"
                  :class="['sg-table-td', sCls.bodyCell].filter(Boolean).join(' ') || undefined"
                  role="cell"
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
                  }"
                >
                  <slot
                    name="cell"
                    :column="col"
                    :row="entry.row.data"
                    :id="entry.row.id"
                    :value="entry.row.data[col.key]"
                  >
                    {{ entry.row.data[col.key] }}
                  </slot>
                </div>
              </div>
            </div>
          </template>

          <!-- SUMMARY rows (custom) -->
          <template v-if="summaryRows.length > 0">
            <div
              v-for="(srow, srIdx) in summaryRows"
              :key="`sr-${srIdx}`"
              class="sg-table-row sg-table-summary-row"
              role="row"
              style="display: contents"
            >
              <div v-if="expandable" class="sg-table-td sg-table-summary-cell" role="cell" />
              <div v-if="rowSelection" class="sg-table-td sg-table-summary-cell" role="cell" />
              <div
                v-for="(scell, sIdx) in srow"
                :key="`sc-${srIdx}-${sIdx}`"
                class="sg-table-td sg-table-summary-cell"
                role="cell"
                :style="{
                  ...(scell.colSpan && scell.colSpan > 1
                    ? { gridColumn: `span ${scell.colSpan}` }
                    : {}),
                  ...(scell.align
                    ? {
                        justifyContent:
                          scell.align === 'center'
                            ? 'center'
                            : scell.align === 'right'
                              ? 'flex-end'
                              : 'flex-start',
                      }
                    : {}),
                }"
              >
                <component :is="scell.content as any" v-if="typeof scell.content === 'object'" />
                <template v-else>{{ scell.content }}</template>
              </div>
            </div>
          </template>

          <!-- FOOTER (column aggregates) -->
          <div
            v-if="footer && visibleRows.length > 0"
            class="sg-table-row sg-table-footer-row"
            role="row"
            style="display: contents"
          >
            <div v-if="expandable" class="sg-table-td sg-table-footer-cell" role="cell" />
            <div v-if="rowSelection" class="sg-table-td sg-table-footer-cell" role="cell" />
            <div
              v-for="col in visibleColumns"
              :key="`f-${col.key}`"
              class="sg-table-td sg-table-footer-cell"
              role="cell"
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
                ...(colFixedStyle(col) as any),
              }"
            >
              <span v-if="col.aggregate">{{ aggregateValue(col) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading && !unstyled" class="sg-table-loading-mask" role="status" aria-live="polite">
      <SgSpin size="large" :aria-label="localeFull.loadingText" />
    </div>

    <div
      v-if="
        showPagination &&
        pageSize !== undefined &&
        tableState.totalRows > pageSize &&
        !virtualConfig
      "
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
