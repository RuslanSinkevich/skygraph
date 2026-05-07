/**
 * English source of truth for Table doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const tableDocEn = {
  pageTitle: 'Table',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbTable: 'Table',
  pageLead:
    'A table displays rows of data. Built on div + CSS Grid for maximum flexibility.',
  pageWhen1: 'To display a collection of structured data.',
  pageWhen2: 'To sort, search, paginate, and filter data.',
  pageWhen3: 'For hierarchical data display using tree mode.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Simple table with sorting and custom render.',
  demoSortableTitle: 'Sorting',
  demoSortableDesc: 'Sortable columns. Click a header to toggle asc/desc; shift-click for multi-sort.',
  demoSelectionTitle: 'Row Selection',
  demoSelectionDesc: 'Checkbox selection with select-all. Controlled state.',
  demoExpandableTitle: 'Expandable Rows',
  demoExpandableDesc: 'Click the arrow to expand a row and see extra content.',
  demoTreeDataTitle: 'Tree Data',
  demoTreeDataDesc:
    'Hierarchical org chart with nested children. Click arrows to expand / collapse.',
  demoColumnGroupsTitle: 'Column Groups',
  demoColumnGroupsDesc: 'Multi-level header with grouped columns (Contact Info, Work).',
  demoFixedColumnsTitle: 'Fixed Columns',
  demoFixedColumnsDesc:
    'Name is fixed left, Action is fixed right. Scroll horizontally.',
  demoResizableTitle: 'Resizable Columns',
  demoResizableDesc:
    'Drag the right edge of a header to resize. Useful for variable-length content.',
  demoEditableTitle: 'Editable Cells',
  demoEditableDesc: 'Double-click a cell to edit. Enter to save, Escape to cancel.',
  demoFiltersTitle: 'Column Filters',
  demoFiltersDesc: 'Checkbox multi-select on Role and Status columns.',
  demoSearchFilterTitle: 'Search Filter',
  demoSearchFilterDesc:
    "Name and Email use filterMode='search' — type text to filter by substring.",
  demoCustomFilterDropdownTitle: 'Custom Filter Dropdown',
  demoCustomFilterDropdownDesc: 'Fully custom filter UI using filterDropdown prop.',
  demoGlobalSearchTitle: 'Global Search',
  demoGlobalSearchDesc: 'Type in the search box to filter across all columns.',
  demoSummaryTitle: 'Summary Row',
  demoSummaryDesc: 'Footer row showing totals and averages.',
  demoLoadingTitle: 'Loading State',
  demoLoadingDesc: 'Table with loading overlay. Toggle to see the effect.',
  demoEmptyStateTitle: 'Empty State',
  demoEmptyStateDesc: 'Table with no data and custom empty text.',
  demoStyledSlotsTitle: 'Styling: classNames / styles (slots)',
  demoStyledSlotsDesc:
    'Style stable DOM slots without deep selectors. Also shows column.headerClassName.',
  demoCustomTokensTitle: 'Styling: component tokens (per instance)',
  demoCustomTokensDesc:
    'Override --sg-table-* tokens on a wrapper to restyle a single table.',
  demoConditionalRowsTitle: 'Conditional Row Color',
  demoConditionalRowsDesc:
    'rowClassName tags rows by state. CSS does the rest — no deep selectors needed.',
  demoProgressCellsTitle: 'Progress Cells',
  demoProgressCellsDesc:
    'column.render returns progress bars, status pills and dynamically colored numbers.',
  demoFinanceStyleTitle: 'Finance Style (Stock Terminal)',
  demoFinanceStyleDesc:
    'Monospace tickers, green/red deltas, tabular numerics. Built only from slots and render.',
  demoUnstyledTitle: 'Styling: unstyled (headless)',
  demoUnstyledDesc:
    'Strip SkyGraph styles and bring your own CSS/layout. Semantics and behavior stay.',
  demoVirtualTitle: 'Virtual Scroll',
  demoVirtualDesc:
    'Efficiently render thousands of rows by only mounting what is visible in the viewport.',
  demoKitchenSinkTitle: 'Kitchen Sink',
  demoKitchenSinkDesc:
    'All features combined: selection, expand, sort, filter, search, resize, fixed columns, editable, summary.',
  demoAdvancedFiltersTitle: 'Advanced Filters',
  demoAdvancedFiltersDesc:
    "filterMode='advanced' wires per-column operators: numeric eq/lt/gt/between, string contains/startsWith, enum in/notIn, date range, and a custom array `contains/notContains` dropdown. Footer shows the live filtered count and a global reset.",
  demoGroupingTitle: 'Grouping',
  demoGroupingDesc:
    'groupBy with switchable field plus column.aggregate (sum / sum / max-by-custom-reducer). Group rows expand/collapse; footer renders dataset totals.',
  demoVirtualDynamicTitle: 'Virtual Scroll: dynamic row heights',
  demoVirtualDynamicDesc:
    'rowHeight as a function reports a different height per row (long messages = 120px, short = 48px). estimateRowHeight covers off-screen rows. Load more keeps the mounted DOM flat past 4 000 rows.',
  demoLargeDatasetTitle: 'Large Dataset (stress test)',
  demoLargeDatasetDesc:
    '10 000 rows with virtual + sort + filter + groupBy + column pinning + selection on at the same time. Smoke test for layout / scroll smoothness on real-world volumes.',
  demoRealtimeTitle: 'Realtime Updates',
  demoRealtimeDesc:
    '100 ticker rows mutated every 1.5s. Price cells flash green/red on change via a CSS keyframe; sorts and filters survive each tick because rows are keyed by id.',

  tableTableApi: 'Table API',
  tableColumnApi: 'Column API',
  tableCssVars: 'CSS Variables',

  propColumns: 'Table columns configuration',
  propData: 'Data rows with id and data fields',
  propPageSize: 'Rows per page',
  propShowPagination: 'Show pagination',
  propBordered: 'Show all borders',
  propSize: 'Table density',
  propLoading: 'Show loading overlay',
  propSearchable: 'Show global search box',
  propScroll: 'Horizontal scroll width',
  propRowSelection: 'Row selection config',
  propExpandable: 'Expandable row config',
  propTree: 'Tree data config',
  propSummary: 'Summary row render function',
  propDraggable: 'Enable column drag & drop reorder',
  propOnColumnOrderChange: 'Callback on column reorder',
  propOnCellEdit: 'Callback on cell edit',
  propRowClassName: 'Custom class for rows',
  propClassNames: 'Slot classes (root/toolbar/headerCell/bodyCell/row/...)',
  propStyles: 'Slot inline styles (root/toolbar/headerCell/bodyCell/row/...)',
  propLocale: 'Locale overrides',
  propVirtual: 'Virtual scroll config',
  propUnstyled: 'Remove all built-in styles',

  colKey: 'Unique column key (matches data field)',
  colTitle: 'Column header text',
  colWidth: 'Column width in px',
  colAlign: 'Text alignment',
  colSortable: 'Enable sorting',
  colFixed: 'Fix column position',
  colResizable: 'Enable column resize',
  colEditable: 'Enable inline cell editing',
  colEllipsis: 'Truncate text with ellipsis',
  colRender: 'Custom cell render function',
  colHeaderClassName: 'Class for header cell of this column',
  colFilters: 'Filter menu items',
  colOnFilter: 'Filter logic function',
  colFilterMultiple: 'Allow multiple filter values',
  colFilterMode: 'Use search input instead of checkboxes',
  colFilterSearch: 'Show search in filter dropdown',
  colFilterDropdown: 'Custom filter dropdown render',
  colFilterIcon: 'Custom filter icon',
  colDefaultFilteredValue: 'Default filter values on mount',
  colChildren: 'Nested columns for column groups',
  colOnCell: 'Custom cell attributes (row/col span)',

  cssHint:
    'Scope these on a wrapper to re-skin just one table; set them on :root for app-wide tables.',

  cssSgTableRowHeight: 'Minimum height of a body row',
  cssSgTableRowBg: 'Row background (overridden by hover/selected)',
  cssSgTableRowHoverBg: 'Row background on hover',
  cssSgTableHeaderBg: 'Header row background',
  cssSgTableBorderColor: 'Header + outer borders',
  cssSgTableBorderColorSecondary: 'Between-row separator',
  cssSgTableCellPadding: 'Padding of every cell (tune density)',
  cssSgTableCellSolidBg: 'Opaque base for grid + sticky fixed cells',
} as const

/** Writable string map — use for props / table builders (same keys as `tableDocEn`). */
export type TableDocStrings = { -readonly [K in keyof typeof tableDocEn]: string }
