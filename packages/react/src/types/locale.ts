import type React from 'react'

/** Locale strings for the Pagination component. */
export interface PaginationLocale {
  /** Text shown before the total count (e.g. "Total"). */
  totalPrefix?: string
  /** Label for the page-size selector (e.g. "items / page"). */
  itemsPerPage?: string
  /** Label for the page-jump input (e.g. "Go to"). */
  jump?: string
  /** Unit label for a page (e.g. "page"). */
  page?: string
}

/**
 * Localizable strings for the `Table` component. This is the *single*
 * canonical declaration; `complex/Table/types.ts` re-exports the same type
 * to keep imports stable inside the Table subtree.
 */
export interface TableLocale {
  /** Empty state body text. */
  emptyText?: React.ReactNode
  /** Filter reset button label. */
  filterReset?: string
  /** Filter confirm button label. */
  filterConfirm?: string
  /** Placeholder for filter list search. */
  filterSearchPlaceholder?: string
  /** Message when filter search has no matches. */
  filterEmptyText?: string
  /** Toolbar global search placeholder. */
  searchPlaceholder?: string
  /** Ascending sort affordance in header. */
  sortAsc?: React.ReactNode
  /** Descending sort affordance in header. */
  sortDesc?: React.ReactNode
  /** Row/tree expander icon. */
  expandIcon?: React.ReactNode
  /** Default column filter icon. */
  filterIcon?: React.ReactNode
  /** Column search-mode filter icon. */
  searchIcon?: React.ReactNode
  /** Formats total row count label. */
  totalRows?: (count: number) => string
  /** Formats selection count in the summary bar. */
  selectedRows?: (count: number) => string
  /** CSV export toolbar label. */
  exportCSV?: string
  /** JSON export toolbar label. */
  exportJSON?: string
  /** Copy table toolbar label. */
  copyTable?: string
  /** Pin column to left context label. */
  pinLeft?: string
  /** Pin column to right context label. */
  pinRight?: string
  /** Unpin column context label. */
  unpin?: string
  /** Column visibility menu trigger label. */
  showColumns?: string
  /** Print toolbar label. */
  print?: string
  /** Enter fullscreen label. */
  fullscreen?: string
  /** Exit fullscreen label. */
  exitFullscreen?: string
  /** Density menu trigger label. */
  density?: string
  /** Compact density option. */
  densitySmall?: string
  /** Default density option. */
  densityMiddle?: string
  /** Comfortable density option. */
  densityLarge?: string
  /** Collapse all groups toolbar label. */
  groupCollapse?: string
  /** Expand all groups toolbar label. */
  groupExpand?: string
  /** Aggregate label for sum. */
  sum?: string
  /** Aggregate label for average. */
  avg?: string
  /** Aggregate label for count. */
  count?: string
  /** Aggregate label for minimum. */
  min?: string
  /** Aggregate label for maximum. */
  max?: string
  /** Copy success toast (reserved). */
  copiedToClipboard?: string
  /** Row number column header. */
  rowNumber?: string
}

/** Locale strings for the DataGrid component. */
export interface DataGridLocale {
  /** Text shown when the grid has no data. */
  noData?: string
  /** Label for the "Select all" action. */
  selectAll?: string
}

/** Locale strings for the Modal component. */
export interface ModalLocale {
  /** Label for the OK / confirm button. */
  okText?: string
  /** Label for the Cancel button. */
  cancelText?: string
}

/** Locale strings for the Popconfirm component. */
export interface PopconfirmLocale {
  /** Label for the OK / confirm button. */
  okText?: string
  /** Label for the Cancel button. */
  cancelText?: string
}

/** Locale strings for the Empty component. */
export interface EmptyLocale {
  /** Default description shown when no data is available. */
  description?: string
}

/** Locale strings for form-related components. */
export interface FormLocale {
  /** Marker text for required fields. */
  required?: string
  /** Marker text for optional fields. */
  optional?: string
  /** Label for the submit button. */
  submitText?: string
  /** Label for the reset button. */
  resetText?: string
}

/** Locale strings for the Upload component. */
export interface UploadLocale {
  /** Label for the upload trigger. */
  uploadText?: string
  /** Label for the remove-file action. */
  removeFile?: string
  /** Text shown when an upload fails. */
  uploadError?: string
  /** Label for the preview-file action. */
  previewFile?: string
}

/** Locale strings for the Transfer component. */
export interface TransferLocale {
  /** Titles for the left and right lists. */
  titles?: [string, string]
  /** Placeholder for the search input inside lists. */
  searchPlaceholder?: string
  /** Singular unit label for items (e.g. "item"). */
  itemUnit?: string
  /** Plural unit label for items (e.g. "items"). */
  itemsUnit?: string
  /** Content shown when no items match the search. */
  notFoundContent?: string
  /** Label for the "Select all" checkbox. */
  selectAll?: string
  /** Label for the "Deselect all" checkbox. */
  deselectAll?: string
}

/** Locale strings for the Calendar component. */
export interface CalendarLocale {
  /** Localized month names (12 entries). */
  monthNames?: string[]
  /** Localized day-of-week names (7 entries, starting from Sunday or Monday depending on locale). */
  dayNames?: string[]
  /** Label for the "Today" button. */
  today?: string
  /** Label for the "Now" shortcut when picking date + time. */
  now?: string
  /** Column header for the ISO week number when `showWeekNumber` is enabled. */
  week?: string
}

/** Root locale object that aggregates all component-level locales. */
export interface SgLocale {
  /** Table locale overrides. */
  table?: TableLocale
  /** Pagination locale overrides. */
  pagination?: PaginationLocale
  /** DataGrid locale overrides. */
  dataGrid?: DataGridLocale
  /** Modal locale overrides. */
  modal?: ModalLocale
  /** Popconfirm locale overrides. */
  popconfirm?: PopconfirmLocale
  /** Empty locale overrides. */
  empty?: EmptyLocale
  /** Form locale overrides. */
  form?: FormLocale
  /** Upload locale overrides. */
  upload?: UploadLocale
  /** Transfer locale overrides. */
  transfer?: TransferLocale
  /** Calendar locale overrides. */
  calendar?: CalendarLocale
}
