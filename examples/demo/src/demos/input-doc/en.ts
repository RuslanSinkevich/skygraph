/**
 * English source of truth for Input doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const inputDocEn = {
  pageTitle: 'Input',
  pageLead:
    'Text input (single-line) and Textarea (multi-line) share the same sizing, focus ring and `--sg-input-*` tokens.',
  pageWhen1: 'Any free-form text entry in a form or search bar.',
  pageWhen2: 'Numeric inputs where the stepper of InputNumber would be overkill.',
  pageWhen3: 'Multi-line fields with `<Textarea>` when a single line is too cramped.',

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
  demoTokensOverrideTitle: 'Token override',
  demoTokensOverrideDesc:
    'Three scoped recipes — branded green, dark field, glass pick — reshape the same Input through --sg-input-* and global tokens; focus ring and states stay intact.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Pure-CSS floating label (Material 3-ish). The label sits inside the field and glides to the top-left on focus or when the field has a value. Outlined and filled variants — no core changes, just `:has(input:focus)` + `:has(input:not(:placeholder-shown))`.',
  demoTextareaBasicTitle: 'Textarea — basic',
  demoTextareaBasicDesc: 'Multi-line sibling with shared styling.',
  demoTextareaCountTitle: 'Textarea — character count',
  demoTextareaCountDesc: 'maxLength + showCount render a live counter.',
  demoTextareaStatesTitle: 'Textarea — states',
  demoTextareaStatesDesc: 'Disabled and loading variants.',
  demoInFormTitle: 'Inside a Form',
  demoInFormDesc: 'Input + Textarea wired up via `<Field>`.',

  tableInputApi: 'Input API',
  tableTextareaApi: 'Textarea API',
  tableCssVars: 'CSS Variables',

  propValue: 'Controlled text value',
  propDefaultValue: 'Initial value when uncontrolled',
  propOnChange: 'Fires with the next string on each keystroke',
  propOnBlur: 'Fires when the input loses focus',
  propOnFocus: 'Fires when the input gains focus',
  propPlaceholder: 'Placeholder when empty',
  propType: 'Native HTML input type',
  propSize: 'Height / font-size preset',
  propDisabled: 'Block interaction',
  propLoading: 'Show inline spinner and block interaction',
  propAriaInvalid: 'Flip error styling + announce to AT',
  propAriaRequired: 'Announce required state to AT',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',

  propTextareaValue: 'Controlled text value',
  propTextareaDefaultValue: 'Initial value when uncontrolled',
  propTextareaOnChange: 'Fires with the next string on each keystroke',
  propTextareaOnBlur: 'Fires when the textarea loses focus',
  propTextareaOnFocus: 'Fires when the textarea gains focus',
  propTextareaRows: 'Initial visible row count',
  propTextareaMaxLength: 'Hard character limit (enforced, not just visual)',
  propTextareaShowCount: 'Render "length / maxLength" counter below the field',
  propTextareaPlaceholder: 'Placeholder when empty',
  propTextareaSize: 'Size preset',
  propTextareaDisabled: 'Block interaction',
  propTextareaLoading: 'Show spinner in the top-right corner',
  propTextareaClassName: 'Wrapper className',
  propTextareaStyle: 'Wrapper inline style',
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

/** Writable string map — use for props / table builders (same keys as `inputDocEn`). */
export type InputDocStrings = { -readonly [K in keyof typeof inputDocEn]: string }
