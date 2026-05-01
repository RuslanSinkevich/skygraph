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

/** Locale strings for the Table component. */
export interface TableLocale {
  /** Placeholder shown when the table has no data. */
  emptyText?: React.ReactNode
  /** Label for the filter-reset button. */
  filterReset?: string
  /** Label for the filter-confirm button. */
  filterConfirm?: string
  /** Placeholder inside the filter search input. */
  filterSearchPlaceholder?: string
  /** Text shown when no filter options match. */
  filterEmptyText?: string
  /** Placeholder for the table search input. */
  searchPlaceholder?: string
  /** Content for the ascending-sort indicator. */
  sortAsc?: React.ReactNode
  /** Content for the descending-sort indicator. */
  sortDesc?: React.ReactNode
  /** Custom expand-row icon. */
  expandIcon?: React.ReactNode
  /** Custom filter icon. */
  filterIcon?: React.ReactNode
  /** Custom search icon. */
  searchIcon?: React.ReactNode
  /** Formatter for total-row count (e.g. `(n) => \`${n} rows\``). */
  totalRows?: (count: number) => string
  /** Formatter for selected-row count (e.g. `(n) => \`${n} selected\``). */
  selectedRows?: (count: number) => string
  /** Label for the "Export CSV" action. */
  exportCSV?: string
  /** Label for the "Copy table" action. */
  copyTable?: string
  /** Label for the "Pin left" column action. */
  pinLeft?: string
  /** Label for the "Pin right" column action. */
  pinRight?: string
  /** Label for the "Unpin" column action. */
  unpin?: string
  /** Label for the "Show columns" toggle. */
  showColumns?: string
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
