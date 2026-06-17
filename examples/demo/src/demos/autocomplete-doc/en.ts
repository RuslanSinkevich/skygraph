/**
 * English source of truth for AutoComplete doc page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const autoCompleteDocEn = {
  pageTitle: 'AutoComplete',
  pageLead:
    'Text input with a dropdown of filtered suggestions. The typed string is the committed value — selecting a row just writes it back.',
  pageWhen1: 'Free-form text where a few known values are likely (cities, emails, tags).',
  pageWhen2: 'Email prefixes: auto-append known domains after the user types a local part.',
  pageWhen3: 'Async lookup from a server — use `onSearch` + `loading` to show progress.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Static suggestions filtered client-side by label.',
  demoEmailTitle: 'Email domain suggestions',
  demoEmailDesc: 'Derive the list from the current input — classic mail-client behaviour.',
  demoAsyncTitle: 'Async search',
  demoAsyncDesc: 'Debounced onSearch + loading state for server lookups.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Small / default / large, aligned with Input.',
  demoStatesTitle: 'States',
  demoStatesDesc: 'Disabled and loading.',
  demoTokensTitle: 'Token override',
  demoTokensDesc: 'Wrap the component in an element with CSS variables — it repaints.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Floating label over the field — it rises on focus or once typed. Pure CSS + the controlled value.',

  tableAutoCompleteApi: 'AutoComplete API',
  tableOptionApi: 'AutoCompleteOption',
  tableCssVars: 'CSS Variables',

  propValue: 'Controlled text value',
  propDefaultValue: 'Initial value when uncontrolled',
  propOptions: 'Suggestion rows (filtered by label)',
  propPlaceholder: 'Input placeholder',
  propOnChange: 'Fires whenever the text changes (typing or pick)',
  propOnSearch: 'Fires on every keystroke — use for async lookups',
  propOnSelect: 'Fires when a suggestion row is clicked',
  propOnBlur: 'Fires when the input loses focus',
  propSize: 'Height preset (matches Input)',
  propDisabled: 'Block interaction',
  propLoading: 'Show inline spinner and block interaction',
  propClassName: 'Wrapper className',
  propStyle: 'Wrapper inline style',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',

  propOptionValue: 'String written to the input on pick',
  propOptionLabel: 'Text shown in the list + used for filtering',

  cssHint:
    'AutoComplete reuses the full `--sg-input-*` group for the field itself; the dropdown uses the same globals as Select (bg-elevated, bg-hover, shadow-lg, border-radius).',

  cssSgInputAll:
    'AutoComplete reuses the full --sg-input-* group for the field itself — see Input for the list.',
  cssSgColorBgElevated: 'Dropdown background',
  cssSgColorBgHover: 'Highlight on suggestion hover',
  cssSgColorText: 'Suggestion text color',
  cssSgColorTextTertiary: 'Inline spinner color during loading',
  cssSgBorderRadius: 'Dropdown radius',
  cssSgShadowLg: 'Dropdown elevation',
  cssSgPaddingXs: 'Vertical dropdown padding & option padding-top/bottom',
  cssSgPaddingMd: 'Option horizontal padding',
  cssSgTransitionDuration: 'Option hover background transition',
} as const

/** Writable string map — use for props / table builders (same keys as `autoCompleteDocEn`). */
export type AutoCompleteDocStrings = { -readonly [K in keyof typeof autoCompleteDocEn]: string }
