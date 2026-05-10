/**
 * English source of truth for TimePicker doc page strings (Vue port).
 *
 * Vue parity gaps vs React (see `findings/T-Vue-Demo-Forms.md`
 * → `timepicker-vue-feature-gaps`):
 * - no `SgTimeRangePicker` companion
 * - no `disabledHours` / `disabledMinutes` / `disabledSeconds`
 * - no `loading` prop
 * - no `inputReadOnly`
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const timePickerDocEn = {
  pageTitle: 'TimePicker',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbTimePicker: 'TimePicker',

  pageLead:
    'Scroll-column time picker. Emits a formatted **string** — no Date juggling required.',
  pageWhen1:
    'Any time entry where scrolling columns beat free typing (appointment slots, alarms).',
  pageWhen2: 'When you need 12-hour UX with AM/PM alongside 24-hour data.',
  pageWhen3:
    'For ranges, disabled hour/minute predicates or `loading` — see the React TimePicker (Vue parity is pending).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Controlled picker with live readout.',
  demoFormatTitle: 'Format',
  demoFormatDesc: '24h / 12h / no-seconds variants.',
  demoStepsTitle: 'Steps',
  demoStepsDesc: 'Thin out hour / minute columns — perfect for slot pickers.',
  demoSizesTitle: 'Sizes',
  demoSizesDesc: 'Aligned with Input / DatePicker heights.',
  demoStatesTitle: 'States',
  demoStatesDesc:
    'Disabled blocks the dropdown. Vue has no `loading` — second row simulates fetch via `disabled` + side label.',
  demoTokensTitle: 'Tokens override',
  demoTokensDesc: 'Scope global tokens on a wrapper to rebrand an instance.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Headless mode, native classes removed.',

  tableTimePickerApi: 'TimePicker API',
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
  propSize: 'Height preset (matches Input)',
  propUnstyled: 'Drop SkyGraph classes (headless mode)',
  emitUpdateModelValue: 'Emitted on commit (v-model)',
  emitChange: 'Fires with the formatted time string',
  emitOpenChange: 'Fires when the dropdown toggles',

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

/** Writable string map — use for props / table builders (same keys as `timePickerDocEn`). */
export type TimePickerDocStrings = { -readonly [K in keyof typeof timePickerDocEn]: string }
