/**
 * English source of truth for AutoComplete doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 *
 * Mirrors `examples/demo/src/demos/autocomplete-doc/en.ts`. Vue side
 * has no `loading` prop on `SgAutoComplete` — see
 * `findings/T-Vue-Demo-Forms.md` (`autocomplete-loading-not-in-vue`).
 */
export const autoCompleteDocEn = {
  pageTitle: 'AutoComplete',
  pageBadge: 'Data Entry',
  crumbCategory: 'Data Entry',
  crumbAutoComplete: 'AutoComplete',
  pageLead:
    'Text input with a dropdown of filtered suggestions. The typed string is the committed value — selecting a row just writes it back.',
  pageWhen1: 'Free-form text where a few known values are likely (cities, emails, tags).',
  pageWhen2:
    'Email prefixes: auto-append known domains after the user types a local part.',
  pageWhen3:
    'Async lookup from a server — emit `@search` and surface progress in a side label.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Static suggestions filtered client-side by label.',
  demoEmailTitle: 'Email domain suggestions',
  demoEmailDesc: 'Derive the list from the current input — classic mail-client behaviour.',
  demoAsyncTitle: 'Async search',
  demoAsyncDesc: 'Debounced `@search` — shows a side-label while the response is in flight.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / default / large, aligned with Input.',
  demoStatesTitle: 'Disabled states',
  demoStatesDesc:
    '`disabled` blocks editing. Vue has no loading state yet (parity gap).',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope `--sg-input-*` and global tokens to rebrand one instance.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Headless mode — semantics only, no SkyGraph classes.',

  tableAutoCompleteApi: 'AutoComplete API',
  tableOptionApi: 'AutoCompleteOption',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model bound text value',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial value when uncontrolled',
  propOptions: 'Suggestion rows (filtered by label)',
  propPlaceholder: 'Input placeholder',
  propSize: 'Height preset (matches Input)',
  propDisabled: 'Block interaction',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitUpdateModelValue: 'Fires whenever the text changes (used by `v-model`)',
  emitChange: 'Mirror of `update:modelValue`',
  emitSearch: 'Fires on every keystroke — use for async lookups',
  emitSelect: 'Fires when a suggestion row is clicked: `(value, option)`',
  emitBlur: 'Fires when the input loses focus',

  propOptionValue: 'String written to the input on pick',
  propOptionLabel: 'Text shown in the list + used for filtering (defaults to `value`)',

  cssHint:
    'AutoComplete reuses the full `--sg-input-*` group for the field itself; the dropdown uses the same globals as Select (bg-elevated, bg-hover, shadow-lg, border-radius).',

  cssSgInputAll:
    'AutoComplete reuses the full `--sg-input-*` group for the field itself — see Input for the list.',
  cssSgColorBgElevated: 'Dropdown background',
  cssSgColorBgHover: 'Highlight on suggestion hover',
  cssSgColorText: 'Suggestion text color',
  cssSgColorTextTertiary: 'Side-label color used by the AsyncSearch demo',
  cssSgBorderRadius: 'Dropdown radius',
  cssSgShadowLg: 'Dropdown elevation',
  cssSgPaddingXs: 'Vertical dropdown padding & option padding-top/bottom',
  cssSgPaddingMd: 'Option horizontal padding',
  cssSgTransitionDuration: 'Option hover background transition',
} as const

/** Writable string map — use for props / table builders (same keys as `autoCompleteDocEn`). */
export type AutoCompleteDocStrings = {
  -readonly [K in keyof typeof autoCompleteDocEn]: string
}
