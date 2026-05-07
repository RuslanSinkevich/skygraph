import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useDatePickerDocStrings } from './datepicker-doc/useDatePickerDocStrings'

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
import { RussianLocaleDatePicker } from './datepicker/RussianLocale.demo'
import RussianLocaleSource from './datepicker/RussianLocale.demo?raw'

export function DatePickerDemo() {
  const t = useDatePickerDocStrings()

  const datePickerProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'Date | null' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'Date' },
      { name: 'onChange', description: t.propOnChange, type: '(date: Date | null, dateString: string) => void' },
      { name: 'onCalendarChange', description: t.propOnCalendarChange, type: '(date: Date | null) => void' },
      { name: 'placeholder', description: t.propPlaceholder, type: 'string' },
      { name: 'format', description: t.propFormat, type: 'string', default: "'YYYY-MM-DD'" },
      { name: 'picker', description: t.propPicker, type: "'date' | 'month' | 'year' | 'week'", default: "'date'" },
      { name: 'showTime', description: t.propShowTime, type: 'boolean | ShowTimeConfig', default: 'false' },
      { name: 'showToday', description: t.propShowToday, type: 'boolean', default: 'true' },
      { name: 'showNow', description: t.propShowNow, type: 'boolean', default: 'false' },
      { name: 'allowClear', description: t.propAllowClear, type: 'boolean', default: 'true' },
      { name: 'disabledDate', description: t.propDisabledDate, type: '(date: Date) => boolean' },
      { name: 'presets', description: t.propPresets, type: 'DatePreset[]' },
      { name: 'placement', description: t.propPlacement, type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
      { name: 'open', description: t.propOpen, type: 'boolean' },
      { name: 'onOpenChange', description: t.propOnOpenChange, type: '(open: boolean) => void' },
      { name: 'inputReadOnly', description: t.propInputReadOnly, type: 'boolean', default: 'false' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const rangePickerProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propRangeValue, type: '[Date | null, Date | null]' },
      { name: 'defaultValue', description: t.propRangeDefaultValue, type: '[Date, Date]' },
      { name: 'onChange', description: t.propRangeOnChange, type: '(dates, dateStrings) => void' },
      { name: 'placeholder', description: t.propRangePlaceholder, type: '[string, string]' },
      { name: 'format', description: t.propRangeFormat, type: 'string', default: "'YYYY-MM-DD'" },
      { name: 'showTime', description: t.propRangeShowTime, type: 'boolean | ShowTimeConfig', default: 'false' },
      { name: 'allowClear', description: t.propRangeAllowClear, type: 'boolean', default: 'true' },
      { name: 'disabledDate', description: t.propRangeDisabledDate, type: '(date: Date) => boolean' },
      { name: 'presets', description: t.propRangePresets, type: 'DatePreset[]' },
      { name: 'separator', description: t.propRangeSeparator, type: 'ReactNode' },
      { name: 'placement', description: t.propRangePlacement, type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
    ],
    [t],
  )

  const showTimeProps = useMemo<PropDef[]>(
    () => [
      { name: 'format', description: t.propTimeFormat, type: 'string' },
      { name: 'hourStep', description: t.propTimeHourStep, type: 'number', default: '1' },
      { name: 'minuteStep', description: t.propTimeMinuteStep, type: 'number', default: '1' },
      { name: 'secondStep', description: t.propTimeSecondStep, type: 'number', default: '1' },
      { name: 'defaultValue', description: t.propTimeDefaultValue, type: 'Date' },
    ],
    [t],
  )

  const datePickerCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: t.cssSgColorPrimaryBg },
      { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: t.cssSgColorPrimaryHover },
      { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.cssSgColorBorder },
      { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-bg-container', default: 'var(--sg-gray-1)', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: t.cssSgColorBgElevated },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-color-text-quaternary', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextQuaternary },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssSgBorderRadiusLg },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: t.cssSgShadowLg },
      { name: 'sg-z-dropdown', default: '1050', description: t.cssSgZDropdown },
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
        <BasicDatePicker />
      </DemoBox>

      <DemoBox title={t.demoFormatsTitle} description={t.demoFormatsDesc} code={FormatsSource}>
        <FormatsDatePicker />
      </DemoBox>

      <DemoBox title={t.demoPickerModesTitle} description={t.demoPickerModesDesc} code={PickerModesSource}>
        <PickerModesDatePicker />
      </DemoBox>

      <DemoBox title={t.demoWithTimeTitle} description={t.demoWithTimeDesc} code={WithTimeSource}>
        <WithTimeDatePicker />
      </DemoBox>

      <DemoBox
        title={t.demoRussianLocaleTitle}
        description={t.demoRussianLocaleDesc}
        code={RussianLocaleSource}
      >
        <RussianLocaleDatePicker />
      </DemoBox>

      <DemoBox title={t.demoDisabledDatesTitle} description={t.demoDisabledDatesDesc} code={DisabledDatesSource}>
        <DisabledDatesDatePicker />
      </DemoBox>

      <DemoBox title={t.demoPresetsTitle} description={t.demoPresetsDesc} code={PresetsSource}>
        <PresetsDatePicker />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesDatePicker />
      </DemoBox>

      <DemoBox title={t.demoRangeTitle} description={t.demoRangeDesc} code={RangeSource}>
        <RangeDatePicker />
      </DemoBox>

      <DemoBox title={t.demoRangePresetsTitle} description={t.demoRangePresetsDesc} code={RangePresetsSource}>
        <RangePresetsDatePicker />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideDatePicker />
      </DemoBox>

      <PropsTable title={t.tableDatePickerApi} data={datePickerProps} />
      <PropsTable title={t.tableRangePickerApi} data={rangePickerProps} />
      <PropsTable title={t.tableShowTimeConfig} data={showTimeProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={datePickerCssVars}
      />
    </ComponentDoc>
  )
}
