/**
 * English source of truth for Badge doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const badgeDocEn = {
  pageTitle: 'Badge',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbBadge: 'Badge',
  pageLead:
    'Small numerical counter or status indicator. Pins to a child, or renders as a standalone status row.',
  pageWhen1: 'Show unread / new / pending counts on icons, avatars, menu items.',
  pageWhen2: 'Display a live process status (connecting, syncing, failed) in a compact row.',
  pageWhen3: 'Signal "has activity" with a tiny dot when the exact number is not important.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Pin a count onto any element; 0 is hidden unless showZero.',
  demoOverflowTitle: 'Overflow',
  demoOverflowDesc: "Numbers above overflowCount collapse to '{N}+'.",
  demoDotTitle: 'Dot',
  demoDotDesc: "Pill-less indicator for 'has activity' signals.",
  demoStatusTitle: 'Status row',
  demoStatusDesc: 'Standalone dot + label; processing pulses.',
  demoCustomColorTitle: 'Custom colour',
  demoCustomColorDesc: 'Pass a token reference to stay theme-aware, or a raw hex.',
  demoOffsetTitle: 'Offset',
  demoOffsetDesc: 'Nudge the pinned count by [right, top] pixels.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableBadgeApi: 'Badge API',
  tableCssVars: 'CSS Variables',

  propCount: 'Number to show; hidden when 0 unless showZero is set',
  propDot: 'Render a pill-less dot instead of the count',
  propOverflowCount: 'Cap at which count becomes "{N}+"',
  propShowZero: 'Keep the badge visible when count is 0',
  propColor: 'Custom background for the count / dot (any CSS colour)',
  propStatus: 'Renders a standalone status dot + text row',
  propText: 'Label shown next to the status dot',
  propOffset: 'Pixel offset [right, top] applied as right + marginTop',
  propChildren: 'Element to pin the badge onto (Vue: default slot)',
  propUnstyled: 'Drop sg-badge classes (headless mode)',

  cssHint:
    'Badge composes palette tokens — the count background is `--sg-color-error` by default, status dots follow `--sg-color-{preset}`. Override `color` prop for per-instance colours, or scope the palette tokens on a wrapper for a theme-wide change.',

  cssSgColorError: 'Default count + dot background',
  cssSgColorWhite: 'Count text colour',
  cssSgColorBg: 'Tiny outline around the pinned count / dot',
  cssSgColorSuccess: 'status="success" dot colour',
  cssSgColorWarning: 'status="warning" dot colour',
  cssSgColorPrimary: 'status="processing" dot colour (pulses)',
  cssSgColorTextDisabled: 'status="default" dot colour',
  cssSgColorText: 'Status text colour',
  cssSgFontSize: 'Status text size',
  cssSgFontSizeSm: 'Count number size',
  cssSgPaddingSm: 'Gap between status dot and text',
  cssSgLineHeight: 'Status row line-height',
  cssSgZBase: 'Stacking layer of the pinned count / dot',
} as const

/** Writable string map — used for prop / table builders. */
export type BadgeDocStrings = { -readonly [K in keyof typeof badgeDocEn]: string }
