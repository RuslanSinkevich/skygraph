import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTimePickerDocStrings } from './timepicker-doc/useTimePickerDocStrings'

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

export function TimePickerDemo() {
  const t = useTimePickerDocStrings()

  const timePickerProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'string' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'string' },
      { name: 'placeholder', description: t.propPlaceholder, type: 'string', default: "'Select time'" },
      { name: 'format', description: t.propFormat, type: 'string', default: "'HH:mm:ss' | 'hh:mm:ss A'" },
      { name: 'use12Hours', description: t.propUse12Hours, type: 'boolean', default: 'false' },
      { name: 'hourStep', description: t.propHourStep, type: 'number', default: '1' },
      { name: 'minuteStep', description: t.propMinuteStep, type: 'number', default: '1' },
      { name: 'secondStep', description: t.propSecondStep, type: 'number', default: '1' },
      { name: 'showSecond', description: t.propShowSecond, type: 'boolean', default: 'true' },
      { name: 'showNow', description: t.propShowNow, type: 'boolean', default: 'true' },
      { name: 'allowClear', description: t.propAllowClear, type: 'boolean', default: 'true' },
      { name: 'disabledHours', description: t.propDisabledHours, type: '() => number[]' },
      { name: 'disabledMinutes', description: t.propDisabledMinutes, type: '(hour: number) => number[]' },
      { name: 'disabledSeconds', description: t.propDisabledSeconds, type: '(hour, minute) => number[]' },
      { name: 'onChange', description: t.propOnChange, type: '(value: string) => void' },
      { name: 'open', description: t.propOpen, type: 'boolean' },
      { name: 'onOpenChange', description: t.propOnOpenChange, type: '(open: boolean) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const timeRangePickerProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propRangeValue, type: '[string, string]' },
      { name: 'defaultValue', description: t.propRangeDefaultValue, type: '[string, string]' },
      { name: 'placeholder', description: t.propRangePlaceholder, type: '[string, string]', default: "['Start', 'End']" },
      { name: 'format', description: t.propRangeFormat, type: 'string' },
      { name: 'use12Hours', description: t.propRangeUse12Hours, type: 'boolean', default: 'false' },
      { name: 'hourStep', description: t.propRangeHourStep, type: 'number', default: '1' },
      { name: 'minuteStep', description: t.propRangeMinuteStep, type: 'number', default: '1' },
      { name: 'secondStep', description: t.propRangeSecondStep, type: 'number', default: '1' },
      { name: 'showSecond', description: t.propRangeShowSecond, type: 'boolean', default: 'true' },
      { name: 'allowClear', description: t.propRangeAllowClear, type: 'boolean', default: 'true' },
      { name: 'separator', description: t.propRangeSeparator, type: 'ReactNode', default: "'→'" },
      { name: 'onChange', description: t.propRangeOnChange, type: '(range: [string, string]) => void' },
      { name: 'open', description: t.propRangeOpen, type: 'boolean' },
      { name: 'onOpenChange', description: t.propRangeOnOpenChange, type: '(open: boolean) => void' },
      { name: 'disabled', description: t.propRangeDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propRangeLoading, type: 'boolean', default: 'false' },
      { name: 'size', description: t.propRangeSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propRangeClassName, type: 'string' },
      { name: 'style', description: t.propRangeStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propRangeUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const timePickerCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssSgColorBorder },
      { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.03)', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: t.cssSgColorPrimaryHover },
      { name: 'sg-color-primary-bg', default: 'rgba(22, 119, 255, 0.1)', description: t.cssSgColorPrimaryBg },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssSgColorBgElevated },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-color-text-quaternary', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextQuaternary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssSgBorderRadiusLg },
      { name: 'sg-height-sm', default: '24px', description: t.cssSgHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssSgHeightLg },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '12px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '16px', description: t.cssSgPaddingMd },
      { name: 'sg-z-dropdown', default: '1050', description: t.cssSgZDropdown },
      { name: 'sg-shadow-lg', default: '0 10px 30px rgba(0, 0, 0, 0.12)', description: t.cssSgShadowLg },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
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
        <BasicTimePicker />
      </DemoBox>

      <DemoBox title={t.demoFormatTitle} description={t.demoFormatDesc} code={FormatSource}>
        <FormatTimePicker />
      </DemoBox>

      <DemoBox title={t.demoStepsTitle} description={t.demoStepsDesc} code={StepsSource}>
        <StepsTimePicker />
      </DemoBox>

      <DemoBox
        title={t.demoDisabledSlotsTitle}
        description={t.demoDisabledSlotsDesc}
        code={DisabledSlotsSource}
      >
        <DisabledSlotsTimePicker />
      </DemoBox>

      <DemoBox title={t.demoRangeTitle} description={t.demoRangeDesc} code={RangeSource}>
        <RangeTimePicker />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesTimePicker />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesTimePicker />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideTimePicker />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledTimePicker />
      </DemoBox>

      <PropsTable title={t.tableTimePickerApi} data={timePickerProps} />
      <PropsTable title={t.tableTimeRangePickerApi} data={timeRangePickerProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={timePickerCssVars}
      />
    </ComponentDoc>
  )
}
