/**
 * English source of truth for Segmented doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const segmentedDocEn = {
  pageTitle: 'Segmented',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbSegmented: 'Segmented',
  pageLead: 'Mutually-exclusive option picker. Lighter than Tabs, richer than a Radio Group.',
  pageWhen1: 'Display a small, fixed set of mutually-exclusive views or modes.',
  pageWhen2:
    'Use instead of Tabs when the options are short, flat, and shown inline (filters, view switchers).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Pass an array of strings and let Segmented do the rest.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Drive the selection from state to integrate with URLs, reducers or forms.',
  demoWithIconsTitle: 'With icons',
  demoWithIconsDesc: 'Pass `icon` on each option (or use the `icon` slot) for richer segments.',
  demoBlockTitle: 'Block',
  demoBlockDesc: 'Stretch to container width for full-width toolbars.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Disable the whole control or individual options.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small, middle, large.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Scope the track / thumb tokens to repaint the control.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Drop the built-in CSS; keep the radio-group semantics.',

  tableSegmentedApi: 'Segmented API',
  tableCssVars: 'CSS Variables',

  propOptions: 'Segment definitions — plain strings or objects with label/value/icon/disabled',
  propValue: 'Controlled selected value',
  propDefaultValue: 'Uncontrolled initial value (falls back to first option)',
  propBlock: 'Stretch to the full width of the container',
  propDisabled: 'Disable the entire control (also inherits from ConfigProvider)',
  propSize: 'Height / padding / font-size preset (also inherits from ConfigProvider)',
  propUnstyled: 'Drop all sg-segmented-* styles and render a native radio group',
  emitChange: 'Fired when the selection changes',

  cssHint:
    'Segmented has no component-local tokens. The track uses `--sg-color-bg-secondary`, the selected thumb uses `--sg-color-bg-container` + `--sg-shadow-sm`. Rebrand by scoping those on any wrapper.',

  cssSgColorBgSecondary: 'Track background (the rail under the segments)',
  cssSgColorBgContainer: 'Selected segment "thumb" background',
  cssSgColorText: 'Selected / hovered label colour',
  cssSgColorTextSecondary: 'Idle label colour',
  cssSgColorTextDisabled: 'Disabled label colour',
  cssSgBorderRadius: 'Outer track radius',
  cssSgBorderRadiusSm: 'Per-segment radius (inner thumb)',
  cssSgShadowSm: 'Lift for the selected thumb',
  cssSgHeightSm: '`size="small"` segment height',
  cssSgHeightMd: '`size="middle"` segment height',
  cssSgHeightLg: '`size="large"` segment height',
  cssSgPaddingXs: 'Gap between icon and label inside a segment',
  cssSgPaddingSm: '`size="small"` horizontal padding',
  cssSgPaddingMd: '`size="middle"` horizontal padding',
  cssSgPaddingLg: '`size="large"` horizontal padding',
  cssSgFontSizeSm: '`size="small"` label size',
  cssSgFontSize: '`size="middle"` label size',
  cssSgFontSizeLg: '`size="large"` label size',
  cssSgTransitionDuration: 'Hover / selection transition duration',
  cssSgTransitionTiming: 'Shared easing',
} as const

/** Writable string map — used by table builders. */
export type SegmentedDocStrings = { -readonly [K in keyof typeof segmentedDocEn]: string }
