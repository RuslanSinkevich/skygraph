/**
 * English source of truth for Tooltip doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const tooltipDocEn = {
  pageTitle: 'Tooltip',
  pageLead:
    'Hover-triggered help text with four placement options. ARIA describedby is wired automatically. Pass a string via `title` or supply rich markup through the `title` slot.',
  pageWhen1: 'Explain an icon or a truncated label on hover.',
  pageWhen2: 'Surface the reason behind a disabled action.',
  pageWhen3: 'Show a keyboard shortcut or a full-text value that was clipped.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Hover a child to see the tip.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc: 'Four sides, no auto-flip — pick what fits your layout.',
  demoRichTitle: 'Rich content',
  demoRichDesc: 'Use the `title` slot for headings, descriptions, or compact layouts.',
  demoDisabledTitle: 'On a disabled element',
  demoDisabledDesc: 'Tooltip listens on its wrapper, so disabled children still reveal the tip.',
  demoIconTitle: 'On an info icon',
  demoIconDesc: "Classic '?' glyph pattern; set tabindex so keyboard users can focus it.",
  demoTokensTitle: 'Token override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableTooltipApi: 'Tooltip API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Tooltip owns two dedicated tokens — `--sg-color-tooltip-bg` and `--sg-color-tooltip-text`. Everything else (padding, radius, shadow, z-index) comes from global tokens. Override them on a scoping wrapper to restyle without touching the global theme.',

  propTitle: 'Plain-text tip body (use the `title` slot for rich content)',
  propTitleSlot: 'Rich tooltip body — takes precedence over the `title` prop when present',
  propPlacement: 'Side of the trigger to show the tip',
  propChildren: 'Single element the Tooltip wraps (Vue: default slot)',
  propUnstyled: 'Drop sg-tooltip-* classes (headless mode)',

  cssTooltipBg: 'Tip background + arrow fill',
  cssTooltipText: 'Tip text colour',
  cssFontSizeSm: 'Tip text size',
  cssPaddingXs: 'Tip vertical padding',
  cssPaddingSm: 'Tip horizontal padding',
  cssRadiusSm: 'Tip corner radius',
  cssShadow: 'Tip elevation',
  cssZTooltip: 'Stacking layer above dropdowns / popovers',
} as const

/** Writable string map — used for prop / table builders. */
export type TooltipDocStrings = { -readonly [K in keyof typeof tooltipDocEn]: string }
