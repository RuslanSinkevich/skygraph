/**
 * English source of truth for Button doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const buttonDocEn = {
  pageTitle: 'Button',
  pageBadge: 'General',
  crumbGeneral: 'General',
  crumbButton: 'Button',
  pageLead:
    'Trigger actions. Five visual types, three sizes, loading / disabled states, headless mode, and a dense set of component-local tokens.',
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
  demoTokensOverrideTitle: 'Token override',
  demoTokensOverrideDesc: 'Wrap the component in an element with CSS variables — it repaints.',

  tableButtonApi: 'Button API',
  tableCssVars: 'CSS Variables',

  propType: 'Visual variant',
  propSize: 'Button size (inherits from ConfigProvider)',
  propDisabled: 'Disable the button (also inherits from ConfigProvider)',
  propLoading: 'Show an inline Spin; sets aria-busy and blocks clicks',
  propHtmlType: 'Native HTML button type attribute',
  propOnClick: 'Click handler',
  propChildren: 'Button content — text, icon, or both',
  propClassName: 'Extra class on the root button element',
  propStyle: 'Inline style on the root button element',
  propUnstyled: 'Drop all sg-button-* classes (keeps aria / disabled / loading semantics)',

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

/** Writable string map — use for props / table builders (same keys as `buttonDocEn`). */
export type ButtonDocStrings = { -readonly [K in keyof typeof buttonDocEn]: string }
