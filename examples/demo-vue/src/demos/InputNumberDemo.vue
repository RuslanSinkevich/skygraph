<script setup lang="ts">
/**
 * `InputNumberDemo` — aggregator for the InputNumber component page.
 *
 * Mirrors `examples/demo/src/demos/InputNumberDemo.tsx` 1:1 (8 examples).
 * Vue-specific delta: `States` shows two disabled inputs; the React
 * "loading" pair is omitted because `SgInputNumber` has no `loading`
 * prop yet.
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
import { useInputNumberDocStrings } from './inputnumber-doc/useStrings'

import BasicInputNumber from './inputnumber/Basic.demo.vue'
import BasicSource from './inputnumber/Basic.demo.vue?raw'
import MinMaxStepInputNumber from './inputnumber/MinMaxStep.demo.vue'
import MinMaxStepSource from './inputnumber/MinMaxStep.demo.vue?raw'
import PrecisionInputNumber from './inputnumber/Precision.demo.vue'
import PrecisionSource from './inputnumber/Precision.demo.vue?raw'
import SizesInputNumber from './inputnumber/Sizes.demo.vue'
import SizesSource from './inputnumber/Sizes.demo.vue?raw'
import StatesInputNumber from './inputnumber/States.demo.vue'
import StatesSource from './inputnumber/States.demo.vue?raw'
import InFormInputNumber from './inputnumber/InForm.demo.vue'
import InFormSource from './inputnumber/InForm.demo.vue?raw'
import TokensOverrideInputNumber from './inputnumber/TokensOverride.demo.vue'
import TokensOverrideSource from './inputnumber/TokensOverride.demo.vue?raw'
import FloatingLabelInputNumber from './inputnumber/FloatingLabel.demo.vue'
import FloatingLabelSource from './inputnumber/FloatingLabel.demo.vue?raw'
import UnstyledInputNumber from './inputnumber/Unstyled.demo.vue'
import UnstyledSource from './inputnumber/Unstyled.demo.vue?raw'

const t = useInputNumberDocStrings()

const inputNumberProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'number | null' },
  { name: 'value', description: t.value.propValue, type: 'number | null' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'number' },
  { name: 'min', description: t.value.propMin, type: 'number' },
  { name: 'max', description: t.value.propMax, type: 'number' },
  { name: 'step', description: t.value.propStep, type: 'number', default: '1' },
  { name: 'precision', description: t.value.propPrecision, type: 'number' },
  { name: 'placeholder', description: t.value.propPlaceholder, type: 'string' },
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
    type: '(value: number | null) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: number | null) => void' },
  { name: '@blur', description: t.value.emitBlur, type: '() => void' },
])

const inputNumberCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-border',
    default: 'rgba(5, 5, 5, 0.06)',
    description: t.value.cssSgColorBorder,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  {
    name: 'sg-color-bg-container',
    default: '#ffffff',
    description: t.value.cssSgColorBgContainer,
  },
  {
    name: 'sg-color-bg-secondary',
    default: 'rgba(0, 0, 0, 0.02)',
    description: t.value.cssSgColorBgSecondary,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgHover,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssSgFontSizeLg },
  { name: 'sg-height-sm', default: '24px', description: t.value.cssSgHeightSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  { name: 'sg-height-lg', default: '40px', description: t.value.cssSgHeightLg },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
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
    :crumbs="[t.crumbCategory, t.crumbInputNumber]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicInputNumber />
    </DemoBox>

    <DemoBox
      :title="t.demoMinMaxStepTitle"
      :description="t.demoMinMaxStepDesc"
      :code="MinMaxStepSource"
    >
      <MinMaxStepInputNumber />
    </DemoBox>

    <DemoBox
      :title="t.demoPrecisionTitle"
      :description="t.demoPrecisionDesc"
      :code="PrecisionSource"
    >
      <PrecisionInputNumber />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesInputNumber />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource">
      <StatesInputNumber />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormInputNumber />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideInputNumber />
    </DemoBox>

    <DemoBox
      :title="t.demoFloatingLabelTitle"
      :description="t.demoFloatingLabelDesc"
      :code="FloatingLabelSource"
    >
      <FloatingLabelInputNumber />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledInputNumber />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableInputNumberApi" :data="inputNumberProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="inputNumberCssVars" />
    </template>
  </ComponentDoc>
</template>
