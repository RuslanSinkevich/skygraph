<script setup lang="ts">
/**
 * `DrawerDemo` — aggregator for the Drawer component page.
 *
 * Mirrors `examples/demo/src/demos/DrawerDemo.tsx` 1:1 with these
 * Vue-specific deltas:
 *   - `<SgDrawer>` mounts via `<Teleport to="body">` (parity with
 *     React's portal — same `sg-drawer-mask` / `sg-drawer` DOM).
 *   - Closing emits `@close`; custom footer goes into the `#footer`
 *     slot (React: `footer` prop).
 *   - There is no `className` / `style` prop — the `TokensOverride`
 *     and `Unstyled` demos toggle a body-level class while open.
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

import { useDrawerDocStrings } from './drawer-doc/useStrings'

import BasicDrawer from './drawer/Basic.demo.vue'
import BasicSource from './drawer/Basic.demo.vue?raw'
import PlacementDrawer from './drawer/Placement.demo.vue'
import PlacementSource from './drawer/Placement.demo.vue?raw'
import SizesDrawer from './drawer/Sizes.demo.vue'
import SizesSource from './drawer/Sizes.demo.vue?raw'
import FooterDrawer from './drawer/Footer.demo.vue'
import FooterSource from './drawer/Footer.demo.vue?raw'
import NoMaskDrawer from './drawer/NoMask.demo.vue'
import NoMaskSource from './drawer/NoMask.demo.vue?raw'
import TokensOverrideDrawer from './drawer/TokensOverride.demo.vue'
import TokensOverrideSource from './drawer/TokensOverride.demo.vue?raw'
import UnstyledDrawer from './drawer/Unstyled.demo.vue'
import UnstyledSource from './drawer/Unstyled.demo.vue?raw'

const t = useDrawerDocStrings()

const drawerProps = computed<PropDef[]>(() => [
  { name: 'open', description: t.value.propOpen, type: 'boolean', required: true },
  { name: 'title', description: t.value.propTitle, type: 'string' },
  {
    name: 'placement',
    description: t.value.propPlacement,
    type: "'left' | 'right' | 'top' | 'bottom'",
    default: "'right'",
  },
  { name: 'width', description: t.value.propWidth, type: 'number | string', default: '378' },
  { name: 'height', description: t.value.propHeight, type: 'number | string', default: '378' },
  { name: 'closable', description: t.value.propClosable, type: 'boolean', default: 'true' },
  { name: 'mask', description: t.value.propMask, type: 'boolean', default: 'true' },
  {
    name: 'maskClosable',
    description: t.value.propMaskClosable,
    type: 'boolean',
    default: 'true',
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@close', description: t.value.emitClose, type: '() => void' },
  { name: '#default', description: t.value.slotDefault, type: 'slot' },
  { name: '#footer', description: t.value.slotFooter, type: 'slot' },
])

const drawerCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.value.cssBgElevated },
  { name: 'sg-color-overlay', default: 'rgba(0, 0, 0, 0.45)', description: t.value.cssOverlay },
  {
    name: 'sg-color-border-secondary',
    default: 'rgba(5, 5, 5, 0.04)',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssFontSizeLg },
  { name: 'sg-font-size-xl', default: '20px', description: t.value.cssFontSizeXl },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssPaddingMd },
  { name: 'sg-padding-xl', default: '24px', description: t.value.cssPaddingXl },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: t.value.cssShadowLg,
  },
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
  { name: 'sg-z-modal', default: '1000', description: t.value.cssZModal },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbDrawer]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicDrawer />
    </DemoBox>

    <DemoBox
      :title="t.demoPlacementTitle"
      :description="t.demoPlacementDesc"
      :code="PlacementSource"
    >
      <PlacementDrawer />
    </DemoBox>

    <DemoBox :title="t.demoSizeTitle" :description="t.demoSizeDesc" :code="SizesSource">
      <SizesDrawer />
    </DemoBox>

    <DemoBox :title="t.demoFooterTitle" :description="t.demoFooterDesc" :code="FooterSource">
      <FooterDrawer />
    </DemoBox>

    <DemoBox :title="t.demoNoMaskTitle" :description="t.demoNoMaskDesc" :code="NoMaskSource">
      <NoMaskDrawer />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideDrawer />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
    >
      <UnstyledDrawer />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDrawerApi" :data="drawerProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="drawerCssVars" />
    </template>
  </ComponentDoc>
</template>
