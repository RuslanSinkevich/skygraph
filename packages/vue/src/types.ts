import type { CSSProperties } from 'vue'

/** Available component size variants. */
export type SizeType = 'small' | 'middle' | 'large'

/** Common props shared by all Skygraph Vue components. */
export interface BaseComponentProps {
  /** Additional CSS class name. */
  class?: string
  /** Inline CSS styles. */
  style?: CSSProperties
  /** When `true`, all built-in styles are stripped — the component renders bare semantic HTML. */
  unstyled?: boolean
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

/** Root locale object that aggregates all component-level locales. */
export interface SgLocale {
  modal?: ModalLocale
  popconfirm?: PopconfirmLocale
  empty?: EmptyLocale
  pagination?: PaginationLocale
}
