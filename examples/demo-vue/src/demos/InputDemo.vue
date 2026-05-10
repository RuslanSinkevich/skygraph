<script setup lang="ts">
/**
 * `InputDemo` — aggregator for the Input + Textarea component page.
 *
 * Mirrors `examples/demo/src/demos/InputDemo.tsx` 1:1 (11 examples).
 * Vue-specific deltas (see `decisions/T-Vue-Demo-Forms.md`):
 *   - `propsData` describes Vue v-model contract (`modelValue` /
 *     `update:modelValue` instead of `value` / `onChange`).
 *   - Textarea has no `loading` prop in `@skygraph/vue` — the
 *     `TextareaStates` example shows two disabled variants instead.
 *     See `findings/T-Vue-Demo-Forms.md` → `textarea-loading-not-in-vue`.
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
import { useInputDocStrings } from './input-doc/useStrings'

import BasicInput from './input/Basic.demo.vue'
import BasicSource from './input/Basic.demo.vue?raw'
import SizesInput from './input/Sizes.demo.vue'
import SizesSource from './input/Sizes.demo.vue?raw'
import TypesInput from './input/Types.demo.vue'
import TypesSource from './input/Types.demo.vue?raw'
import StatesInput from './input/States.demo.vue'
import StatesSource from './input/States.demo.vue?raw'
import ValidationInput from './input/Validation.demo.vue'
import ValidationSource from './input/Validation.demo.vue?raw'
import ComponentTokensInput from './input/ComponentTokens.demo.vue'
import ComponentTokensSource from './input/ComponentTokens.demo.vue?raw'
import TextareaBasic from './input/TextareaBasic.demo.vue'
import TextareaBasicSource from './input/TextareaBasic.demo.vue?raw'
import TextareaCount from './input/TextareaCount.demo.vue'
import TextareaCountSource from './input/TextareaCount.demo.vue?raw'
import TextareaStates from './input/TextareaStates.demo.vue'
import TextareaStatesSource from './input/TextareaStates.demo.vue?raw'
import InFormInput from './input/InForm.demo.vue'
import InFormSource from './input/InForm.demo.vue?raw'
import UnstyledInput from './input/Unstyled.demo.vue'
import UnstyledSource from './input/Unstyled.demo.vue?raw'

const t = useInputDocStrings()

const inputProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'string', default: "''" },
  { name: 'value', description: t.value.propValue, type: 'string' },
  { name: 'placeholder', description: t.value.propPlaceholder, type: 'string' },
  {
    name: 'type',
    description: t.value.propType,
    type: "'text' | 'email' | 'password' | 'number'",
    default: "'text'",
  },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'readOnly', description: t.value.propReadOnly, type: 'boolean', default: 'false' },
  { name: 'allowClear', description: t.value.propAllowClear, type: 'boolean', default: 'false' },
  { name: 'status', description: t.value.propStatus, type: "'error' | 'warning'" },
  { name: 'loading', description: t.value.propLoading, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: string) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: string) => void' },
  { name: '@focus', description: t.value.emitFocus, type: '(evt: FocusEvent) => void' },
  { name: '@blur', description: t.value.emitBlur, type: '(evt: FocusEvent) => void' },
  { name: '@clear', description: t.value.emitClear, type: '() => void' },
])

const textareaProps = computed<PropDef[]>(() => [
  {
    name: 'modelValue',
    description: t.value.propTextareaModelValue,
    type: 'string',
    default: "''",
  },
  { name: 'value', description: t.value.propTextareaValue, type: 'string' },
  { name: 'defaultValue', description: t.value.propTextareaDefaultValue, type: 'string' },
  { name: 'rows', description: t.value.propTextareaRows, type: 'number', default: '4' },
  { name: 'maxLength', description: t.value.propTextareaMaxLength, type: 'number' },
  {
    name: 'showCount',
    description: t.value.propTextareaShowCount,
    type: 'boolean',
    default: 'false',
  },
  { name: 'placeholder', description: t.value.propTextareaPlaceholder, type: 'string' },
  {
    name: 'size',
    description: t.value.propTextareaSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: t.value.propTextareaDisabled,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: t.value.propTextareaUnstyled,
    type: 'boolean',
    default: 'false',
  },
])

const inputCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-input-height', default: 'var(--sg-height-md)', description: t.value.cssSgInputHeight },
  {
    name: 'sg-input-padding',
    default: 'var(--sg-padding-xs) var(--sg-padding-md)',
    description: t.value.cssSgInputPadding,
  },
  {
    name: 'sg-input-font-size',
    default: 'var(--sg-font-size)',
    description: t.value.cssSgInputFontSize,
  },
  { name: 'sg-input-color', default: 'var(--sg-color-text)', description: t.value.cssSgInputColor },
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
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: t.value.cssSgColorPrimaryHover,
  },
  {
    name: 'sg-color-primary-bg',
    default: 'rgba(22, 119, 255, 0.1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-bg-disabled',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgDisabled,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  {
    name: 'sg-color-text-placeholder',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextPlaceholder,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssSgMarginXs },
  {
    name: 'sg-transition-duration',
    default: '180ms',
    description: t.value.cssSgTransitionDuration,
  },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(.4,0,.2,1)',
    description: t.value.cssSgTransitionTiming,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbInput]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicInput />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesInput />
    </DemoBox>

    <DemoBox :title="t.demoTypesTitle" :description="t.demoTypesDesc" :code="TypesSource">
      <TypesInput />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource">
      <StatesInput />
    </DemoBox>

    <DemoBox
      :title="t.demoValidationTitle"
      :description="t.demoValidationDesc"
      :code="ValidationSource"
    >
      <ValidationInput />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="ComponentTokensSource"
    >
      <ComponentTokensInput />
    </DemoBox>

    <DemoBox
      :title="t.demoTextareaBasicTitle"
      :description="t.demoTextareaBasicDesc"
      :code="TextareaBasicSource"
      vertical
    >
      <TextareaBasic />
    </DemoBox>

    <DemoBox
      :title="t.demoTextareaCountTitle"
      :description="t.demoTextareaCountDesc"
      :code="TextareaCountSource"
      vertical
    >
      <TextareaCount />
    </DemoBox>

    <DemoBox
      :title="t.demoTextareaStatesTitle"
      :description="t.demoTextareaStatesDesc"
      :code="TextareaStatesSource"
      vertical
    >
      <TextareaStates />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormInput />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledInput />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableInputApi" :data="inputProps" />
      <PropsTable :title="t.tableTextareaApi" :data="textareaProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="inputCssVars" />
    </template>
  </ComponentDoc>
</template>
