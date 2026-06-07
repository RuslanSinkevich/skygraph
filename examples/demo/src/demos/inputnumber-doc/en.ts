/**
 * English source of truth for InputNumber doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const inputNumberDocEn = {
  pageTitle: 'InputNumber',
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
  demoStatesDesc: 'Disabled and loading.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Required + range validators on number fields.',
  demoTokensTitle: 'Token override',
  demoTokensDesc:
    'Three scoped recipes — branded green, dark field, glass pick — reskin one InputNumber.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Floating label over the field — it rises on focus or once a value is present; the stepper keeps working.',

  tableInputNumberApi: 'InputNumber API',
  tableCssVars: 'CSS Variables',

  propValue: 'Controlled numeric value',
  propDefaultValue: 'Initial value when uncontrolled',
  propMin: 'Lower bound (clamps on type and via stepper)',
  propMax: 'Upper bound (clamps on type and via stepper)',
  propStep: 'Delta applied by the + / − buttons',
  propPrecision: 'Round to N decimal places after clamping',
  propPlaceholder: 'Placeholder when the field is empty',
  propOnChange: 'Fires with the clamped number or null when cleared',
  propOnBlur: 'Fires when the input loses focus',
  propDisabled: 'Block interaction',
  propLoading: 'Show inline spinner and block interaction',
  propSize: 'Height / spacing preset',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes, keep stepper logic',

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

/** Writable string map — use for props / table builders (same keys as `inputNumberDocEn`). */
export type InputNumberDocStrings = { -readonly [K in keyof typeof inputNumberDocEn]: string }
