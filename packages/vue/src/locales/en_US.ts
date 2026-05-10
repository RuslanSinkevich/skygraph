import type { SgLocale } from '../types'

/** English (US) preset for {@link SgConfigProvider} `locale`. */
export const en_US: SgLocale = {
  modal: {
    okText: 'OK',
    cancelText: 'Cancel',
  },
  popconfirm: {
    okText: 'Yes',
    cancelText: 'No',
  },
  empty: {
    description: 'No Data',
  },
  pagination: {
    totalPrefix: 'Total',
    itemsPerPage: '/ page',
    jump: 'Go to',
    page: 'page',
  },
  inputPassword: {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    strengthWeak: 'Weak',
    strengthMedium: 'Medium',
    strengthStrong: 'Strong',
    strengthVeryStrong: 'Very strong',
  },
  searchInput: {
    placeholder: 'Search…',
    clear: 'Clear',
    search: 'Search',
  },
  tagInput: {
    placeholder: 'Add tag…',
    removeTag: 'Remove',
  },
  pinInput: {
    ariaLabel: 'PIN input',
  },
  inlineEdit: {
    placeholder: 'Click to edit…',
    save: 'Save',
    cancel: 'Cancel',
  },
}
