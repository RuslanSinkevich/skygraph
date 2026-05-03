import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const tableProps: PropDef[] = [
  { name: 'columns', description: 'Table columns configuration', type: 'TableColumn[]' },
  { name: 'data', description: 'Data rows with id and data fields', type: 'Array<{ id, data }>' },
  { name: 'pageSize', description: 'Rows per page', type: 'number', default: '10' },
  { name: 'showPagination', description: 'Show pagination', type: 'boolean', default: 'true' },
  { name: 'bordered', description: 'Show all borders', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Table density', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'loading', description: 'Show loading overlay', type: 'boolean', default: 'false' },
  { name: 'searchable', description: 'Show global search box', type: 'boolean', default: 'false' },
  { name: 'scroll', description: 'Horizontal scroll width', type: '{ x?: number }' },
  { name: 'rowSelection', description: 'Row selection config', type: '{ selectedKeys, onChange }' },
  { name: 'expandable', description: 'Expandable row config', type: '{ expandedRowRender }' },
  { name: 'tree', description: 'Tree data config', type: '{ defaultExpandAllRows?, indentSize? }' },
  { name: 'summary', description: 'Summary row render function', type: '(rows) => SummaryCell[][]' },
  { name: 'draggable', description: 'Enable column drag & drop reorder', type: 'boolean', default: 'false' },
  { name: 'onColumnOrderChange', description: 'Callback on column reorder', type: '(keys: string[]) => void' },
  { name: 'onCellEdit', description: 'Callback on cell edit', type: '(id, column, value) => void' },
  { name: 'rowClassName', description: 'Custom class for rows', type: 'string | (row, id) => string' },
  { name: 'classNames', description: 'Slot classes (root/toolbar/headerCell/bodyCell/row/...)', type: 'TableClassNames' },
  { name: 'styles', description: 'Slot inline styles (root/toolbar/headerCell/bodyCell/row/...)', type: 'TableStyles' },
  { name: 'locale', description: 'Locale overrides', type: '{ emptyText? }' },
  { name: 'virtual', description: 'Virtual scroll config', type: "boolean | { rowHeight?, overscan?, height? }" },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
]

const columnProps: PropDef[] = [
  { name: 'key', description: 'Unique column key (matches data field)', type: 'string' },
  { name: 'title', description: 'Column header text', type: 'ReactNode' },
  { name: 'width', description: 'Column width in px', type: 'number' },
  { name: 'align', description: 'Text alignment', type: "'left' | 'center' | 'right'" },
  { name: 'sortable', description: 'Enable sorting', type: 'boolean' },
  { name: 'fixed', description: 'Fix column position', type: "'left' | 'right'" },
  { name: 'resizable', description: 'Enable column resize', type: 'boolean' },
  { name: 'editable', description: 'Enable inline cell editing', type: 'boolean' },
  { name: 'ellipsis', description: 'Truncate text with ellipsis', type: 'boolean' },
  { name: 'render', description: 'Custom cell render function', type: '(value, row) => ReactNode' },
  { name: 'headerClassName', description: 'Class for header cell of this column', type: 'string' },
  { name: 'filters', description: 'Filter menu items', type: 'Array<{ text, value }>' },
  { name: 'onFilter', description: 'Filter logic function', type: '(filterValue, row) => boolean' },
  { name: 'filterMultiple', description: 'Allow multiple filter values', type: 'boolean', default: 'true' },
  { name: 'filterMode', description: 'Use search input instead of checkboxes', type: "'search'" },
  { name: 'filterSearch', description: 'Show search in filter dropdown', type: 'boolean | Function' },
  { name: 'filterDropdown', description: 'Custom filter dropdown render', type: '(props: FilterDropdownProps) => ReactNode' },
  { name: 'filterIcon', description: 'Custom filter icon', type: '(filtered: boolean) => ReactNode' },
  { name: 'defaultFilteredValue', description: 'Default filter values on mount', type: 'any[]' },
  { name: 'children', description: 'Nested columns for column groups', type: 'TableColumn[]' },
  { name: 'onCell', description: 'Custom cell attributes (row/col span)', type: '(row, index) => CellSpan' },
]

export function TableDemo() {
  return (
    <ComponentDoc
      title="Table"
      description="A table displays rows of data. Built on div + CSS Grid for maximum flexibility."
      whenToUse={[
        'To display a collection of structured data.',
        'To sort, search, paginate, and filter data.',
        'For hierarchical data display using tree mode.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Simple table with sorting and custom render."
        code={BasicTableSource}
      >
        <div style={{ width: '100%' }}>
          <BasicTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Sorting"
        description="Sortable columns. Click a header to toggle asc/desc; shift-click for multi-sort."
        code={SortableSource}
      >
        <div style={{ width: '100%' }}>
          <SortableTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Row Selection"
        description="Checkbox selection with select-all. Controlled state."
        code={SelectionSource}
      >
        <div style={{ width: '100%' }}>
          <SelectionTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Expandable Rows"
        description="Click the arrow to expand a row and see extra content."
        code={ExpandableSource}
      >
        <div style={{ width: '100%' }}>
          <ExpandableTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Tree Data"
        description="Hierarchical org chart with nested children. Click arrows to expand / collapse."
        code={TreeDataSource}
      >
        <div style={{ width: '100%' }}>
          <TreeDataTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Column Groups"
        description="Multi-level header with grouped columns (Contact Info, Work)."
        code={ColumnGroupsSource}
      >
        <div style={{ width: '100%' }}>
          <ColumnGroupsTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Fixed Columns"
        description="Name is fixed left, Action is fixed right. Scroll horizontally."
        code={FixedColumnsSource}
      >
        <div style={{ width: '100%' }}>
          <FixedColumnsTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Resizable Columns"
        description="Drag the right edge of a header to resize. Useful for variable-length content."
        code={ResizableSource}
      >
        <div style={{ width: '100%' }}>
          <ResizableTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Editable Cells"
        description="Double-click a cell to edit. Enter to save, Escape to cancel."
        code={EditableSource}
      >
        <div style={{ width: '100%' }}>
          <EditableTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Column Filters"
        description="Checkbox multi-select on Role and Status columns."
        code={FiltersSource}
      >
        <div style={{ width: '100%' }}>
          <FiltersTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Search Filter"
        description="Name and Email use filterMode='search' — type text to filter by substring."
        code={SearchFilterSource}
      >
        <div style={{ width: '100%' }}>
          <SearchFilterTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Custom Filter Dropdown"
        description="Fully custom filter UI using filterDropdown prop."
        code={CustomFilterDropdownSource}
      >
        <div style={{ width: '100%' }}>
          <CustomFilterDropdownTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Global Search"
        description="Type in the search box to filter across all columns."
        code={GlobalSearchSource}
      >
        <div style={{ width: '100%' }}>
          <GlobalSearchTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Summary Row"
        description="Footer row showing totals and averages."
        code={SummarySource}
      >
        <div style={{ width: '100%' }}>
          <SummaryTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Loading State"
        description="Table with loading overlay. Toggle to see the effect."
        code={LoadingSource}
      >
        <div style={{ width: '100%' }}>
          <LoadingTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Empty State"
        description="Table with no data and custom empty text."
        code={EmptyStateSource}
      >
        <div style={{ width: '100%' }}>
          <EmptyStateTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Styling: classNames / styles (slots)"
        description="Style stable DOM slots without deep selectors. Also shows column.headerClassName."
        code={StyledSlotsSource}
      >
        <div style={{ width: '100%' }}>
          <StyledSlotsTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Styling: component tokens (per instance)"
        description="Override --sg-table-* tokens on a wrapper to restyle a single table."
        code={CustomTokensSource}
      >
        <div style={{ width: '100%' }}>
          <CustomTokensTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Conditional Row Color"
        description="rowClassName tags rows by state. CSS does the rest — no deep selectors needed."
        code={ConditionalRowsSource}
      >
        <div style={{ width: '100%' }}>
          <ConditionalRowsTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Progress Cells"
        description="column.render returns progress bars, status pills and dynamically colored numbers."
        code={ProgressCellsSource}
      >
        <div style={{ width: '100%' }}>
          <ProgressCellsTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Finance Style (Stock Terminal)"
        description="Monospace tickers, green/red deltas, tabular numerics. Built only from slots and render."
        code={FinanceStyleSource}
      >
        <div style={{ width: '100%' }}>
          <FinanceStyleTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Styling: unstyled (headless)"
        description="Strip SkyGraph styles and bring your own CSS/layout. Semantics and behavior stay."
        code={UnstyledSource}
      >
        <div style={{ width: '100%' }}>
          <UnstyledTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Virtual Scroll"
        description="Efficiently render thousands of rows by only mounting what is visible in the viewport."
        code={VirtualSource}
      >
        <div style={{ width: '100%' }}>
          <VirtualTable />
        </div>
      </DemoBox>

      <DemoBox
        title="Kitchen Sink"
        description="All features combined: selection, expand, sort, filter, search, resize, fixed columns, editable, summary."
        code={KitchenSinkSource}
      >
        <div style={{ width: '100%' }}>
          <KitchenSinkTable />
        </div>
      </DemoBox>

      <PropsTable title="Table API" data={tableProps} />
      <PropsTable title="Column API" data={columnProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Scope these on a wrapper to re-skin just one table; set them on :root for app-wide tables."
        data={tableCssVars}
      />
    </ComponentDoc>
  )
}

const tableCssVars: CssVarDef[] = [
  { name: 'sg-table-row-height', default: 'auto', description: 'Minimum height of a body row' },
  { name: 'sg-table-row-bg', default: 'transparent', description: 'Row background (overridden by hover/selected)' },
  { name: 'sg-table-row-hover-bg', default: 'var(--sg-color-bg-hover)', description: 'Row background on hover' },
  { name: 'sg-table-header-bg', default: 'var(--sg-color-bg-secondary)', description: 'Header row background' },
  { name: 'sg-table-border-color', default: 'var(--sg-color-border)', description: 'Header + outer borders' },
  { name: 'sg-table-border-color-secondary', default: 'var(--sg-color-border-secondary)', description: 'Between-row separator' },
  { name: 'sg-table-cell-padding', default: 'var(--sg-padding-sm) var(--sg-padding-md)', description: 'Padding of every cell (tune density)' },
  { name: 'sg-table-cell-solid-bg', default: 'var(--sg-color-bg)', description: 'Opaque base for grid + sticky fixed cells' },
]
