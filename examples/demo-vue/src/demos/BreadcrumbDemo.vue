<script setup lang="ts">
/**
 * `BreadcrumbDemo` — aggregator for the Breadcrumb component page.
 * Mirrors `examples/demo/src/demos/BreadcrumbDemo.tsx` 1:1 (7/7).
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

import { useBreadcrumbDocStrings } from './breadcrumb-doc/useStrings'

import BasicBreadcrumb from './breadcrumb/Basic.demo.vue'
import BasicSource from './breadcrumb/Basic.demo.vue?raw'
import SeparatorBreadcrumb from './breadcrumb/Separator.demo.vue'
import SeparatorSource from './breadcrumb/Separator.demo.vue?raw'
import OnClickBreadcrumb from './breadcrumb/OnClick.demo.vue'
import OnClickSource from './breadcrumb/OnClick.demo.vue?raw'
import WithIconsBreadcrumb from './breadcrumb/WithIcons.demo.vue'
import WithIconsSource from './breadcrumb/WithIcons.demo.vue?raw'
import DropdownBreadcrumb from './breadcrumb/Dropdown.demo.vue'
import DropdownSource from './breadcrumb/Dropdown.demo.vue?raw'
import TokensOverrideBreadcrumb from './breadcrumb/TokensOverride.demo.vue'
import TokensOverrideSource from './breadcrumb/TokensOverride.demo.vue?raw'
import UnstyledBreadcrumb from './breadcrumb/Unstyled.demo.vue'
import UnstyledSource from './breadcrumb/Unstyled.demo.vue?raw'

const t = useBreadcrumbDocStrings()

const breadcrumbProps = computed<PropDef[]>(() => [
  { name: 'items', description: t.value.propItems, type: 'BreadcrumbItem[]', required: true },
  { name: 'separator', description: t.value.propSeparator, type: 'string', default: "'/'" },
  { name: '#item', description: t.value.propItemSlot, type: 'slot' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@itemClick',
    description: t.value.emitItemClick,
    type: '(item: BreadcrumbItem, index: number) => void',
  },
])

const breadcrumbItemProps = computed<PropDef[]>(() => [
  { name: 'title', description: t.value.itemTitle, type: 'string', required: true },
  { name: 'href', description: t.value.itemHref, type: 'string' },
])

const breadcrumbCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-line-height', default: '1.5714', description: t.value.cssLineHeight },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-transition-duration', default: '180ms', description: t.value.cssTransitionDuration },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    description: t.value.cssTransitionTiming,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbBreadcrumb]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicBreadcrumb />
    </DemoBox>
    <DemoBox
      :title="t.demoSeparatorTitle"
      :description="t.demoSeparatorDesc"
      :code="SeparatorSource"
    >
      <SeparatorBreadcrumb />
    </DemoBox>
    <DemoBox :title="t.demoOnClickTitle" :description="t.demoOnClickDesc" :code="OnClickSource">
      <OnClickBreadcrumb />
    </DemoBox>
    <DemoBox :title="t.demoIconsTitle" :description="t.demoIconsDesc" :code="WithIconsSource">
      <WithIconsBreadcrumb />
    </DemoBox>
    <DemoBox :title="t.demoDropdownTitle" :description="t.demoDropdownDesc" :code="DropdownSource">
      <DropdownBreadcrumb />
    </DemoBox>
    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideBreadcrumb />
    </DemoBox>
    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledBreadcrumb />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableBreadcrumbApi" :data="breadcrumbProps" />
      <PropsTable :title="t.tableBreadcrumbItem" :data="breadcrumbItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="breadcrumbCssVars" />
    </template>
  </ComponentDoc>
</template>
