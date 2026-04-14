import type React from 'react'

export interface PaginationLocale {
  totalPrefix?: string
  itemsPerPage?: string
  jump?: string
  page?: string
}

export interface TableLocale {
  emptyText?: React.ReactNode
  filterReset?: string
  filterConfirm?: string
  filterSearchPlaceholder?: string
  filterEmptyText?: string
  searchPlaceholder?: string
  sortAsc?: React.ReactNode
  sortDesc?: React.ReactNode
  expandIcon?: React.ReactNode
  filterIcon?: React.ReactNode
  searchIcon?: React.ReactNode
  totalRows?: (count: number) => string
  selectedRows?: (count: number) => string
  exportCSV?: string
  copyTable?: string
  pinLeft?: string
  pinRight?: string
  unpin?: string
  showColumns?: string
}

export interface DataGridLocale {
  noData?: string
  selectAll?: string
}

export interface ModalLocale {
  okText?: string
  cancelText?: string
}

export interface PopconfirmLocale {
  okText?: string
  cancelText?: string
}

export interface EmptyLocale {
  description?: string
}

export interface SgLocale {
  table?: TableLocale
  pagination?: PaginationLocale
  dataGrid?: DataGridLocale
  modal?: ModalLocale
  popconfirm?: PopconfirmLocale
  empty?: EmptyLocale
}
