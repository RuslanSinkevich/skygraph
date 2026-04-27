import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicTimePicker } from './timepicker/Basic.demo'
import BasicSource from './timepicker/Basic.demo?raw'
import { FormatTimePicker } from './timepicker/Format.demo'
import FormatSource from './timepicker/Format.demo?raw'
import { StepsTimePicker } from './timepicker/Steps.demo'
import StepsSource from './timepicker/Steps.demo?raw'
import { DisabledSlotsTimePicker } from './timepicker/DisabledSlots.demo'
import DisabledSlotsSource from './timepicker/DisabledSlots.demo?raw'
import { RangeTimePicker } from './timepicker/Range.demo'
import RangeSource from './timepicker/Range.demo?raw'
import { SizesTimePicker } from './timepicker/Sizes.demo'
import SizesSource from './timepicker/Sizes.demo?raw'
import { StatesTimePicker } from './timepicker/States.demo'
import StatesSource from './timepicker/States.demo?raw'
import { TokensOverrideTimePicker } from './timepicker/TokensOverride.demo'
import TokensOverrideSource from './timepicker/TokensOverride.demo?raw'
import { UnstyledTimePicker } from './timepicker/Unstyled.demo'
import UnstyledSource from './timepicker/Unstyled.demo?raw'

const timePickerProps: PropDef[] = [
  { name: 'value', description: 'Controlled time string (matches format)', type: 'string' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'string' },
  { name: 'placeholder', description: 'Placeholder when no value', type: 'string', default: "'Select time'" },
  { name: 'format', description: 'Display / commit format (HH/hh, mm, ss, A)', type: 'string', default: "'HH:mm:ss' | 'hh:mm:ss A'" },
  { name: 'use12Hours', description: 'Switch to 12-hour clock with AM/PM column', type: 'boolean', default: 'false' },
  { name: 'hourStep', description: 'Step between hour values', type: 'number', default: '1' },
  { name: 'minuteStep', description: 'Step between minute values', type: 'number', default: '1' },
  { name: 'secondStep', description: 'Step between second values', type: 'number', default: '1' },
  { name: 'showSecond', description: 'Show the seconds column', type: 'boolean', default: 'true' },
  { name: 'showNow', description: 'Show a "Now" button at the bottom', type: 'boolean', default: 'true' },
  { name: 'allowClear', description: 'Show × clear affordance when value exists', type: 'boolean', default: 'true' },
  { name: 'disabledHours', description: 'Return hour values to grey out', type: '() => number[]' },
  { name: 'disabledMinutes', description: 'Return minute values to grey out for the current hour', type: '(hour: number) => number[]' },
  { name: 'disabledSeconds', description: 'Return second values to grey out for the current hour + minute', type: '(hour, minute) => number[]' },
  { name: 'onChange', description: 'Fires with the formatted time string', type: '(value: string) => void' },
  { name: 'open', description: 'Controlled dropdown visibility', type: 'boolean' },
  { name: 'onOpenChange', description: 'Fires when the dropdown toggles', type: '(open: boolean) => void' },
  { name: 'disabled', description: 'Block interaction', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner and block interaction', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Height preset (matches Input)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const timeRangePickerProps: PropDef[] = [
  { name: 'value', description: 'Controlled [start, end] range', type: '[string, string]' },
  { name: 'defaultValue', description: 'Initial [start, end] when uncontrolled', type: '[string, string]' },
  { name: 'placeholder', description: 'Start + end placeholders', type: '[string, string]', default: "['Start', 'End']" },
  { name: 'format', description: 'Shared format for both panels', type: 'string' },
  { name: 'use12Hours', description: 'Switch to 12-hour clock', type: 'boolean', default: 'false' },
  { name: 'hourStep', description: 'Step between hour values', type: 'number', default: '1' },
  { name: 'minuteStep', description: 'Step between minute values', type: 'number', default: '1' },
  { name: 'secondStep', description: 'Step between second values', type: 'number', default: '1' },
  { name: 'showSecond', description: 'Show seconds on both panels', type: 'boolean', default: 'true' },
  { name: 'allowClear', description: 'Show × clear affordance', type: 'boolean', default: 'true' },
  { name: 'separator', description: 'Node between start and end labels', type: 'ReactNode', default: "'→'" },
  { name: 'onChange', description: 'Fires with [start, end] on any commit', type: '(range: [string, string]) => void' },
  { name: 'open', description: 'Controlled dropdown visibility', type: 'boolean' },
  { name: 'onOpenChange', description: 'Fires when the dropdown toggles', type: '(open: boolean) => void' },
  { name: 'disabled', description: 'Block interaction', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner and block interaction', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Height preset', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const timePickerCssVars: CssVarDef[] = [
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Trigger border color' },
  { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.03)', description: 'Column dividers and footer separator' },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Focus border + Now button border/text' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Trigger border on hover' },
  { name: 'sg-color-primary-bg', default: 'rgba(22, 119, 255, 0.1)', description: 'Focus ring + active cell background' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Trigger background' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Cell hover background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Trigger + cell text color' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Suffix icons color' },
  { name: 'sg-color-text-quaternary', default: 'rgba(0, 0, 0, 0.25)', description: 'Placeholder + clear button + range separator color' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled cell text color' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Clear button hover color' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Now button text on hover' },
  { name: 'sg-border-radius', default: '6px', description: 'Trigger border radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Now button radius' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Dropdown radius' },
  { name: 'sg-height-sm', default: '24px', description: 'Trigger height when size="small"' },
  { name: 'sg-height-md', default: '32px', description: 'Trigger height at default size' },
  { name: 'sg-height-lg', default: '40px', description: 'Trigger height when size="large"' },
  { name: 'sg-font-size', default: '14px', description: 'Trigger font size and clear icon size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Cell + Now button font size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Trigger font size when size="large"' },
  { name: 'sg-padding-xs', default: '8px', description: 'Trigger gap, dropdown margin-top, footer padding' },
  { name: 'sg-padding-sm', default: '12px', description: 'Trigger right padding and footer horizontal padding' },
  { name: 'sg-padding-md', default: '16px', description: 'Trigger left padding' },
  { name: 'sg-z-dropdown', default: '1050', description: 'Dropdown stacking context' },
  { name: 'sg-shadow-lg', default: '0 10px 30px rgba(0, 0, 0, 0.12)', description: 'Dropdown elevation' },
  { name: 'sg-transition-duration', default: '180ms', description: 'All hover / focus transitions' },
]

export function TimePickerDemo() {
  return (
    <ComponentDoc
      title="TimePicker"
      description="Scroll-column time picker. Emits a formatted **string** — no Date juggling required. Sibling `TimeRangePicker` accepts the same knobs for start/end."
      whenToUse={[
        'Any time entry where scrolling columns beat free typing (appointment slots, alarms).',
        'When you need 12-hour UX with AM/PM alongside 24-hour data.',
        'Ranges — use the `RangePicker` sibling (or `TimePicker.RangePicker`).',
      ]}
    >
      <DemoBox title="Basic" description="Controlled picker with live readout." code={BasicSource}>
        <BasicTimePicker />
      </DemoBox>

      <DemoBox title="Format" description="24h / 12h / no-seconds variants." code={FormatSource}>
        <FormatTimePicker />
      </DemoBox>

      <DemoBox title="Steps" description="Thin out hour / minute columns — perfect for slot pickers." code={StepsSource}>
        <StepsTimePicker />
      </DemoBox>

      <DemoBox
        title="Disabled slots"
        description="Grey out specific hours / minutes."
        code={DisabledSlotsSource}
      >
        <DisabledSlotsTimePicker />
      </DemoBox>

      <DemoBox title="Range" description="Start + end pair sharing a format." code={RangeSource}>
        <RangeTimePicker />
      </DemoBox>

      <DemoBox title="Sizes" description="Aligned with Input / DatePicker heights." code={SizesSource}>
        <SizesTimePicker />
      </DemoBox>

      <DemoBox title="States" description="Disabled and loading." code={StatesSource}>
        <StatesTimePicker />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens on a wrapper to rebrand an instance."
        code={TokensOverrideSource}
      >
        <TokensOverrideTimePicker />
      </DemoBox>

      <DemoBox title="Unstyled" description="Headless mode, native classes removed." code={UnstyledSource}>
        <UnstyledTimePicker />
      </DemoBox>

      <PropsTable title="TimePicker API" data={timePickerProps} />
      <PropsTable title="TimeRangePicker API" data={timeRangePickerProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="TimePicker has no component-specific tokens; it composes global form tokens (height, radius, colors) for the input and the surface tokens (bg-elevated, shadow-lg, z-dropdown) for the popover."
        data={timePickerCssVars}
      />
    </ComponentDoc>
  )
}
