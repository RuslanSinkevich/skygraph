/**
 * English source of truth for Select doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const selectDocEn = {
  pageTitle: 'Select',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbSelect: 'Select',
  pageLead:
    'Single-value selector with keyboard navigation, custom dropdown panel, and native (`unstyled`) fallback.',
  pageWhen1: 'When a user picks one value from a small, predefined list.',
  pageWhen2: 'For long, searchable lists use AutoComplete instead.',
  pageWhen3: 'Inside forms — wrap with <SgField> to get validation.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled value with v-model.',
  demoUncontrolledTitle: 'Uncontrolled',
  demoUncontrolledDesc: '`defaultValue` seeds the initial choice; SkyGraph tracks the rest.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / middle / large — match your form density.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Disable the whole control or single options.',
  demoLoadingTitle: 'Loading',
  demoLoadingDesc:
    '`loading` disables input and shows a spinner; per-option `loading` marks rows as "still syncing".',
  demoNumericTitle: 'Numeric values',
  demoNumericDesc: '`value` preserves number types (important for IDs).',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope one Select to different tokens — same component, different skin.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Native <select> with no library styling — headless mode.',

  tableSelectApi: 'Select API',
  tableOptionApi: 'SelectOption',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound value (single or array in `multiple` mode)',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Default selected value (uncontrolled)',
  propOptions: 'Options shown in the dropdown or native select',
  propPlaceholder: 'Placeholder shown when nothing is selected',
  propMultiple: 'Multi-select mode (Vue-only super-set of React API)',
  propSize: 'Control size (propagates from ConfigProvider)',
  propDisabled: 'Disables the selector',
  propLoading: 'Show a spinner inside the control and block input',
  propUnstyled: 'Render the native <select> with no styling',
  emitUpdateModelValue: 'Fires when the selection changes',
  emitChange: 'Mirror of `update:modelValue`',
  emitBlur: 'Fires when the control loses focus',

  propOptionLabel: 'Display text',
  propOptionValue: 'Value submitted on change',
  propOptionDisabled: 'Make this option unselectable',
  propOptionLoading: 'Marks the option as "still syncing" — visually muted, click is ignored',

  cssHint:
    'Select inherits the Input tokens plus its own dropdown panel variables (background, shadow, highlight).',

  cssSgInputHeight: 'Control height (shared with Input)',
  cssSgInputPadding: 'Inner padding',
  cssSgInputBg: 'Control background',
  cssSgInputBorder: 'Border color (state-driven)',
  cssSgInputRadius: 'Corner radius',
  cssSgInputColor: 'Value text color',
  cssSgColorPrimary: 'Open state border + focus ring',
  cssSgColorPrimaryBg: 'Highlighted option background',
  cssSgColorBgElevated: 'Dropdown panel background',
  cssSgShadowLg: 'Dropdown panel shadow',
  cssSgColorTextPlaceholder: 'Placeholder color',
  cssSgSpinColor: 'Loading spinner inside the control',
} as const

/** Writable string map — used by table builders. */
export type SelectDocStrings = { -readonly [K in keyof typeof selectDocEn]: string }
