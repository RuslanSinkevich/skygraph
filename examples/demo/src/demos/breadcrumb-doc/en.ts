/**
 * English source of truth for Breadcrumb doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const breadcrumbDocEn = {
  pageTitle: 'Breadcrumb',
  pageLead:
    'Hierarchical location indicator. The last segment is non-interactive and marks the current page; everything before it is linked.',
  pageWhen1: 'Three or more levels of hierarchy where users need a way back to a parent.',
  pageWhen2: "Long pages where the page title alone doesn\u2019t tell you where you are.",
  pageWhen3: 'Router-driven apps that need a lightweight navigation trail.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Trail with two links + a current page.',
  demoSeparatorTitle: 'Custom separator',
  demoSeparatorDesc: 'Any ReactNode — character, chevron, dot.',
  demoOnClickTitle: 'onClick handlers',
  demoOnClickDesc: 'Preempt navigation for SPA routers.',
  demoIconsTitle: 'With icons',
  demoIconsDesc: 'Use ReactNode in title to add visual cues.',
  demoDropdownTitle: 'With Dropdown',
  demoDropdownDesc: 'Embed a Dropdown inside a segment for sibling navigation.',
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
  propSeparator: 'Node rendered between segments',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop sg-breadcrumb-* classes (nav + a11y stay)',

  itemTitle: 'Segment content — ReactNode',
  itemHref: 'Renders the segment as an <a href>',
  itemOnClick: 'Click handler; preempts navigation when href is also set',

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

/** Writable string map — use for props / table builders (same keys as `breadcrumbDocEn`). */
export type BreadcrumbDocStrings = { -readonly [K in keyof typeof breadcrumbDocEn]: string }
