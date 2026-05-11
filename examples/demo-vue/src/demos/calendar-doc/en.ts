/**
 * English source of truth for Calendar doc page strings (Vue port).
 *
 * Vue parity gaps vs React (see `findings/T-Vue-Components-Functional-Fixes.md`
 * → `calendar-vue-feature-gaps`):
 * - no `multipleSelection` / `multipleValue` API
 * - no `rangeSelection` / `rangeValue` API
 * - no `cellRender` / `headerRender` slots
 * - no `locale` prop (English-only month/day labels)
 * - no keyboard navigation
 *
 * What works (Wave 3.5 fixes):
 * - month + year mode with mode switch and select-header
 * - event dots with `max-events` overflow indicator
 * - `fullscreen` toggle, "Today" footer button
 * - `show-week-numbers`, `week-start-day`, `disabled-date`
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const calendarDocEn = {
  pageTitle: 'Calendar',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbCalendar: 'Calendar',

  pageLead:
    'Month + year calendar with event dots, week numbers, weekStart override and disabled-day predicate. Compact or fullscreen layout.',
  pageWhen1: 'As a month view inside an admin dashboard or scheduler.',
  pageWhen2: 'When you need lightweight per-day event markers.',
  pageWhen3:
    'For range / multiple selection, custom cells, locale or keyboard navigation — see the React Calendar (Vue parity is pending).',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default month grid with today highlighted.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Parent owns the selected date with v-model.',
  demoEventsTitle: 'Events',
  demoEventsDesc:
    'Each cell renders coloured dots per event. `max-events` caps the count, overflow collapses into `+N`.',
  demoWeekStartTitle: 'Week starts Monday',
  demoWeekStartDesc: '`week-start-day="1"` rotates the weekday columns.',
  demoWeekNumbersTitle: 'Week numbers',
  demoWeekNumbersDesc: 'ISO week column with Monday-first layout.',
  demoDisabledDatesTitle: 'Disabled dates',
  demoDisabledDatesDesc: 'Gray out past days + weekends.',
  demoYearModeTitle: 'Year mode',
  demoYearModeDesc:
    '`mode="year"` shows a 12-month overview; clicking a month jumps back to the month grid.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc: 'Scope global tokens on a wrapper to re-skin.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Semantics only, paint with your own CSS.',

  tableCalendarApi: 'Calendar API',
  tableCalendarEvent: 'CalendarEvent',
  tableCssVars: 'CSS Variables',

  propModelValue: 'v-model binding (Vue idiom)',
  propValue: 'Compat alias for `modelValue` — selected date',
  propDefaultValue: 'Initial date when uncontrolled',
  propMode: "Display mode ('month' | 'year')",
  propEvents: 'Event markers per date',
  propWeekStartDay: '0 = Sunday … 6 = Saturday',
  propShowWeekNumbers: 'Show ISO week column',
  propDisabledDate: 'Block interaction on specific dates',
  propUnstyled: 'Drop SkyGraph wrapper class — semantics only',
  emitUpdateModelValue: 'Emitted on date pick (v-model)',
  emitSelect: 'Emitted on any cell selection',
  emitPanelChange: 'Emitted when visible panel or mode changes',

  eventId: 'Stable identifier (used for v-for `:key`)',
  eventDate: 'Event date',
  eventTitle: 'Tooltip shown on the dot',
  eventType: 'Free-form tag for grouping/filtering',

  cssHint:
    'Calendar has no component-scoped tokens — it is fully driven by the global palette, spacing and radius variables. Override them on a scoped wrapper to re-skin a single instance.',

  cssSgColorPrimary: 'Selected day + "Today" accent + focus outline',
  cssSgColorPrimaryBg: 'Hover background for selected cells',
  cssSgColorBgContainer: 'Calendar surface + controls background',
  cssSgColorBgHover: 'Cell hover background',
  cssSgColorText: 'Day number + controls text',
  cssSgColorTextSecondary: 'Column headers, prev/next buttons',
  cssSgColorTextTertiary: 'Out-of-month days, helper labels',
  cssSgColorTextDisabled: 'Disabled days',
  cssSgColorBorder: 'Input/select borders in chrome',
  cssSgColorBorderSecondary: 'Grid divider, header bottom border',
  cssSgBorderRadiusLg: 'Outer card radius',
  cssSgBorderRadiusSm: 'Cell radius + chrome buttons',
  cssSgFontSize: 'Default font size',
  cssSgFontSizeSm: 'Column headers, events',
  cssSgPaddingXs: 'Inner grid gaps + chrome padding',
  cssSgPaddingMd: 'Header padding',
  cssSgTransitionDuration: 'Cell hover / selection transition',
} as const

/** Writable string map — use for props / table builders (same keys as `calendarDocEn`). */
export type CalendarDocStrings = { -readonly [K in keyof typeof calendarDocEn]: string }
