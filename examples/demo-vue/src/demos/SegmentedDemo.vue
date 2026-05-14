<script setup lang="ts">
/**
 * `SegmentedDemo` — aggregator for the Segmented component page.
 * Mirrors `examples/demo/src/demos/SegmentedDemo.tsx` 1:1 (8/8).
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

import { useSegmentedDocStrings } from './segmented-doc/useStrings'

import BasicSegmented from './segmented/Basic.demo.vue'
import BasicSource from './segmented/Basic.demo.vue?raw'
import ControlledSegmented from './segmented/Controlled.demo.vue'
import ControlledSource from './segmented/Controlled.demo.vue?raw'
import WithIconsSegmented from './segmented/WithIcons.demo.vue'
import WithIconsSource from './segmented/WithIcons.demo.vue?raw'
import BlockSegmented from './segmented/Block.demo.vue'
import BlockSource from './segmented/Block.demo.vue?raw'
import DisabledSegmented from './segmented/Disabled.demo.vue'
import DisabledSource from './segmented/Disabled.demo.vue?raw'
import SizesSegmented from './segmented/Sizes.demo.vue'
import SizesSource from './segmented/Sizes.demo.vue?raw'
import TokensOverrideSegmented from './segmented/TokensOverride.demo.vue'
import TokensOverrideSource from './segmented/TokensOverride.demo.vue?raw'
import UnstyledSegmented from './segmented/Unstyled.demo.vue'
import UnstyledSource from './segmented/Unstyled.demo.vue?raw'

const t = useSegmentedDocStrings()

const segmentedProps = computed<PropDef[]>(() => [
  {
    name: 'options',
    description: t.value.propOptions,
    type: 'string[] | { label: string; value: string; icon?: string; disabled?: boolean }[]',
    required: true,
  },
  { name: 'value', description: t.value.propValue, type: 'string' },
  { name: 'defaultValue', description: t.value.propDefaultValue, type: 'string' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'block', description: t.value.propBlock, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@change', description: t.value.emitChange, type: '(value: string) => void' },
])

const segmentedCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-bg-secondary',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgSecondary,
  },
  {
    name: 'sg-color-bg-container',
    default: '#ffffff',
    description: t.value.cssSgColorBgContainer,
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
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  {
    name: 'sg-shadow-sm',
    default: '0 1px 2px rgba(0,0,0,0.06)',
    description: t.value.cssSgShadowSm,
  },
  { name: 'sg-height-sm', default: '24px', description: t.value.cssSgHeightSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  { name: 'sg-height-lg', default: '40px', description: t.value.cssSgHeightLg },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssSgPaddingLg },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssSgFontSizeLg },
  {
    name: 'sg-transition-duration',
    default: '180ms',
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
    :crumbs="[t.crumbCategory, t.crumbSegmented]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" vertical>
      <BasicSegmented />
    </DemoBox>

    <DemoBox
      :title="t.demoControlledTitle"
      :description="t.demoControlledDesc"
      :code="ControlledSource"
      vertical
    >
      <ControlledSegmented />
    </DemoBox>

    <DemoBox
      :title="t.demoWithIconsTitle"
      :description="t.demoWithIconsDesc"
      :code="WithIconsSource"
      vertical
    >
      <WithIconsSegmented />
    </DemoBox>

    <DemoBox :title="t.demoBlockTitle" :description="t.demoBlockDesc" :code="BlockSource" vertical>
      <BlockSegmented />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="DisabledSource"
      vertical
    >
      <DisabledSegmented />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource" vertical>
      <SizesSegmented />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
      vertical
    >
      <TokensOverrideSegmented />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
      vertical
    >
      <UnstyledSegmented />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableSegmentedApi" :data="segmentedProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="segmentedCssVars" />
    </template>
  </ComponentDoc>
</template>
