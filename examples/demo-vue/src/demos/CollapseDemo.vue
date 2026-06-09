<script setup lang="ts">
/**
 * `CollapseDemo` — aggregator for the Collapse component page.
 *
 * Mirrors `examples/demo/src/demos/CollapseDemo.tsx` (12 examples).
 * Vue-specific delta:
 *   - `CollapseItem.content` instead of React's `children`
 *   - `CollapseItem.extra` is `string` only — see findings
 *     (`collapse-rich-extra-no-vue`)
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

import { useCollapseDocStrings } from './collapse-doc/useStrings'

import BasicCollapse from './collapse/Basic.demo.vue'
import BasicSource from './collapse/Basic.demo.vue?raw'
import AccordionCollapse from './collapse/Accordion.demo.vue'
import AccordionSource from './collapse/Accordion.demo.vue?raw'
import BorderlessCollapse from './collapse/Borderless.demo.vue'
import BorderlessSource from './collapse/Borderless.demo.vue?raw'
import ControlledCollapse from './collapse/Controlled.demo.vue'
import ControlledSource from './collapse/Controlled.demo.vue?raw'
import DisabledCollapse from './collapse/Disabled.demo.vue'
import DisabledSource from './collapse/Disabled.demo.vue?raw'
import ExtraCollapse from './collapse/Extra.demo.vue'
import ExtraSource from './collapse/Extra.demo.vue?raw'
import GhostCollapse from './collapse/Ghost.demo.vue'
import GhostSource from './collapse/Ghost.demo.vue?raw'
import IconPositionCollapse from './collapse/IconPosition.demo.vue'
import IconPositionSource from './collapse/IconPosition.demo.vue?raw'
import NoArrowCollapse from './collapse/NoArrow.demo.vue'
import NoArrowSource from './collapse/NoArrow.demo.vue?raw'
import SizesCollapse from './collapse/Sizes.demo.vue'
import SizesSource from './collapse/Sizes.demo.vue?raw'
import TokensOverrideCollapse from './collapse/TokensOverride.demo.vue'
import TokensOverrideSource from './collapse/TokensOverride.demo.vue?raw'

const t = useCollapseDocStrings()

const collapseProps = computed<PropDef[]>(() => [
  { name: 'items', description: t.value.propItems, type: 'CollapseItem[]', required: true },
  { name: 'activeKey', description: t.value.propActiveKey, type: 'string | string[]' },
  {
    name: 'defaultActiveKey',
    description: t.value.propDefaultActiveKey,
    type: 'string | string[]',
  },
  { name: 'accordion', description: t.value.propAccordion, type: 'boolean', default: 'false' },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean', default: 'true' },
  {
    name: 'expandIconPosition',
    description: t.value.propExpandIconPosition,
    type: "'start' | 'end'",
    default: "'start'",
  },
  { name: 'ghost', description: t.value.propGhost, type: 'boolean', default: 'false' },
  { name: 'size', description: t.value.propSize, type: "'small' | 'middle' | 'large'" },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@change', description: t.value.propOnChange, type: '(activeKey: string[]) => void' },
])

const collapseItemProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.itemKey, type: 'string', required: true },
  { name: 'label', description: t.value.itemLabel, type: 'string', required: true },
  { name: 'content', description: t.value.itemContent, type: 'string', required: true },
  { name: 'extra', description: t.value.itemExtra, type: 'string' },
  { name: 'showArrow', description: t.value.itemShowArrow, type: 'boolean', default: 'true' },
  { name: 'disabled', description: t.value.itemDisabled, type: 'boolean', default: 'false' },
])

const collapseCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg-container', default: '#ffffff', description: t.value.cssBgContainer },
  { name: 'sg-color-bg-secondary', default: '#fafafa', description: t.value.cssBgSecondary },
  { name: 'sg-color-bg-hover', default: '#f5f5f5', description: t.value.cssBgHover },
  {
    name: 'sg-color-border-secondary',
    default: '#f0f0f0',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssBorderRadiusLg },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbCollapse]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" vertical>
      <BasicCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoAccordionTitle"
      :description="t.demoAccordionDesc"
      :code="AccordionSource"
      vertical
    >
      <AccordionCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoBorderlessTitle"
      :description="t.demoBorderlessDesc"
      :code="BorderlessSource"
      vertical
    >
      <BorderlessCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoControlledTitle"
      :description="t.demoControlledDesc"
      :code="ControlledSource"
      vertical
    >
      <ControlledCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="DisabledSource"
      vertical
    >
      <DisabledCollapse />
    </DemoBox>

    <DemoBox :title="t.demoExtraTitle" :description="t.demoExtraDesc" :code="ExtraSource" vertical>
      <ExtraCollapse />
    </DemoBox>

    <DemoBox :title="t.demoGhostTitle" :description="t.demoGhostDesc" :code="GhostSource" vertical>
      <GhostCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoIconPositionTitle"
      :description="t.demoIconPositionDesc"
      :code="IconPositionSource"
      vertical
    >
      <IconPositionCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoNoArrowTitle"
      :description="t.demoNoArrowDesc"
      :code="NoArrowSource"
      vertical
    >
      <NoArrowCollapse />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource" vertical>
      <SizesCollapse />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
      vertical
    >
      <TokensOverrideCollapse />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCollapseApi" :data="collapseProps" />
      <PropsTable :title="t.tableCollapseItemApi" :data="collapseItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="collapseCssVars" />
    </template>
  </ComponentDoc>
</template>
