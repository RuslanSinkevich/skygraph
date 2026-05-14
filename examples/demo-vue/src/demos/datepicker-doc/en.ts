/**
 * English source of truth for the DatePicker doc page strings (Vue port).
 *
 * 1:1 parity with `examples/demo/src/demos/datepicker-doc/useDatePickerDocStrings.ts`.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const datePickerDocEn = {
  pageTitle: 'DatePicker',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbDatePicker: 'DatePicker',

  pageLead:
    'Calendar-backed date / month / year picker with optional time, presets, range selection and configurable locale.',
  pageWhen1: 'When the user needs to pick a calendar date, month, or year.',
  pageWhen2: 'When you need a date + time combo in one control.',
  pageWhen3: 'When you need a `[start, end]` range — use `SgRangePicker`.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled date with live ISO readout.',
  demoFormatsTitle: 'Formats',
  demoFormatsDesc: 'Pick a display format — parsing follows the same tokens.',
  demoPickerModesTitle: 'Picker modes',
  demoPickerModesDesc: '`picker` changes granularity: date / month / year.',
  demoWithTimeTitle: 'Date + time',
  demoWithTimeDesc:
    '`show-time` adds hour/minute/second columns. Pass an object for per-column steps.',
  demoRussianLocaleTitle: 'Russian locale',
  demoRussianLocaleDesc:
    '`SgConfigProvider` with the `ru_RU` preset feeds month names, weekday names and the today / now / OK footer captions.',
  demoDisabledDatesTitle: 'Disabled dates',
  demoDisabledDatesDesc: 'Predicate decides which cells are blocked.',
  demoPresetsTitle: 'Presets',
  demoPresetsDesc: 'Sidebar shortcuts that commit a value immediately.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Three sizes, same API.',
  demoRangeTitle: 'Range',
  demoRangeDesc: 'Two-month panel that returns `[start, end]`.',
  demoRangePresetsTitle: 'Range presets',
  demoRangePresetsDesc:
    'Preset values may be a `[Date, Date]` tuple — clicking fills both ends at once.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope tokens to re-skin one picker without touching the rest.',

  tableDatePickerApi: 'DatePicker API',
  tableRangePickerApi: 'RangePicker API',
  tableShowTimeConfig: 'ShowTimeConfig',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model binding (Vue idiom)',
  propValue: 'Compat alias for `modelValue`',
  propDefaultValue: 'Initial date when uncontrolled',
  propPlaceholder: 'Placeholder shown when no date is selected',
  propFormat: 'Display + parse format (YYYY, MM, DD, HH, mm, ss)',
  propPicker: 'Calendar granularity',
  propShowTime: 'Enable time columns (boolean or ShowTimeConfig)',
  propShowToday: 'Show "Today" shortcut in the footer',
  propShowNow: 'Show "Now" shortcut (with show-time)',
  propAllowClear: 'Render a clear button when a value exists',
  propDisabledDate: 'Predicate to disable specific days',
  propPresets: 'Sidebar shortcuts that commit a value immediately',
  propPlacement: 'Corner alignment of the dropdown relative to the input',
  propOpen: 'Controlled visibility of the dropdown',
  propInputReadOnly: 'Render text instead of an editable input',
  propDisabled: 'Disable the whole control',
  propSize: 'Control size',
  propUnstyled: 'Strip built-in wrapper classes',
  emitUpdateModelValue: 'Emitted on date selection (v-model)',
  emitChange: 'Fires after commit with `(date, formattedString)`',
  emitOpenChange: 'Fires when the dropdown opens or closes',

  propRangeValue: 'Controlled `[start, end]` tuple (`null` for unset ends)',
  propRangeDefaultValue: 'Initial range when uncontrolled',
  propRangePlaceholder: 'Placeholders for the start and end inputs',
  propRangeFormat: 'Display + parse format shared by both ends',
  propRangeShowTime: 'Enable time columns for both ends',
  propRangeAllowClear: 'Render a clear button when either end has a value',
  propRangeDisabledDate: 'Predicate to disable specific days',
  propRangePresets: 'Sidebar shortcuts that commit a full range at once',
  propRangeSeparator: 'Node rendered between start and end values',
  propRangePlacement: 'Corner alignment of the range dropdown',
  emitRangeUpdateModelValue: 'Emitted on range commit (v-model)',
  emitRangeChange: 'Fires after commit with `(dates, dateStrings)`',

  propTimeFormat: 'Time portion format (HH, mm, ss tokens)',
  propTimeHourStep: 'Step between selectable hours',
  propTimeMinuteStep: 'Step between selectable minutes',
  propTimeSecondStep: 'Step between selectable seconds',
  propTimeDefaultValue: 'Initial time when opening without a value',

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
