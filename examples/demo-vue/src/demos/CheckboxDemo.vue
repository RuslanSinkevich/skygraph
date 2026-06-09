<script setup lang="ts">
/**
 * `CheckboxDemo` — aggregator for the Checkbox component page.
 *
 * Mirrors `examples/demo/src/demos/CheckboxDemo.tsx` (7 examples).
 * Vue delta: `States` shows 5 visual rows (no `loading` prop yet on
 * `SgCheckbox`).
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
import { useCheckboxDocStrings } from './checkbox-doc/useStrings'

import BasicCheckbox from './checkbox/Basic.demo.vue'
import BasicSource from './checkbox/Basic.demo.vue?raw'
import StatesCheckbox from './checkbox/States.demo.vue'
import StatesSource from './checkbox/States.demo.vue?raw'
import CheckAllCheckbox from './checkbox/CheckAll.demo.vue'
import CheckAllSource from './checkbox/CheckAll.demo.vue?raw'
import RichLabelCheckbox from './checkbox/RichLabel.demo.vue'
import RichLabelSource from './checkbox/RichLabel.demo.vue?raw'
import InFormCheckbox from './checkbox/InForm.demo.vue'
import InFormSource from './checkbox/InForm.demo.vue?raw'
import TokensOverrideCheckbox from './checkbox/TokensOverride.demo.vue'
import TokensOverrideSource from './checkbox/TokensOverride.demo.vue?raw'

const t = useCheckboxDocStrings()

const checkboxProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'boolean' },
  { name: 'checked', description: t.value.propChecked, type: 'boolean' },
  {
    name: 'defaultChecked',
    description: t.value.propDefaultChecked,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'indeterminate',
    description: t.value.propIndeterminate,
    type: 'boolean',
    default: 'false',
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(checked: boolean) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(checked: boolean) => void' },
])

const checkboxCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
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
  { name: 'sg-line-height', default: '1.5714', description: t.value.cssSgLineHeight },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssSgPaddingSm },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbCheckbox]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicCheckbox />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource">
      <StatesCheckbox />
    </DemoBox>

    <DemoBox :title="t.demoCheckAllTitle" :description="t.demoCheckAllDesc" :code="CheckAllSource">
      <CheckAllCheckbox />
    </DemoBox>

    <DemoBox
      :title="t.demoRichLabelTitle"
      :description="t.demoRichLabelDesc"
      :code="RichLabelSource"
    >
      <RichLabelCheckbox />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormCheckbox />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideCheckbox />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCheckboxApi" :data="checkboxProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="checkboxCssVars" />
    </template>
  </ComponentDoc>
</template>
