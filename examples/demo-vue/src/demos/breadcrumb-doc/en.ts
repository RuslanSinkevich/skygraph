/**
 * English source of truth for Breadcrumb doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const breadcrumbDocEn = {
  pageTitle: 'Breadcrumb',
  pageBadge: 'Navigation',
  crumbCategory: 'Navigation',
  crumbBreadcrumb: 'Breadcrumb',
  pageLead:
    'Hierarchical location indicator. The last segment is non-interactive and marks the current page; everything before it is linked.',
  pageWhen1: 'Three or more levels of hierarchy where users need a way back to a parent.',
  pageWhen2: 'Long pages where the page title alone doesn\u2019t tell you where you are.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Trail with two links + a current page.',
  demoSeparatorTitle: 'Custom separator',
  demoSeparatorDesc: 'Plain string — character, chevron, dot.',
  demoOnClickTitle: 'itemClick handlers',
  demoOnClickDesc: 'Preempt navigation for SPA routers via the @itemClick emit.',
  demoIconsTitle: 'With icons',
  demoIconsDesc: 'Use the `item` slot to combine icons with text labels.',
  demoDropdownTitle: 'With dropdown',
  demoDropdownDesc: 'Embed an `SgDropdown` inside the `item` slot to jump between siblings.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope the text palette + `--sg-color-primary` to rebrand.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Drop the classes; the <nav> + a11y label stay.',

  tableBreadcrumbApi: 'Breadcrumb API',
  tableBreadcrumbItem: 'BreadcrumbItem',
  tableCssVars: 'CSS Variables',

  cssHint:
    'Breadcrumb has no dedicated tokens — it only reuses the text palette and `--sg-color-primary` for link hover. Scope those on a wrapper for per-section theming; no class overrides needed.',

  propItems: 'Ordered trail from root to current page',
  propSeparator: 'String rendered between segments',
  propItemSlot: 'Custom segment renderer (receives `{ item, index }`)',
  propUnstyled: 'Drop sg-breadcrumb-* classes (nav + a11y stay)',
  emitItemClick: 'Emitted when a segment is clicked (passes item + index)',

  itemTitle: 'Segment label (string)',
  itemHref: 'Renders the segment as an <a href>',

  cssText: 'Wrapper + current segment colour (bolded)',
  cssTextSecondary: 'Linked segment colour',
  cssTextTertiary: 'Separator colour',
  cssPrimary: 'Link hover colour',
  cssFontSize: 'Segment font size',
  cssLineHeight: 'Wrapper line-height',
  cssPaddingSm: 'Separator horizontal margin',
  cssTransitionDuration: 'Link hover transition',
  cssTransitionTiming: 'Shared easing',
} as const

/** Writable string map — used by table builders. */
export type BreadcrumbDocStrings = { -readonly [K in keyof typeof breadcrumbDocEn]: string }
