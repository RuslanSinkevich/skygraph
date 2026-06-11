<script setup lang="ts">
/**
 * `SpinDemo` — aggregator for the Spin component page.
 *
 * Mirrors `examples/demo/src/demos/SpinDemo.tsx` (10 examples).
 * Vue-specific delta: `indicator` is a slot (`#indicator`),
 * `tip` remains a `string` prop.
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

import { useSpinDocStrings } from './spin-doc/useStrings'

import BasicSpin from './spin/Basic.demo.vue'
import BasicSource from './spin/Basic.demo.vue?raw'
import SizesSpin from './spin/Sizes.demo.vue'
import SizesSource from './spin/Sizes.demo.vue?raw'
import TipSpin from './spin/Tip.demo.vue'
import TipSource from './spin/Tip.demo.vue?raw'
import ContainerSpin from './spin/Container.demo.vue'
import ContainerSource from './spin/Container.demo.vue?raw'
import DelaySpin from './spin/Delay.demo.vue'
import DelaySource from './spin/Delay.demo.vue?raw'
import CustomIndicatorSpin from './spin/CustomIndicator.demo.vue'
import CustomIndicatorSource from './spin/CustomIndicator.demo.vue?raw'
import FullscreenSpin from './spin/Fullscreen.demo.vue'
import FullscreenSource from './spin/Fullscreen.demo.vue?raw'
import CustomColorSpin from './spin/CustomColor.demo.vue'
import CustomColorSource from './spin/CustomColor.demo.vue?raw'
import TokensOverrideSpin from './spin/TokensOverride.demo.vue'
import TokensOverrideSource from './spin/TokensOverride.demo.vue?raw'

const t = useSpinDocStrings()

const spinProps = computed<PropDef[]>(() => [
  { name: 'spinning', description: t.value.propSpinning, type: 'boolean', default: 'true' },
  { name: 'size', description: t.value.propSize, type: "'small' | 'middle' | 'large'" },
  { name: 'delay', description: t.value.propDelay, type: 'number' },
  { name: 'tip', description: t.value.propTip, type: 'string' },
  { name: 'fullscreen', description: t.value.propFullscreen, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '#indicator', description: t.value.propIndicatorSlot, type: 'slot' },
  { name: '#default', description: t.value.propDefaultSlot, type: 'slot' },
])

const spinCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-spin-color', default: 'var(--sg-color-primary)', description: t.value.cssSpinColor },
  {
    name: 'sg-spin-overlay-bg',
    default: 'rgba(255, 255, 255, 0.7)',
    description: t.value.cssSpinOverlayBg,
  },
  { name: 'sg-motion-duration-mid', default: '0.2s', description: t.value.cssMotionDuration },
  { name: 'sg-z-modal', default: '1000', description: t.value.cssZModal },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssBorderRadius },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbSpin]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicSpin />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesSpin />
    </DemoBox>

    <DemoBox
      :title="t.demoContainerTitle"
      :description="t.demoContainerDesc"
      :code="ContainerSource"
    >
      <ContainerSpin />
    </DemoBox>

    <DemoBox :title="t.demoTipTitle" :description="t.demoTipDesc" :code="TipSource">
      <TipSpin />
    </DemoBox>

    <DemoBox :title="t.demoDelayTitle" :description="t.demoDelayDesc" :code="DelaySource">
      <DelaySpin />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomColorTitle"
      :description="t.demoCustomColorDesc"
      :code="CustomColorSource"
    >
      <CustomColorSpin />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomIndicatorTitle"
      :description="t.demoCustomIndicatorDesc"
      :code="CustomIndicatorSource"
    >
      <CustomIndicatorSpin />
    </DemoBox>

    <DemoBox
      :title="t.demoFullscreenTitle"
      :description="t.demoFullscreenDesc"
      :code="FullscreenSource"
    >
      <FullscreenSpin />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideSpin />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableSpinApi" :data="spinProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="spinCssVars" />
    </template>
  </ComponentDoc>
</template>
