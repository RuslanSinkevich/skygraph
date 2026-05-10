<script setup lang="ts">
/**
 * `TransferDemo` — aggregator for the Transfer component page.
 *
 * Mirrors `examples/demo/src/demos/TransferDemo.tsx` (7 examples).
 * Vue surface (7 examples): Basic, Search, OneWay, Titles, Disabled,
 * TokensOverride, Unstyled.
 *
 * Vue delta (see `findings/T-Vue-Demo-Forms.md`
 * → `transfer-vue-feature-gaps`):
 * - React's `CustomRender` demo dropped — `SgTransfer` has no
 *   `render` prop / row scoped slot. `Unstyled` added in its place
 *   to keep the same demo count.
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
import { useTransferDocStrings } from './transfer-doc/useStrings'

import BasicTransferDemo from './transfer/Basic.demo.vue'
import BasicSource from './transfer/Basic.demo.vue?raw'
import SearchTransferDemo from './transfer/Search.demo.vue'
import SearchSource from './transfer/Search.demo.vue?raw'
import OneWayTransferDemo from './transfer/OneWay.demo.vue'
import OneWaySource from './transfer/OneWay.demo.vue?raw'
import TitlesTransferDemo from './transfer/Titles.demo.vue'
import TitlesSource from './transfer/Titles.demo.vue?raw'
import DisabledTransferDemo from './transfer/Disabled.demo.vue'
import DisabledSource from './transfer/Disabled.demo.vue?raw'
import TokensOverrideTransferDemo from './transfer/TokensOverride.demo.vue'
import TokensOverrideSource from './transfer/TokensOverride.demo.vue?raw'
import UnstyledTransferDemo from './transfer/Unstyled.demo.vue'
import UnstyledSource from './transfer/Unstyled.demo.vue?raw'

const t = useTransferDocStrings()

const transferProps = computed<PropDef[]>(() => [
  { name: 'dataSource', description: t.value.propDataSource, type: 'TransferItem[]' },
  { name: 'modelValue', description: t.value.propModelValue, type: 'string[]' },
  { name: 'targetKeys', description: t.value.propTargetKeys, type: 'string[]' },
  {
    name: 'defaultTargetKeys',
    description: t.value.propDefaultTargetKeys,
    type: 'string[]',
  },
  {
    name: 'showSearch',
    description: t.value.propShowSearch,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'titles',
    description: t.value.propTitles,
    type: '[string, string]',
    default: "['Source', 'Target']",
  },
  { name: 'oneWay', description: t.value.propOneWay, type: 'boolean', default: 'false' },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(keys: string[]) => void',
  },
  {
    name: '@change',
    description: t.value.emitChange,
    type: "(keys: string[], direction: 'left' | 'right', moveKeys: string[]) => void",
  },
  {
    name: '@selectChange',
    description: t.value.emitSelectChange,
    type: '(leftKeys: string[], rightKeys: string[]) => void',
  },
])

const itemProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.itemKey, type: 'string' },
  { name: 'title', description: t.value.itemTitle, type: 'string' },
  { name: 'description', description: t.value.itemDescription, type: 'string' },
  { name: 'disabled', description: t.value.itemDisabled, type: 'boolean' },
])

const transferCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-bg-container',
    default: 'var(--sg-gray-1)',
    description: t.value.cssSgColorBgContainer,
  },
  {
    name: 'sg-color-bg-secondary',
    default: 'var(--sg-gray-2)',
    description: t.value.cssSgColorBgSecondary,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgHover,
  },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssSgColorTextSecondary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-md', default: '16px', description: t.value.cssSgPaddingMd },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
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
    :crumbs="[t.crumbCategory, t.crumbTransfer]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTransferDemo />
    </DemoBox>

    <DemoBox :title="t.demoSearchTitle" :description="t.demoSearchDesc" :code="SearchSource">
      <SearchTransferDemo />
    </DemoBox>

    <DemoBox :title="t.demoOneWayTitle" :description="t.demoOneWayDesc" :code="OneWaySource">
      <OneWayTransferDemo />
    </DemoBox>

    <DemoBox :title="t.demoTitlesTitle" :description="t.demoTitlesDesc" :code="TitlesSource">
      <TitlesTransferDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="DisabledSource"
    >
      <DisabledTransferDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTransferDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
    >
      <UnstyledTransferDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTransferApi" :data="transferProps" />
      <PropsTable :title="t.tableTransferItem" :data="itemProps" />
      <CssVarsTable
        :title="t.tableCssVars"
        :hint="t.cssHint"
        :data="transferCssVars"
      />
    </template>
  </ComponentDoc>
</template>
