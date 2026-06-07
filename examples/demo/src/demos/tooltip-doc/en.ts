/**
 * English source of truth for Tooltip doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const tooltipDocEn = {
  pageTitle: 'Tooltip',
  pageLead:
    'Hover-triggered help text with four placement options. Content is a full ReactNode; ARIA describedby is wired automatically.',
  pageWhen1: 'Explain an icon or a truncated label on hover.',
  pageWhen2: 'Surface the reason behind a disabled action.',
  pageWhen3: 'Show a keyboard shortcut or a full-text value that was clipped.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Hover a child to see the tip.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc: 'Four sides, no auto-flip — pick what fits your layout.',
  demoRichTitle: 'Rich content',
  demoRichDesc:
    'title accepts any ReactNode — wrap wide content in a sized div to override the default nowrap.',
  demoDisabledTitle: 'On a disabled element',
  demoDisabledDesc: 'Tooltip listens on its wrapper, so disabled children still reveal the tip.',
  demoIconTitle: 'On an info icon',
  demoIconDesc: "Classic '?' glyph pattern; set tabIndex so keyboard users can focus it.",
  demoTokensTitle: 'Custom tooltip styles',
  demoTokensDesc:
    'Three distinct skins (frosted glass, vivid gradient, soft card) — each one passes a className to the wrapper and styles `.sg-tooltip-content` / `.sg-tooltip-arrow` underneath.',

  tableTooltipApi: 'Tooltip API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Tooltip owns two dedicated tokens — `--sg-color-tooltip-bg` and `--sg-color-tooltip-text`. Everything else (padding, radius, shadow, z-index) comes from global tokens. Override them on a scoping wrapper to restyle without touching the global theme.',

  propTitle: 'Tooltip content — string or ReactNode',
  propPlacement: 'Side of the trigger to show the tip',
  propChildren: 'Single element the Tooltip wraps',
  propClassName: 'Wrapper className',
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

/** Writable string map — use for props / table builders (same keys as `tooltipDocEn`). */
export type TooltipDocStrings = { -readonly [K in keyof typeof tooltipDocEn]: string }
