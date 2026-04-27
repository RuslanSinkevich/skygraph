import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicDatePicker } from './datepicker/Basic.demo'
import BasicSource from './datepicker/Basic.demo?raw'
import { FormatsDatePicker } from './datepicker/Formats.demo'
import FormatsSource from './datepicker/Formats.demo?raw'
import { PickerModesDatePicker } from './datepicker/PickerModes.demo'
import PickerModesSource from './datepicker/PickerModes.demo?raw'
import { WithTimeDatePicker } from './datepicker/WithTime.demo'
import WithTimeSource from './datepicker/WithTime.demo?raw'
import { DisabledDatesDatePicker } from './datepicker/DisabledDates.demo'
import DisabledDatesSource from './datepicker/DisabledDates.demo?raw'
import { PresetsDatePicker } from './datepicker/Presets.demo'
import PresetsSource from './datepicker/Presets.demo?raw'
import { SizesDatePicker } from './datepicker/Sizes.demo'
import SizesSource from './datepicker/Sizes.demo?raw'
import { RangeDatePicker } from './datepicker/Range.demo'
import RangeSource from './datepicker/Range.demo?raw'
import { RangePresetsDatePicker } from './datepicker/RangePresets.demo'
import RangePresetsSource from './datepicker/RangePresets.demo?raw'
import { TokensOverrideDatePicker } from './datepicker/TokensOverride.demo'
import TokensOverrideSource from './datepicker/TokensOverride.demo?raw'

const datePickerProps: PropDef[] = [
  { name: 'value', description: 'Controlled date; `null` means cleared', type: 'Date | null' },
  { name: 'defaultValue', description: 'Initial date when uncontrolled', type: 'Date' },
  { name: 'onChange', description: 'Called with the committed date and formatted string', type: '(date: Date | null, dateString: string) => void' },
  { name: 'onCalendarChange', description: 'Fires as the user browses days (including while picking time)', type: '(date: Date | null) => void' },
  { name: 'placeholder', description: 'Placeholder shown when no date is selected', type: 'string' },
  { name: 'format', description: 'Display + parse format (YYYY, MM, DD, HH, mm, ss)', type: 'string', default: "'YYYY-MM-DD'" },
  { name: 'picker', description: 'Calendar granularity', type: "'date' | 'month' | 'year' | 'week'", default: "'date'" },
  { name: 'showTime', description: 'Enable time columns — boolean or ShowTimeConfig', type: 'boolean | ShowTimeConfig', default: 'false' },
  { name: 'showToday', description: 'Show "Today" shortcut in the footer', type: 'boolean', default: 'true' },
  { name: 'showNow', description: 'Show "Now" shortcut (with showTime)', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Render a clear button when a value exists', type: 'boolean', default: 'true' },
  { name: 'disabledDate', description: 'Predicate to disable specific days', type: '(date: Date) => boolean' },
  { name: 'presets', description: 'Sidebar shortcuts', type: 'DatePreset[]' },
  { name: 'placement', description: 'Dropdown alignment', type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
  { name: 'open', description: 'Controlled visibility of the dropdown', type: 'boolean' },
  { name: 'onOpenChange', description: 'Called when the dropdown opens or closes', type: '(open: boolean) => void' },
  { name: 'inputReadOnly', description: 'Block typing — force calendar selection', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Control size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the whole control', type: 'boolean', default: 'false' },
]

const rangePickerProps: PropDef[] = [
  { name: 'value', description: 'Controlled range — either end can be null', type: '[Date | null, Date | null]' },
  { name: 'defaultValue', description: 'Initial range (uncontrolled)', type: '[Date, Date]' },
  { name: 'onChange', description: 'Called with dates and formatted string tuple', type: '(dates, dateStrings) => void' },
  { name: 'placeholder', description: 'Start + end placeholders', type: '[string, string]' },
  { name: 'format', description: 'Display format for both values', type: 'string', default: "'YYYY-MM-DD'" },
  { name: 'showTime', description: 'Enable time columns on both ends', type: 'boolean | ShowTimeConfig', default: 'false' },
  { name: 'allowClear', description: 'Show a clear button', type: 'boolean', default: 'true' },
  { name: 'disabledDate', description: 'Per-day disable predicate', type: '(date: Date) => boolean' },
  { name: 'presets', description: 'Shortcuts — tuple values set both ends', type: 'DatePreset[]' },
  { name: 'separator', description: 'Custom node between start and end', type: 'ReactNode' },
  { name: 'placement', description: 'Dropdown alignment', type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
]

const showTimeProps: PropDef[] = [
  { name: 'format', description: 'Time format (HH, mm, ss tokens)', type: 'string' },
  { name: 'hourStep', description: 'Step between selectable hours', type: 'number', default: '1' },
  { name: 'minuteStep', description: 'Step between selectable minutes', type: 'number', default: '1' },
  { name: 'secondStep', description: 'Step between selectable seconds', type: 'number', default: '1' },
  { name: 'defaultValue', description: 'Time used when the panel opens without a date', type: 'Date' },
]

const datePickerCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Selected day background + focus ring' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Hovered day + focus ring tint' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Hover border on the input shell' },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: 'Input border / calendar dividers' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Subtler presets-sidebar divider' },
  { name: 'sg-color-bg-container', default: 'var(--sg-gray-1)', description: 'Input background' },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: 'Dropdown panel background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Value + day-cell text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Separator arrow, weekday header' },
  { name: 'sg-color-text-quaternary', default: 'rgba(0, 0, 0, 0.25)', description: 'Out-of-month days + placeholder icon' },
  { name: 'sg-border-radius', default: '6px', description: 'Input corner radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Day cell corner radius' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Dropdown panel corner radius' },
  { name: 'sg-height-md', default: '32px', description: 'Input height (with size prop controlling -sm / -lg)' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: 'Dropdown panel shadow' },
  { name: 'sg-z-dropdown', default: '1050', description: 'Dropdown stacking layer' },
]

export function DatePickerDemo() {
  return (
    <ComponentDoc
      title="DatePicker"
      description="Calendar-backed date/time picker with presets, ranges, and custom disabled predicates."
      whenToUse={[
        'When the user needs to pick a calendar date, month, year, or week.',
        'When you need a date + time combo in one control.',
        'For two-end ranges (reports, bookings) use the `RangePicker` variant.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled date value." code={BasicSource}>
        <BasicDatePicker />
      </DemoBox>

      <DemoBox title="Formats" description="Pick a display format — parsing follows the same tokens." code={FormatsSource}>
        <FormatsDatePicker />
      </DemoBox>

      <DemoBox title="Picker modes" description="`picker` changes granularity: date / month / year / week." code={PickerModesSource}>
        <PickerModesDatePicker />
      </DemoBox>

      <DemoBox title="Date + time" description="`showTime` adds hour/minute columns." code={WithTimeSource}>
        <WithTimeDatePicker />
      </DemoBox>

      <DemoBox title="Disabled dates" description="Predicate decides which cells are blocked." code={DisabledDatesSource}>
        <DisabledDatesDatePicker />
      </DemoBox>

      <DemoBox title="Presets" description="Sidebar shortcuts for common dates." code={PresetsSource}>
        <PresetsDatePicker />
      </DemoBox>

      <DemoBox title="Sizes" description="Three sizes, same API." code={SizesSource}>
        <SizesDatePicker />
      </DemoBox>

      <DemoBox title="Range" description="RangePicker — one control for two dates." code={RangeSource}>
        <RangeDatePicker />
      </DemoBox>

      <DemoBox title="Range presets" description="Preset tuples fill both ends." code={RangePresetsSource}>
        <RangePresetsDatePicker />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope tokens to re-skin one picker without touching the rest."
        code={TokensOverrideSource}
      >
        <TokensOverrideDatePicker />
      </DemoBox>

      <PropsTable title="DatePicker API" data={datePickerProps} />
      <PropsTable title="RangePicker API" data={rangePickerProps} />
      <PropsTable title="ShowTimeConfig" data={showTimeProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="DatePicker reuses the Input tokens for the shell, and --sg-color-primary* for the selected / hovered days."
        data={datePickerCssVars}
      />
    </ComponentDoc>
  )
}
