<script setup lang="ts">
/**
 * `SwitchDemo` — aggregator for the Switch component page.
 *
 * Mirrors `examples/demo/src/demos/SwitchDemo.tsx` (8 examples).
 * Vue delta: `States` shows only the disabled row — `SgSwitch` has no
 * `loading` prop yet. `AsyncToggle` falls back to `disabled` + side
 * label.
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
import { useSwitchDocStrings } from './switch-doc/useStrings'

import BasicSwitchDemo from './switch/Basic.demo.vue'
import BasicSource from './switch/Basic.demo.vue?raw'
import TextIconSwitchDemo from './switch/TextIcon.demo.vue'
import TextIconSource from './switch/TextIcon.demo.vue?raw'
import SizesSwitchDemo from './switch/Sizes.demo.vue'
import SizesSource from './switch/Sizes.demo.vue?raw'
import StatesSwitchDemo from './switch/States.demo.vue'
import StatesSource from './switch/States.demo.vue?raw'
import AsyncToggleSwitchDemo from './switch/AsyncToggle.demo.vue'
import AsyncToggleSource from './switch/AsyncToggle.demo.vue?raw'
import InFormSwitchDemo from './switch/InForm.demo.vue'
import InFormSource from './switch/InForm.demo.vue?raw'
import TokensOverrideSwitchDemo from './switch/TokensOverride.demo.vue'
import TokensOverrideSource from './switch/TokensOverride.demo.vue?raw'
import UnstyledSwitchDemo from './switch/Unstyled.demo.vue'
import UnstyledSource from './switch/Unstyled.demo.vue?raw'

const t = useSwitchDocStrings()

const switchProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'boolean' },
  { name: 'checked', description: t.value.propChecked, type: 'boolean' },
  {
    name: 'defaultChecked',
    description: t.value.propDefaultChecked,
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
    type: '(checked: boolean) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(checked: boolean) => void' },
  { name: '#checkedChildren', description: t.value.slotCheckedChildren, type: 'slot' },
  { name: '#unCheckedChildren', description: t.value.slotUnCheckedChildren, type: 'slot' },
])

const switchCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: t.value.cssSgColorPrimary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssSgColorWhite },
  {
    name: 'sg-shadow-sm',
    default: '0 1px 2px rgba(0, 0, 0, 0.05)',
    description: t.value.cssSgShadowSm,
  },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
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
    :crumbs="[t.crumbCategory, t.crumbSwitch]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicSwitchDemo />
    </DemoBox>

    <DemoBox :title="t.demoTextIconTitle" :description="t.demoTextIconDesc" :code="TextIconSource">
      <TextIconSwitchDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesSwitchDemo />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource">
      <StatesSwitchDemo />
    </DemoBox>

    <DemoBox :title="t.demoAsyncTitle" :description="t.demoAsyncDesc" :code="AsyncToggleSource">
      <AsyncToggleSwitchDemo />
    </DemoBox>

    <DemoBox :title="t.demoInFormTitle" :description="t.demoInFormDesc" :code="InFormSource">
      <InFormSwitchDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideSwitchDemo />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledSwitchDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableSwitchApi" :data="switchProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="switchCssVars" />
    </template>
  </ComponentDoc>
</template>
