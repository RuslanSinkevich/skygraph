<script setup lang="ts">
/**
 * `RadioDemo` — aggregator for the Radio component page.
 *
 * Mirrors `examples/demo/src/demos/RadioDemo.tsx` (6 examples).
 * Vue delta: `DisabledStates` drops the `loading` row — `SgRadio` has
 * no `loading` prop yet (see `findings/T-Vue-Demo-Forms.md` →
 * `radio-loading-not-in-vue`).
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
import { useRadioDocStrings } from './radio-doc/useStrings'

import BasicRadio from './radio/Basic.demo.vue'
import BasicSource from './radio/Basic.demo.vue?raw'
import VerticalRadio from './radio/Vertical.demo.vue'
import VerticalSource from './radio/Vertical.demo.vue?raw'
import DisabledStatesRadio from './radio/DisabledStates.demo.vue'
import DisabledStatesSource from './radio/DisabledStates.demo.vue?raw'
import InFormRadio from './radio/InForm.demo.vue'
import InFormSource from './radio/InForm.demo.vue?raw'
import TokensOverrideRadio from './radio/TokensOverride.demo.vue'
import TokensOverrideSource from './radio/TokensOverride.demo.vue?raw'
import UnstyledRadio from './radio/Unstyled.demo.vue'
import UnstyledSource from './radio/Unstyled.demo.vue?raw'

const t = useRadioDocStrings()

const radioGroupProps = computed<PropDef[]>(() => [
  {
    name: 'modelValue',
    description: t.value.propModelValue,
    type: 'string | number',
  },
  { name: 'value', description: t.value.propValue, type: 'string | number' },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: 'string | number',
  },
  { name: 'options', description: t.value.propOptions, type: 'RadioOption[]' },
  {
    name: 'direction',
    description: t.value.propDirection,
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.propUpdateModelValue,
    type: '(value: string | number) => void',
  },
  {
    name: '@change',
    description: t.value.propChange,
    type: '(value: string | number) => void',
  },
])

const radioOptionProps = computed<PropDef[]>(() => [
  { name: 'value', description: t.value.propOptionValue, type: 'string | number' },
  { name: 'label', description: t.value.propOptionLabel, type: 'string' },
  {
    name: 'disabled',
    description: t.value.propOptionDisabled,
    type: 'boolean',
    default: 'false',
  },
])

const radioCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: t.value.cssSgColorPrimary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-padding-md', default: '16px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbRadio]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicRadio />
    </DemoBox>

    <DemoBox :title="t.demoVerticalTitle" :description="t.demoVerticalDesc" :code="VerticalSource">
      <VerticalRadio />
    </DemoBox>

    <DemoBox
      :title="t.demoStatesTitle"
      :description="t.demoStatesDesc"
      :code="DisabledStatesSource"
    >
      <DisabledStatesRadio />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormRadio />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideRadio />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledRadio />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableRadioGroupApi" :data="radioGroupProps" />
      <PropsTable :title="t.tableRadioOptionApi" :data="radioOptionProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="radioCssVars" />
    </template>
  </ComponentDoc>
</template>
