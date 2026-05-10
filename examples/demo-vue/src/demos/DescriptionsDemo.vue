<script setup lang="ts">
/**
 * `DescriptionsDemo` — aggregator for the Descriptions component page.
 *
 * Mirrors `examples/demo/src/demos/DescriptionsDemo.tsx` (9 examples).
 * Vue-specific delta: `DescriptionsItem.value` (string) replaces
 * React's `children` (ReactNode). Rich content (Tag / Badge) gets
 * pre-formatted as text — see findings (`descriptions-rich-content-no-vue`).
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

import { useDescriptionsDocStrings } from './descriptions-doc/useStrings'

import BasicDescriptions from './descriptions/Basic.demo.vue'
import BasicSource from './descriptions/Basic.demo.vue?raw'
import BorderedDescriptions from './descriptions/Bordered.demo.vue'
import BorderedSource from './descriptions/Bordered.demo.vue?raw'
import ColumnsDescriptions from './descriptions/Columns.demo.vue'
import ColumnsSource from './descriptions/Columns.demo.vue?raw'
import VerticalDescriptions from './descriptions/Vertical.demo.vue'
import VerticalSource from './descriptions/Vertical.demo.vue?raw'
import NoColonDescriptions from './descriptions/NoColon.demo.vue'
import NoColonSource from './descriptions/NoColon.demo.vue?raw'
import SizesDescriptions from './descriptions/Sizes.demo.vue'
import SizesSource from './descriptions/Sizes.demo.vue?raw'
import RichContentDescriptions from './descriptions/RichContent.demo.vue'
import RichContentSource from './descriptions/RichContent.demo.vue?raw'
import TokensOverrideDescriptions from './descriptions/TokensOverride.demo.vue'
import TokensOverrideSource from './descriptions/TokensOverride.demo.vue?raw'
import UnstyledDescriptions from './descriptions/Unstyled.demo.vue'
import UnstyledSource from './descriptions/Unstyled.demo.vue?raw'

const t = useDescriptionsDocStrings()

const descriptionsProps = computed<PropDef[]>(() => [
  { name: 'title', description: t.value.propTitle, type: 'string' },
  {
    name: 'items',
    description: t.value.propItems,
    type: 'DescriptionsItem[]',
    required: true,
  },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean', default: 'false' },
  { name: 'column', description: t.value.propColumn, type: 'number', default: '3' },
  {
    name: 'layout',
    description: t.value.propLayout,
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  { name: 'colon', description: t.value.propColon, type: 'boolean', default: 'true' },
  { name: 'size', description: t.value.propSize, type: "'small' | 'middle' | 'large'" },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const descriptionsItemProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.itemKey, type: 'string' },
  { name: 'label', description: t.value.itemLabel, type: 'string', required: true },
  { name: 'value', description: t.value.itemValue, type: 'string', required: true },
  { name: 'span', description: t.value.itemSpan, type: 'number', default: '1' },
])

const descriptionsCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg-secondary', default: '#fafafa', description: t.value.cssBgSecondary },
  {
    name: 'sg-color-border-secondary',
    default: '#f0f0f0',
    description: t.value.cssBorderSecondary,
  },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssBorderRadius },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbDescriptions]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicDescriptions />
    </DemoBox>

    <DemoBox :title="t.demoBorderedTitle" :description="t.demoBorderedDesc" :code="BorderedSource">
      <BorderedDescriptions />
    </DemoBox>

    <DemoBox :title="t.demoColumnsTitle" :description="t.demoColumnsDesc" :code="ColumnsSource">
      <ColumnsDescriptions />
    </DemoBox>

    <DemoBox :title="t.demoVerticalTitle" :description="t.demoVerticalDesc" :code="VerticalSource">
      <VerticalDescriptions />
    </DemoBox>

    <DemoBox :title="t.demoNoColonTitle" :description="t.demoNoColonDesc" :code="NoColonSource">
      <NoColonDescriptions />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesDescriptions />
    </DemoBox>

    <DemoBox
      :title="t.demoRichContentTitle"
      :description="t.demoRichContentDesc"
      :code="RichContentSource"
    >
      <RichContentDescriptions />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideDescriptions />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledDescriptions />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDescriptionsApi" :data="descriptionsProps" />
      <PropsTable :title="t.tableDescriptionsItemApi" :data="descriptionsItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="descriptionsCssVars" />
    </template>
  </ComponentDoc>
</template>
