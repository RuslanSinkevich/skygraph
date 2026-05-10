/**
 * English source of truth for DatePicker doc page strings (Vue port).
 *
 * Vue parity gaps vs React (see `findings/T-Vue-Demo-Forms.md`
 * → `datepicker-vue-feature-gaps`):
 * - no `RangePicker` component
 * - no `presets` sidebar prop
 * - no `picker="week"` granularity
 * - no `showNow` shortcut, no `placement`, no `inputReadOnly`
 * - `showTime` is boolean only — no `ShowTimeConfig` ({hourStep, minuteStep})
 * - no locale support (calendar is English-only)
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const datePickerDocEn = {
  pageTitle: 'DatePicker',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbDatePicker: 'DatePicker',

  pageLead:
    'Calendar-backed date / month / year picker with optional time and a custom disabled-day predicate.',
  pageWhen1: 'When the user needs to pick a calendar date, month, or year.',
  pageWhen2: 'When you need a date + time combo in one control.',
  pageWhen3:
    'For two-end ranges, presets, week numbers or i18n calendar — see the React DatePicker (Vue parity is pending).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled date with live ISO readout.',
  demoFormatsTitle: 'Formats',
  demoFormatsDesc: 'Pick a display format — parsing follows the same tokens.',
  demoPickerModesTitle: 'Picker modes',
  demoPickerModesDesc:
    '`picker` changes granularity: date / month / year. Vue does not support `picker="week"`.',
  demoWithTimeTitle: 'Date + time',
  demoWithTimeDesc:
    '`show-time` adds hour/minute/second columns. Vue accepts boolean only — no step configuration or "Now" shortcut.',
  demoDisabledDatesTitle: 'Disabled dates',
  demoDisabledDatesDesc: 'Predicate decides which cells are blocked.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes, same API.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope tokens to re-skin one picker without touching the rest.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc:
    '`unstyled` strips the wrapper class hooks; global `.sg-datepicker-*` styles no longer apply.',

  tableDatePickerApi: 'DatePicker API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model binding (Vue idiom)',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial date when uncontrolled',
  propPlaceholder: 'Placeholder shown when no date is selected',
  propFormat: 'Display + parse format (YYYY, MM, DD, HH, mm, ss)',
  propPicker: 'Calendar granularity',
  propShowTime: 'Enable time columns (Vue: boolean only)',
  propShowToday: 'Show "Today" shortcut in the footer',
  propAllowClear: 'Render a clear button when a value exists',
  propDisabledDate: 'Predicate to disable specific days',
  propOpen: 'Controlled visibility of the dropdown',
  propDisabled: 'Disable the whole control',
  propSize: 'Control size',
  propUnstyled: 'Strip built-in wrapper classes',
  emitUpdateModelValue: 'Emitted on date selection (v-model)',
  emitChange: 'Fires after commit with `(date, formattedString)`',
  emitOpenChange: 'Fires when the dropdown opens or closes',

  cssHint:
    'DatePicker reuses the Input tokens for the shell, and `--sg-color-primary*` for the selected / hovered days.',

  cssSgColorPrimary: 'Selected day background + focus ring',
  cssSgColorPrimaryBg: 'Hovered day + focus ring tint',
  cssSgColorPrimaryHover: 'Hover border on the input shell',
  cssSgColorBorder: 'Input border / calendar dividers',
  cssSgColorBorderSecondary: 'Subtler in-panel divider',
  cssSgColorBgContainer: 'Input background',
  cssSgColorBgElevated: 'Dropdown panel background',
  cssSgColorText: 'Value + day-cell text',
  cssSgColorTextTertiary: 'Weekday header, footer captions',
  cssSgColorTextQuaternary: 'Out-of-month days + placeholder icon',
  cssSgBorderRadius: 'Input corner radius',
  cssSgBorderRadiusSm: 'Day cell corner radius',
  cssSgBorderRadiusLg: 'Dropdown panel corner radius',
  cssSgHeightMd: 'Input height (sized via `size`)',
  cssSgShadowLg: 'Dropdown panel shadow',
  cssSgZDropdown: 'Dropdown stacking layer',
} as const

/** Writable string map — use for props / table builders (same keys as `datePickerDocEn`). */
export type DatePickerDocStrings = { -readonly [K in keyof typeof datePickerDocEn]: string }
