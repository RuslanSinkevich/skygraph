/**
 * English source of truth for Empty doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const emptyDocEn = {
  pageTitle: 'Empty',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbEmpty: 'Empty',
  pageLead:
    'Zero-data placeholder — a centred illustration, a caption, and an optional footer slot for recovery actions.',
  pageWhen1: 'Empty tables, lists and search results.',
  pageWhen2: 'Freshly created accounts with nothing yet.',
  pageWhen3: 'Error-less "no match" states that still invite the user to recover.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default illustration + caption.',
  demoDescriptionTitle: 'Custom description',
  demoDescriptionDesc: 'Strings or ReactNodes — both fine.',
  demoNoDescriptionTitle: 'No description',
  demoNoDescriptionDesc: '`description={null}` drops the caption entirely.',
  demoActionsTitle: 'With actions',
  demoActionsDesc: 'Add a primary CTA via `children`.',
  demoCustomImageTitle: 'Custom image',
  demoCustomImageDesc: 'Emoji, <img />, SVG, Lottie — whatever renders.',
  demoInCardTitle: 'Inside a card',
  demoInCardDesc: 'Canonical placement inside a Table / Card / List.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Retint the illustration + caption via CSS variables.',

  tableEmptyApi: 'Empty API',
  tableCssVars: 'CSS Variables',

  propImage: 'Illustration above the description — defaults to the built-in SVG',
  propDescription: "Caption; defaults to 'No Data' when undefined, hidden when null",
  propChildren: 'Footer slot for calls to action',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop every sg-empty-* class (headless mode)',

  cssHint:
    'Empty has no component-private tokens. The built-in illustration paints with `currentColor` → `--sg-color-text-disabled`; the caption uses `--sg-color-text-tertiary`. Adjust spacing via the global `--sg-padding-xl` / `--sg-margin-*` tokens.',

  cssSgColorTextDisabled: 'Default illustration colour (currentColor)',
  cssSgColorTextTertiary: 'Description / caption colour',
  cssSgFontSize: 'Caption font size',
  cssSgLineHeight: 'Caption line-height',
  cssSgPaddingXl: 'Vertical padding of the wrapper',
  cssSgMarginSm: 'Gap image → caption and caption → footer',
  cssSgMarginMd: 'Gap caption → footer (`children`)',
} as const

/** Writable string map — use for props / table builders (same keys as `emptyDocEn`). */
export type EmptyDocStrings = { -readonly [K in keyof typeof emptyDocEn]: string }
