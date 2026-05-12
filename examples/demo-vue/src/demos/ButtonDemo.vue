<script setup lang="ts">
/**
 * `ButtonDemo` — aggregator for the Button component page.
 *
 * Mirrors `examples/demo/src/demos/ButtonDemo.tsx` 1:1 (8/8 demos).
 * `propsData` lists Vue-only props `danger` and `block` and reflects
 * the Vue contract (no `className` / `style` / `onClick` props —
 * Vue uses fallthrough class/style and `@click` emit).
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

import { useButtonDocStrings } from './button-doc/useStrings'

import TypesButton from './button/Types.demo.vue'
import TypesSource from './button/Types.demo.vue?raw'
import SizesButton from './button/Sizes.demo.vue'
import SizesSource from './button/Sizes.demo.vue?raw'
import LoadingButton from './button/Loading.demo.vue'
import LoadingSource from './button/Loading.demo.vue?raw'
import DisabledButton from './button/Disabled.demo.vue'
import DisabledSource from './button/Disabled.demo.vue?raw'
import WithIconButton from './button/WithIcon.demo.vue'
import WithIconSource from './button/WithIcon.demo.vue?raw'
import ComponentTokensButton from './button/ComponentTokens.demo.vue'
import ComponentTokensSource from './button/ComponentTokens.demo.vue?raw'
import ScopedBrandButton from './button/ScopedBrand.demo.vue'
import ScopedBrandSource from './button/ScopedBrand.demo.vue?raw'
import UnstyledButton from './button/Unstyled.demo.vue'
import UnstyledSource from './button/Unstyled.demo.vue?raw'

const t = useButtonDocStrings()

const buttonProps = computed<PropDef[]>(() => [
  {
    name: 'type',
    description: t.value.propType,
    type: "'default' | 'primary' | 'dashed' | 'text' | 'link'",
    default: "'default'",
  },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'htmlType',
    description: t.value.propHtmlType,
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
  },
  { name: 'danger', description: t.value.propDanger, type: 'boolean', default: 'false' },
  { name: 'block', description: t.value.propBlock, type: 'boolean', default: 'false' },
  {
    name: 'disabled',
    description: t.value.propDisabled,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: t.value.propLoading,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: t.value.propUnstyled,
    type: 'boolean',
    default: 'false',
  },
  {
    name: '@click',
    description: t.value.emitClick,
    type: '(evt: MouseEvent) => void',
  },
])

const buttonCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-btn-height', default: 'var(--sg-height-md)', description: t.value.cssSgBtnHeight },
  {
    name: 'sg-btn-padding',
    default: '0 var(--sg-padding-md)',
    description: t.value.cssSgBtnPadding,
  },
  {
    name: 'sg-btn-radius',
    default: 'var(--sg-border-radius)',
    description: t.value.cssSgBtnRadius,
  },
  {
    name: 'sg-btn-font-size',
    default: 'var(--sg-font-size)',
    description: t.value.cssSgBtnFontSize,
  },
  { name: 'sg-btn-bg', default: 'transparent', description: t.value.cssSgBtnBg },
  { name: 'sg-btn-color', default: 'var(--sg-color-text)', description: t.value.cssSgBtnColor },
  { name: 'sg-btn-border', default: 'var(--sg-color-border)', description: t.value.cssSgBtnBorder },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-hover',
    default: '#4096ff',
    description: t.value.cssSgColorPrimaryHover,
  },
  {
    name: 'sg-color-primary-active',
    default: '#0958d9',
    description: t.value.cssSgColorPrimaryActive,
  },
  { name: 'sg-color-primary-bg', default: '#e6f4ff', description: t.value.cssSgColorPrimaryBg },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssSgColorWhite },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgHover,
  },
  {
    name: 'sg-color-bg-disabled',
    default: 'rgba(0, 0, 0, 0.04)',
    description: t.value.cssSgColorBgDisabled,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-height-sm', default: '24px', description: t.value.cssSgHeightSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  { name: 'sg-height-lg', default: '40px', description: t.value.cssSgHeightLg },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssSgPaddingLg },
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
    :crumbs="[t.crumbGeneral, t.crumbButton]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoTypesTitle" :description="t.demoTypesDesc" :code="TypesSource">
      <TypesButton />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesButton />
    </DemoBox>

    <DemoBox :title="t.demoLoadingTitle" :description="t.demoLoadingDesc" :code="LoadingSource">
      <LoadingButton />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledButton />
    </DemoBox>

    <DemoBox :title="t.demoIconTitle" :description="t.demoIconDesc" :code="WithIconSource">
      <WithIconButton />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="ComponentTokensSource"
    >
      <ComponentTokensButton />
    </DemoBox>

    <DemoBox :title="t.demoBrandTitle" :description="t.demoBrandDesc" :code="ScopedBrandSource">
      <ScopedBrandButton />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledButton />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableButtonApi" :data="buttonProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="buttonCssVars" />
    </template>
  </ComponentDoc>
</template>
