import type {
  ColumnFilter,
  RowId,
  SortConfig,
  SortDirection,
  FilterOperator,
} from '@skygraph/core'

export type { RowId, SortDirection, SortConfig, ColumnFilter, FilterOperator }

export type TableSlot =
  | 'root'
  | 'toolbar'
  | 'scroll'
  | 'grid'
  | 'headerRow'
  | 'headerCell'
  | 'row'
  | 'bodyCell'
  | 'empty'
  | 'pagination'
  | 'footer'

export type TableClassNames = Partial<Record<TableSlot, string>>
export type TableStyles = Partial<Record<TableSlot, Record<string, string | number>>>

export interface TableLocale {
  emptyText?: string
  filterReset?: string
  filterConfirm?: string
  searchPlaceholder?: string
  sortAsc?: string
  sortDesc?: string
  filterIcon?: string
  totalRows?: (count: number) => string
  selectedRows?: (count: number) => string
}

export const DEFAULT_TABLE_LOCALE: Required<TableLocale> = {
  emptyText: 'No data',
  filterReset: 'Reset',
  filterConfirm: 'OK',
  searchPlaceholder: 'Search...',
  sortAsc: '▲',
  sortDesc: '▼',
  filterIcon: '▾',
  totalRows: (count) => `${count} rows`,
  selectedRows: (count) => `${count} selected`,
}

export interface TableColumn {
  /** Unique column key matching row data fields. */
  key: string
  /** Header label. */
  title: string
  /** Default column width in pixels. */
  width?: number
  /** Enables click-to-sort on this column. */
  sortable?: boolean
  /** Cell text alignment. */
  align?: 'left' | 'center' | 'right'
  /** Hides the column when true. */
  hidden?: boolean
  /** Preset filter options. */
  filters?: Array<{ text: string; value: unknown }>
  /** Predicate to test if a row matches a filter value. */
  onFilter?: (value: unknown, row: Record<string, unknown>) => boolean
}

export interface RowSelectionConfig {
  selectedKeys: RowId[]
  onChange?: (keys: RowId[], rows: Array<Record<string, unknown>>) => void
  type?: 'checkbox' | 'radio'
}

export interface TableProps {
  /** Column definitions. */
  columns: TableColumn[]
  /** Dataset rows. */
  data: Array<{ id: RowId; data: Record<string, unknown> }>
  /** Page size for built-in pagination; omit to render all rows on a single page. */
  pageSize?: number
  /** Row selection state. */
  rowSelection?: RowSelectionConfig
  /** Outlined table borders. @default false */
  bordered?: boolean
  /** Density preset. @default 'middle' */
  size?: 'small' | 'middle' | 'large'
  /** Sticky header while scrolling vertically. */
  sticky?: boolean
  /** Locale strings. */
  locale?: TableLocale
  /** Row class name. */
  rowClassName?: string | ((row: Record<string, unknown>, id: RowId) => string)
  /** Toolbar search across visible columns. */
  searchable?: boolean
  /** When false, disables pagination block even if `pageSize` is set. @default true */
  showPagination?: boolean
  /** Render without Skygraph styles. */
  unstyled?: boolean
  /** Public class names per slot. */
  classNames?: TableClassNames
  /** Public inline styles per slot. */
  styles?: TableStyles
}
