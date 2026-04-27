import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicCalendar } from './calendar/Basic.demo'
import BasicSource from './calendar/Basic.demo?raw'
import { CardCalendar } from './calendar/Card.demo'
import CardSource from './calendar/Card.demo?raw'
import { ControlledCalendar } from './calendar/Controlled.demo'
import ControlledSource from './calendar/Controlled.demo?raw'
import { DisabledDatesCalendar } from './calendar/DisabledDates.demo'
import DisabledDatesSource from './calendar/DisabledDates.demo?raw'
import { YearModeCalendar } from './calendar/YearMode.demo'
import YearModeSource from './calendar/YearMode.demo?raw'
import { WeekNumbersCalendar } from './calendar/WeekNumbers.demo'
import WeekNumbersSource from './calendar/WeekNumbers.demo?raw'
import { RangeSelectionCalendar } from './calendar/RangeSelection.demo'
import RangeSelectionSource from './calendar/RangeSelection.demo?raw'
import { MultipleSelectionCalendar } from './calendar/MultipleSelection.demo'
import MultipleSelectionSource from './calendar/MultipleSelection.demo?raw'
import { EventsCalendar } from './calendar/Events.demo'
import EventsSource from './calendar/Events.demo?raw'
import { CustomCellCalendar } from './calendar/CustomCell.demo'
import CustomCellSource from './calendar/CustomCell.demo?raw'
import { CustomHeaderCalendar } from './calendar/CustomHeader.demo'
import CustomHeaderSource from './calendar/CustomHeader.demo?raw'
import { LocaleCalendar } from './calendar/Locale.demo'
import LocaleSource from './calendar/Locale.demo?raw'
import { TokensOverrideCalendar } from './calendar/TokensOverride.demo'
import TokensOverrideSource from './calendar/TokensOverride.demo?raw'
import { UnstyledCalendar } from './calendar/Unstyled.demo'
import UnstyledSource from './calendar/Unstyled.demo?raw'

const calendarProps: PropDef[] = [
  { name: 'value', description: 'Controlled selected date', type: 'Date' },
  { name: 'defaultValue', description: 'Initial date when uncontrolled', type: 'Date' },
  { name: 'onChange', description: 'Fires on date pick', type: '(date: Date) => void' },
  { name: 'onSelect', description: 'Fires on any cell selection (incl. month picks)', type: '(date: Date) => void' },
  { name: 'onPanelChange', description: 'Fires when visible panel or mode changes', type: '(date, mode) => void' },
  { name: 'mode', description: 'Controlled panel mode', type: "'month' | 'year'", default: "'month'" },
  { name: 'fullscreen', description: 'Full desktop layout vs. compact card', type: 'boolean', default: 'true' },
  { name: 'disabledDate', description: 'Block interaction on specific dates', type: '(date: Date) => boolean' },
  { name: 'cellRender', description: 'Inject custom content under a cell', type: '(date, info) => ReactNode' },
  { name: 'headerRender', description: 'Replace the default chrome', type: '(info: CalendarHeaderInfo) => ReactNode' },
  { name: 'locale', description: 'Override month/day names + today label', type: 'CalendarLocale' },
  { name: 'weekStartDay', description: '0 = Sunday … 6 = Saturday', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '0' },
  { name: 'showWeekNumber', description: 'Add ISO week column', type: 'boolean', default: 'false' },
  { name: 'rangeSelection', description: 'Enable start/end range picking', type: 'boolean', default: 'false' },
  { name: 'rangeValue', description: 'Controlled range', type: '[Date | null, Date | null]' },
  { name: 'defaultRangeValue', description: 'Initial range', type: '[Date | null, Date | null]' },
  { name: 'onRangeChange', description: 'Fires when the range changes', type: '(range) => void' },
  { name: 'multipleSelection', description: 'Toggle multiple dates independently', type: 'boolean', default: 'false' },
  { name: 'multipleValue', description: 'Controlled list of dates', type: 'Date[]' },
  { name: 'defaultMultipleValue', description: 'Initial list of dates', type: 'Date[]' },
  { name: 'onMultipleChange', description: 'Fires when the set of dates changes', type: '(dates: Date[]) => void' },
  { name: 'events', description: 'Event markers per date', type: 'CalendarEvent[]' },
  { name: 'maxEvents', description: 'Max events per cell before "+N"', type: 'number', default: '3' },
  { name: 'keyboard', description: 'Enable keyboard navigation', type: 'boolean', default: 'true' },
  { name: 'className', description: 'Root className', type: 'string' },
  { name: 'style', description: 'Root inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes — semantics only', type: 'boolean', default: 'false' },
]

const calendarEventProps: PropDef[] = [
  { name: 'date', description: 'Event date', type: 'Date' },
  { name: 'title', description: 'Short label shown on the cell', type: 'string' },
  { name: 'color', description: 'CSS color of the dot/chip', type: 'string' },
  { name: 'key', description: 'React key for this event', type: 'string' },
]

const calendarCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Selected day, range endpoints, "Today" accent, focus outline' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Range highlight, hover in card mode' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Calendar surface + controls background' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Cell hover background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Day number + controls text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Column headers, prev/next buttons, footer' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Out-of-month days, helper labels' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled days' },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: 'Input/select borders in chrome' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Grid divider, header bottom border' },
  { name: 'sg-color-success', default: 'var(--sg-green-6)', description: 'Event dots when color omitted (success variant)' },
  { name: 'sg-color-warning', default: 'var(--sg-orange-5)', description: 'Event dots (warning variant)' },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Event dots (error variant)' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Outer card radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Cell radius + chrome buttons' },
  { name: 'sg-font-size', default: '14px', description: 'Default font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Column headers, events, footer' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Day numbers in fullscreen' },
  { name: 'sg-padding-xs', default: '8px', description: 'Inner grid gaps + chrome padding' },
  { name: 'sg-padding-sm', default: '12px', description: 'Row padding' },
  { name: 'sg-padding-md', default: '16px', description: 'Header padding' },
  { name: 'sg-padding-lg', default: '24px', description: 'Footer padding' },
  { name: 'sg-transition-duration', default: '0.2s', description: 'Cell hover / selection transition' },
]

export function CalendarDemo() {
  return (
    <ComponentDoc
      title="Calendar"
      description="Full-screen or card calendar with range, multiple selection, events, custom cells, and i18n. Perfect for dashboards, schedulers, and date-heavy forms."
      whenToUse={[
        'As a month/year view inside an admin dashboard or scheduler.',
        'When you need event dots per day or colored capacity indicators.',
        'For picking a range or multiple distinct dates (vacation, holidays).',
      ]}
    >
      <DemoBox title="Basic" description="Full-screen month view." code={BasicSource}>
        <BasicCalendar />
      </DemoBox>

      <DemoBox title="Card mode" description="Compact layout for sidebars or popovers." code={CardSource}>
        <CardCalendar />
      </DemoBox>

      <DemoBox title="Controlled" description="Parent owns the selected date." code={ControlledSource}>
        <ControlledCalendar />
      </DemoBox>

      <DemoBox title="Disabled dates" description="Gray out past days + weekends." code={DisabledDatesSource}>
        <DisabledDatesCalendar />
      </DemoBox>

      <DemoBox title="Year mode" description="12-month grid driven by onPanelChange." code={YearModeSource}>
        <YearModeCalendar />
      </DemoBox>

      <DemoBox title="Week numbers + Monday start" description="ISO week column and weekStartDay." code={WeekNumbersSource}>
        <WeekNumbersCalendar />
      </DemoBox>

      <DemoBox title="Range selection" description="rangeSelection with controlled rangeValue." code={RangeSelectionSource}>
        <RangeSelectionCalendar />
      </DemoBox>

      <DemoBox title="Multiple selection" description="Toggle independent dates." code={MultipleSelectionSource}>
        <MultipleSelectionCalendar />
      </DemoBox>

      <DemoBox title="Events" description="Colored chips + '+N more' overflow." code={EventsSource}>
        <EventsCalendar />
      </DemoBox>

      <DemoBox title="Custom cell" description="Render capacity dots under each day." code={CustomCellSource}>
        <CustomCellCalendar />
      </DemoBox>

      <DemoBox title="Custom header" description="Minimal prev / title / next chrome." code={CustomHeaderSource}>
        <CustomHeaderCalendar />
      </DemoBox>

      <DemoBox title="Locale" description="Russian day/month labels + Monday start + week numbers." code={LocaleSource}>
        <LocaleCalendar />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens on a wrapper to re-skin."
        code={TokensOverrideSource}
      >
        <TokensOverrideCalendar />
      </DemoBox>

      <DemoBox title="Unstyled" description="Semantics only, paint with your own CSS." code={UnstyledSource}>
        <UnstyledCalendar />
      </DemoBox>

      <PropsTable title="Calendar API" data={calendarProps} />
      <PropsTable title="CalendarEvent" data={calendarEventProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Calendar has no component-scoped tokens — it is fully driven by the global palette, spacing and radius variables. Override them on a scoped wrapper to re-skin a single instance."
        data={calendarCssVars}
      />
    </ComponentDoc>
  )
}
