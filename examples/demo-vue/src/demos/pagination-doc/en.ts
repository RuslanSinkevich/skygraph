/**
 * English source of truth for Pagination doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue-side delta vs React: `showTotal` is `boolean` only — there is no
 * `(total, [from, to]) => VNode` callback variant. The localised
 * "Total N" prefix comes from `SgConfigProvider.locale.pagination`.
 */
export const paginationDocEn = {
  pageTitle: 'Pagination',
  pageBadge: 'Navigation',
  crumbCategory: 'Navigation',
  crumbPagination: 'Pagination',
  pageLead:
    'Page navigation with ellipsis folding, optional size changer / quick jumper / total label, and a compact simple mode.',
  pageWhen1: 'Long tables or lists — 50+ rows is the usual threshold.',
  pageWhen2: 'Paged API responses where the full set would be too heavy to stream.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Prev / next + numbered chips.',
  demoManyPagesTitle: 'Many pages',
  demoManyPagesDesc: 'Ellipsis folding once total > 7 pages.',
  demoSimpleTitle: 'Simple',
  demoSimpleDesc: "Compact 'current / total' flanked by prev / next.",
  demoShowTotalTitle: 'Show total',
  demoShowTotalDesc: 'Boolean toggle that prepends a localised "Total N" label.',
  demoSizeChangerTitle: 'Size changer + quick jumper',
  demoSizeChangerDesc: 'Full enterprise chrome: total, size, and jump-to-page.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Fade + pointer-events: none while the table is loading.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tablePaginationApi: 'Pagination API',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Pagination has no dedicated tokens — the active chip uses `--sg-color-primary`, idle chips follow the form chip palette. Bump `--sg-border-radius` to 999px for pill shapes; retint `--sg-color-primary` to rebrand.',

  propCurrent: 'Current page (1-based). Clamped to [1, totalPages]',
  propTotal: 'Total number of records',
  propPageSize: 'Rows per page',
  propShowTotal: 'Show "Total N" prefix (locale-driven)',
  propDisabled: 'Disable all controls',
  propSimple: 'Compact "current / total" mode, hides numbered buttons',
  propShowSizeChanger: 'Show a <select> for page size',
  propPageSizeOptions: 'Options in the size-changer <select>',
  propShowQuickJumper: 'Show a "Go to page" input',
  propUnstyled: 'Drop every sg-pagination-* class (headless mode)',
  emitChange: 'Emitted when the user picks a different page',
  emitPageSizeChange: 'Emitted when the user picks a new page size',

  cssBg: 'Idle chip background',
  cssBorder: 'Chip + disabled border',
  cssText: 'Chip text colour + simple pager',
  cssTextSecondary: '"Total N" label colour',
  cssTextDisabled: 'Disabled chip + ellipsis colour',
  cssPrimary: 'Hover border + active chip background',
  cssPrimaryHover: 'Active chip hover background',
  cssWhite: 'Active chip foreground colour',
  cssHeightMd: 'Chip height + ellipsis box height',
  cssPaddingSm: 'Chip horizontal padding, simple mode gap, wrapped row gap, jumper/select padding',
  cssMarginXs: 'Gap between pager controls',
  cssFontSizeSm: 'Total label, size changer, quick jumper text',
  cssBorderRadius: 'Chip corner radius',
  cssFontSize: 'Pager text size',
  cssTransitionDuration: 'Chip hover transition',
  cssTransitionTiming: 'Shared easing',
} as const

/** Writable string map — used by table builders. */
export type PaginationDocStrings = { -readonly [K in keyof typeof paginationDocEn]: string }
