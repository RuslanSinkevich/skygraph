/**
 * English source of truth for Radio doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const radioDocEn = {
  pageTitle: 'Radio',
  pageLead:
    'Single-choice group. Comes as `RadioGroup` that owns the selection; individual radios are not meant to be used outside of it.',
  pageWhen1: 'Select exactly one value from 2–6 choices (plan tier, delivery method).',
  pageWhen2: 'Inside a form where the radio is the primary answer.',
  pageWhen3: 'When users benefit from seeing every option at once (unlike Select).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled RadioGroup with live value readout.',
  demoVerticalTitle: 'Vertical',
  demoVerticalDesc: "direction='vertical' for longer labels.",
  demoStatesTitle: 'States',
  demoStatesDesc: 'Per-option disabled + group-level disabled / loading.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'RadioGroup wrapped in Field with validation.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global tokens to rebrand a single group.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Native radiogroup + inputs, no SkyGraph classes.',

  tableRadioGroupApi: 'RadioGroup API',
  tableRadioOptionApi: 'RadioOption',
  tableCssVars: 'CSS Variables',

  propValue: 'Controlled selected value',
  propDefaultValue: 'Initial value when uncontrolled',
  propOptions: 'Radio options to render',
  propDirection: 'Layout direction',
  propOnChange: 'Fires when the selected value changes',
  propDisabled: 'Disable the whole group',
  propLoading: 'Show inline spinner next to the group',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes — native radios only',

  propOptionValue: 'Value committed to onChange',
  propOptionLabel: 'Display label (ReactNode)',
  propOptionDisabled: 'Disable this specific option',

  cssHint:
    'Radio has no component-specific tokens. The checked dot is driven by `accent-color: var(--sg-color-primary)`. Override globals on a scoped wrapper to re-skin.',

  cssSgColorPrimary: 'Native accent-color (checked dot)',
  cssSgColorText: 'Default label color',
  cssSgColorTextDisabled: 'Label color when option is disabled/loading',
  cssSgColorTextTertiary: 'Inline spinner color during loading',
  cssSgFontSize: 'Label font size',
  cssSgPaddingMd: 'Gap between options in the group',
  cssSgPaddingXs: 'Gap between input and label',
} as const

/** Writable string map — use for props / table builders (same keys as `radioDocEn`). */
export type RadioDocStrings = { -readonly [K in keyof typeof radioDocEn]: string }
