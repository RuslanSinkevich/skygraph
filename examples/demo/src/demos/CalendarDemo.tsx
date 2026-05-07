import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useCalendarDocStrings } from './calendar-doc/useCalendarDocStrings'

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

export function CalendarDemo() {
  const t = useCalendarDocStrings()

  const calendarProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'Date' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'Date' },
      { name: 'onChange', description: t.propOnChange, type: '(date: Date) => void' },
      { name: 'onSelect', description: t.propOnSelect, type: '(date: Date) => void' },
      { name: 'onPanelChange', description: t.propOnPanelChange, type: '(date, mode) => void' },
      { name: 'mode', description: t.propMode, type: "'month' | 'year'", default: "'month'" },
      { name: 'fullscreen', description: t.propFullscreen, type: 'boolean', default: 'true' },
      { name: 'disabledDate', description: t.propDisabledDate, type: '(date: Date) => boolean' },
      { name: 'cellRender', description: t.propCellRender, type: '(date, info) => ReactNode' },
      { name: 'headerRender', description: t.propHeaderRender, type: '(info: CalendarHeaderInfo) => ReactNode' },
      { name: 'locale', description: t.propLocale, type: 'CalendarLocale' },
      { name: 'weekStartDay', description: t.propWeekStartDay, type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '0' },
      { name: 'showWeekNumber', description: t.propShowWeekNumber, type: 'boolean', default: 'false' },
      { name: 'rangeSelection', description: t.propRangeSelection, type: 'boolean', default: 'false' },
      { name: 'rangeValue', description: t.propRangeValue, type: '[Date | null, Date | null]' },
      { name: 'defaultRangeValue', description: t.propDefaultRangeValue, type: '[Date | null, Date | null]' },
      { name: 'onRangeChange', description: t.propOnRangeChange, type: '(range) => void' },
      { name: 'multipleSelection', description: t.propMultipleSelection, type: 'boolean', default: 'false' },
      { name: 'multipleValue', description: t.propMultipleValue, type: 'Date[]' },
      { name: 'defaultMultipleValue', description: t.propDefaultMultipleValue, type: 'Date[]' },
      { name: 'onMultipleChange', description: t.propOnMultipleChange, type: '(dates: Date[]) => void' },
      { name: 'events', description: t.propEvents, type: 'CalendarEvent[]' },
      { name: 'maxEvents', description: t.propMaxEvents, type: 'number', default: '3' },
      { name: 'keyboard', description: t.propKeyboard, type: 'boolean', default: 'true' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const calendarEventProps = useMemo<PropDef[]>(
    () => [
      { name: 'date', description: t.eventDate, type: 'Date' },
      { name: 'title', description: t.eventTitle, type: 'string' },
      { name: 'color', description: t.eventColor, type: 'string' },
      { name: 'key', description: t.eventKey, type: 'string' },
    ],
    [t],
  )

  const calendarCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: t.cssSgColorPrimaryBg },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.cssSgColorBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.cssSgColorBorder },
      { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-success', default: 'var(--sg-green-6)', description: t.cssSgColorSuccess },
      { name: 'sg-color-warning', default: 'var(--sg-orange-5)', description: t.cssSgColorWarning },
      { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.cssSgColorError },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssSgBorderRadiusLg },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '12px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '16px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-lg', default: '24px', description: t.cssSgPaddingLg },
      { name: 'sg-transition-duration', default: '0.2s', description: t.cssSgTransitionDuration },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicCalendar />
      </DemoBox>

      <DemoBox title={t.demoCardTitle} description={t.demoCardDesc} code={CardSource}>
        <CardCalendar />
      </DemoBox>

      <DemoBox title={t.demoControlledTitle} description={t.demoControlledDesc} code={ControlledSource}>
        <ControlledCalendar />
      </DemoBox>

      <DemoBox title={t.demoDisabledDatesTitle} description={t.demoDisabledDatesDesc} code={DisabledDatesSource}>
        <DisabledDatesCalendar />
      </DemoBox>

      <DemoBox title={t.demoYearModeTitle} description={t.demoYearModeDesc} code={YearModeSource}>
        <YearModeCalendar />
      </DemoBox>

      <DemoBox title={t.demoWeekNumbersTitle} description={t.demoWeekNumbersDesc} code={WeekNumbersSource}>
        <WeekNumbersCalendar />
      </DemoBox>

      <DemoBox title={t.demoRangeSelectionTitle} description={t.demoRangeSelectionDesc} code={RangeSelectionSource}>
        <RangeSelectionCalendar />
      </DemoBox>

      <DemoBox title={t.demoMultipleSelectionTitle} description={t.demoMultipleSelectionDesc} code={MultipleSelectionSource}>
        <MultipleSelectionCalendar />
      </DemoBox>

      <DemoBox title={t.demoEventsTitle} description={t.demoEventsDesc} code={EventsSource}>
        <EventsCalendar />
      </DemoBox>

      <DemoBox title={t.demoCustomCellTitle} description={t.demoCustomCellDesc} code={CustomCellSource}>
        <CustomCellCalendar />
      </DemoBox>

      <DemoBox title={t.demoCustomHeaderTitle} description={t.demoCustomHeaderDesc} code={CustomHeaderSource}>
        <CustomHeaderCalendar />
      </DemoBox>

      <DemoBox title={t.demoLocaleTitle} description={t.demoLocaleDesc} code={LocaleSource}>
        <LocaleCalendar />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideCalendar />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledCalendar />
      </DemoBox>

      <PropsTable title={t.tableCalendarApi} data={calendarProps} />
      <PropsTable title={t.tableCalendarEvent} data={calendarEventProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={calendarCssVars}
      />
    </ComponentDoc>
  )
}
