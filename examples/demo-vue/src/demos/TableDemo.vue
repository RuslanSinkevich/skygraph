<script setup lang="ts">
/**
 * Table aggregator — 1:1 parity with React's `examples/demo/src/demos/TableDemo.tsx`.
 * 29 demos in the same order so users can compare side by side.
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

import BasicTable from './table/BasicTable.demo.vue'
import BasicTableSource from './table/BasicTable.demo.vue?raw'
import SortableTable from './table/Sortable.demo.vue'
import SortableSource from './table/Sortable.demo.vue?raw'
import SelectionTable from './table/Selection.demo.vue'
import SelectionSource from './table/Selection.demo.vue?raw'
import ExpandableTable from './table/Expandable.demo.vue'
import ExpandableSource from './table/Expandable.demo.vue?raw'
import TreeDataTable from './table/TreeData.demo.vue'
import TreeDataSource from './table/TreeData.demo.vue?raw'
import ColumnGroupsTable from './table/ColumnGroups.demo.vue'
import ColumnGroupsSource from './table/ColumnGroups.demo.vue?raw'
import FixedColumnsTable from './table/FixedColumns.demo.vue'
import FixedColumnsSource from './table/FixedColumns.demo.vue?raw'
import ResizableTable from './table/Resizable.demo.vue'
import ResizableSource from './table/Resizable.demo.vue?raw'
import DraggableColumnsTable from './table/DraggableColumns.demo.vue'
import DraggableColumnsSource from './table/DraggableColumns.demo.vue?raw'
import EditableTable from './table/Editable.demo.vue'
import EditableSource from './table/Editable.demo.vue?raw'
import FiltersTable from './table/Filters.demo.vue'
import FiltersSource from './table/Filters.demo.vue?raw'
import SearchFilterTable from './table/SearchFilter.demo.vue'
import SearchFilterSource from './table/SearchFilter.demo.vue?raw'
import CustomFilterDropdownTable from './table/CustomFilterDropdown.demo.vue'
import CustomFilterDropdownSource from './table/CustomFilterDropdown.demo.vue?raw'
import GlobalSearchTable from './table/GlobalSearch.demo.vue'
import GlobalSearchSource from './table/GlobalSearch.demo.vue?raw'
import SummaryTable from './table/Summary.demo.vue'
import SummarySource from './table/Summary.demo.vue?raw'
import LoadingTable from './table/Loading.demo.vue'
import LoadingSource from './table/Loading.demo.vue?raw'
import EmptyStateTable from './table/EmptyState.demo.vue'
import EmptyStateSource from './table/EmptyState.demo.vue?raw'
import StyledSlotsTable from './table/StyledSlots.demo.vue'
import StyledSlotsSource from './table/StyledSlots.demo.vue?raw'
import CustomTokensTable from './table/CustomTokens.demo.vue'
import CustomTokensSource from './table/CustomTokens.demo.vue?raw'
import ConditionalRowsTable from './table/ConditionalRows.demo.vue'
import ConditionalRowsSource from './table/ConditionalRows.demo.vue?raw'
import ProgressCellsTable from './table/ProgressCells.demo.vue'
import ProgressCellsSource from './table/ProgressCells.demo.vue?raw'
import FinanceStyleTable from './table/FinanceStyle.demo.vue'
import FinanceStyleSource from './table/FinanceStyle.demo.vue?raw'
import VirtualTable from './table/Virtual.demo.vue'
import VirtualSource from './table/Virtual.demo.vue?raw'
import KitchenSinkTable from './table/KitchenSink.demo.vue'
import KitchenSinkSource from './table/KitchenSink.demo.vue?raw'
import AdvancedFiltersTable from './table/AdvancedFilters.demo.vue'
import AdvancedFiltersSource from './table/AdvancedFilters.demo.vue?raw'
import GroupingTable from './table/Grouping.demo.vue'
import GroupingSource from './table/Grouping.demo.vue?raw'
import VirtualDynamicTable from './table/VirtualDynamic.demo.vue'
import VirtualDynamicSource from './table/VirtualDynamic.demo.vue?raw'
import LargeDatasetTable from './table/LargeDataset.demo.vue'
import LargeDatasetSource from './table/LargeDataset.demo.vue?raw'
import RealtimeTable from './table/Realtime.demo.vue'
import RealtimeSource from './table/Realtime.demo.vue?raw'

const t = useTableDocStrings()

const tableProps = computed<PropDef[]>(() => [
  { name: 'columns', description: t.value.propColumns, type: 'TableColumn[]', required: true },
  { name: 'data', description: t.value.propData, type: 'Array<{ id, data }>', required: true },
  { name: 'pageSize', description: t.value.propPageSize, type: 'number' },
  {
    name: 'showPagination',
    description: t.value.propShowPagination,
    type: 'boolean',
    default: 'true',
  },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'loading', description: t.value.propLoading, type: 'boolean', default: 'false' },
  { name: 'searchable', description: t.value.propSearchable, type: 'boolean', default: 'false' },
  { name: 'scroll', description: t.value.propScroll, type: '{ x?: number; y?: number }' },
  { name: 'rowSelection', description: t.value.propRowSelection, type: 'RowSelectionConfig' },
  { name: 'expandable', description: t.value.propExpandable, type: 'ExpandableConfig' },
  { name: 'tree', description: t.value.propTree, type: 'TreeConfig' },
  { name: 'summary', description: t.value.propSummary, type: '(rows) => SummaryCell[][]' },
  { name: 'onCellEdit', description: t.value.propOnCellEdit, type: '(id, column, value) => void' },
  {
    name: 'rowClassName',
    description: t.value.propRowClassName,
    type: 'string | (row, id) => string',
  },
  { name: 'sticky', description: t.value.propSticky, type: 'boolean', default: 'false' },
  { name: 'draggable', description: t.value.propDraggable, type: 'boolean', default: 'false' },
  { name: 'locale', description: t.value.propLocale, type: 'TableLocale' },
  { name: 'virtual', description: t.value.propVirtual, type: 'boolean | VirtualConfig' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: 'classNames', description: t.value.propClassNames, type: 'TableClassNames' },
  { name: 'styles', description: t.value.propStyles, type: 'TableStyles' },
  { name: 'footer', description: t.value.propFooter, type: 'boolean', default: 'false' },
  { name: '@rowClick', description: t.value.emitRowClick, type: '(id, data) => void' },
  { name: '@pageChange', description: t.value.emitPageChange, type: '(page) => void' },
  { name: '@sortChange', description: t.value.emitSortChange, type: '(column, direction) => void' },
  { name: '@cellEdit', description: t.value.emitCellEdit, type: '(id, column, value) => void' },
  { name: '@expand', description: t.value.emitExpand, type: '(expanded, id) => void' },
  {
    name: '@columnOrderChange',
    description: t.value.emitColumnOrderChange,
    type: '(order: string[]) => void',
  },
])

const columnProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.colKey, type: 'string', required: true },
  { name: 'title', description: t.value.colTitle, type: 'string', required: true },
  { name: 'width', description: t.value.colWidth, type: 'number' },
  { name: 'minWidth', description: t.value.colMinWidth, type: 'number' },
  { name: 'align', description: t.value.colAlign, type: "'left' | 'center' | 'right'" },
  { name: 'sortable', description: t.value.colSortable, type: 'boolean', default: 'false' },
  { name: 'fixed', description: t.value.colFixed, type: "'left' | 'right'" },
  { name: 'resizable', description: t.value.colResizable, type: 'boolean', default: 'false' },
  { name: 'editable', description: t.value.colEditable, type: 'boolean', default: 'false' },
  { name: 'hidden', description: t.value.colHidden, type: 'boolean', default: 'false' },
  { name: 'filters', description: t.value.colFilters, type: 'Array<{ text, value }>' },
  { name: 'onFilter', description: t.value.colOnFilter, type: '(value, row) => boolean' },
  {
    name: 'filterMultiple',
    description: t.value.colFilterMultiple,
    type: 'boolean',
    default: 'true',
  },
  { name: 'children', description: t.value.colChildren, type: 'TableColumn[]' },
  { name: 'aggregate', description: t.value.colAggregate, type: 'AggregateType | (values) => any' },
  { name: 'onCell', description: t.value.colOnCell, type: '(row, index) => CellSpan' },
])

const tableCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-table-row-height', default: 'auto', description: t.value.cssSgTableRowHeight },
  { name: 'sg-table-row-bg', default: 'transparent', description: t.value.cssSgTableRowBg },
  {
    name: 'sg-table-row-hover-bg',
    default: 'var(--sg-color-bg-hover)',
    description: t.value.cssSgTableRowHoverBg,
  },
  {
    name: 'sg-table-header-bg',
    default: 'var(--sg-color-bg-secondary)',
    description: t.value.cssSgTableHeaderBg,
  },
  {
    name: 'sg-table-border-color',
    default: 'var(--sg-color-border)',
    description: t.value.cssSgTableBorderColor,
  },
  {
    name: 'sg-table-border-color-secondary',
    default: 'var(--sg-color-border-secondary)',
    description: t.value.cssSgTableBorderColorSecondary,
  },
  {
    name: 'sg-table-cell-padding',
    default: 'var(--sg-padding-sm) var(--sg-padding-md)',
    description: t.value.cssSgTableCellPadding,
  },
  {
    name: 'sg-table-cell-solid-bg',
    default: 'var(--sg-color-bg)',
    description: t.value.cssSgTableCellSolidBg,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbTable]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicTableSource">
      <BasicTable />
    </DemoBox>
    <DemoBox :title="t.demoSortableTitle" :description="t.demoSortableDesc" :code="SortableSource">
      <SortableTable />
    </DemoBox>
    <DemoBox
      :title="t.demoSelectionTitle"
      :description="t.demoSelectionDesc"
      :code="SelectionSource"
    >
      <SelectionTable />
    </DemoBox>
    <DemoBox
      :title="t.demoExpandableTitle"
      :description="t.demoExpandableDesc"
      :code="ExpandableSource"
    >
      <ExpandableTable />
    </DemoBox>
    <DemoBox :title="t.demoTreeDataTitle" :description="t.demoTreeDataDesc" :code="TreeDataSource">
      <TreeDataTable />
    </DemoBox>
    <DemoBox
      :title="t.demoColumnGroupsTitle"
      :description="t.demoColumnGroupsDesc"
      :code="ColumnGroupsSource"
    >
      <ColumnGroupsTable />
    </DemoBox>
    <DemoBox
      :title="t.demoFixedColumnsTitle"
      :description="t.demoFixedColumnsDesc"
      :code="FixedColumnsSource"
      flush
    >
      <FixedColumnsTable />
    </DemoBox>
    <DemoBox
      :title="t.demoResizableTitle"
      :description="t.demoResizableDesc"
      :code="ResizableSource"
      flush
    >
      <ResizableTable />
    </DemoBox>
    <DemoBox
      :title="t.demoDraggableColumnsTitle"
      :description="t.demoDraggableColumnsDesc"
      :code="DraggableColumnsSource"
      flush
    >
      <DraggableColumnsTable />
    </DemoBox>
    <DemoBox :title="t.demoEditableTitle" :description="t.demoEditableDesc" :code="EditableSource">
      <EditableTable />
    </DemoBox>
    <DemoBox
      :title="t.demoFiltersTitle"
      :description="t.demoFiltersDesc"
      :code="FiltersSource"
      flush
    >
      <FiltersTable />
    </DemoBox>
    <DemoBox
      :title="t.demoSearchFilterTitle"
      :description="t.demoSearchFilterDesc"
      :code="SearchFilterSource"
      flush
    >
      <SearchFilterTable />
    </DemoBox>
    <DemoBox
      :title="t.demoCustomFilterDropdownTitle"
      :description="t.demoCustomFilterDropdownDesc"
      :code="CustomFilterDropdownSource"
      flush
    >
      <CustomFilterDropdownTable />
    </DemoBox>
    <DemoBox
      :title="t.demoGlobalSearchTitle"
      :description="t.demoGlobalSearchDesc"
      :code="GlobalSearchSource"
      flush
    >
      <GlobalSearchTable />
    </DemoBox>
    <DemoBox
      :title="t.demoSummaryTitle"
      :description="t.demoSummaryDesc"
      :code="SummarySource"
      flush
    >
      <SummaryTable />
    </DemoBox>
    <DemoBox :title="t.demoLoadingTitle" :description="t.demoLoadingDesc" :code="LoadingSource">
      <LoadingTable />
    </DemoBox>
    <DemoBox
      :title="t.demoEmptyStateTitle"
      :description="t.demoEmptyStateDesc"
      :code="EmptyStateSource"
    >
      <EmptyStateTable />
    </DemoBox>
    <DemoBox
      :title="t.demoStyledSlotsTitle"
      :description="t.demoStyledSlotsDesc"
      :code="StyledSlotsSource"
      flush
    >
      <StyledSlotsTable />
    </DemoBox>
    <DemoBox
      :title="t.demoCustomTokensTitle"
      :description="t.demoCustomTokensDesc"
      :code="CustomTokensSource"
      flush
    >
      <CustomTokensTable />
    </DemoBox>
    <DemoBox
      :title="t.demoConditionalRowsTitle"
      :description="t.demoConditionalRowsDesc"
      :code="ConditionalRowsSource"
    >
      <ConditionalRowsTable />
    </DemoBox>
    <DemoBox
      :title="t.demoProgressCellsTitle"
      :description="t.demoProgressCellsDesc"
      :code="ProgressCellsSource"
    >
      <ProgressCellsTable />
    </DemoBox>
    <DemoBox
      :title="t.demoFinanceStyleTitle"
      :description="t.demoFinanceStyleDesc"
      :code="FinanceStyleSource"
    >
      <FinanceStyleTable />
    </DemoBox>
    <DemoBox
      :title="t.demoVirtualTitle"
      :description="t.demoVirtualDesc"
      :code="VirtualSource"
      flush
    >
      <VirtualTable />
    </DemoBox>
    <DemoBox
      :title="t.demoKitchenSinkTitle"
      :description="t.demoKitchenSinkDesc"
      :code="KitchenSinkSource"
      flush
    >
      <KitchenSinkTable />
    </DemoBox>
    <DemoBox
      :title="t.demoAdvancedFiltersTitle"
      :description="t.demoAdvancedFiltersDesc"
      :code="AdvancedFiltersSource"
      flush
    >
      <AdvancedFiltersTable />
    </DemoBox>
    <DemoBox :title="t.demoGroupingTitle" :description="t.demoGroupingDesc" :code="GroupingSource">
      <GroupingTable />
    </DemoBox>
    <DemoBox
      :title="t.demoVirtualDynamicTitle"
      :description="t.demoVirtualDynamicDesc"
      :code="VirtualDynamicSource"
      flush
    >
      <VirtualDynamicTable />
    </DemoBox>
    <DemoBox
      :title="t.demoLargeDatasetTitle"
      :description="t.demoLargeDatasetDesc"
      :code="LargeDatasetSource"
      flush
    >
      <LargeDatasetTable />
    </DemoBox>
    <DemoBox
      :title="t.demoRealtimeTitle"
      :description="t.demoRealtimeDesc"
      :code="RealtimeSource"
      flush
    >
      <RealtimeTable />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTableApi" :data="tableProps" />
      <PropsTable :title="t.tableColumnApi" :data="columnProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="tableCssVars" />
    </template>
  </ComponentDoc>
</template>
