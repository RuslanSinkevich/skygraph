/**
 * Locale type primitives for `@skygraph/angular`.
 *
 * Mirrors the structure of `packages/react/src/types/locale.ts` 1:1 so the
 * same `SgLocale` object can be passed across adapters. Wave 4.1 only ships
 * the strings actually consumed by `SgButton` + `SgSpin`; the rest of the
 * interface lives here so wave 4.2 component ports do not need to extend it.
 */

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
  /** Accessible name for the surrounding `<nav>` element. */
  ariaLabel?: string
}

/** Locale strings for the Table component. */
export interface TableLocale {
  emptyText?: string
  filterReset?: string
  filterConfirm?: string
  filterSearchPlaceholder?: string
  filterEmptyText?: string
  searchPlaceholder?: string
  sortAsc?: string
  sortDesc?: string
  expandIcon?: string
  filterIcon?: string
  searchIcon?: string
  totalRows?: (count: number) => string
  selectedRows?: (count: number) => string
  exportCSV?: string
  exportJSON?: string
  copyTable?: string
  pinLeft?: string
  pinRight?: string
  unpin?: string
  showColumns?: string
  print?: string
  fullscreen?: string
  exitFullscreen?: string
  density?: string
  densitySmall?: string
  densityMiddle?: string
  densityLarge?: string
  groupCollapse?: string
  groupExpand?: string
  sum?: string
  avg?: string
  count?: string
  min?: string
  max?: string
  copiedToClipboard?: string
  rowNumber?: string
  groupByLabel?: string
  groupByNone?: string
}

/** Locale strings for the DataGrid component. */
export interface DataGridLocale {
  noData?: string
  selectAll?: string
}

/** Locale strings for the Modal component. */
export interface ModalLocale {
  okText?: string
  cancelText?: string
  closeAriaLabel?: string
}

/** Locale strings for the Popconfirm component. */
export interface PopconfirmLocale {
  okText?: string
  cancelText?: string
}

/** Locale strings for the Empty component. */
export interface EmptyLocale {
  description?: string
}

/** Locale strings for form-related components. */
export interface FormLocale {
  required?: string
  optional?: string
  submitText?: string
  resetText?: string
}

/** Locale strings for the Upload component. */
export interface UploadLocale {
  uploadText?: string
  removeFile?: string
  uploadError?: string
  previewFile?: string
  uploadAriaLabel?: string
}

/** Locale strings for the Transfer component. */
export interface TransferLocale {
  titles?: [string, string]
  searchPlaceholder?: string
  itemUnit?: string
  itemsUnit?: string
  notFoundContent?: string
  selectAll?: string
  deselectAll?: string
}

/** Locale strings for the Calendar component. */
export interface CalendarLocale {
  monthNames?: string[]
  dayNames?: string[]
  today?: string
  now?: string
  week?: string
  prevYear?: string
  nextYear?: string
  prevMonth?: string
  nextMonth?: string
}

/** Locale strings for the InputPassword component. */
export interface InputPasswordLocale {
  showPassword?: string
  hidePassword?: string
}

/** Locale strings for the SearchInput component. */
export interface SearchInputLocale {
  clear?: string
}

/** Locale strings for the InlineEdit component. */
export interface InlineEditLocale {
  save?: string
  cancel?: string
}

/** Locale strings for the TagInput component. */
export interface TagInputLocale {
  removeTag?: (tag: string) => string
}

/** Locale strings for the Drawer component. */
export interface DrawerLocale {
  closeAriaLabel?: string
}

/** Locale strings for the Notification component. */
export interface NotificationLocale {
  closeAriaLabel?: string
}

/** Locale strings for the Tag component. */
export interface TagLocale {
  closeAriaLabel?: string
}

/** Locale strings for the Spin component. */
export interface SpinLocale {
  /** Accessible label for the spinner role. */
  loading?: string
}

/** Locale strings for the Skeleton component. */
export interface SkeletonLocale {
  loading?: string
}

/** Locale strings for the Breadcrumb component. */
export interface BreadcrumbLocale {
  ariaLabel?: string
}

/** Locale strings for the Carousel component. */
export interface CarouselLocale {
  slide?: (index: number) => string
}

/** Locale strings for the Rate component. */
export interface RateLocale {
  ariaLabel?: string
  star?: (count: number) => string
}

/** Locale strings for the Charts components. */
export interface ChartsLocale {
  lineChart?: string
  barChart?: string
  areaChart?: string
  pieChart?: string
  legend?: string
  actions?: string
}

/** Locale strings for the DatePicker / RangePicker components. */
export interface DatePickerLocale {
  prevYear?: string
  nextYear?: string
  prevMonth?: string
  nextMonth?: string
}

/** Locale strings for the Cascader component. */
export interface CascaderLocale {
  searchPlaceholder?: string
  noMatches?: string
}

/** Locale strings for the TreeSelect component. */
export interface TreeSelectLocale {
  searchPlaceholder?: string
  noMatches?: string
}

/** Locale strings for the Dashboard / DashboardEditor components. */
export interface DashboardLocale {
  ariaLabel?: string
  editorAriaLabel?: string
  resizeWidget?: string
  widgetActions?: string
}

/** Locale strings for the Gantt component. */
export interface GanttLocale {
  ariaLabel?: string
  resizeTask?: string
}

/** Locale strings for the ResourceCalendar component. */
export interface ResourceCalendarLocale {
  ariaLabel?: string
  resource?: (name: string) => string
  capacity?: (capacityPerSlot: number) => string
  resizeStart?: string
  resizeEnd?: string
  conflictSuffix?: string
}

/** Locale strings for the Timeline component. */
export interface TimelineLocale {
  ariaLabel?: string
}

/** Locale strings for the SchemaFormEditor component. */
export interface SchemaFormEditorLocale {
  undo?: string
  redo?: string
  removeOption?: string
  schemaView?: string
  optionLabelPlaceholder?: string
  optionValuePlaceholder?: string
  moveFieldUp?: string
  moveFieldDown?: string
  duplicateField?: string
  deleteField?: string
}

/** Root locale object that aggregates all component-level locales. */
export interface SgLocale {
  table?: TableLocale
  pagination?: PaginationLocale
  dataGrid?: DataGridLocale
  modal?: ModalLocale
  popconfirm?: PopconfirmLocale
  empty?: EmptyLocale
  form?: FormLocale
  upload?: UploadLocale
  transfer?: TransferLocale
  calendar?: CalendarLocale
  inputPassword?: InputPasswordLocale
  searchInput?: SearchInputLocale
  inlineEdit?: InlineEditLocale
  tagInput?: TagInputLocale
  drawer?: DrawerLocale
  notification?: NotificationLocale
  tag?: TagLocale
  spin?: SpinLocale
  skeleton?: SkeletonLocale
  breadcrumb?: BreadcrumbLocale
  carousel?: CarouselLocale
  rate?: RateLocale
  charts?: ChartsLocale
  datePicker?: DatePickerLocale
  cascader?: CascaderLocale
  treeSelect?: TreeSelectLocale
  dashboard?: DashboardLocale
  gantt?: GanttLocale
  resourceCalendar?: ResourceCalendarLocale
  timeline?: TimelineLocale
  schemaFormEditor?: SchemaFormEditorLocale
}
