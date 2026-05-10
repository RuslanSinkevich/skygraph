<script setup lang="ts">
/**
 * `TabsDemo` — aggregator for the Tabs component page.
 *
 * Mirrors `examples/demo/src/demos/TabsDemo.tsx` 1:1, with one
 * Vue-specific delta: rich-content panels use the `#panel`/`#tab` slots
 * because `TabItem.content` is a `string` in `@skygraph/vue` (React
 * uses `ReactNode` `children`).
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

import { useTabsDocStrings } from './tabs-doc/useStrings'

import BasicTabs from './tabs/Basic.demo.vue'
import BasicSource from './tabs/Basic.demo.vue?raw'
import LineTabs from './tabs/Line.demo.vue'
import LineSource from './tabs/Line.demo.vue?raw'
import ControlledTabs from './tabs/Controlled.demo.vue'
import ControlledSource from './tabs/Controlled.demo.vue?raw'
import SizesTabs from './tabs/Sizes.demo.vue'
import SizesSource from './tabs/Sizes.demo.vue?raw'
import RichLabelsTabs from './tabs/RichLabels.demo.vue'
import RichLabelsSource from './tabs/RichLabels.demo.vue?raw'
import StatesTabs from './tabs/States.demo.vue'
import StatesSource from './tabs/States.demo.vue?raw'
import TokensOverrideTabs from './tabs/TokensOverride.demo.vue'
import TokensOverrideSource from './tabs/TokensOverride.demo.vue?raw'

const t = useTabsDocStrings()

const tabsProps = computed<PropDef[]>(() => [
  { name: 'items', description: t.value.propItems, type: 'TabItem[]', required: true },
  { name: 'activeKey', description: t.value.propActiveKey, type: 'string' },
  { name: 'defaultActiveKey', description: t.value.propDefaultActiveKey, type: 'string' },
  { name: 'type', description: t.value.propType, type: "'card' | 'line'", default: "'card'" },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@change', description: t.value.emitChange, type: '(key: string) => void' },
])

const tabItemProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.itemKey, type: 'string', required: true },
  { name: 'label', description: t.value.itemLabel, type: 'string', required: true },
  { name: 'content', description: t.value.itemContent, type: 'string' },
  { name: 'disabled', description: t.value.itemDisabled, type: 'boolean', default: 'false' },
  { name: 'loading', description: t.value.itemLoading, type: 'boolean', default: 'false' },
])

const tabsCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssPrimary },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: t.value.cssPrimaryHover },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.value.cssTextSecondary },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.value.cssTextDisabled },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: t.value.cssBorderSecondary },
  { name: 'sg-color-bg', default: 'var(--sg-gray-1)', description: t.value.cssBg },
  { name: 'sg-color-bg-secondary', default: 'var(--sg-gray-2)', description: t.value.cssBgSecondary },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssPaddingLg },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssPaddingXs },
  { name: 'sg-margin-md', default: '16px', description: t.value.cssMarginMd },
  { name: 'sg-spin-color', default: 'var(--sg-color-primary) on active tab', description: t.value.cssSpinColor },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbTabs]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" vertical>
      <BasicTabs />
    </DemoBox>

    <DemoBox :title="t.demoLineTitle" :description="t.demoLineDesc" :code="LineSource" vertical>
      <LineTabs />
    </DemoBox>

    <DemoBox
      :title="t.demoControlledTitle"
      :description="t.demoControlledDesc"
      :code="ControlledSource"
      vertical
    >
      <ControlledTabs />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource" vertical>
      <SizesTabs />
    </DemoBox>

    <DemoBox
      :title="t.demoRichLabelsTitle"
      :description="t.demoRichLabelsDesc"
      :code="RichLabelsSource"
      vertical
    >
      <RichLabelsTabs />
    </DemoBox>

    <DemoBox :title="t.demoStatesTitle" :description="t.demoStatesDesc" :code="StatesSource" vertical>
      <StatesTabs />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
      vertical
    >
      <TokensOverrideTabs />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTabsApi" :data="tabsProps" />
      <PropsTable :title="t.tableTabItem" :data="tabItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="tabsCssVars" />
    </template>
  </ComponentDoc>
</template>
