<script setup lang="ts">
/**
 * `AvatarDemo` — aggregator for the Avatar component page.
 *
 * Mirrors `examples/demo/src/demos/AvatarDemo.tsx` 1:1 (8 examples).
 * Vue-specific deltas: `className` / `style` props removed from the
 * PropsTable (Vue uses class/style fallthrough). `icon` is a slot,
 * not a prop (`#icon`); `children` (default slot) is the text fallback.
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

import { useAvatarDocStrings } from './avatar-doc/useStrings'

import SizesAvatar from './avatar/Sizes.demo.vue'
import SizesSource from './avatar/Sizes.demo.vue?raw'
import ShapesAvatar from './avatar/Shapes.demo.vue'
import ShapesSource from './avatar/Shapes.demo.vue?raw'
import FallbackAvatar from './avatar/Fallback.demo.vue'
import FallbackSource from './avatar/Fallback.demo.vue?raw'
import ColoredInitialsAvatar from './avatar/ColoredInitials.demo.vue'
import ColoredInitialsSource from './avatar/ColoredInitials.demo.vue?raw'
import GroupAvatar from './avatar/Group.demo.vue'
import GroupSource from './avatar/Group.demo.vue?raw'
import WithBadgeAvatar from './avatar/WithBadge.demo.vue'
import WithBadgeSource from './avatar/WithBadge.demo.vue?raw'
import TokensOverrideAvatar from './avatar/TokensOverride.demo.vue'
import TokensOverrideSource from './avatar/TokensOverride.demo.vue?raw'

const t = useAvatarDocStrings()

const avatarProps = computed<PropDef[]>(() => [
  { name: 'src', description: t.value.propSrc, type: 'string' },
  { name: 'alt', description: t.value.propAlt, type: 'string' },
  { name: 'aria-label', description: t.value.propAriaLabel, type: 'string' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large' | number",
    default: "'middle'",
  },
  {
    name: 'shape',
    description: t.value.propShape,
    type: "'circle' | 'square'",
    default: "'circle'",
  },
  { name: '#icon', description: t.value.propIcon, type: 'slot' },
  { name: '#default', description: t.value.propChildren, type: 'slot' },
  {
    name: 'unstyled',
    description: t.value.propUnstyled,
    type: 'boolean',
    default: 'false',
  },
])

const avatarCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssSgColorWhite },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  {
    name: 'sg-color-bg-container',
    default: '#ffffff',
    description: t.value.cssSgColorBgContainer,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbAvatar]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesAvatar />
    </DemoBox>

    <DemoBox :title="t.demoShapesTitle" :description="t.demoShapesDesc" :code="ShapesSource">
      <ShapesAvatar />
    </DemoBox>

    <DemoBox :title="t.demoFallbackTitle" :description="t.demoFallbackDesc" :code="FallbackSource">
      <FallbackAvatar />
    </DemoBox>

    <DemoBox
      :title="t.demoColoredTitle"
      :description="t.demoColoredDesc"
      :code="ColoredInitialsSource"
    >
      <ColoredInitialsAvatar />
    </DemoBox>

    <DemoBox :title="t.demoGroupTitle" :description="t.demoGroupDesc" :code="GroupSource">
      <GroupAvatar />
    </DemoBox>

    <DemoBox
      :title="t.demoWithBadgeTitle"
      :description="t.demoWithBadgeDesc"
      :code="WithBadgeSource"
    >
      <WithBadgeAvatar />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideAvatar />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableAvatarApi" :data="avatarProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="avatarCssVars" />
    </template>
  </ComponentDoc>
</template>
