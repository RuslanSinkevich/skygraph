<script setup lang="ts">
/**
 * `TimePickerDemo` — aggregator for the TimePicker component page.
 *
 * 1:1 with `examples/demo/src/demos/TimePickerDemo.tsx` (9 examples):
 *   Basic, Format, Steps, DisabledSlots, Range, Sizes, States,
 *   TokensOverride, Unstyled.
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
import { useTimePickerDocStrings } from './timepicker-doc/useStrings'

import BasicTimePickerDemo from './timepicker/Basic.demo.vue'
import BasicSource from './timepicker/Basic.demo.vue?raw'
import FormatTimePickerDemo from './timepicker/Format.demo.vue'
import FormatSource from './timepicker/Format.demo.vue?raw'
import StepsTimePickerDemo from './timepicker/Steps.demo.vue'
import StepsSource from './timepicker/Steps.demo.vue?raw'
import DisabledSlotsTimePickerDemo from './timepicker/DisabledSlots.demo.vue'
import DisabledSlotsSource from './timepicker/DisabledSlots.demo.vue?raw'
import RangeTimePickerDemo from './timepicker/Range.demo.vue'
import RangeSource from './timepicker/Range.demo.vue?raw'
import SizesTimePickerDemo from './timepicker/Sizes.demo.vue'
import SizesSource from './timepicker/Sizes.demo.vue?raw'
import StatesTimePickerDemo from './timepicker/States.demo.vue'
import StatesSource from './timepicker/States.demo.vue?raw'
import TokensOverrideTimePickerDemo from './timepicker/TokensOverride.demo.vue'
import TokensOverrideSource from './timepicker/TokensOverride.demo.vue?raw'
import FloatingLabelTimePickerDemo from './timepicker/FloatingLabel.demo.vue'
import FloatingLabelSource from './timepicker/FloatingLabel.demo.vue?raw'
import UnstyledTimePickerDemo from './timepicker/Unstyled.demo.vue'
import UnstyledSource from './timepicker/Unstyled.demo.vue?raw'

const t = useTimePickerDocStrings()

const timePickerProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'string' },
  { name: 'value', description: t.value.propValue, type: 'string' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'string' },
  {
    name: 'placeholder',
    description: t.value.propPlaceholder,
    type: 'string',
    default: "'Select time'",
  },
  { name: 'format', description: t.value.propFormat, type: 'string' },
  { name: 'use12Hours', description: t.value.propUse12Hours, type: 'boolean', default: 'false' },
  { name: 'hourStep', description: t.value.propHourStep, type: 'number', default: '1' },
  { name: 'minuteStep', description: t.value.propMinuteStep, type: 'number', default: '1' },
  { name: 'secondStep', description: t.value.propSecondStep, type: 'number', default: '1' },
  { name: 'showSecond', description: t.value.propShowSecond, type: 'boolean', default: 'true' },
  { name: 'showNow', description: t.value.propShowNow, type: 'boolean', default: 'true' },
  { name: 'allowClear', description: t.value.propAllowClear, type: 'boolean', default: 'true' },
  { name: 'disabledHours', description: t.value.propDisabledHours, type: '() => number[]' },
  {
    name: 'disabledMinutes',
    description: t.value.propDisabledMinutes,
    type: '(hour: number) => number[]',
  },
  {
    name: 'disabledSeconds',
    description: t.value.propDisabledSeconds,
    type: '(hour, minute) => number[]',
  },
  { name: 'open', description: t.value.propOpen, type: 'boolean' },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'loading', description: t.value.propLoading, type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: string) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: string) => void' },
  { name: '@openChange', description: t.value.emitOpenChange, type: '(open: boolean) => void' },
])

const timeRangePickerProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propRangeValue, type: '[string, string]' },
  { name: 'value', description: t.value.propRangeValue, type: '[string, string]' },
  { name: 'defaultValue', description: t.value.propRangeDefaultValue, type: '[string, string]' },
  {
    name: 'placeholder',
    description: t.value.propRangePlaceholder,
    type: '[string, string]',
    default: "['Start', 'End']",
  },
  { name: 'format', description: t.value.propRangeFormat, type: 'string' },
  {
    name: 'use12Hours',
    description: t.value.propRangeUse12Hours,
    type: 'boolean',
    default: 'false',
  },
  { name: 'hourStep', description: t.value.propRangeHourStep, type: 'number', default: '1' },
  { name: 'minuteStep', description: t.value.propRangeMinuteStep, type: 'number', default: '1' },
  { name: 'secondStep', description: t.value.propRangeSecondStep, type: 'number', default: '1' },
  {
    name: 'showSecond',
    description: t.value.propRangeShowSecond,
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'allowClear',
    description: t.value.propRangeAllowClear,
    type: 'boolean',
    default: 'true',
  },
  { name: 'separator', description: t.value.propRangeSeparator, type: 'string', default: "'→'" },
  { name: 'open', description: t.value.propRangeOpen, type: 'boolean' },
  { name: 'disabled', description: t.value.propRangeDisabled, type: 'boolean', default: 'false' },
  { name: 'loading', description: t.value.propRangeLoading, type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: t.value.propRangeSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: t.value.propRangeUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitRangeUpdate,
    type: '(value: [string, string]) => void',
  },
  {
    name: '@change',
    description: t.value.emitRangeChange,
    type: '(value: [string, string]) => void',
  },
  {
    name: '@openChange',
    description: t.value.emitRangeOpenChange,
    type: '(open: boolean) => void',
  },
])

const timePickerCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: t.value.cssSgColorPrimaryHover,
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
    name: 'sg-color-bg-elevated',
    default: 'var(--sg-gray-1)',
    description: t.value.cssSgColorBgElevated,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgHover,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  {
    name: 'sg-color-text-quaternary',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextQuaternary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssSgBorderRadiusLg },
  { name: 'sg-height-sm', default: '24px', description: t.value.cssSgHeightSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  { name: 'sg-height-lg', default: '40px', description: t.value.cssSgHeightLg },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
  { name: 'sg-z-dropdown', default: '1050', description: t.value.cssSgZDropdown },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: t.value.cssSgShadowLg,
  },
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
    :crumbs="[t.crumbCategory, t.crumbTimePicker]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTimePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoFormatTitle" :description="t.demoFormatDesc" :code="FormatSource">
      <FormatTimePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoStepsTitle" :description="t.demoStepsDesc" :code="StepsSource">
      <StepsTimePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledSlotsTitle"
      :description="t.demoDisabledSlotsDesc"
      :code="DisabledSlotsSource"
    >
      <DisabledSlotsTimePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoRangeTitle" :description="t.demoRangeDesc" :code="RangeSource">
      <RangeTimePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesTimePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource">
      <StatesTimePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTimePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoFloatingLabelTitle"
      :description="t.demoFloatingLabelDesc"
      :code="FloatingLabelSource"
    >
      <FloatingLabelTimePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledTimePickerDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTimePickerApi" :data="timePickerProps" />
      <PropsTable :title="t.tableTimeRangePickerApi" :data="timeRangePickerProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="timePickerCssVars" />
    </template>
  </ComponentDoc>
</template>
