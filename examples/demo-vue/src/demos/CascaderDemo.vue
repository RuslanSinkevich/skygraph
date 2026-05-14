<script setup lang="ts">
/**
 * `CascaderDemo` — aggregator for the Cascader component page.
 * 1:1 with `examples/demo/src/demos/CascaderDemo.tsx` (12 examples).
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
import { useCascaderDocStrings } from './cascader-doc/useStrings'

import BasicCascaderDemo from './cascader/Basic.demo.vue'
import BasicSource from './cascader/Basic.demo.vue?raw'
import DefaultValueCascaderDemo from './cascader/DefaultValue.demo.vue'
import DefaultValueSource from './cascader/DefaultValue.demo.vue?raw'
import HoverTriggerCascaderDemo from './cascader/HoverTrigger.demo.vue'
import HoverTriggerSource from './cascader/HoverTrigger.demo.vue?raw'
import ChangeOnSelectCascaderDemo from './cascader/ChangeOnSelect.demo.vue'
import ChangeOnSelectSource from './cascader/ChangeOnSelect.demo.vue?raw'
import SearchCascaderDemo from './cascader/Search.demo.vue'
import SearchSource from './cascader/Search.demo.vue?raw'
import MultipleCascaderDemo from './cascader/Multiple.demo.vue'
import MultipleSource from './cascader/Multiple.demo.vue?raw'
import SizesCascaderDemo from './cascader/Sizes.demo.vue'
import SizesSource from './cascader/Sizes.demo.vue?raw'
import DisabledCascaderDemo from './cascader/Disabled.demo.vue'
import DisabledSource from './cascader/Disabled.demo.vue?raw'
import CustomRenderCascaderDemo from './cascader/CustomRender.demo.vue'
import CustomRenderSource from './cascader/CustomRender.demo.vue?raw'
import AsyncLoadCascaderDemo from './cascader/AsyncLoad.demo.vue'
import AsyncLoadSource from './cascader/AsyncLoad.demo.vue?raw'
import TokensOverrideCascaderDemo from './cascader/TokensOverride.demo.vue'
import TokensOverrideSource from './cascader/TokensOverride.demo.vue?raw'
import UnstyledCascaderDemo from './cascader/Unstyled.demo.vue'
import UnstyledSource from './cascader/Unstyled.demo.vue?raw'

const t = useCascaderDocStrings()

const cascaderProps = computed<PropDef[]>(() => [
  { name: 'options', description: t.value.propOptions, type: 'CascaderOption[]' },
  {
    name: 'modelValue',
    description: t.value.propModelValue,
    type: '(string | number)[]',
  },
  { name: 'value', description: t.value.propValue, type: '(string | number)[]' },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: '(string | number)[]',
  },
  { name: 'placeholder', description: t.value.propPlaceholder, type: 'string' },
  { name: 'allowClear', description: t.value.propAllowClear, type: 'boolean', default: 'true' },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'showSearch',
    description: t.value.propShowSearch,
    type: 'boolean | { filter? }',
    default: 'false',
  },
  {
    name: 'expandTrigger',
    description: t.value.propExpandTrigger,
    type: "'click' | 'hover'",
    default: "'click'",
  },
  {
    name: 'changeOnSelect',
    description: t.value.propChangeOnSelect,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'displayRender',
    description: t.value.propDisplayRender,
    type: '(labels, selectedOptions) => string',
  },
  { name: 'multiple', description: t.value.propMultiple, type: 'boolean', default: 'false' },
  { name: 'maxTagCount', description: t.value.propMaxTagCount, type: 'number' },
  {
    name: 'loadData',
    description: t.value.propLoadData,
    type: '(selectedOptions: CascaderOption[]) => void',
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: (string | number)[]) => void',
  },
  {
    name: '@change',
    description: t.value.emitChange,
    type: '(value, selectedOptions) => void',
  },
])

const optionProps = computed<PropDef[]>(() => [
  { name: 'value', description: t.value.optionValue, type: 'string | number' },
  { name: 'label', description: t.value.optionLabel, type: 'string' },
  { name: 'children', description: t.value.optionChildren, type: 'CascaderOption[]' },
  { name: 'disabled', description: t.value.optionDisabled, type: 'boolean' },
  { name: 'isLeaf', description: t.value.optionIsLeaf, type: 'boolean' },
])

const cascaderCssVars = computed<CssVarDef[]>(() => [
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
    default: '#ffffff',
    description: t.value.cssSgColorBgContainer,
  },
  {
    name: 'sg-color-bg-elevated',
    default: '#ffffff',
    description: t.value.cssSgColorBgElevated,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'var(--sg-gray-3)',
    description: t.value.cssSgColorBgHover,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-placeholder',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextPlaceholder,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.08)',
    description: t.value.cssSgShadowLg,
  },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssSgFontSizeLg },
  { name: 'sg-height-sm', default: '24px', description: t.value.cssSgHeightSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  { name: 'sg-height-lg', default: '40px', description: t.value.cssSgHeightLg },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-md', default: '16px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-lg', default: '24px', description: t.value.cssSgPaddingLg },
  {
    name: 'sg-transition-duration',
    default: '0.2s',
    description: t.value.cssSgTransitionDuration,
  },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    description: t.value.cssSgTransitionTiming,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbCascader]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicCascaderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoDefaultValueTitle"
      :description="t.demoDefaultValueDesc"
      :code="DefaultValueSource"
    >
      <DefaultValueCascaderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoHoverTriggerTitle"
      :description="t.demoHoverTriggerDesc"
      :code="HoverTriggerSource"
    >
      <HoverTriggerCascaderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoChangeOnSelectTitle"
      :description="t.demoChangeOnSelectDesc"
      :code="ChangeOnSelectSource"
    >
      <ChangeOnSelectCascaderDemo />
    </DemoBox>

    <DemoBox :title="t.demoSearchTitle" :description="t.demoSearchDesc" :code="SearchSource">
      <SearchCascaderDemo />
    </DemoBox>

    <DemoBox :title="t.demoMultipleTitle" :description="t.demoMultipleDesc" :code="MultipleSource">
      <MultipleCascaderDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesCascaderDemo />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledCascaderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomRenderTitle"
      :description="t.demoCustomRenderDesc"
      :code="CustomRenderSource"
    >
      <CustomRenderCascaderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoAsyncLoadTitle"
      :description="t.demoAsyncLoadDesc"
      :code="AsyncLoadSource"
    >
      <AsyncLoadCascaderDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideCascaderDemo />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledCascaderDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCascaderApi" :data="cascaderProps" />
      <PropsTable :title="t.tableOption" :data="optionProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="cascaderCssVars" />
    </template>
  </ComponentDoc>
</template>
