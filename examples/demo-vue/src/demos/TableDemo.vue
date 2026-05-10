<script setup lang="ts">
/**
 * Table aggregator (Wave 3.2 / Tab D).
 *
 * 17/29 React demos covered (charter threshold ≥15/29). Deferred
 * features — Resizable, Expandable, ColumnGroups, FixedColumns,
 * Editable, TreeData, Grouping, Summary, Virtual / VirtualDynamic,
 * AdvancedFilters, CustomFilterDropdown, FinanceStyle, GlobalSearch,
 * Loading, ProgressCells (as a standalone demo), KitchenSink — are
 * tracked in `docs/_streams/findings/T-Vue-Demo-Complex.md →
 * table-deferred-examples` (Vue Table API is genuinely narrower).
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  CssVarsTable,
  type PropDef,
  type CssVarDef,
} from './components'

import { useTableDocStrings } from './table-doc/useStrings'

import BasicTable from './table/Basic.demo.vue'
import BasicSource from './table/Basic.demo.vue?raw'
import SortableTable from './table/Sortable.demo.vue'
import SortableSource from './table/Sortable.demo.vue?raw'
import SizesTable from './table/Sizes.demo.vue'
import SizesSource from './table/Sizes.demo.vue?raw'
import BorderedTable from './table/Bordered.demo.vue'
import BorderedSource from './table/Bordered.demo.vue?raw'
import StickyTable from './table/Sticky.demo.vue'
import StickySource from './table/Sticky.demo.vue?raw'
import PaginationTable from './table/Pagination.demo.vue'
import PaginationSource from './table/Pagination.demo.vue?raw'
import SelectionTable from './table/Selection.demo.vue'
import SelectionSource from './table/Selection.demo.vue?raw'
import SelectionRadioTable from './table/SelectionRadio.demo.vue'
import SelectionRadioSource from './table/SelectionRadio.demo.vue?raw'
import SearchTable from './table/SearchFilter.demo.vue'
import SearchSource from './table/SearchFilter.demo.vue?raw'
import ColumnFiltersTable from './table/ColumnFilters.demo.vue'
import ColumnFiltersSource from './table/ColumnFilters.demo.vue?raw'
import CustomCellTable from './table/CustomCell.demo.vue'
import CustomCellSource from './table/CustomCell.demo.vue?raw'
import ConditionalRowsTable from './table/ConditionalRows.demo.vue'
import ConditionalRowsSource from './table/ConditionalRows.demo.vue?raw'
import StyledSlotsTable from './table/StyledSlots.demo.vue'
import StyledSlotsSource from './table/StyledSlots.demo.vue?raw'
import EmptyTable from './table/EmptyState.demo.vue'
import EmptySource from './table/EmptyState.demo.vue?raw'
import UnstyledTable from './table/Unstyled.demo.vue'
import UnstyledSource from './table/Unstyled.demo.vue?raw'
import TokensTable from './table/TokensOverride.demo.vue'
import TokensSource from './table/TokensOverride.demo.vue?raw'
import LargeDatasetTable from './table/LargeDataset.demo.vue'
import LargeDatasetSource from './table/LargeDataset.demo.vue?raw'
import RealtimeTable from './table/Realtime.demo.vue'
import RealtimeSource from './table/Realtime.demo.vue?raw'

const t = useTableDocStrings()

const tableProps = computed<PropDef[]>(() => [
  { name: 'columns', description: t.value.propColumns, type: 'TableColumn[]', required: true },
  { name: 'data', description: t.value.propData, type: 'Array<{ id, data }>', required: true },
  { name: 'pageSize', description: t.value.propPageSize, type: 'number' },
  { name: 'rowSelection', description: t.value.propRowSelection, type: 'RowSelectionConfig' },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'sticky', description: t.value.propSticky, type: 'boolean', default: 'false' },
  { name: 'locale', description: t.value.propLocale, type: 'TableLocale' },
  {
    name: 'rowClassName',
    description: t.value.propRowClassName,
    type: 'string | (row, id) => string',
  },
  { name: 'searchable', description: t.value.propSearchable, type: 'boolean', default: 'false' },
  { name: 'showPagination', description: t.value.propShowPagination, type: 'boolean', default: 'true' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: 'classNames', description: t.value.propClassNames, type: 'TableClassNames' },
  { name: 'styles', description: t.value.propStyles, type: 'TableStyles' },
  { name: '@rowClick', description: t.value.emitRowClick, type: '(id, data) => void' },
  { name: '@pageChange', description: t.value.emitPageChange, type: '(page) => void' },
  { name: '@sortChange', description: t.value.emitSortChange, type: '(column, direction) => void' },
])

const columnProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.colKey, type: 'string', required: true },
  { name: 'title', description: t.value.colTitle, type: 'string', required: true },
  { name: 'width', description: t.value.colWidth, type: 'number' },
  { name: 'sortable', description: t.value.colSortable, type: 'boolean', default: 'false' },
  { name: 'align', description: t.value.colAlign, type: "'left' | 'center' | 'right'" },
  { name: 'hidden', description: t.value.colHidden, type: 'boolean', default: 'false' },
  { name: 'filters', description: t.value.colFilters, type: 'Array<{ text; value }>' },
  { name: 'onFilter', description: t.value.colOnFilter, type: '(value, row) => boolean' },
])

const tableCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-table-row-height', default: 'auto', description: t.value.cssSgTableRowHeight },
  { name: 'sg-table-row-bg', default: 'transparent', description: t.value.cssSgTableRowBg },
  { name: 'sg-table-row-hover-bg', default: 'var(--sg-color-bg-hover)', description: t.value.cssSgTableRowHoverBg },
  { name: 'sg-table-header-bg', default: 'var(--sg-color-bg-secondary)', description: t.value.cssSgTableHeaderBg },
  { name: 'sg-table-border-color', default: 'var(--sg-color-border)', description: t.value.cssSgTableBorderColor },
  { name: 'sg-table-border-color-secondary', default: 'var(--sg-color-border-secondary)', description: t.value.cssSgTableBorderColorSecondary },
  { name: 'sg-table-cell-padding', default: 'var(--sg-padding-sm) var(--sg-padding-md)', description: t.value.cssSgTableCellPadding },
  { name: 'sg-table-cell-solid-bg', default: 'var(--sg-color-bg)', description: t.value.cssSgTableCellSolidBg },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbTable]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTable />
    </DemoBox>
    <DemoBox :title="t.demoSortableTitle" :description="t.demoSortableDesc" :code="SortableSource">
      <SortableTable />
    </DemoBox>
    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesTable />
    </DemoBox>
    <DemoBox :title="t.demoBorderedTitle" :description="t.demoBorderedDesc" :code="BorderedSource">
      <BorderedTable />
    </DemoBox>
    <DemoBox :title="t.demoStickyTitle" :description="t.demoStickyDesc" :code="StickySource">
      <StickyTable />
    </DemoBox>
    <DemoBox :title="t.demoPaginationTitle" :description="t.demoPaginationDesc" :code="PaginationSource">
      <PaginationTable />
    </DemoBox>
    <DemoBox :title="t.demoSelectionTitle" :description="t.demoSelectionDesc" :code="SelectionSource">
      <SelectionTable />
    </DemoBox>
    <DemoBox :title="t.demoSelectionRadioTitle" :description="t.demoSelectionRadioDesc" :code="SelectionRadioSource">
      <SelectionRadioTable />
    </DemoBox>
    <DemoBox :title="t.demoSearchTitle" :description="t.demoSearchDesc" :code="SearchSource">
      <SearchTable />
    </DemoBox>
    <DemoBox :title="t.demoColumnFiltersTitle" :description="t.demoColumnFiltersDesc" :code="ColumnFiltersSource">
      <ColumnFiltersTable />
    </DemoBox>
    <DemoBox :title="t.demoCustomCellTitle" :description="t.demoCustomCellDesc" :code="CustomCellSource">
      <CustomCellTable />
    </DemoBox>
    <DemoBox :title="t.demoConditionalRowsTitle" :description="t.demoConditionalRowsDesc" :code="ConditionalRowsSource">
      <ConditionalRowsTable />
    </DemoBox>
    <DemoBox :title="t.demoStyledSlotsTitle" :description="t.demoStyledSlotsDesc" :code="StyledSlotsSource">
      <StyledSlotsTable />
    </DemoBox>
    <DemoBox :title="t.demoEmptyTitle" :description="t.demoEmptyDesc" :code="EmptySource">
      <EmptyTable />
    </DemoBox>
    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledTable />
    </DemoBox>
    <DemoBox :title="t.demoTokensTitle" :description="t.demoTokensDesc" :code="TokensSource">
      <TokensTable />
    </DemoBox>
    <DemoBox :title="t.demoLargeDatasetTitle" :description="t.demoLargeDatasetDesc" :code="LargeDatasetSource">
      <LargeDatasetTable />
    </DemoBox>
    <DemoBox :title="t.demoRealtimeTitle" :description="t.demoRealtimeDesc" :code="RealtimeSource">
      <RealtimeTable />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTableApi" :data="tableProps" />
      <PropsTable :title="t.tableColumnApi" :data="columnProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="tableCssVars" />
    </template>
  </ComponentDoc>
</template>
