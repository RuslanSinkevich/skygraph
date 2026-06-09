/**
 * English source of truth for Tag doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const tagDocEn = {
  pageTitle: 'Tag',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbTag: 'Tag',
  pageLead:
    'Inline pill for labels, statuses, and filters. Five semantic presets map to palette tokens; any other string is treated as a raw CSS colour.',
  pageWhen1: 'Label rows with a category or tag.',
  pageWhen2: 'Show a compact status pill next to a title.',
  pageWhen3: 'Render a removable filter set above a table or search results.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default neutral preset.',
  demoPresetsTitle: 'Semantic presets',
  demoPresetsDesc: 'Five strings resolve to palette tokens.',
  demoCustomColorTitle: 'Custom colour',
  demoCustomColorDesc: 'Any other string is passed through as raw CSS — hex, rgb, hsl, named.',
  demoBorderlessTitle: 'Borderless',
  demoBorderlessDesc: 'Keeps the tint, drops the edge.',
  demoClosableTitle: 'Closable',
  demoClosableDesc: 'Adds a × button; you manage the removal.',
  demoWithIconTitle: 'With icon',
  demoWithIconDesc: 'Default slot accepts any markup — icon + text is just template.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Three scopes built from Tag tokens: green brand, dark surface and glass pick (preset palette + radius).',
  tableTagApi: 'Tag API',
  tableCssVars: 'CSS Variables',

  propColor:
    "One of five presets or any raw CSS colour. Only 'default' / 'success' / 'error' / 'warning' / 'processing' map to palette tokens — everything else is applied inline as background + border.",
  propClosable: 'Adds a × button next to the label',
  propOnClose: 'Fires when the × is clicked (you own the removal)',
  propBordered: 'Draw the 1px border',
  propChildren: 'Tag content (text, icon + text, anything) — Vue: default slot',
  propUnstyled: 'Drop every sg-tag-* class — you own the painting',

  cssHint:
    'Tag has no component-specific tokens — it composes global palette + spacing tokens. For full pills, set `--sg-border-radius-sm: 999px` on a wrapper. For a custom preset palette, override `--sg-color-<preset>` and `--sg-color-<preset>-bg`.',

  cssSgColorBgSecondary: 'Default-preset background',
  cssSgColorBorder: 'Default-preset border',
  cssSgColorText: 'Default-preset text + "neutral" label',
  cssSgColorSuccess: 'success preset foreground + border',
  cssSgColorSuccessBg: 'success preset background',
  cssSgColorError: 'error preset foreground + border',
  cssSgColorErrorBg: 'error preset background',
  cssSgColorWarning: 'warning preset foreground + border',
  cssSgColorWarningBg: 'warning preset background',
  cssSgColorPrimary: 'processing preset foreground + border',
  cssSgColorPrimaryBg: 'processing preset background',
  cssSgFontSizeSm: 'Tag text size',
  cssSgPaddingSm: 'Horizontal padding',
  cssSgBorderRadiusSm: 'Corner radius (bump to 999px for pills)',
  cssSgTransitionDuration: 'Colour + hover transition speed',
  cssSgTransitionTiming: 'Shared easing',
} as const

/** Writable string map — used for prop / table builders. */
export type TagDocStrings = { -readonly [K in keyof typeof tagDocEn]: string }
