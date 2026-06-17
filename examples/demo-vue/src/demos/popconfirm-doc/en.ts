/**
 * English source of truth for Popconfirm doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Vue-side delta vs React:
 *   - `title` and `description` are `string` (React: `ReactNode`).
 *   - Action callbacks are emits — `@confirm` / `@cancel` (React:
 *     `onConfirm` / `onCancel`).
 *   - The trigger is provided via the default slot (React: single
 *     React element child).
 *   - The bubble renders inline (parity with React — neither uses a
 *     portal here).
 */
export const popconfirmDocEn = {
  pageTitle: 'Popconfirm',
  pageBadge: 'Feedback',
  crumbCategory: 'Feedback',
  crumbPopconfirm: 'Popconfirm',
  pageLead:
    'Compact confirm dialog anchored to a trigger. Lighter than Modal, more visible than a Tooltip, locked with a focus trap while open.',
  pageWhen1: 'Row-level destructive actions in tables / lists (delete, archive).',
  pageWhen2: 'Toolbar actions that need a last-chance confirmation but not a modal.',
  pageWhen3: 'Anywhere you want "Are you sure?" without breaking the flow of the page.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Confirm / cancel callbacks and an inline status line.',
  demoDescTitle: 'Title + description',
  demoDescDesc: 'Second line under the title, beside the warning icon.',
  demoPlacementTitle: 'Placement',
  demoPlacementDesc: 'Four sides, no auto-flip.',
  demoDisabledTitle: 'Disabled = pass-through',
  demoDisabledDesc: "With disabled, the trigger's own @click fires without a bubble.",
  demoTableTitle: 'Row-level delete',
  demoTableDesc: "Canonical table usage — placement='left' keeps the bubble inside the body.",
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tablePopconfirmApi: 'Popconfirm API',
  tableCssVars: 'CSS Variables',
  cssHint:
    'Popconfirm has no dedicated tokens — it reuses the surface + text palette. Swap `--sg-color-warning` to change the icon, `--sg-color-primary` to rebrand the OK button. For pure cosmetic changes (shadow, radius), scope the `*-lg` globals.',

  propTitle: 'Main confirmation question — shown next to the ⚠ icon',
  propDescription: 'Optional second line below the title',
  propOkText: 'Label of the primary button',
  propCancelText: 'Label of the secondary button',
  propPlacement: 'Side of the trigger the bubble opens on',
  propDisabled: 'Skip the confirm entirely; trigger fires its own @click',
  propUnstyled: 'Drop every sg-popconfirm-* class (headless mode)',
  emitConfirm: 'Fires when the OK button is pressed',
  emitCancel: 'Fires when the Cancel button is pressed',
  slotDefault: 'Single trigger element opened on click',

  cssBgElevated: 'Bubble background + arrow fill',
  cssBorderSecondary: 'Bubble border + arrow border',
  cssText: 'Title colour',
  cssTextSecondary: 'Description colour',
  cssWarning: 'Warning icon colour next to the title',
  cssPrimary: 'Primary OK button — swap to restyle the confirm action',
  cssFontSize: 'Title font size',
  cssFontSizeSm: 'Description font size',
  cssFontSizeLg: 'Warning icon size',
  cssPaddingSm: 'Icon ↔ title gap + button gap',
  cssPaddingMd: 'Bubble padding',
  cssMarginXs: 'Title ↔ description gap',
  cssRadiusLg: 'Bubble corner radius',
  cssShadowLg: 'Bubble elevation',
} as const

/** Writable string map — used by table builders. */
export type PopconfirmDocStrings = { -readonly [K in keyof typeof popconfirmDocEn]: string }
