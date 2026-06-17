/**
 * English source of truth for Calendar doc page strings (Vue port).
 * Mirrors `examples/demo/src/demos/calendar-doc/en.ts` 1:1 — Vue now
 * supports the full surface: range/multiple selection, custom cells and
 * headers (slots), locale strings.
 *
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const calendarDocEn = {
  pageTitle: 'Calendar',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbCalendar: 'Calendar',

  pageLead:
    'Month + year calendar with event dots, week numbers, weekStart override and disabled-day predicate. Compact or fullscreen layout; range + multi selection out of the box.',
  pageWhen1: 'As a month view inside an admin dashboard or scheduler.',
  pageWhen2: 'When you need lightweight per-day event markers.',
  pageWhen3:
    'When users need to pick a range, multiple dates, or you want to fully customise the chrome via `#header` / `#cell` slots.',

  demoBasicTitle: 'Basic',
  demoBasicDesc: 'Default month grid with today highlighted.',
  demoCardTitle: 'Card layout',
  demoCardDesc: '`:fullscreen="false"` collapses the calendar into a compact card.',
  demoControlledTitle: 'Controlled',
  demoControlledDesc: 'Parent owns the selected date with v-model.',
  demoDisabledDatesTitle: 'Disabled dates',
  demoDisabledDatesDesc: 'Gray out past days + weekends with `disabled-date`.',
  demoYearModeTitle: 'Year mode',
  demoYearModeDesc:
    '`mode="year"` shows a 12-month overview; clicking a month jumps back to the month grid.',
  demoWeekNumbersTitle: 'Week numbers',
  demoWeekNumbersDesc: 'ISO week column with Monday-first layout.',
  demoRangeSelectionTitle: 'Range selection',
  demoRangeSelectionDesc:
    '`range-selection` flips the grid — first click pins the start, the second commits the end and highlights the span.',
  demoMultipleSelectionTitle: 'Multiple selection',
  demoMultipleSelectionDesc:
    '`multiple-selection` toggles dates on click — ideal for "pick every working day this month".',
  demoEventsTitle: 'Events',
  demoEventsDesc:
    'Each cell renders coloured dots per event. `max-events` caps the count, overflow collapses into `+N`.',
  demoCustomCellTitle: 'Custom cell',
  demoCustomCellDesc:
    'The `#cell` slot injects arbitrary content beneath the day number — capacity dots, badges, etc.',
  demoCustomHeaderTitle: 'Custom header',
  demoCustomHeaderDesc:
    'Override the entire chrome via the `#header` slot — receive panel `value`, `type`, `onChange`, `onTypeChange`.',
  demoLocaleTitle: 'Locale',
  demoLocaleDesc:
    'Pass a `locale` with localised month + day names, today button and week column header.',
  demoTokensOverrideTitle: 'Tokens override',
  demoTokensOverrideDesc:
    'Wrap the component in an element that sets `--sg-*` CSS variables — everything inside repaints. No props, no providers.',
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
  propLocale: 'Override month / day names + today button copy',
  propRangeSelection: 'Switch the grid to a two-tap range selector',
  propRangeValue: 'Controlled `[start, end]` range (use with `@range-change`)',
  propMultipleSelection: 'Toggle multiple dates on click',
  propMultipleValue: 'Controlled list of dates (use with `@multiple-change`)',
  propHeaderSlot:
    'Custom chrome — `#header` slot, receives `{ value, type, onChange, onTypeChange }`',
  propCellSlot: 'Extra content per cell — `#cell` slot, receives `{ date, type }`',
  propUnstyled: 'Drop SkyGraph wrapper class — semantics only',
  emitUpdateModelValue: 'Emitted on date pick (v-model)',
  emitSelect: 'Emitted on any cell selection',
  emitPanelChange: 'Emitted when visible panel or mode changes',
  emitRangeChange: 'Emitted with the next `[start, end]` tuple',
  emitMultipleChange: 'Emitted with the next array of selected dates',

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
