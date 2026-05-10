/**
 * English source of truth for InputNumber doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/inputnumber-doc/en.ts` 1:1; Vue side
 * has no `loading` prop on `SgInputNumber` (see
 * `findings/T-Vue-Demo-Forms.md` → `inputnumber-loading-not-in-vue`).
 */
export const inputNumberDocEn = {
  pageTitle: 'InputNumber',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbInputNumber: 'InputNumber',
  pageLead:
    'Numeric field with built-in stepper, clamping and precision. Commits `number | null` — `null` means the user emptied the field.',
  pageWhen1: 'Numeric-only values where plain text is wrong (age, count, price).',
  pageWhen2: 'Bounded values that need the `+` / `−` buttons (quantities, ratings).',
  pageWhen3: 'Currencies or percentages where precision must be enforced.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled value with live readout (including the cleared null).',
  demoMinMaxStepTitle: 'Min / Max / Step',
  demoMinMaxStepDesc: 'Clamping and stepper delta.',
  demoPrecisionTitle: 'Precision',
  demoPrecisionDesc: 'Round to a fixed number of decimals.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'small / middle / large presets.',
  demoStatesTitle: 'States',
  demoStatesDesc: 'Disabled (Vue InputNumber has no loading prop yet).',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Required + range validators on number fields.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope globals to rebrand one instance.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Stepper logic without SkyGraph classes.',

  tableInputNumberApi: 'InputNumber API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound numeric value',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial value when uncontrolled',
  propMin: 'Lower bound (clamps on type and via stepper)',
  propMax: 'Upper bound (clamps on type and via stepper)',
  propStep: 'Delta applied by the + / − buttons',
  propPrecision: 'Round to N decimal places after clamping',
  propPlaceholder: 'Placeholder when the field is empty',
  propDisabled: 'Block interaction',
  propSize: 'Height / spacing preset',
  propUnstyled: 'Drop SkyGraph classes, keep stepper logic',
  emitUpdateModelValue: 'Fires with the clamped number or null when cleared',
  emitChange: 'Mirror of `update:modelValue`',
  emitBlur: 'Fires when the input loses focus',

  cssHint:
    'InputNumber uses only global tokens. There are no --sg-input-number-* variables; to rebrand, scope the globals listed below on a wrapper.',

  cssSgColorBorder: 'Outer border of the control',
  cssSgBorderRadius: 'Outer border radius',
  cssSgColorBgContainer: 'Input background',
  cssSgColorBgSecondary: 'Stepper button background',
  cssSgColorBgHover: 'Stepper button background on hover',
  cssSgColorText: 'Input & stepper text color',
  cssSgColorTextDisabled: 'Stepper text when min/max boundary is reached',
  cssSgColorTextTertiary: 'Inline spinner color during loading',
  cssSgFontSize: 'Default font size',
  cssSgFontSizeSm: 'Font size when size="small"',
  cssSgFontSizeLg: 'Font size when size="large"',
  cssSgHeightSm: 'Control height when size="small"',
  cssSgHeightMd: 'Control height at default size',
  cssSgHeightLg: 'Control height when size="large"',
  cssSgPaddingXs: 'Right-margin of the inline spinner',
  cssSgTransitionDuration: 'Stepper button hover transition',
} as const

/** Writable string map — used by table builders. */
export type InputNumberDocStrings = { -readonly [K in keyof typeof inputNumberDocEn]: string }
