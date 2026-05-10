<script setup lang="ts">
/**
 * `BadgeDemo` — aggregator for the Badge component page.
 *
 * Mirrors `examples/demo/src/demos/BadgeDemo.tsx` 1:1 (8 examples).
 * Vue-specific deltas: `className` / `style` props removed from
 * PropsTable (Vue uses class/style fallthrough). `children` moves to
 * the default slot.
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

import { useBadgeDocStrings } from './badge-doc/useStrings'

import BasicBadge from './badge/Basic.demo.vue'
import BasicSource from './badge/Basic.demo.vue?raw'
import OverflowBadge from './badge/Overflow.demo.vue'
import OverflowSource from './badge/Overflow.demo.vue?raw'
import DotBadge from './badge/Dot.demo.vue'
import DotSource from './badge/Dot.demo.vue?raw'
import StatusBadge from './badge/Status.demo.vue'
import StatusSource from './badge/Status.demo.vue?raw'
import CustomColorBadge from './badge/CustomColor.demo.vue'
import CustomColorSource from './badge/CustomColor.demo.vue?raw'
import OffsetBadge from './badge/Offset.demo.vue'
import OffsetSource from './badge/Offset.demo.vue?raw'
import TokensOverrideBadge from './badge/TokensOverride.demo.vue'
import TokensOverrideSource from './badge/TokensOverride.demo.vue?raw'
import UnstyledBadge from './badge/Unstyled.demo.vue'
import UnstyledSource from './badge/Unstyled.demo.vue?raw'

const t = useBadgeDocStrings()

const badgeProps = computed<PropDef[]>(() => [
  { name: 'count', description: t.value.propCount, type: 'number' },
  { name: 'dot', description: t.value.propDot, type: 'boolean', default: 'false' },
  { name: 'overflowCount', description: t.value.propOverflowCount, type: 'number', default: '99' },
  { name: 'showZero', description: t.value.propShowZero, type: 'boolean', default: 'false' },
  { name: 'color', description: t.value.propColor, type: 'string' },
  {
    name: 'status',
    description: t.value.propStatus,
    type: "'success' | 'error' | 'warning' | 'processing' | 'default'",
  },
  { name: 'text', description: t.value.propText, type: 'string' },
  { name: 'offset', description: t.value.propOffset, type: '[number, number]' },
  { name: '#default', description: t.value.propChildren, type: 'slot' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const badgeCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssSgColorError },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssSgColorWhite },
  { name: 'sg-color-bg', default: '#ffffff', description: t.value.cssSgColorBg },
  { name: 'sg-color-success', default: '#52c41a', description: t.value.cssSgColorSuccess },
  { name: 'sg-color-warning', default: '#faad14', description: t.value.cssSgColorWarning },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  { name: 'sg-line-height', default: '1.5714', description: t.value.cssSgLineHeight },
  { name: 'sg-z-base', default: '1', description: t.value.cssSgZBase },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbBadge]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicBadge />
    </DemoBox>

    <DemoBox :title="t.demoOverflowTitle" :description="t.demoOverflowDesc" :code="OverflowSource">
      <OverflowBadge />
    </DemoBox>

    <DemoBox :title="t.demoDotTitle" :description="t.demoDotDesc" :code="DotSource">
      <DotBadge />
    </DemoBox>

    <DemoBox :title="t.demoStatusTitle" :description="t.demoStatusDesc" :code="StatusSource">
      <StatusBadge />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomColorTitle"
      :description="t.demoCustomColorDesc"
      :code="CustomColorSource"
    >
      <CustomColorBadge />
    </DemoBox>

    <DemoBox :title="t.demoOffsetTitle" :description="t.demoOffsetDesc" :code="OffsetSource">
      <OffsetBadge />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideBadge />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledBadge />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableBadgeApi" :data="badgeProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="badgeCssVars" />
    </template>
  </ComponentDoc>
</template>
