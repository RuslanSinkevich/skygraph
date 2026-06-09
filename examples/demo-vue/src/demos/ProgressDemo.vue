<script setup lang="ts">
/**
 * `ProgressDemo` — aggregator for the Progress component page.
 *
 * Mirrors `examples/demo/src/demos/ProgressDemo.tsx` (9 examples).
 * Vue parity is 1:1 with the React API — no Vue-specific deltas.
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

import { useProgressDocStrings } from './progress-doc/useStrings'

import LineProgress from './progress/Line.demo.vue'
import LineSource from './progress/Line.demo.vue?raw'
import CircleProgress from './progress/Circle.demo.vue'
import CircleSource from './progress/Circle.demo.vue?raw'
import SizesProgress from './progress/Sizes.demo.vue'
import SizesSource from './progress/Sizes.demo.vue?raw'
import NoInfoProgress from './progress/NoInfo.demo.vue'
import NoInfoSource from './progress/NoInfo.demo.vue?raw'
import ActiveProgress from './progress/Active.demo.vue'
import ActiveSource from './progress/Active.demo.vue?raw'
import CustomColorProgress from './progress/CustomColor.demo.vue'
import CustomColorSource from './progress/CustomColor.demo.vue?raw'
import DynamicProgress from './progress/Dynamic.demo.vue'
import DynamicSource from './progress/Dynamic.demo.vue?raw'
import TokensOverrideProgress from './progress/TokensOverride.demo.vue'
import TokensOverrideSource from './progress/TokensOverride.demo.vue?raw'

const t = useProgressDocStrings()

const progressProps = computed<PropDef[]>(() => [
  { name: 'percent', description: t.value.propPercent, type: 'number', required: true },
  {
    name: 'type',
    description: t.value.propType,
    type: "'line' | 'circle'",
    default: "'line'",
  },
  {
    name: 'status',
    description: t.value.propStatus,
    type: "'normal' | 'success' | 'error' | 'active'",
    default: "'normal'",
  },
  { name: 'showInfo', description: t.value.propShowInfo, type: 'boolean', default: 'true' },
  { name: 'strokeWidth', description: t.value.propStrokeWidth, type: 'number' },
  { name: 'strokeColor', description: t.value.propStrokeColor, type: 'string' },
  { name: 'size', description: t.value.propSize, type: "'small' | 'middle' | 'large'" },
  { name: 'width', description: t.value.propWidth, type: 'number', default: '120' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const progressCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
  { name: 'sg-color-bg-hover', default: '#f5f5f5', description: t.value.cssBgHover },
  { name: 'sg-color-success', default: '#52c41a', description: t.value.cssSuccess },
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssError },
  {
    name: 'sg-motion-duration-mid',
    default: '0.2s',
    description: t.value.cssMotionDuration,
  },
  {
    name: 'sg-motion-duration-slow',
    default: '0.3s',
    description: t.value.cssMotionDurationActive,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbProgress]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoLineTitle" :description="t.demoLineDesc" :code="LineSource">
      <LineProgress />
    </DemoBox>

    <DemoBox :title="t.demoCircleTitle" :description="t.demoCircleDesc" :code="CircleSource">
      <CircleProgress />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesProgress />
    </DemoBox>

    <DemoBox :title="t.demoNoInfoTitle" :description="t.demoNoInfoDesc" :code="NoInfoSource">
      <NoInfoProgress />
    </DemoBox>

    <DemoBox :title="t.demoActiveTitle" :description="t.demoActiveDesc" :code="ActiveSource">
      <ActiveProgress />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomColorTitle"
      :description="t.demoCustomColorDesc"
      :code="CustomColorSource"
    >
      <CustomColorProgress />
    </DemoBox>

    <DemoBox :title="t.demoDynamicTitle" :description="t.demoDynamicDesc" :code="DynamicSource">
      <DynamicProgress />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideProgress />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableProgressApi" :data="progressProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="progressCssVars" />
    </template>
  </ComponentDoc>
</template>
