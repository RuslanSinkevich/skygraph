<script setup lang="ts">
/**
 * `SliderDemo` — aggregator for the Slider component page.
 *
 * Mirrors `examples/demo/src/demos/SliderDemo.tsx` (7 examples). Vue
 * has full parity here — no missing props.
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
import { useSliderDocStrings } from './slider-doc/useStrings'

import BasicSliderDemo from './slider/Basic.demo.vue'
import BasicSource from './slider/Basic.demo.vue?raw'
import MinMaxStepSliderDemo from './slider/MinMaxStep.demo.vue'
import MinMaxStepSource from './slider/MinMaxStep.demo.vue?raw'
import WithValueSliderDemo from './slider/WithValue.demo.vue'
import WithValueSource from './slider/WithValue.demo.vue?raw'
import DisabledSliderDemo from './slider/Disabled.demo.vue'
import DisabledSource from './slider/Disabled.demo.vue?raw'
import InFormSliderDemo from './slider/InForm.demo.vue'
import InFormSource from './slider/InForm.demo.vue?raw'
import TokensOverrideSliderDemo from './slider/TokensOverride.demo.vue'
import TokensOverrideSource from './slider/TokensOverride.demo.vue?raw'

const t = useSliderDocStrings()

const sliderProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'number' },
  { name: 'value', description: t.value.propValue, type: 'number' },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: 'number',
    default: '0',
  },
  { name: 'min', description: t.value.propMin, type: 'number', default: '0' },
  { name: 'max', description: t.value.propMax, type: 'number', default: '100' },
  { name: 'step', description: t.value.propStep, type: 'number', default: '1' },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: number) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: number) => void' },
])

const sliderCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-slider-min-inline-size',
    default: 'calc(8 * var(--sg-font-size))',
    description: t.value.cssSgSliderMinInlineSize,
  },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: t.value.cssSgColorPrimary,
  },
  {
    name: 'sg-color-primary-bg',
    default: 'rgba(22, 119, 255, 0.1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-border',
    default: 'rgba(5, 5, 5, 0.06)',
    description: t.value.cssSgColorBorder,
  },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssSgColorWhite },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssSgPaddingSm },
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
    :crumbs="[t.crumbCategory, t.crumbSlider]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicSliderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoMinMaxStepTitle"
      :description="t.demoMinMaxStepDesc"
      :code="MinMaxStepSource"
    >
      <MinMaxStepSliderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoWithValueTitle"
      :description="t.demoWithValueDesc"
      :code="WithValueSource"
    >
      <WithValueSliderDemo />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledSliderDemo />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormSliderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideSliderDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableSliderApi" :data="sliderProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="sliderCssVars" />
    </template>
  </ComponentDoc>
</template>
