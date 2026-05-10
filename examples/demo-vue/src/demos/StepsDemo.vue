<script setup lang="ts">
/**
 * `StepsDemo` — aggregator for the Steps component page.
 *
 * Mirrors `examples/demo/src/demos/StepsDemo.tsx` with two
 * Vue-specific deltas:
 *   - `StepItem.title`/`description` are `string` (React: `ReactNode`).
 *   - `StepItem.icon` does not exist in `@skygraph/vue`; the React
 *     `CustomIcon.demo` cannot be reproduced 1:1 and is skipped.
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

import { useStepsDocStrings } from './steps-doc/useStrings'

import BasicSteps from './steps/Basic.demo.vue'
import BasicSource from './steps/Basic.demo.vue?raw'
import ClickableSteps from './steps/Clickable.demo.vue'
import ClickableSource from './steps/Clickable.demo.vue?raw'
import VerticalSteps from './steps/Vertical.demo.vue'
import VerticalSource from './steps/Vertical.demo.vue?raw'
import ErrorStatusSteps from './steps/ErrorStatus.demo.vue'
import ErrorStatusSource from './steps/ErrorStatus.demo.vue?raw'
import SizesSteps from './steps/Sizes.demo.vue'
import SizesSource from './steps/Sizes.demo.vue?raw'
import NavigationSteps from './steps/Navigation.demo.vue'
import NavigationSource from './steps/Navigation.demo.vue?raw'
import TokensOverrideSteps from './steps/TokensOverride.demo.vue'
import TokensOverrideSource from './steps/TokensOverride.demo.vue?raw'
import UnstyledSteps from './steps/Unstyled.demo.vue'
import UnstyledSource from './steps/Unstyled.demo.vue?raw'

const t = useStepsDocStrings()

const stepsProps = computed<PropDef[]>(() => [
  { name: 'current', description: t.value.propCurrent, type: 'number', required: true },
  { name: 'items', description: t.value.propItems, type: 'StepItem[]', required: true },
  {
    name: 'direction',
    description: t.value.propDirection,
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    name: 'type',
    description: t.value.propType,
    type: "'default' | 'navigation'",
    default: "'default'",
  },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@change', description: t.value.emitChange, type: '(current: number) => void' },
])

const stepItemProps = computed<PropDef[]>(() => [
  { name: 'title', description: t.value.itemTitle, type: 'string', required: true },
  { name: 'description', description: t.value.itemDescription, type: 'string' },
  {
    name: 'status',
    description: t.value.itemStatus,
    type: "'wait' | 'process' | 'finish' | 'error'",
  },
])

const stepsCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssError },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssTextDisabled,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-color-border', default: '#d9d9d9', description: t.value.cssBorder },
  {
    name: 'sg-color-border-secondary',
    default: '#f0f0f0',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssWhite },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssFontSizeLg },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssPaddingLg },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssMarginXs },
  { name: 'sg-margin-sm', default: '8px', description: t.value.cssMarginSm },
  {
    name: 'sg-transition-duration',
    default: '180ms',
    description: t.value.cssTransitionDuration,
  },
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
    :crumbs="[t.crumbCategory, t.crumbSteps]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox
      :title="t.demoBasicTitle"
      :description="t.demoBasicDesc"
      :code="BasicSource"
      vertical
    >
      <BasicSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoClickableTitle"
      :description="t.demoClickableDesc"
      :code="ClickableSource"
      vertical
    >
      <ClickableSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoVerticalTitle"
      :description="t.demoVerticalDesc"
      :code="VerticalSource"
      vertical
    >
      <VerticalSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoErrorTitle"
      :description="t.demoErrorDesc"
      :code="ErrorStatusSource"
      vertical
    >
      <ErrorStatusSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoSizesTitle"
      :description="t.demoSizesDesc"
      :code="SizesSource"
      vertical
    >
      <SizesSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoNavigationTitle"
      :description="t.demoNavigationDesc"
      :code="NavigationSource"
      vertical
    >
      <NavigationSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
      vertical
    >
      <TokensOverrideSteps />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
      vertical
    >
      <UnstyledSteps />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableStepsApi" :data="stepsProps" />
      <PropsTable :title="t.tableStepItem" :data="stepItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="stepsCssVars" />
    </template>
  </ComponentDoc>
</template>
