<script setup lang="ts">
/**
 * `SelectDemo` — aggregator for the Select component page.
 * Mirrors `examples/demo/src/demos/SelectDemo.tsx` 1:1 (8/8).
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
import { useSelectDocStrings } from './select-doc/useStrings'

import BasicSelect from './select/Basic.demo.vue'
import BasicSource from './select/Basic.demo.vue?raw'
import UncontrolledSelect from './select/Uncontrolled.demo.vue'
import UncontrolledSource from './select/Uncontrolled.demo.vue?raw'
import SizesSelect from './select/Sizes.demo.vue'
import SizesSource from './select/Sizes.demo.vue?raw'
import DisabledSelect from './select/Disabled.demo.vue'
import DisabledSource from './select/Disabled.demo.vue?raw'
import LoadingSelect from './select/Loading.demo.vue'
import LoadingSource from './select/Loading.demo.vue?raw'
import NumericValuesSelect from './select/NumericValues.demo.vue'
import NumericValuesSource from './select/NumericValues.demo.vue?raw'
import TokensOverrideSelect from './select/TokensOverride.demo.vue'
import TokensOverrideSource from './select/TokensOverride.demo.vue?raw'
import UnstyledSelect from './select/Unstyled.demo.vue'
import UnstyledSource from './select/Unstyled.demo.vue?raw'

const t = useSelectDocStrings()

const selectProps = computed<PropDef[]>(() => [
  {
    name: 'modelValue',
    description: t.value.propModelValue,
    type: 'string | number | (string | number)[]',
  },
  {
    name: 'value',
    description: t.value.propValue,
    type: 'string | number | (string | number)[]',
  },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: 'string | number | (string | number)[]',
  },
  { name: 'options', description: t.value.propOptions, type: 'SelectOption[]' },
  {
    name: 'placeholder',
    description: t.value.propPlaceholder,
    type: 'string',
    default: "'Select...'",
  },
  { name: 'multiple', description: t.value.propMultiple, type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'loading', description: t.value.propLoading, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: string | number | (string | number)[]) => void',
  },
  {
    name: '@change',
    description: t.value.emitChange,
    type: '(value: string | number | (string | number)[]) => void',
  },
  { name: '@blur', description: t.value.emitBlur, type: '() => void' },
])

const optionProps = computed<PropDef[]>(() => [
  { name: 'label', description: t.value.propOptionLabel, type: 'string' },
  { name: 'value', description: t.value.propOptionValue, type: 'string | number' },
  {
    name: 'disabled',
    description: t.value.propOptionDisabled,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: t.value.propOptionLoading,
    type: 'boolean',
    default: 'false',
  },
])

const selectCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-input-height',
    default: 'var(--sg-height-md)',
    description: t.value.cssSgInputHeight,
  },
  {
    name: 'sg-input-padding',
    default: 'var(--sg-padding-xs) var(--sg-padding-md)',
    description: t.value.cssSgInputPadding,
  },
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: t.value.cssSgInputBg,
  },
  {
    name: 'sg-input-border',
    default: 'var(--sg-color-border)',
    description: t.value.cssSgInputBorder,
  },
  {
    name: 'sg-input-radius',
    default: 'var(--sg-border-radius)',
    description: t.value.cssSgInputRadius,
  },
  { name: 'sg-input-color', default: 'var(--sg-color-text)', description: t.value.cssSgInputColor },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-bg-elevated',
    default: 'var(--sg-gray-1)',
    description: t.value.cssSgColorBgElevated,
  },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: t.value.cssSgShadowLg,
  },
  {
    name: 'sg-color-text-placeholder',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextPlaceholder,
  },
  {
    name: 'sg-spin-color',
    default: 'var(--sg-color-text-tertiary)',
    description: t.value.cssSgSpinColor,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbSelect]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicSelect />
    </DemoBox>

    <DemoBox
      :title="t.demoUncontrolledTitle"
      :description="t.demoUncontrolledDesc"
      :code="UncontrolledSource"
    >
      <UncontrolledSelect />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesSelect />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledSelect />
    </DemoBox>

    <DemoBox :title="t.demoLoadingTitle" :description="t.demoLoadingDesc" :code="LoadingSource">
      <LoadingSelect />
    </DemoBox>

    <DemoBox
      :title="t.demoNumericTitle"
      :description="t.demoNumericDesc"
      :code="NumericValuesSource"
    >
      <NumericValuesSelect />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideSelect />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledSelect />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableSelectApi" :data="selectProps" />
      <PropsTable :title="t.tableOptionApi" :data="optionProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="selectCssVars" />
    </template>
  </ComponentDoc>
</template>
