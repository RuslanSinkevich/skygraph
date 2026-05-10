/**
 * English source of truth for Radio doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const radioDocEn = {
  pageTitle: 'Radio',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbRadio: 'Radio',
  pageLead:
    'Single-choice group. Vue ships it as `SgRadio` (a RadioGroup that owns the selection); individual radios are not meant to be used outside of it.',
  pageWhen1: 'Select exactly one value from 2–6 choices (plan tier, delivery method).',
  pageWhen2: 'Inside a form where the radio is the primary answer.',
  pageWhen3: 'When users benefit from seeing every option at once (unlike Select).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled `SgRadio` with v-model and live value readout.',
  demoVerticalTitle: 'Vertical',
  demoVerticalDesc: "direction='vertical' for longer labels.",
  demoStatesTitle: 'Disabled states',
  demoStatesDesc:
    'Per-option `disabled` and group-level `disabled`. Vue `SgRadio` has no `loading` prop yet — see `findings/T-Vue-Demo-Forms.md` (`radio-loading-not-in-vue`).',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: '`SgRadio` wrapped in `SgField` with required validation.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global tokens to rebrand a single group.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Native radiogroup + inputs, no SkyGraph classes.',

  tableRadioGroupApi: 'SgRadio API',
  tableRadioOptionApi: 'RadioOption',
  tableCssVars: 'CSS Variables',

  propModelValue: '`v-model` selected value',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial value when uncontrolled',
  propOptions: 'Radio options to render',
  propDirection: 'Layout direction (`horizontal` | `vertical`)',
  propUpdateModelValue: 'Emitted on selection change (used by `v-model`)',
  propChange: 'Emitted with the new value (alias of `update:modelValue`)',
  propDisabled: 'Disable the whole group',
  propUnstyled: 'Drop SkyGraph classes — native radios only',

  propOptionValue: 'Value committed to `update:modelValue`/`change`',
  propOptionLabel: 'Display label (string)',
  propOptionDisabled: 'Disable this specific option',

  cssHint:
    'Radio has no component-specific tokens. The checked dot is driven by `accent-color: var(--sg-color-primary)`. Override globals on a scoped wrapper to re-skin.',

  cssSgColorPrimary: 'Native accent-color (checked dot)',
  cssSgColorText: 'Default label color',
  cssSgColorTextDisabled: 'Label color when an option is disabled',
  cssSgFontSize: 'Label font size',
  cssSgPaddingMd: 'Gap between options in the group',
  cssSgPaddingXs: 'Gap between input and label',
} as const

/** Writable string map — use for props / table builders (same keys as `radioDocEn`). */
export type RadioDocStrings = { -readonly [K in keyof typeof radioDocEn]: string }
