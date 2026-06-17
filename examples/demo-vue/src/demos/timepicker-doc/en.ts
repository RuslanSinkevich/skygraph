/**
 * English source of truth for TimePicker doc page strings (Vue port).
 * Mirrors React 1:1 — both `TimePicker` and `TimeRangePicker` are
 * shipped (`disabledHours` / `disabledMinutes` / `disabledSeconds`
 * predicates and `loading` are supported on the Vue side as well).
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const timePickerDocEn = {
  pageTitle: 'TimePicker',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbTimePicker: 'TimePicker',

  pageLead: 'Scroll-column time picker. Emits a formatted **string** — no Date juggling required.',
  pageWhen1: 'Any time entry where scrolling columns beat free typing (appointment slots, alarms).',
  pageWhen2: 'When you need 12-hour UX with AM/PM alongside 24-hour data.',
  pageWhen3:
    'For start/end windows use `SgTimeRangePicker`; combine `disabledHours` / `disabledMinutes` for business-hours constraints.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled picker with live readout.',
  demoFormatTitle: 'Format',
  demoFormatDesc: '24h / 12h / no-seconds variants.',
  demoStepsTitle: 'Steps',
  demoStepsDesc: 'Thin out hour / minute columns — perfect for slot pickers.',
  demoDisabledSlotsTitle: 'Disabled slots',
  demoDisabledSlotsDesc:
    '`disabledHours` / `disabledMinutes` grey out specific values; callbacks receive the currently picked hour (and minute) so restrictions can vary.',
  demoRangeTitle: 'Range',
  demoRangeDesc:
    '`SgTimeRangePicker` pairs two panels in a single dropdown — perfect for "from / to" windows.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Aligned with Input / DatePicker heights.',
  demoStatesTitle: 'States',
  demoStatesDesc:
    'Disabled blocks the dropdown; `loading` keeps the trigger inert and swaps the chevron for a spinner.',
  demoTokensTitle: 'Token override',
  demoTokensDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
  demoFloatingLabelTitle: 'Floating label',
  demoFloatingLabelDesc:
    'Floating label over the TimePicker control: glides up on focus or when a time is selected.',
  tableTimePickerApi: 'TimePicker API',
  tableTimeRangePickerApi: 'TimeRangePicker API',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model binding (Vue idiom)',
  propValue: 'Compat alias for `modelValue` (string matching format)',
  propDefaultValue: 'Initial value when uncontrolled',
  propPlaceholder: 'Placeholder when no value',
  propFormat: 'Display / commit format (HH/hh, mm, ss, A)',
  propUse12Hours: 'Switch to 12-hour clock with AM/PM column',
  propHourStep: 'Step between hour values',
  propMinuteStep: 'Step between minute values',
  propSecondStep: 'Step between second values',
  propShowSecond: 'Show the seconds column',
  propShowNow: 'Show a "Now" button at the bottom',
  propAllowClear: 'Show × clear affordance when value exists',
  propOpen: 'Controlled dropdown visibility',
  propDisabled: 'Block interaction',
  propLoading: 'Show a spinner and block interaction',
  propSize: 'Height preset (matches Input)',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  propDisabledHours: 'Predicate returning hour values to disable',
  propDisabledMinutes: 'Predicate returning minute values to disable for the current hour',
  propDisabledSeconds: 'Predicate returning second values to disable for the current hour + minute',
  emitUpdateModelValue: 'Emitted on commit (v-model)',
  emitChange: 'Fires with the formatted time string',
  emitOpenChange: 'Fires when the dropdown toggles',

  propRangeValue: 'Compat alias for `modelValue` (tuple of strings)',
  propRangeDefaultValue: 'Initial range when uncontrolled',
  propRangePlaceholder: 'Placeholders for start / end inputs',
  propRangeFormat: 'Shared display format for both panels',
  propRangeUse12Hours: 'Both panels use a 12-hour clock when true',
  propRangeHourStep: 'Shared hour step',
  propRangeMinuteStep: 'Shared minute step',
  propRangeSecondStep: 'Shared second step',
  propRangeShowSecond: 'Show seconds in both panels',
  propRangeAllowClear: 'Show × clear affordance when at least one value exists',
  propRangeSeparator: 'String shown between the two displayed values',
  propRangeOpen: 'Controlled dropdown visibility',
  propRangeDisabled: 'Block interaction',
  propRangeLoading: 'Show a spinner and block interaction',
  propRangeSize: 'Height preset (matches Input)',
  propRangeUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitRangeUpdate: 'Emitted on commit (v-model)',
  emitRangeChange: 'Fires with the tuple of formatted strings',
  emitRangeOpenChange: 'Fires when the range dropdown toggles',

  cssHint:
    'TimePicker has no component-specific tokens; it composes global form tokens (height, radius, colors) for the input and the surface tokens (bg-elevated, shadow-lg, z-dropdown) for the popover.',

  cssSgColorBorder: 'Trigger border color',
  cssSgColorBorderSecondary: 'Column dividers and footer separator',
  cssSgColorPrimary: 'Focus border + Now button border/text',
  cssSgColorPrimaryHover: 'Trigger border on hover',
  cssSgColorPrimaryBg: 'Focus ring + active cell background',
  cssSgColorBgContainer: 'Trigger background',
  cssSgColorBgElevated: 'Dropdown background',
  cssSgColorBgHover: 'Cell hover background',
  cssSgColorText: 'Trigger + cell text color',
  cssSgColorTextTertiary: 'Suffix icons color',
  cssSgColorTextQuaternary: 'Placeholder + clear button color',
  cssSgColorTextDisabled: 'Disabled cell text color',
  cssSgBorderRadius: 'Trigger border radius',
  cssSgBorderRadiusSm: 'Now button radius',
  cssSgBorderRadiusLg: 'Dropdown radius',
  cssSgHeightSm: 'Trigger height when size="small"',
  cssSgHeightMd: 'Trigger height at default size',
  cssSgHeightLg: 'Trigger height when size="large"',
  cssSgFontSize: 'Trigger font size and clear icon size',
  cssSgFontSizeSm: 'Cell + Now button font size',
  cssSgPaddingXs: 'Trigger gap, dropdown margin-top, footer padding',
  cssSgZDropdown: 'Dropdown stacking context',
  cssSgShadowLg: 'Dropdown elevation',
  cssSgTransitionDuration: 'All hover / focus transitions',
} as const

export type TimePickerDocStrings = { -readonly [K in keyof typeof timePickerDocEn]: string }
