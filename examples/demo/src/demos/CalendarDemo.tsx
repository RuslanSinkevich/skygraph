import { Calendar, DatePicker, RangePicker, TimePicker } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const calendarProps: PropDef[] = [
  { name: 'value', description: 'Current date value (controlled)', type: 'Date' },
  { name: 'defaultValue', description: 'Default date value', type: 'Date' },
  { name: 'mode', description: 'Display mode', type: "'month' | 'year'", default: "'month'" },
  { name: 'onChange', description: 'Callback when date changes', type: '(date: Date) => void' },
  { name: 'onPanelChange', description: 'Callback when panel changes', type: '(date: Date, mode) => void' },
  { name: 'fullscreen', description: 'Display fullscreen or compact card', type: 'boolean', default: 'true' },
  { name: 'disabledDate', description: 'Function to disable specific dates', type: '(date: Date) => boolean' },
  { name: 'cellRender', description: 'Custom cell renderer', type: '(date: Date, info) => ReactNode' },
  { name: 'headerRender', description: 'Custom header renderer', type: '(info) => ReactNode' },
]

export function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [pickerDate, setPickerDate] = useState<Date | null>(null)
  const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([null, null])
  const [timeValue, setTimeValue] = useState('')

  const presets = [
    { label: 'Today', value: new Date() },
    { label: 'Yesterday', value: new Date(Date.now() - 86400000) },
    { label: 'Last week', value: new Date(Date.now() - 7 * 86400000) },
  ]

  const rangePresets = [
    { label: 'Last 7 days', value: [new Date(Date.now() - 7 * 86400000), new Date()] as [Date, Date] },
    { label: 'Last 30 days', value: [new Date(Date.now() - 30 * 86400000), new Date()] as [Date, Date] },
    { label: 'This month', value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] as [Date, Date] },
  ]

  return (
    <ComponentDoc
      title="Calendar / DatePicker / TimePicker"
      description="Date and time selection components with range, time, and preset support."
      whenToUse={[
        'When you want to display a full calendar view.',
        'When you need date selection with a dropdown picker.',
        'When you need date range or datetime selection.',
        'When you need time-only selection.',
      ]}
    >
      {/* Calendar demos */}
      <DemoBox title="Calendar — Basic" description="Full-screen calendar.">
        <Calendar />
      </DemoBox>

      <DemoBox title="Calendar — Card" description="Compact card calendar.">
        <div style={{ maxWidth: 320 }}>
          <Calendar fullscreen={false} />
        </div>
      </DemoBox>

      <DemoBox title="Calendar — Controlled" description="Controlled with selected date display.">
        <div style={{ maxWidth: 320 }}>
          <p>Selected: {selectedDate.toLocaleDateString()}</p>
          <Calendar value={selectedDate} onChange={setSelectedDate} fullscreen={false} />
        </div>
      </DemoBox>

      <DemoBox title="Calendar — Disabled weekends" description="Weekends are disabled.">
        <div style={{ maxWidth: 320 }}>
          <Calendar
            fullscreen={false}
            disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
          />
        </div>
      </DemoBox>

      {/* DatePicker demos */}
      <DemoBox title="DatePicker — Basic" description="Standard date picker dropdown.">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <DatePicker placeholder="Select date" />
          <DatePicker placeholder="With presets" presets={presets} />
        </div>
      </DemoBox>

      <DemoBox title="DatePicker — Controlled" description="Controlled DatePicker.">
        <div>
          <p>Selected: {pickerDate?.toLocaleDateString() ?? 'none'}</p>
          <DatePicker
            value={pickerDate}
            onChange={(d) => setPickerDate(d)}
          />
        </div>
      </DemoBox>

      <DemoBox title="DatePicker — Disabled dates" description="Weekends disabled, past dates disabled.">
        <DatePicker
          disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6 || d < new Date(new Date().setHours(0, 0, 0, 0))}
          placeholder="No weekends / past"
        />
      </DemoBox>

      <DemoBox title="DatePicker — Month / Year" description="Pick month or year only.">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <DatePicker picker="month" placeholder="Select month" />
          <DatePicker picker="year" placeholder="Select year" />
        </div>
      </DemoBox>

      <DemoBox title="DatePicker — DateTime" description="Date with time selection (showTime).">
        <DatePicker showTime placeholder="Select datetime" showNow />
      </DemoBox>

      <DemoBox title="DatePicker — Sizes" description="Small, middle, large.">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <DatePicker size="small" placeholder="Small" />
          <DatePicker size="middle" placeholder="Middle" />
          <DatePicker size="large" placeholder="Large" />
        </div>
      </DemoBox>

      {/* RangePicker demos */}
      <DemoBox title="RangePicker — Basic" description="Dual-panel date range selection.">
        <RangePicker />
      </DemoBox>

      <DemoBox title="RangePicker — With presets" description="Quick range presets sidebar.">
        <RangePicker presets={rangePresets} />
      </DemoBox>

      <DemoBox title="RangePicker — Controlled" description="Controlled range picker.">
        <div>
          <p>
            Range: {rangeValue[0]?.toLocaleDateString() ?? '?'} → {rangeValue[1]?.toLocaleDateString() ?? '?'}
          </p>
          <RangePicker
            value={rangeValue}
            onChange={(dates) => setRangeValue(dates)}
          />
        </div>
      </DemoBox>

      <DemoBox title="RangePicker — DateTime" description="Range with time selection.">
        <RangePicker showTime placeholder={['Start datetime', 'End datetime']} />
      </DemoBox>

      {/* TimePicker demos */}
      <DemoBox title="TimePicker — Basic" description="Scroll column time picker.">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <TimePicker placeholder="Select time" />
          <TimePicker placeholder="No seconds" showSecond={false} />
        </div>
      </DemoBox>

      <DemoBox title="TimePicker — 12-hour" description="12-hour format with AM/PM.">
        <TimePicker use12Hours placeholder="12h format" />
      </DemoBox>

      <DemoBox title="TimePicker — Steps" description="Custom hour/minute steps.">
        <TimePicker hourStep={2} minuteStep={15} placeholder="2h / 15m steps" />
      </DemoBox>

      <DemoBox title="TimePicker — Controlled" description="Controlled time picker.">
        <div>
          <p>Time: {timeValue || 'none'}</p>
          <TimePicker value={timeValue} onChange={setTimeValue} />
        </div>
      </DemoBox>

      <PropsTable data={calendarProps} />
    </ComponentDoc>
  )
}
