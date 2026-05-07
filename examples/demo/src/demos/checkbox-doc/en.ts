/**
 * English source of truth for Checkbox doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const checkboxDocEn = {
  pageTitle: 'Checkbox',
  pageLead:
    'Binary toggle with optional indeterminate, disabled, loading states and rich labels. Works standalone or inside Form.',
  pageWhen1: 'Select one or more values from a list (news → release notes, beta flags).',
  pageWhen2: 'As a parent "check all" for bulk-select scenarios.',
  pageWhen3: 'For terms/privacy confirmations with validation.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled checkbox with a label.',
  demoStatesTitle: 'States',
  demoStatesDesc: 'All visual states in one column.',
  demoCheckAllTitle: 'Check all',
  demoCheckAllDesc: 'Parent + children with indeterminate.',
  demoRichLabelTitle: 'Rich labels',
  demoRichLabelDesc: 'ReactNode children — descriptions, links.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: "Wrap with Field + valuePropName='checked'.",
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global tokens on a wrapper to re-skin.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Native input + label wrapper, no SkyGraph classes.',

  tableCssVars: 'CSS Variables',

  propChecked: 'Controlled checked state',
  propDefaultChecked: 'Initial state when uncontrolled',
  propIndeterminate: 'Native indeterminate visual',
  propOnChange: 'Fires with the new boolean',
  propDisabled: 'Block interaction (inherits ConfigProvider)',
  propLoading: 'Swap the input for an inline spinner',
  propChildren: 'Label content (ReactNode)',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes — keep semantics',

  cssHint:
    'Checkbox has no component-specific tokens. The checkmark colour is driven by the native `accent-color` which inherits `--sg-color-primary`. Override globals on a scoped wrapper to re-skin.',

  cssSgColorPrimary: 'Native accent-color (checked + indeterminate fill)',
  cssSgColorText: 'Default label text color',
  cssSgColorTextDisabled: 'Label text color when disabled/loading',
  cssSgColorTextTertiary: 'Inline spinner color during loading',
  cssSgFontSize: 'Label font size',
  cssSgLineHeight: 'Label line-height',
  cssSgPaddingSm: 'Gap between input and label',
} as const

/** Writable string map — use for props / table builders (same keys as `checkboxDocEn`). */
export type CheckboxDocStrings = { -readonly [K in keyof typeof checkboxDocEn]: string }
