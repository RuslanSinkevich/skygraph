/**
 * English source of truth for Checkbox doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/checkbox-doc/en.ts`. Vue side has no
 * `loading` prop on `SgCheckbox` yet, so the `propLoading` key is
 * dropped.
 */
export const checkboxDocEn = {
  pageTitle: 'Checkbox',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbCheckbox: 'Checkbox',
  pageLead:
    'Binary toggle with optional indeterminate, disabled and rich-label states. Works standalone or inside Form.',
  pageWhen1: 'Select one or more values from a list (news → release notes, beta flags).',
  pageWhen2: 'As a parent "check all" for bulk-select scenarios.',
  pageWhen3: 'For terms/privacy confirmations with validation.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled checkbox with a label.',
  demoStatesTitle: 'States',
  demoStatesDesc: 'All visual states in one column (Vue has no loading state yet).',
  demoCheckAllTitle: 'Check all',
  demoCheckAllDesc: 'Parent + children with indeterminate.',
  demoRichLabelTitle: 'Rich labels',
  demoRichLabelDesc: 'Default-slot VNodes — descriptions, links.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Wrap with `<SgField>` and pipe `:checked` / `@change` from the slot.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  tableCheckboxApi: 'Checkbox API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound boolean',
  propChecked: 'Compat alias for `modelValue`',
  propDefaultChecked: 'Initial state when uncontrolled',
  propIndeterminate: 'Native indeterminate visual',
  propDisabled: 'Block interaction (inherits ConfigProvider)',
  propUnstyled: 'Drop SkyGraph classes — keep semantics',
  emitUpdateModelValue: 'Fires with the new boolean',
  emitChange: 'Mirror of `update:modelValue`',

  cssHint:
    'Checkbox has no component-specific tokens. The checkmark colour is driven by the native `accent-color` which inherits `--sg-color-primary`. Override globals on a scoped wrapper to re-skin.',

  cssSgColorPrimary: 'Native accent-color (checked + indeterminate fill)',
  cssSgColorText: 'Default label text color',
  cssSgColorTextDisabled: 'Label text color when disabled',
  cssSgColorTextTertiary: 'Inline spinner color during loading (when supported)',
  cssSgFontSize: 'Label font size',
  cssSgLineHeight: 'Label line-height',
  cssSgPaddingSm: 'Gap between input and label',
} as const

/** Writable string map — used by table builders. */
export type CheckboxDocStrings = { -readonly [K in keyof typeof checkboxDocEn]: string }
