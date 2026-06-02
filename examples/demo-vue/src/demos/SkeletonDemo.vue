<script setup lang="ts">
/**
 * `SkeletonDemo` — aggregator for the Skeleton component page.
 *
 * Mirrors `examples/demo/src/demos/SkeletonDemo.tsx` (9 examples).
 * Vue-specific delta: `loading=false` swaps to the default slot
 * (Vue) rather than React `children`.
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

import { useSkeletonDocStrings } from './skeleton-doc/useStrings'

import BasicSkeleton from './skeleton/Basic.demo.vue'
import BasicSource from './skeleton/Basic.demo.vue?raw'
import ActiveSkeleton from './skeleton/Active.demo.vue'
import ActiveSource from './skeleton/Active.demo.vue?raw'
import WithAvatarSkeleton from './skeleton/WithAvatar.demo.vue'
import WithAvatarSource from './skeleton/WithAvatar.demo.vue?raw'
import NoTitleSkeleton from './skeleton/NoTitle.demo.vue'
import NoTitleSource from './skeleton/NoTitle.demo.vue?raw'
import LoadingSkeleton from './skeleton/Loading.demo.vue'
import LoadingSource from './skeleton/Loading.demo.vue?raw'
import RowsSkeleton from './skeleton/Rows.demo.vue'
import RowsSource from './skeleton/Rows.demo.vue?raw'
import CardSkeleton from './skeleton/Card.demo.vue'
import CardSource from './skeleton/Card.demo.vue?raw'
import TokensOverrideSkeleton from './skeleton/TokensOverride.demo.vue'
import TokensOverrideSource from './skeleton/TokensOverride.demo.vue?raw'
import UnstyledSkeleton from './skeleton/Unstyled.demo.vue'
import UnstyledSource from './skeleton/Unstyled.demo.vue?raw'

const t = useSkeletonDocStrings()

const skeletonProps = computed<PropDef[]>(() => [
  { name: 'active', description: t.value.propActive, type: 'boolean', default: 'false' },
  {
    name: 'avatar',
    description: t.value.propAvatar,
    type: 'boolean | { size?: number; shape?: "circle" | "square" }',
    default: 'false',
  },
  {
    name: 'title',
    description: t.value.propTitle,
    type: 'boolean | { width?: number | string }',
    default: 'true',
  },
  {
    name: 'paragraph',
    description: t.value.propParagraph,
    type: 'boolean | { rows?: number; width?: Array<number | string> }',
    default: 'true',
  },
  { name: 'loading', description: t.value.propLoading, type: 'boolean', default: 'true' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const skeletonCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-skeleton-bg', default: '#e2e8f0', description: t.value.cssSkeletonBg },
  { name: 'sg-skeleton-shimmer', default: '#f8fafc', description: t.value.cssSkeletonShimmer },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssBorderRadiusSm },
  {
    name: 'sg-motion-duration-slow',
    default: '0.3s',
    description: t.value.cssMotionDurationSlow,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbSkeleton]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicSkeleton />
    </DemoBox>

    <DemoBox :title="t.demoActiveTitle" :description="t.demoActiveDesc" :code="ActiveSource">
      <ActiveSkeleton />
    </DemoBox>

    <DemoBox
      :title="t.demoWithAvatarTitle"
      :description="t.demoWithAvatarDesc"
      :code="WithAvatarSource"
    >
      <WithAvatarSkeleton />
    </DemoBox>

    <DemoBox :title="t.demoNoTitleTitle" :description="t.demoNoTitleDesc" :code="NoTitleSource">
      <NoTitleSkeleton />
    </DemoBox>

    <DemoBox :title="t.demoLoadingTitle" :description="t.demoLoadingDesc" :code="LoadingSource">
      <LoadingSkeleton />
    </DemoBox>

    <DemoBox :title="t.demoRowsTitle" :description="t.demoRowsDesc" :code="RowsSource">
      <RowsSkeleton />
    </DemoBox>

    <DemoBox :title="t.demoCardTitle" :description="t.demoCardDesc" :code="CardSource">
      <CardSkeleton />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideSkeleton />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledSkeleton />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableSkeletonApi" :data="skeletonProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="skeletonCssVars" />
    </template>
  </ComponentDoc>
</template>
