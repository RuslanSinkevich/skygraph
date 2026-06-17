/**
 * English source of truth for Pagination doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const paginationDocEn = {
  pageTitle: 'Pagination',
  pageLead:
    'Page navigation with ellipsis folding, optional size changer / quick jumper / total label, and a compact simple mode.',
  pageWhen1: 'Long tables or lists — 50+ rows is the usual threshold.',
  pageWhen2: 'Paged API responses where the full set would be too heavy to stream.',
  pageWhen3: 'Search-results grids that need deep-link page numbers in the URL.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Prev / next + numbered chips.',
  demoManyPagesTitle: 'Many pages',
  demoManyPagesDesc: 'Ellipsis folding once total > 7 pages.',
  demoSimpleTitle: 'Simple',
  demoSimpleDesc: "Compact 'current / total' flanked by prev / next.",
  demoShowTotalTitle: 'Show total',
  demoShowTotalDesc: "Boolean for 'Total N', or a function for a custom range label.",
  demoSizeChangerTitle: 'Size changer + quick jumper',
  demoSizeChangerDesc: 'Full enterprise chrome: total, size, and jump-to-page.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Fade + pointer-events: none while the table is loading.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tablePaginationApi: 'Pagination API',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Pagination has no dedicated tokens — the active chip uses `--sg-color-primary`, idle chips follow the form chip palette. Bump `--sg-border-radius` to 999px for pill shapes; retint `--sg-color-primary` to rebrand.',

  propCurrent: 'Current page (1-based). Clamped to [1, totalPages]',
  propTotal: 'Total number of records',
  propPageSize: 'Rows per page',
  propOnChange: 'Fires when the user picks a different page',
  propOnPageSizeChange: 'Fires when the user picks a new page size',
  propShowTotal: 'Show "Total N" (boolean) or a custom (total, range) ⇒ ReactNode function',
  propDisabled: 'Disable all controls',
  propSimple: 'Compact "current / total" mode, hides numbered buttons',
  propShowSizeChanger: 'Show a <select> for page size',
  propPageSizeOptions: 'Options in the size-changer <select>',
  propShowQuickJumper: 'Show a "Go to page" input',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-pagination-* class (headless mode)',

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

/** Writable string map — use for props / table builders (same keys as `paginationDocEn`). */
export type PaginationDocStrings = { -readonly [K in keyof typeof paginationDocEn]: string }
