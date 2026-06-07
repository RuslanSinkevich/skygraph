<script setup lang="ts">
/**
 * `CalendarDemo` — aggregator for the Calendar component page.
 * 1:1 with `examples/demo/src/demos/CalendarDemo.tsx` (14 examples).
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  CssVarsTable,
  type PropDef,
  type CssVarDef,
} from './components'
import { useCalendarDocStrings } from './calendar-doc/useStrings'

import BasicCalendarDemo from './calendar/Basic.demo.vue'
import BasicSource from './calendar/Basic.demo.vue?raw'
import CardCalendarDemo from './calendar/Card.demo.vue'
import CardSource from './calendar/Card.demo.vue?raw'
import ControlledCalendarDemo from './calendar/Controlled.demo.vue'
import ControlledSource from './calendar/Controlled.demo.vue?raw'
import DisabledDatesCalendarDemo from './calendar/DisabledDates.demo.vue'
import DisabledDatesSource from './calendar/DisabledDates.demo.vue?raw'
import YearModeCalendarDemo from './calendar/YearMode.demo.vue'
import YearModeSource from './calendar/YearMode.demo.vue?raw'
import WeekNumbersCalendarDemo from './calendar/WeekNumbers.demo.vue'
import WeekNumbersSource from './calendar/WeekNumbers.demo.vue?raw'
import RangeSelectionCalendarDemo from './calendar/RangeSelection.demo.vue'
import RangeSelectionSource from './calendar/RangeSelection.demo.vue?raw'
import MultipleSelectionCalendarDemo from './calendar/MultipleSelection.demo.vue'
import MultipleSelectionSource from './calendar/MultipleSelection.demo.vue?raw'
import EventsCalendarDemo from './calendar/Events.demo.vue'
import EventsSource from './calendar/Events.demo.vue?raw'
import CustomCellCalendarDemo from './calendar/CustomCell.demo.vue'
import CustomCellSource from './calendar/CustomCell.demo.vue?raw'
import CustomHeaderCalendarDemo from './calendar/CustomHeader.demo.vue'
import CustomHeaderSource from './calendar/CustomHeader.demo.vue?raw'
import LocaleCalendarDemo from './calendar/Locale.demo.vue'
import LocaleSource from './calendar/Locale.demo.vue?raw'
import TokensOverrideCalendarDemo from './calendar/TokensOverride.demo.vue'
import TokensOverrideSource from './calendar/TokensOverride.demo.vue?raw'
import UnstyledCalendarDemo from './calendar/Unstyled.demo.vue'
import UnstyledSource from './calendar/Unstyled.demo.vue?raw'

const t = useCalendarDocStrings()

const calendarProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'Date' },
  { name: 'value', description: t.value.propValue, type: 'Date' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'Date' },
  {
    name: 'mode',
    description: t.value.propMode,
    type: "'month' | 'year'",
    default: "'month'",
  },
  {
    name: 'fullscreen',
    description: 'Fullscreen layout with footer',
    type: 'boolean',
    default: 'true',
  },
  { name: 'events', description: t.value.propEvents, type: 'CalendarEvent[]' },
  { name: 'maxEvents', description: 'Cap of event dots per cell', type: 'number', default: '3' },
  { name: 'weekStartDay', description: t.value.propWeekStartDay, type: 'number', default: '0' },
  {
    name: 'showWeekNumber',
    description: t.value.propShowWeekNumbers,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'disabledDate',
    description: t.value.propDisabledDate,
    type: '(date: Date) => boolean',
  },
  { name: 'locale', description: t.value.propLocale, type: 'CalendarLocale' },
  {
    name: 'rangeSelection',
    description: t.value.propRangeSelection,
    type: 'boolean',
    default: 'false',
  },
  { name: 'rangeValue', description: t.value.propRangeValue, type: '[Date | null, Date | null]' },
  {
    name: 'multipleSelection',
    description: t.value.propMultipleSelection,
    type: 'boolean',
    default: 'false',
  },
  { name: 'multipleValue', description: t.value.propMultipleValue, type: 'Date[]' },
  { name: '#header', description: t.value.propHeaderSlot, type: 'slot' },
  { name: '#cell', description: t.value.propCellSlot, type: 'slot' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: Date) => void',
  },
  { name: '@select', description: t.value.emitSelect, type: '(value: Date) => void' },
  {
    name: '@panelChange',
    description: t.value.emitPanelChange,
    type: "(value: Date, mode: 'month' | 'year') => void",
  },
  {
    name: '@rangeChange',
    description: t.value.emitRangeChange,
    type: '(range: [Date | null, Date | null]) => void',
  },
  {
    name: '@multipleChange',
    description: t.value.emitMultipleChange,
    type: '(dates: Date[]) => void',
  },
])

const eventProps = computed<PropDef[]>(() => [
  { name: 'id', description: t.value.eventId, type: 'string' },
  { name: 'date', description: t.value.eventDate, type: 'Date' },
  { name: 'title', description: t.value.eventTitle, type: 'string' },
  { name: 'type', description: t.value.eventType, type: 'string' },
  { name: 'color', description: 'Optional dot color (any CSS color)', type: 'string' },
])

const calendarCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: t.value.cssSgColorPrimary,
  },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-bg-container',
    default: 'var(--sg-gray-1)',
    description: t.value.cssSgColorBgContainer,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgHover,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssSgColorTextSecondary,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  {
    name: 'sg-color-border',
    default: 'var(--sg-gray-5)',
    description: t.value.cssSgColorBorder,
  },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssSgBorderRadiusLg },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-md', default: '16px', description: t.value.cssSgPaddingMd },
  {
    name: 'sg-transition-duration',
    default: '180ms',
    description: t.value.cssSgTransitionDuration,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbCalendar]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicCalendarDemo />
    </DemoBox>

    <DemoBox :title="t.demoCardTitle" :description="t.demoCardDesc" :code="CardSource">
      <CardCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoControlledTitle"
      :description="t.demoControlledDesc"
      :code="ControlledSource"
    >
      <ControlledCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledDatesTitle"
      :description="t.demoDisabledDatesDesc"
      :code="DisabledDatesSource"
    >
      <DisabledDatesCalendarDemo />
    </DemoBox>

    <DemoBox :title="t.demoYearModeTitle" :description="t.demoYearModeDesc" :code="YearModeSource">
      <YearModeCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoWeekNumbersTitle"
      :description="t.demoWeekNumbersDesc"
      :code="WeekNumbersSource"
    >
      <WeekNumbersCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoRangeSelectionTitle"
      :description="t.demoRangeSelectionDesc"
      :code="RangeSelectionSource"
    >
      <RangeSelectionCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoMultipleSelectionTitle"
      :description="t.demoMultipleSelectionDesc"
      :code="MultipleSelectionSource"
    >
      <MultipleSelectionCalendarDemo />
    </DemoBox>

    <DemoBox :title="t.demoEventsTitle" :description="t.demoEventsDesc" :code="EventsSource">
      <EventsCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomCellTitle"
      :description="t.demoCustomCellDesc"
      :code="CustomCellSource"
    >
      <CustomCellCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomHeaderTitle"
      :description="t.demoCustomHeaderDesc"
      :code="CustomHeaderSource"
    >
      <CustomHeaderCalendarDemo />
    </DemoBox>

    <DemoBox :title="t.demoLocaleTitle" :description="t.demoLocaleDesc" :code="LocaleSource">
      <LocaleCalendarDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
      flush
    >
      <TokensOverrideCalendarDemo />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledCalendarDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCalendarApi" :data="calendarProps" />
      <PropsTable :title="t.tableCalendarEvent" :data="eventProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="calendarCssVars" />
    </template>
  </ComponentDoc>
</template>
