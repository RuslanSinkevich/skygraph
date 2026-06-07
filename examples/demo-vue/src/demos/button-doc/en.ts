/**
 * English source of truth for Button doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/button-doc/en.ts` 1:1; the Vue side
 * has slightly different prop set (no `unstyled`, has `danger` / `block`)
 * — those keys are added below.
 */
export const buttonDocEn = {
  pageTitle: 'Button',
  pageBadge: 'General',
  crumbGeneral: 'General',
  crumbButton: 'Button',
  pageLead:
    'Trigger actions. Five visual types, three sizes, loading / disabled states, and a dense set of component-local tokens. Vue side adds `danger` and `block` modifiers.',
  pageWhen1: 'A button means an operation — clicking it triggers business logic.',
  pageWhen2:
    'Use primary for the call to action, default for secondary, dashed for "add", text / link for inline toolbars.',

  demoTypesTitle: 'Types',
  demoTypesDesc: 'Default, primary, dashed, text, link.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small, middle, large.',
  demoLoadingTitle: 'Loading',
  demoLoadingDesc: 'Inline Spin + aria-busy + blocked clicks.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Dim + aria-disabled across every variant.',
  demoIconTitle: 'With icon',
  demoIconDesc: 'Flex gap keeps icon + label aligned at every size.',
  demoTokensTitle: 'Component tokens',
  demoTokensDesc: 'Scope --sg-btn-* for a local reshape (pills, chunky, compact).',
  demoTokensOverrideTitle: 'Token override',
  demoTokensOverrideDesc:
    'Three ready-made scopes built from `--sg-btn-*` tokens: green brand, dark surface and glass pick. Only paint / shape changes — fully accessible.',
  demoBrandTitle: 'Scoped brand',
  demoBrandDesc: 'Override --sg-color-primary* to rebrand a subtree.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc:
    '`unstyled` keeps button semantics — htmlType, disabled, aria-busy — but drops every `sg-button-*` class.',

  propUnstyled: 'Drop all `sg-button-*` classes; keep semantics (disabled, aria-busy).',

  tableButtonApi: 'Button API',
  tableCssVars: 'CSS Variables',

  propType: 'Visual variant',
  propSize: 'Button size (inherits from ConfigProvider)',
  propHtmlType: 'Native HTML button type attribute',
  propDanger: 'Visually flags a destructive action',
  propBlock: 'Stretches the button to fill its parent container',
  propDisabled: 'Disable the button (also inherits from ConfigProvider)',
  propLoading: 'Show an inline Spin; sets aria-busy and blocks clicks',
  emitClick: 'Emitted on click; the native MouseEvent is passed through',

  cssHint:
    'Button defines its own `--sg-btn-*` scope (height / padding / radius / font-size / bg / color / border) — override those on a wrapper for shape changes. The colour palette is pulled from the global `--sg-color-primary*` + `--sg-color-text*` tokens, so rebrand via the primary palette.',

  cssSgBtnHeight: 'Button height (local token — falls back to the global size scale)',
  cssSgBtnPadding: 'Horizontal padding',
  cssSgBtnRadius: 'Corner radius — bump to 999px for pill buttons',
  cssSgBtnFontSize: 'Label font size',
  cssSgBtnBg: 'Background (primary overrides to `--sg-color-primary`)',
  cssSgBtnColor: 'Label colour',
  cssSgBtnBorder: 'Border colour',
  cssSgColorPrimary: '`type="primary" | "link"` base colour + focus ring',
  cssSgColorPrimaryHover: 'Hover colour for primary / link / default',
  cssSgColorPrimaryActive: 'Active / pressed colour',
  cssSgColorPrimaryBg: 'Focus ring glow',
  cssSgColorWhite: 'Label colour on `type="primary"`',
  cssSgColorBgHover: '`type="text"` hover background',
  cssSgColorBgDisabled: 'Disabled background',
  cssSgColorTextDisabled: 'Disabled label colour',
  cssSgHeightSm: '`size="small"` height (via `--sg-btn-height`)',
  cssSgHeightMd: '`size="middle"` height',
  cssSgHeightLg: '`size="large"` height',
  cssSgPaddingXs: 'Gap between icon and label',
  cssSgPaddingSm: '`size="small"` horizontal padding',
  cssSgPaddingMd: '`size="middle"` horizontal padding',
  cssSgPaddingLg: '`size="large"` horizontal padding',
  cssSgTransitionDuration: 'Hover / focus transition',
  cssSgTransitionTiming: 'Shared easing',
} as const

/** Writable string map — used by table builders. */
export type ButtonDocStrings = { -readonly [K in keyof typeof buttonDocEn]: string }
