/**
 * English source of truth for Empty doc page strings.
 * Keep keys aligned with `ru.ts`.
 */
export const emptyDocEn = {
  pageTitle: 'Empty',
  pageBadge: 'Data Display',
  crumbDataDisplay: 'Data Display',
  crumbEmpty: 'Empty',
  pageLead:
    'Lightweight placeholder for empty lists, tables, search results, dashboards. Always pair with a recovery action.',
  pageWhen1: 'Lists / tables with zero rows.',
  pageWhen2: 'Search or filter result that returned nothing.',
  pageWhen3: 'Onboarding states for newly created accounts / projects.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default illustration + "No Data" caption.',
  demoDescriptionTitle: 'Description',
  demoDescriptionDesc:
    'Swap the caption to the user-facing message (Vue: string only — see findings).',
  demoNoDescriptionTitle: 'No description',
  demoNoDescriptionDesc: '`:description="null"` hides the caption — image only.',
  demoCustomImageTitle: 'Custom image',
  demoCustomImageDesc: '`#image` slot accepts emoji, SVG, `<img>`, or any component.',
  demoWithActionsTitle: 'With actions',
  demoWithActionsDesc: 'Default slot renders below the description — perfect for CTAs.',
  demoInCardTitle: 'In a card',
  demoInCardDesc: 'Wrap inside a bordered surface so it owns the table region.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Scope `--sg-color-text-disabled` / `--sg-color-text-tertiary` to repaint.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: '`unstyled` keeps semantic structure, drops every class.',

  tableEmptyApi: 'Empty API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Empty has no component-private tokens. Override `--sg-color-text-disabled` (illustration colour) and `--sg-color-text-tertiary` (caption colour) to rebrand.',

  propDescription:
    'Caption text below the image. Pass `null` to hide. Defaults to "No Data".',
  propUnstyled: 'Drop sg-empty-* classes — keep the wrapper, image slot, paragraph and children',
  propImageSlot: '`#image` slot for custom illustrations (default: built-in SVG)',
  propDefaultSlot: 'Default slot — actions rendered below the description',

  cssTextDisabled: 'Default illustration colour',
  cssTextTertiary: 'Caption text colour',
  cssMarginXs: 'Vertical gap between image and description',
  cssMarginSm: 'Vertical gap between description and footer',
} as const

export type EmptyDocStrings = { -readonly [K in keyof typeof emptyDocEn]: string }
