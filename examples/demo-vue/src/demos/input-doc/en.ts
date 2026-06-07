/**
 * English source of truth for Input doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/input-doc/en.ts` 1:1; Vue side has
 * no `loading` prop on Textarea yet, so the React-equivalent
 * `propTextareaLoading` key is dropped here.
 */
export const inputDocEn = {
  pageTitle: 'Input',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbInput: 'Input',
  pageLead:
    'Text input (single-line) and Textarea (multi-line) share the same sizing, focus ring and `--sg-input-*` tokens.',
  pageWhen1: 'Any free-form text entry in a form or search bar.',
  pageWhen2: 'Numeric inputs where the stepper of InputNumber would be overkill.',
  pageWhen3: 'Multi-line fields with `<SgTextarea>` when a single line is too cramped.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled text input with live readout.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'small / middle / large presets.',
  demoTypesTitle: 'Types',
  demoTypesDesc: 'Native HTML input types — text, email, password, number.',
  demoStatesTitle: 'States',
  demoStatesDesc: 'Disabled and inline loading spinner.',
  demoValidationTitle: 'Validation',
  demoValidationDesc: 'aria-invalid flips the error styling without !important.',
  demoTokensTitle: 'Component tokens',
  demoTokensDesc: 'Scope --sg-input-* to reshape only these inputs.',
  demoTokensOverrideTitle: 'Token override',
  demoTokensOverrideDesc:
    'Three ready-made scopes built from --sg-input-* tokens: green brand, dark field and glass pick. Only paint / shape changes — focus ring and states stay intact.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Pure-CSS floating label (Material 3-ish). The label sits inside the field and glides to the top-left on focus or when the field has a value. Outlined and filled variants — no core changes, just `:has(input:focus)` + `:has(input:not(:placeholder-shown))`.',
  demoTextareaBasicTitle: 'Textarea — basic',
  demoTextareaBasicDesc: 'Multi-line sibling with shared styling.',
  demoTextareaCountTitle: 'Textarea — character count',
  demoTextareaCountDesc: 'maxLength + showCount render a live counter.',
  demoTextareaStatesTitle: 'Textarea — states',
  demoTextareaStatesDesc: 'Two disabled variants (Vue Textarea has no loading prop yet).',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Input + Textarea wired up via `<SgField>` scoped slot.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Headless mode with your own CSS class.',

  tableInputApi: 'Input API',
  tableTextareaApi: 'Textarea API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound text value (Vue idiom)',
  propValue: 'Compat alias for `modelValue` (controlled value)',
  propPlaceholder: 'Placeholder when empty',
  propType: 'Native HTML input type',
  propSize: 'Height / font-size preset',
  propDisabled: 'Block interaction',
  propReadOnly: 'Make read-only without the disabled greying',
  propAllowClear: 'Render a clear button when the field has a value',
  propStatus: 'Validation status badge (`error` / `warning`)',
  propLoading: 'Show inline spinner and block interaction',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitUpdateModelValue: 'Emitted on every keystroke with the next string',
  emitChange: 'Emitted alongside `update:modelValue` for React-style consumers',
  emitFocus: 'Emitted when the input gains focus',
  emitBlur: 'Emitted when the input loses focus',
  emitClear: 'Emitted when the clear button is clicked',

  propTextareaModelValue: 'v-model bound text value',
  propTextareaValue: 'Compat alias for `modelValue`',
  propTextareaDefaultValue: 'Initial value when uncontrolled',
  propTextareaRows: 'Initial visible row count',
  propTextareaMaxLength: 'Hard character limit (enforced, not just visual)',
  propTextareaShowCount: 'Render "length / maxLength" counter below the field',
  propTextareaPlaceholder: 'Placeholder when empty',
  propTextareaSize: 'Size preset',
  propTextareaDisabled: 'Block interaction',
  propTextareaUnstyled: 'Drop SkyGraph classes (headless mode)',

  cssHint:
    'Input exposes its own --sg-input-* tokens (height, padding, font-size, color, bg, border, radius). They default to globals but can be scoped per input. Textarea reuses `.sg-input` so every --sg-input-* works there too.',

  cssSgInputHeight: 'Input height (overridden per size class)',
  cssSgInputPadding: 'Input padding (overridden per size class)',
  cssSgInputFontSize: 'Input font size (overridden per size class)',
  cssSgInputColor: 'Typed text color',
  cssSgInputBg: 'Background color',
  cssSgInputBorder: 'Border color (also hover / focus)',
  cssSgInputRadius: 'Border radius',
  cssSgColorPrimary: 'Focus border color',
  cssSgColorPrimaryHover: 'Hover border color',
  cssSgColorPrimaryBg: 'Focus ring color',
  cssSgColorBgDisabled: 'Background when disabled',
  cssSgColorTextDisabled: 'Text color when disabled',
  cssSgColorTextPlaceholder: 'Placeholder color',
  cssSgColorTextTertiary: 'Inline spinner color and textarea counter color',
  cssSgFontSizeSm: 'Counter font size (textarea)',
  cssSgMarginXs: 'Gap between textarea and its counter',
  cssSgTransitionDuration: 'Color, border and box-shadow transitions',
  cssSgTransitionTiming: 'Transition easing',
} as const

/** Writable string map — used by table builders. */
export type InputDocStrings = { -readonly [K in keyof typeof inputDocEn]: string }
