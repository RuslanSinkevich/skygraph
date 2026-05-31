import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTableDocStrings } from './table-doc/useTableDocStrings'

import { BasicTable } from './table/BasicTable.demo'
import BasicTableSource from './table/BasicTable.demo?raw'
import { SortableTable } from './table/Sortable.demo'
import SortableSource from './table/Sortable.demo?raw'
import { SelectionTable } from './table/Selection.demo'
import SelectionSource from './table/Selection.demo?raw'
import { ExpandableTable } from './table/Expandable.demo'
import ExpandableSource from './table/Expandable.demo?raw'
import { FixedColumnsTable } from './table/FixedColumns.demo'
import FixedColumnsSource from './table/FixedColumns.demo?raw'
import { ResizableTable } from './table/Resizable.demo'
import ResizableSource from './table/Resizable.demo?raw'
import { DraggableColumnsTable } from './table/DraggableColumns.demo'
import DraggableColumnsSource from './table/DraggableColumns.demo?raw'
import { EditableTable } from './table/Editable.demo'
import EditableSource from './table/Editable.demo?raw'
import { FiltersTable } from './table/Filters.demo'
import FiltersSource from './table/Filters.demo?raw'
import { SearchFilterTable } from './table/SearchFilter.demo'
import SearchFilterSource from './table/SearchFilter.demo?raw'
import { CustomFilterDropdownTable } from './table/CustomFilterDropdown.demo'
import CustomFilterDropdownSource from './table/CustomFilterDropdown.demo?raw'
import { GlobalSearchTable } from './table/GlobalSearch.demo'
import GlobalSearchSource from './table/GlobalSearch.demo?raw'
import { SummaryTable } from './table/Summary.demo'
import SummarySource from './table/Summary.demo?raw'
import { ColumnGroupsTable } from './table/ColumnGroups.demo'
import ColumnGroupsSource from './table/ColumnGroups.demo?raw'
import { TreeDataTable } from './table/TreeData.demo'
import TreeDataSource from './table/TreeData.demo?raw'
import { LoadingTable } from './table/Loading.demo'
import LoadingSource from './table/Loading.demo?raw'
import { EmptyStateTable } from './table/EmptyState.demo'
import EmptyStateSource from './table/EmptyState.demo?raw'
import { StyledSlotsTable } from './table/StyledSlots.demo'
import StyledSlotsSource from './table/StyledSlots.demo?raw'
import { CustomTokensTable } from './table/CustomTokens.demo'
import CustomTokensSource from './table/CustomTokens.demo?raw'
import { ConditionalRowsTable } from './table/ConditionalRows.demo'
import ConditionalRowsSource from './table/ConditionalRows.demo?raw'
import { ProgressCellsTable } from './table/ProgressCells.demo'
import ProgressCellsSource from './table/ProgressCells.demo?raw'
import { FinanceStyleTable } from './table/FinanceStyle.demo'
import FinanceStyleSource from './table/FinanceStyle.demo?raw'
import { UnstyledTable } from './table/Unstyled.demo'
import UnstyledSource from './table/Unstyled.demo?raw'
import { VirtualTable } from './table/Virtual.demo'
import VirtualSource from './table/Virtual.demo?raw'
import { KitchenSinkTable } from './table/KitchenSink.demo'
import KitchenSinkSource from './table/KitchenSink.demo?raw'
import { AdvancedFiltersTable } from './table/AdvancedFilters.demo'
import AdvancedFiltersSource from './table/AdvancedFilters.demo?raw'
import { GroupingTable } from './table/Grouping.demo'
import GroupingSource from './table/Grouping.demo?raw'
import { VirtualDynamicTable } from './table/VirtualDynamic.demo'
import VirtualDynamicSource from './table/VirtualDynamic.demo?raw'
import { LargeDatasetTable } from './table/LargeDataset.demo'
import LargeDatasetSource from './table/LargeDataset.demo?raw'
import { RealtimeTable } from './table/Realtime.demo'
import RealtimeSource from './table/Realtime.demo?raw'

export function TableDemo() {
  const t = useTableDocStrings()

  const tableProps = useMemo<PropDef[]>(
    () => [
      { name: 'columns', description: t.propColumns, type: 'TableColumn[]' },
      { name: 'data', description: t.propData, type: 'Array<{ id, data }>' },
      { name: 'pageSize', description: t.propPageSize, type: 'number', default: '10' },
      {
        name: 'showPagination',
        description: t.propShowPagination,
        type: 'boolean',
        default: 'true',
      },
      { name: 'bordered', description: t.propBordered, type: 'boolean', default: 'false' },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'searchable', description: t.propSearchable, type: 'boolean', default: 'false' },
      { name: 'scroll', description: t.propScroll, type: '{ x?: number }' },
      { name: 'rowSelection', description: t.propRowSelection, type: '{ selectedKeys, onChange }' },
      { name: 'expandable', description: t.propExpandable, type: '{ expandedRowRender }' },
      { name: 'tree', description: t.propTree, type: '{ defaultExpandAllRows?, indentSize? }' },
      { name: 'summary', description: t.propSummary, type: '(rows) => SummaryCell[][]' },
      { name: 'draggable', description: t.propDraggable, type: 'boolean', default: 'false' },
      {
        name: 'onColumnOrderChange',
        description: t.propOnColumnOrderChange,
        type: '(keys: string[]) => void',
      },
      { name: 'onCellEdit', description: t.propOnCellEdit, type: '(id, column, value) => void' },
      {
        name: 'rowClassName',
        description: t.propRowClassName,
        type: 'string | (row, id) => string',
      },
      { name: 'classNames', description: t.propClassNames, type: 'TableClassNames' },
      { name: 'styles', description: t.propStyles, type: 'TableStyles' },
      { name: 'locale', description: t.propLocale, type: '{ emptyText? }' },
      {
        name: 'virtual',
        description: t.propVirtual,
        type: 'boolean | { rowHeight?, overscan?, height? }',
      },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const columnProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.colKey, type: 'string' },
      { name: 'title', description: t.colTitle, type: 'ReactNode' },
      { name: 'width', description: t.colWidth, type: 'number' },
      { name: 'align', description: t.colAlign, type: "'left' | 'center' | 'right'" },
      { name: 'sortable', description: t.colSortable, type: 'boolean' },
      { name: 'fixed', description: t.colFixed, type: "'left' | 'right'" },
      { name: 'resizable', description: t.colResizable, type: 'boolean' },
      { name: 'editable', description: t.colEditable, type: 'boolean' },
      { name: 'ellipsis', description: t.colEllipsis, type: 'boolean' },
      { name: 'render', description: t.colRender, type: '(value, row) => ReactNode' },
      { name: 'headerClassName', description: t.colHeaderClassName, type: 'string' },
      { name: 'filters', description: t.colFilters, type: 'Array<{ text, value }>' },
      { name: 'onFilter', description: t.colOnFilter, type: '(filterValue, row) => boolean' },
      {
        name: 'filterMultiple',
        description: t.colFilterMultiple,
        type: 'boolean',
        default: 'true',
      },
      { name: 'filterMode', description: t.colFilterMode, type: "'search'" },
      { name: 'filterSearch', description: t.colFilterSearch, type: 'boolean | Function' },
      {
        name: 'filterDropdown',
        description: t.colFilterDropdown,
        type: '(props: FilterDropdownProps) => ReactNode',
      },
      {
        name: 'filterIcon',
        description: t.colFilterIcon,
        type: '(filtered: boolean) => ReactNode',
      },
      { name: 'defaultFilteredValue', description: t.colDefaultFilteredValue, type: 'any[]' },
      { name: 'children', description: t.colChildren, type: 'TableColumn[]' },
      { name: 'onCell', description: t.colOnCell, type: '(row, index) => CellSpan' },
    ],
    [t],
  )

  const tableCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-table-row-height', default: 'auto', description: t.cssSgTableRowHeight },
      { name: 'sg-table-row-bg', default: 'transparent', description: t.cssSgTableRowBg },
      {
        name: 'sg-table-row-hover-bg',
        default: 'var(--sg-color-bg-hover)',
        description: t.cssSgTableRowHoverBg,
      },
      {
        name: 'sg-table-header-bg',
        default: 'var(--sg-color-bg-secondary)',
        description: t.cssSgTableHeaderBg,
      },
      {
        name: 'sg-table-border-color',
        default: 'var(--sg-color-border)',
        description: t.cssSgTableBorderColor,
      },
      {
        name: 'sg-table-border-color-secondary',
        default: 'var(--sg-color-border-secondary)',
        description: t.cssSgTableBorderColorSecondary,
      },
      {
        name: 'sg-table-cell-padding',
        default: 'var(--sg-padding-sm) var(--sg-padding-md)',
        description: t.cssSgTableCellPadding,
      },
      {
        name: 'sg-table-cell-solid-bg',
        default: 'var(--sg-color-bg)',
        description: t.cssSgTableCellSolidBg,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbTable]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicTableSource}>
        <div style={{ width: '100%' }}>
          <BasicTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoSortableTitle} description={t.demoSortableDesc} code={SortableSource}>
        <div style={{ width: '100%' }}>
          <SortableTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoSelectionTitle}
        description={t.demoSelectionDesc}
        code={SelectionSource}
      >
        <div style={{ width: '100%' }}>
          <SelectionTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoExpandableTitle}
        description={t.demoExpandableDesc}
        code={ExpandableSource}
      >
        <div style={{ width: '100%' }}>
          <ExpandableTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoTreeDataTitle} description={t.demoTreeDataDesc} code={TreeDataSource}>
        <div style={{ width: '100%' }}>
          <TreeDataTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoColumnGroupsTitle}
        description={t.demoColumnGroupsDesc}
        code={ColumnGroupsSource}
      >
        <div style={{ width: '100%' }}>
          <ColumnGroupsTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoFixedColumnsTitle}
        description={t.demoFixedColumnsDesc}
        code={FixedColumnsSource}
      >
        <div style={{ width: '100%' }}>
          <FixedColumnsTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoResizableTitle}
        description={t.demoResizableDesc}
        code={ResizableSource}
      >
        <div style={{ width: '100%' }}>
          <ResizableTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoDraggableColumnsTitle}
        description={t.demoDraggableColumnsDesc}
        code={DraggableColumnsSource}
      >
        <div style={{ width: '100%' }}>
          <DraggableColumnsTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoEditableTitle} description={t.demoEditableDesc} code={EditableSource}>
        <div style={{ width: '100%' }}>
          <EditableTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoFiltersTitle} description={t.demoFiltersDesc} code={FiltersSource}>
        <div style={{ width: '100%' }}>
          <FiltersTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoSearchFilterTitle}
        description={t.demoSearchFilterDesc}
        code={SearchFilterSource}
      >
        <div style={{ width: '100%' }}>
          <SearchFilterTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoCustomFilterDropdownTitle}
        description={t.demoCustomFilterDropdownDesc}
        code={CustomFilterDropdownSource}
      >
        <div style={{ width: '100%' }}>
          <CustomFilterDropdownTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoGlobalSearchTitle}
        description={t.demoGlobalSearchDesc}
        code={GlobalSearchSource}
      >
        <div style={{ width: '100%' }}>
          <GlobalSearchTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoSummaryTitle} description={t.demoSummaryDesc} code={SummarySource}>
        <div style={{ width: '100%' }}>
          <SummaryTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoLoadingTitle} description={t.demoLoadingDesc} code={LoadingSource}>
        <div style={{ width: '100%' }}>
          <LoadingTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoEmptyStateTitle}
        description={t.demoEmptyStateDesc}
        code={EmptyStateSource}
      >
        <div style={{ width: '100%' }}>
          <EmptyStateTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoStyledSlotsTitle}
        description={t.demoStyledSlotsDesc}
        code={StyledSlotsSource}
      >
        <div style={{ width: '100%' }}>
          <StyledSlotsTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoCustomTokensTitle}
        description={t.demoCustomTokensDesc}
        code={CustomTokensSource}
      >
        <div style={{ width: '100%' }}>
          <CustomTokensTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoConditionalRowsTitle}
        description={t.demoConditionalRowsDesc}
        code={ConditionalRowsSource}
      >
        <div style={{ width: '100%' }}>
          <ConditionalRowsTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoProgressCellsTitle}
        description={t.demoProgressCellsDesc}
        code={ProgressCellsSource}
      >
        <div style={{ width: '100%' }}>
          <ProgressCellsTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoFinanceStyleTitle}
        description={t.demoFinanceStyleDesc}
        code={FinanceStyleSource}
      >
        <div style={{ width: '100%' }}>
          <FinanceStyleTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <div style={{ width: '100%' }}>
          <UnstyledTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoVirtualTitle} description={t.demoVirtualDesc} code={VirtualSource}>
        <div style={{ width: '100%' }}>
          <VirtualTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoKitchenSinkTitle}
        description={t.demoKitchenSinkDesc}
        code={KitchenSinkSource}
      >
        <div style={{ width: '100%' }}>
          <KitchenSinkTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoAdvancedFiltersTitle}
        description={t.demoAdvancedFiltersDesc}
        code={AdvancedFiltersSource}
      >
        <div style={{ width: '100%' }}>
          <AdvancedFiltersTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoGroupingTitle} description={t.demoGroupingDesc} code={GroupingSource}>
        <div style={{ width: '100%' }}>
          <GroupingTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoVirtualDynamicTitle}
        description={t.demoVirtualDynamicDesc}
        code={VirtualDynamicSource}
      >
        <div style={{ width: '100%' }}>
          <VirtualDynamicTable />
        </div>
      </DemoBox>

      <DemoBox
        title={t.demoLargeDatasetTitle}
        description={t.demoLargeDatasetDesc}
        code={LargeDatasetSource}
      >
        <div style={{ width: '100%' }}>
          <LargeDatasetTable />
        </div>
      </DemoBox>

      <DemoBox title={t.demoRealtimeTitle} description={t.demoRealtimeDesc} code={RealtimeSource}>
        <div style={{ width: '100%' }}>
          <RealtimeTable />
        </div>
      </DemoBox>

      <PropsTable title={t.tableTableApi} data={tableProps} />
      <PropsTable title={t.tableColumnApi} data={columnProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={tableCssVars} />
    </ComponentDoc>
  )
}
