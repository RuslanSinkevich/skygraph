/**
 * English source of truth for Select doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const selectDocEn = {
  pageTitle: 'Select',
  pageLead: 'Single-value selector with keyboard navigation, loading states, and native fallback.',
  pageWhen1: 'When a user picks one value from a small, predefined list.',
  pageWhen2: 'For long, searchable lists use AutoComplete instead.',
  pageWhen3: 'Inside forms — wrap with <Field> to get validation.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled value with `value` / `onChange`.',
  demoUncontrolledTitle: 'Uncontrolled',
  demoUncontrolledDesc: '`defaultValue` seeds the initial choice; SkyGraph tracks the rest.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / middle / large — match your form density.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Disable the whole control or single options.',
  demoLoadingTitle: 'Loading',
  demoLoadingDesc: 'Loading on the select vs. a single option.',
  demoNumericTitle: 'Numeric values',
  demoNumericDesc: '`value` preserves number types (important for IDs).',
  demoTokensTitle: 'Token override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Floating label over the Select trigger — it glides up on focus or once a value is chosen. Pure CSS + the controlled value, no core changes.',

  tableSelectApi: 'Select API',
  tableOptionApi: 'SelectOption',
  tableCssVars: 'CSS Variables',

  propValue: 'Currently selected value',
  propDefaultValue: 'Default selected value (uncontrolled)',
  propOnChange: 'Callback when selection changes',
  propOnBlur: 'Called when the control loses focus',
  propOptions: 'Options list',
  propPlaceholder: 'Placeholder shown when nothing is selected',
  propSize: 'Control size (propagates from ConfigProvider)',
  propDisabled: 'Disables the selector',
  propLoading: 'Show a spinner and block input',
  propUnstyled: 'Render the native <select> with no styling',
  propClassName: 'Extra class on the control',
  propStyle: 'Inline styles on the control',

  propOptionLabel: 'Display text',
  propOptionValue: 'Value submitted on change',
  propOptionDisabled: 'Make this option unselectable',
  propOptionLoading: 'Show per-option loading state',

  cssHint: 'Select inherits the Input tokens plus its own dropdown panel variables.',

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

/** Writable string map — use for props / table builders (same keys as `selectDocEn`). */
export type SelectDocStrings = { -readonly [K in keyof typeof selectDocEn]: string }
