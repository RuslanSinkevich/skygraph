<script setup lang="ts">
/**
 * `CarouselDemo` — aggregator for the Carousel component page.
 *
 * Mirrors `examples/demo/src/demos/CarouselDemo.tsx` (7 examples).
 * Vue-specific delta: each slide is a default-slot child (rather than a React
 * `children` array). All slide chrome / autoplay / dot logic comes from
 * `SgCarousel`.
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

import { useCarouselDocStrings } from './carousel-doc/useStrings'

import BasicCarousel from './carousel/Basic.demo.vue'
import BasicSource from './carousel/Basic.demo.vue?raw'
import AutoplayCarousel from './carousel/Autoplay.demo.vue'
import AutoplaySource from './carousel/Autoplay.demo.vue?raw'
import FadeCarousel from './carousel/Fade.demo.vue'
import FadeSource from './carousel/Fade.demo.vue?raw'
import DotPositionCarousel from './carousel/DotPosition.demo.vue'
import DotPositionSource from './carousel/DotPosition.demo.vue?raw'
import HiddenDotsCarousel from './carousel/HiddenDots.demo.vue'
import HiddenDotsSource from './carousel/HiddenDots.demo.vue?raw'
import TokensOverrideCarousel from './carousel/TokensOverride.demo.vue'
import TokensOverrideSource from './carousel/TokensOverride.demo.vue?raw'

const t = useCarouselDocStrings()

const carouselProps = computed<PropDef[]>(() => [
  { name: 'autoplay', description: t.value.propAutoplay, type: 'boolean', default: 'false' },
  {
    name: 'autoplaySpeed',
    description: t.value.propAutoplaySpeed,
    type: 'number',
    default: '3000',
  },
  { name: 'dots', description: t.value.propDots, type: 'boolean', default: 'true' },
  {
    name: 'dotPosition',
    description: t.value.propDotPosition,
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
  },
  {
    name: 'effect',
    description: t.value.propEffect,
    type: "'scrollx' | 'fade'",
    default: "'scrollx'",
  },
  { name: '#default', description: t.value.propChildren, type: 'slot' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const carouselCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
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
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssPaddingXs },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssPaddingSm },
  {
    name: 'sg-motion-duration-mid',
    default: '0.2s',
    description: t.value.cssTransitionDuration,
  },
  {
    name: 'sg-motion-ease-in-out',
    default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    description: t.value.cssTransitionTiming,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbCarousel]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicCarousel />
    </DemoBox>

    <DemoBox :title="t.demoAutoplayTitle" :description="t.demoAutoplayDesc" :code="AutoplaySource">
      <AutoplayCarousel />
    </DemoBox>

    <DemoBox :title="t.demoFadeTitle" :description="t.demoFadeDesc" :code="FadeSource">
      <FadeCarousel />
    </DemoBox>

    <DemoBox
      :title="t.demoDotPositionTitle"
      :description="t.demoDotPositionDesc"
      :code="DotPositionSource"
    >
      <DotPositionCarousel />
    </DemoBox>

    <DemoBox
      :title="t.demoHiddenDotsTitle"
      :description="t.demoHiddenDotsDesc"
      :code="HiddenDotsSource"
    >
      <HiddenDotsCarousel />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideCarousel />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableCarouselApi" :data="carouselProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="carouselCssVars" />
    </template>
  </ComponentDoc>
</template>
