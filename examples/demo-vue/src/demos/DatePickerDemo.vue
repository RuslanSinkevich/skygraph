<script setup lang="ts">
/**
 * `DatePickerDemo` — aggregator for the DatePicker component page.
 *
 * Mirrors `examples/demo/src/demos/DatePickerDemo.tsx` (11 examples).
 * Vue surface (8 examples): Basic, Formats, PickerModes, WithTime,
 * DisabledDates, Sizes, TokensOverride, Unstyled.
 *
 * Dropped vs React (see `findings/T-Vue-Demo-Forms.md`
 * → `datepicker-vue-feature-gaps`):
 * - `Range` + `RangePresets` — no `SgRangePicker` in `@skygraph/vue`.
 * - `Presets` — no `presets` sidebar prop.
 * - `RussianLocale` — no locale support.
 * - `picker="week"` and `ShowTimeConfig` are also missing (folded into
 *   `PickerModes` / `WithTime` notes).
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
import DisabledDatesDatePickerDemo from './datepicker/DisabledDates.demo.vue'
import DisabledDatesSource from './datepicker/DisabledDates.demo.vue?raw'
import SizesDatePickerDemo from './datepicker/Sizes.demo.vue'
import SizesSource from './datepicker/Sizes.demo.vue?raw'
import TokensOverrideDatePickerDemo from './datepicker/TokensOverride.demo.vue'
import TokensOverrideSource from './datepicker/TokensOverride.demo.vue?raw'
import UnstyledDatePickerDemo from './datepicker/Unstyled.demo.vue'
import UnstyledSource from './datepicker/Unstyled.demo.vue?raw'

const t = useDatePickerDocStrings()

const datePickerProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'Date | null' },
  { name: 'value', description: t.value.propValue, type: 'Date | null' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'Date' },
  { name: 'placeholder', description: t.value.propPlaceholder, type: 'string', default: "'Select date'" },
  { name: 'format', description: t.value.propFormat, type: 'string' },
  { name: 'picker', description: t.value.propPicker, type: "'date' | 'month' | 'year'", default: "'date'" },
  { name: 'showTime', description: t.value.propShowTime, type: 'boolean', default: 'false' },
  { name: 'showToday', description: t.value.propShowToday, type: 'boolean', default: 'true' },
  { name: 'allowClear', description: t.value.propAllowClear, type: 'boolean', default: 'true' },
  { name: 'disabledDate', description: t.value.propDisabledDate, type: '(date: Date) => boolean' },
  { name: 'open', description: t.value.propOpen, type: 'boolean' },
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

const datePickerCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: t.value.cssSgColorPrimaryBg },
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
      :title="t.demoDisabledDatesTitle"
      :description="t.demoDisabledDatesDesc"
      :code="DisabledDatesSource"
    >
      <DisabledDatesDatePickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideDatePickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
    >
      <UnstyledDatePickerDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDatePickerApi" :data="datePickerProps" />
      <CssVarsTable
        :title="t.tableCssVars"
        :hint="t.cssHint"
        :data="datePickerCssVars"
      />
    </template>
  </ComponentDoc>
</template>
