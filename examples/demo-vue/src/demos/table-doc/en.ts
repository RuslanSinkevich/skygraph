/**
 * English doc strings for the Table component page (`TableDemo.vue`).
 * `ru.ts` mirrors these keys. 1:1 parity with React's TableDemo (29 demos).
 */
export const tableDocEn = {
  pageTitle: 'Table',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbTable: 'Table',
  pageLead:
    'Headless `useTable()` orchestrator with a `<SgTable>` shell — sort, filter, search, paginate, row selection, expand, tree, virtual scroll and inline editing.',
  pageWhen1: 'You display a collection of structured records.',
  pageWhen2: 'You need sort, search, paginate, filter without dragging in a heavy data grid.',
  pageWhen3:
    'You need rich behaviours — expandable rows, tree-shaped data, virtual scroll, inline edit.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Column defs and row data — that is all you need.',
  demoSortableTitle: 'Sortable',
  demoSortableDesc: 'Click a `sortable` column header to cycle asc → desc → none.',
  demoSelectionTitle: 'Row selection',
  demoSelectionDesc:
    'Checkbox selection controlled via `rowSelection.selectedKeys` + `onChange`. Header checkbox toggles all visible rows.',
  demoExpandableTitle: 'Expandable rows',
  demoExpandableDesc:
    'Pass `expandable.expandedRowRender` to reveal arbitrary content under each row. Vue forwards the rendered content through the `#expandedRow` slot.',
  demoTreeDataTitle: 'Tree data',
  demoTreeDataDesc:
    'Pass `tree` and use `data.children` to render hierarchical rows. Expand arrows appear in the first column automatically.',
  demoColumnGroupsTitle: 'Column groups',
  demoColumnGroupsDesc:
    'Any column can have `children`; the parent renders as a spanning header above its leaves.',
  demoFixedColumnsTitle: 'Fixed columns',
  demoFixedColumnsDesc:
    'Use `fixed: "left"` or `fixed: "right"` to pin columns while the middle scrolls horizontally.',
  demoResizableTitle: 'Resizable columns',
  demoResizableDesc: 'Drag the right edge of a header to resize it. Width persists per column.',
  demoDraggableColumnsTitle: 'Draggable columns',
  demoDraggableColumnsDesc:
    'Reorder columns by dragging chips in the manager strip — the order flows back into `:columns`.',
  demoEditableTitle: 'Editable cells',
  demoEditableDesc:
    'Double-click a cell marked `editable` to edit. Enter commits, Escape cancels. `@cellEdit` fires (id, column, value).',
  demoFiltersTitle: 'Column filters',
  demoFiltersDesc:
    'Per-column `filters` array renders a header dropdown; `onFilter` decides matches.',
  demoSearchFilterTitle: 'Search filter',
  demoSearchFilterDesc:
    'Toolbar search across all visible columns — built-in via `searchable` prop.',
  demoCustomFilterDropdownTitle: 'Custom filter dropdown',
  demoCustomFilterDropdownDesc:
    'Replace the per-column filter popover via the `#filterDropdown` slot. Slot props expose selectedKeys / setSelectedKeys / confirm / clearFilters / close.',
  demoGlobalSearchTitle: 'Global search',
  demoGlobalSearchDesc:
    '`searchable` renders a toolbar input that substring-matches every visible column.',
  demoSummaryTitle: 'Summary rows',
  demoSummaryDesc:
    '`summary` returns rows of cells with `colSpan` / `align`. Useful for totals, averages, and custom footers.',
  demoLoadingTitle: 'Loading',
  demoLoadingDesc:
    '`loading` shows an overlay spinner and dims interactions. Toggle the button to see it appear and disappear.',
  demoEmptyStateTitle: 'Empty state',
  demoEmptyStateDesc:
    'Empty data array → table renders a placeholder. The `#empty` slot lets you replace the default text.',
  demoStyledSlotsTitle: 'Styled slots',
  demoStyledSlotsDesc:
    'Per-slot class hooks via `classNames` — apply your own BEM-style classes to header rows, body cells, pagination.',
  demoCustomTokensTitle: 'Custom tokens',
  demoCustomTokensDesc:
    'Override `--sg-table-*` tokens on a wrapper to restyle one table without touching the globals.',
  demoConditionalRowsTitle: 'Conditional rows',
  demoConditionalRowsDesc:
    '`rowClassName` accepts a function to colour rows by their data — archived dim, paused warning.',
  demoProgressCellsTitle: 'Progress cells',
  demoProgressCellsDesc:
    'Use the `#cell` slot to render Progress / Tag / coloured numbers — cell tone reacts to value (red over-budget, amber approaching).',
  demoFinanceStyleTitle: 'Finance style',
  demoFinanceStyleDesc:
    'Stock-terminal look built purely from public props — `classNames.root` + `#cell` slot. No deep selectors.',
  demoVirtualTitle: 'Virtual scroll',
  demoVirtualDesc:
    '`virtual` keeps the mounted DOM ≈ viewport + overscan even with thousands of rows. Use a number `rowHeight` for the fast fixed path.',
  demoKitchenSinkTitle: 'Kitchen sink',
  demoKitchenSinkDesc:
    'Most features combined — selection + expand + sort + filter + search + resize + fixed columns + editable + summary.',
  demoAdvancedFiltersTitle: 'Advanced filters',
  demoAdvancedFiltersDesc:
    'Operator-driven filter dialogs per column (numeric / text / tag) wired up via `#filterDropdown`. Mirrors React `filterMode="advanced"`.',
  demoGroupingTitle: 'Grouping & aggregates',
  demoGroupingDesc:
    'Column `aggregate` runs a sum / avg / count / min / max / custom reducer over the visible rows; toggle `footer` to expose the totals row.',
  demoVirtualDynamicTitle: 'Virtual scroll — dynamic heights',
  demoVirtualDynamicDesc:
    'Pass a function `rowHeight(row)` for variable-height rows; `estimateRowHeight` keeps unmeasured rows out of layout jank.',
  demoLargeDatasetTitle: 'Large Dataset (stress test)',
  demoLargeDatasetDesc:
    '10 000 rows with virtualisation, sorting, filtering, fixed columns and row selection. The UI should stay interactive at this volume.',
  demoRealtimeTitle: 'Realtime updates',
  demoRealtimeDesc:
    'Reactive `data` — mutate the array and the table refreshes. `progress` ticks every 800 ms.',

  tableTableApi: 'Table API',
  tableColumnApi: 'Column API',
  tableCssVars: 'CSS Variables',

  propColumns: 'Column definitions',
  propData: 'Dataset rows: `{ id, data }[]`',
  propPageSize: 'Page size for built-in pagination',
  propShowPagination: 'Show pagination block',
  propBordered: 'Outlined table borders',
  propSize: 'Density preset',
  propLoading: 'Shows a loading overlay over the table body',
  propSearchable: 'Toolbar search across visible columns',
  propScroll: 'Horizontal/vertical scroll constraints',
  propRowSelection: 'Row selection state',
  propExpandable: 'Per-row inline expand renderer',
  propTree: 'Tree-shaped data (renders `data.children`)',
  propSummary: 'Custom summary rows below the body',
  propOnCellEdit: 'Commits inline cell edit values',
  propRowClassName: 'Static or per-row class',
  propSticky: 'Sticky header while scrolling',
  propDraggable: 'Enable column reorder by header drag-and-drop',
  propLocale: 'Override locale strings',
  propVirtual: 'Virtualise the body (fixed or dynamic row height)',
  propUnstyled: 'Strip Skygraph styles',
  propClassNames: 'Per-slot class names',
  propStyles: 'Per-slot inline styles',
  propFooter: 'Show table-level aggregate footer row',
  emitRowClick: 'Row clicked',
  emitPageChange: 'Page navigator clicked',
  emitSortChange: 'Sort indicator changed',
  emitCellEdit: 'Inline cell edit committed',
  emitExpand: 'Row expand state toggled',
  emitColumnOrderChange: 'Header columns reordered by drag-and-drop',

  colKey: 'Unique column key matching row data',
  colTitle: 'Header label',
  colWidth: 'Default column width in pixels',
  colMinWidth: 'Minimum width when resizing',
  colSortable: 'Enables click-to-sort on this column',
  colAlign: 'Cell text alignment',
  colFixed: 'Sticky column position',
  colResizable: 'Enables drag handle on the header to resize',
  colEditable: 'Allows in-cell editing when `onCellEdit` is set',
  colHidden: 'Hides the column when true',
  colFilters: 'Preset filter options',
  colOnFilter: 'Predicate to test if a row matches a filter value',
  colFilterMultiple: 'Allows multi-select in filter menu',
  colChildren: 'Child columns for grouped headers',
  colAggregate: 'Footer aggregate (built-in name or custom reducer)',
  colOnCell: 'Returns rowSpan / colSpan for the cell',

  cssHint: 'Scope these on a wrapper to re-skin a single table; set on :root for app-wide tables.',
  cssSgTableRowHeight: 'Minimum height of a body row',
  cssSgTableRowBg: 'Row background (overridden by hover / selected)',
  cssSgTableRowHoverBg: 'Row background on hover',
  cssSgTableHeaderBg: 'Header row background',
  cssSgTableBorderColor: 'Header and outer borders',
  cssSgTableBorderColorSecondary: 'Between-row separator',
  cssSgTableCellPadding: 'Padding of every cell (tune density)',
  cssSgTableCellSolidBg: 'Opaque base for grid + sticky fixed cells',
} as const

export type TableDocStrings = { -readonly [K in keyof typeof tableDocEn]: string }
