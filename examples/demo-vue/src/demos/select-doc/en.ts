/**
 * English source of truth for Select doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/select-doc/en.ts`. Vue side has no
 * `loading` prop on `SgSelect` and no `loading` flag on `SelectOption`
 * (see `findings/T-Vue-Demo-Forms.md` → `select-loading-not-in-vue`),
 * so the React `propLoading` / `propOptionLoading` keys are dropped.
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
  demoEmptyTitle: 'Async / disabled rows',
  demoEmptyDesc:
    'Disabled + empty options stand in for "loading" until SgSelect grows a `loading` prop.',
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
  propUnstyled: 'Render the native <select> with no styling',
  emitUpdateModelValue: 'Fires when the selection changes',
  emitChange: 'Mirror of `update:modelValue`',
  emitBlur: 'Fires when the control loses focus',

  propOptionLabel: 'Display text',
  propOptionValue: 'Value submitted on change',
  propOptionDisabled: 'Make this option unselectable',

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
