/**
 * English source of truth for Textarea doc page strings.
 *
 * Vue-only component: there is no `examples/demo/src/demos/TextareaDemo.tsx`
 * (see `findings/T-Vue-Demo-Foundation.md` → `react-textarea-no-demo`).
 * Source of truth is the existing `pages/TextareaPage.vue` content,
 * lifted into atomic `*.demo.vue` files.
 */
export const textareaDocEn = {
  pageTitle: 'Textarea',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbTextarea: 'Textarea',
  pageLead: 'Multi-line text input with row count, max length and live counter.',
  pageWhen1: 'Capture longer freeform text — comments, notes, descriptions.',
  pageWhen2: 'When you need a hard cap on length and a visible counter.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'v-model two-way binding.',
  demoRowsTitle: 'Rows',
  demoRowsDesc: 'Visible row count.',
  demoCountTitle: 'With counter',
  demoCountDesc: 'maxLength + showCount displays a live character counter.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes.',

  tableTextareaApi: 'Textarea API',

  propModelValue: 'v-model bound text value',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial value when uncontrolled',
  propPlaceholder: 'Placeholder when empty',
  propRows: 'Visible row count',
  propMaxLength: 'Hard character limit (enforced)',
  propShowCount: 'Render `length / maxLength` counter under the field',
  propSize: 'Size token',
  propDisabled: 'Block interaction',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitUpdateModelValue: 'Fires with the next string on each keystroke',
  emitChange: 'Mirror of `update:modelValue`',
  emitFocus: 'Fires when the textarea gains focus',
  emitBlur: 'Fires when the textarea loses focus',
} as const

/** Writable string map — used by table builders. */
export type TextareaDocStrings = { -readonly [K in keyof typeof textareaDocEn]: string }
