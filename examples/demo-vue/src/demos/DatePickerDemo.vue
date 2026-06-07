<script setup lang="ts">
/**
 * `DatePickerDemo` — aggregator for the DatePicker component page.
 *
 * Mirrors `examples/demo/src/demos/DatePickerDemo.tsx` (11 examples).
 * Vue surface (11 examples): Basic, Formats, PickerModes, WithTime,
 * RussianLocale, DisabledDates, Presets, Sizes, Range, RangePresets,
 * TokensOverride — 1:1 with React.
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
import { useDatePickerDocStrings } from './datepicker-doc/useStrings'

import BasicDatePickerDemo from './datepicker/Basic.demo.vue'
import BasicSource from './datepicker/Basic.demo.vue?raw'
import FormatsDatePickerDemo from './datepicker/Formats.demo.vue'
import FormatsSource from './datepicker/Formats.demo.vue?raw'
import PickerModesDatePickerDemo from './datepicker/PickerModes.demo.vue'
import PickerModesSource from './datepicker/PickerModes.demo.vue?raw'
import WithTimeDatePickerDemo from './datepicker/WithTime.demo.vue'
import WithTimeSource from './datepicker/WithTime.demo.vue?raw'
import RussianLocaleDatePickerDemo from './datepicker/RussianLocale.demo.vue'
import RussianLocaleSource from './datepicker/RussianLocale.demo.vue?raw'
import DisabledDatesDatePickerDemo from './datepicker/DisabledDates.demo.vue'
import DisabledDatesSource from './datepicker/DisabledDates.demo.vue?raw'
import PresetsDatePickerDemo from './datepicker/Presets.demo.vue'
import PresetsSource from './datepicker/Presets.demo.vue?raw'
import SizesDatePickerDemo from './datepicker/Sizes.demo.vue'
import SizesSource from './datepicker/Sizes.demo.vue?raw'
import RangeDatePickerDemo from './datepicker/Range.demo.vue'
import RangeSource from './datepicker/Range.demo.vue?raw'
import RangePresetsDatePickerDemo from './datepicker/RangePresets.demo.vue'
import RangePresetsSource from './datepicker/RangePresets.demo.vue?raw'
import TokensOverrideDatePickerDemo from './datepicker/TokensOverride.demo.vue'
import TokensOverrideSource from './datepicker/TokensOverride.demo.vue?raw'
import FloatingLabelDatePickerDemo from './datepicker/FloatingLabel.demo.vue'
import FloatingLabelSource from './datepicker/FloatingLabel.demo.vue?raw'

const t = useDatePickerDocStrings()

const datePickerProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'Date | null' },
  { name: 'value', description: t.value.propValue, type: 'Date | null' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'Date' },
  {
    name: 'placeholder',
    description: t.value.propPlaceholder,
    type: 'string',
    default: "'Select date'",
  },
  { name: 'format', description: t.value.propFormat, type: 'string' },
  {
    name: 'picker',
    description: t.value.propPicker,
    type: "'date' | 'month' | 'year'",
    default: "'date'",
  },
  {
    name: 'showTime',
    description: t.value.propShowTime,
    type: 'boolean | ShowTimeConfig',
    default: 'false',
  },
  { name: 'showToday', description: t.value.propShowToday, type: 'boolean', default: 'true' },
  { name: 'showNow', description: t.value.propShowNow, type: 'boolean', default: 'false' },
  { name: 'allowClear', description: t.value.propAllowClear, type: 'boolean', default: 'true' },
  { name: 'disabledDate', description: t.value.propDisabledDate, type: '(date: Date) => boolean' },
  { name: 'presets', description: t.value.propPresets, type: 'DatePreset[]' },
  {
    name: 'placement',
    description: t.value.propPlacement,
    type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'",
    default: "'bottomLeft'",
  },
  { name: 'open', description: t.value.propOpen, type: 'boolean' },
  {
    name: 'inputReadOnly',
    description: t.value.propInputReadOnly,
    type: 'boolean',
    default: 'false',
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
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
    type: '(date: Date | null) => void',
  },
  {
    name: '@change',
    description: t.value.emitChange,
    type: '(date: Date | null, dateString: string) => void',
  },
  { name: '@openChange', description: t.value.emitOpenChange, type: '(open: boolean) => void' },
])

const rangePickerProps = computed<PropDef[]>(() => [
  {
    name: 'modelValue',
    description: t.value.propRangeValue,
    type: '[Date | null, Date | null]',
  },
  {
    name: 'value',
    description: t.value.propRangeValue,
    type: '[Date | null, Date | null]',
  },
  { name: 'defaultValue', description: t.value.propRangeDefaultValue, type: '[Date, Date]' },
  { name: 'placeholder', description: t.value.propRangePlaceholder, type: '[string, string]' },
  { name: 'format', description: t.value.propRangeFormat, type: 'string' },
  {
    name: 'showTime',
    description: t.value.propRangeShowTime,
    type: 'boolean | ShowTimeConfig',
    default: 'false',
  },
  {
    name: 'allowClear',
    description: t.value.propRangeAllowClear,
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'disabledDate',
    description: t.value.propRangeDisabledDate,
    type: '(date: Date) => boolean',
  },
  { name: 'presets', description: t.value.propRangePresets, type: 'DatePreset[]' },
  { name: 'separator', description: t.value.propRangeSeparator, type: 'string', default: "'→'" },
  {
    name: 'placement',
    description: t.value.propRangePlacement,
    type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'",
    default: "'bottomLeft'",
  },
  {
    name: '@update:modelValue',
    description: t.value.emitRangeUpdateModelValue,
    type: '(dates: [Date | null, Date | null]) => void',
  },
  {
    name: '@change',
    description: t.value.emitRangeChange,
    type: '(dates, [startStr, endStr]) => void',
  },
])

const showTimeProps = computed<PropDef[]>(() => [
  { name: 'format', description: t.value.propTimeFormat, type: 'string' },
  { name: 'hourStep', description: t.value.propTimeHourStep, type: 'number', default: '1' },
  { name: 'minuteStep', description: t.value.propTimeMinuteStep, type: 'number', default: '1' },
  { name: 'secondStep', description: t.value.propTimeSecondStep, type: 'number', default: '1' },
  { name: 'defaultValue', description: t.value.propTimeDefaultValue, type: 'Date' },
])

const datePickerCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: t.value.cssSgColorPrimaryHover,
  },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
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
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssSgBorderRadiusLg },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: t.value.cssSgShadowLg,
  },
  { name: 'sg-z-dropdown', default: '1050', description: t.value.cssSgZDropdown },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbDatePicker]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicDatePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoFormatsTitle" :description="t.demoFormatsDesc" :code="FormatsSource">
      <FormatsDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoPickerModesTitle"
      :description="t.demoPickerModesDesc"
      :code="PickerModesSource"
    >
      <PickerModesDatePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoWithTimeTitle" :description="t.demoWithTimeDesc" :code="WithTimeSource">
      <WithTimeDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoRussianLocaleTitle"
      :description="t.demoRussianLocaleDesc"
      :code="RussianLocaleSource"
    >
      <RussianLocaleDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledDatesTitle"
      :description="t.demoDisabledDatesDesc"
      :code="DisabledDatesSource"
    >
      <DisabledDatesDatePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoPresetsTitle" :description="t.demoPresetsDesc" :code="PresetsSource">
      <PresetsDatePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesDatePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoRangeTitle" :description="t.demoRangeDesc" :code="RangeSource">
      <RangeDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoRangePresetsTitle"
      :description="t.demoRangePresetsDesc"
      :code="RangePresetsSource"
    >
      <RangePresetsDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoFloatingLabelTitle"
      :description="t.demoFloatingLabelDesc"
      :code="FloatingLabelSource"
    >
      <FloatingLabelDatePickerDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDatePickerApi" :data="datePickerProps" />
      <PropsTable :title="t.tableRangePickerApi" :data="rangePickerProps" />
      <PropsTable :title="t.tableShowTimeConfig" :data="showTimeProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="datePickerCssVars" />
    </template>
  </ComponentDoc>
</template>
