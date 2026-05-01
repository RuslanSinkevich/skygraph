import type { SgLocale } from '../types/locale'

/**
 * English (US) locale preset for {@link ConfigProvider}.
 *
 * Covers the strings currently consumed by components:
 * Empty, Pagination, Popconfirm, Form, SchemaForm, Upload, Transfer, Calendar.
 */
export const en_US: SgLocale = {
  empty: {
    description: 'No Data',
  },
  pagination: {
    totalPrefix: 'Total',
    itemsPerPage: '/ page',
    jump: 'Go to',
    page: 'page',
  },
  popconfirm: {
    okText: 'Yes',
    cancelText: 'No',
  },
  modal: {
    okText: 'OK',
    cancelText: 'Cancel',
  },
  form: {
    required: '*',
    optional: '(optional)',
    submitText: 'Submit',
    resetText: 'Reset',
  },
  upload: {
    uploadText: 'Upload',
    removeFile: 'Remove file',
    uploadError: 'Upload failed',
    previewFile: 'Preview',
  },
  transfer: {
    titles: ['Source', 'Target'],
    searchPlaceholder: 'Search',
    itemUnit: 'item',
    itemsUnit: 'items',
    notFoundContent: 'Not found',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
  },
  calendar: {
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    today: 'Today',
    now: 'Now',
    week: 'W',
  },
}
