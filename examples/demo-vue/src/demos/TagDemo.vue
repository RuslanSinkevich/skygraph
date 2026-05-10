<script setup lang="ts">
/**
 * `TagDemo` — aggregator for the Tag component page.
 *
 * Mirrors `examples/demo/src/demos/TagDemo.tsx` 1:1 (8 examples).
 * Vue-specific deltas: `className` / `style` props removed from
 * PropsTable (Vue uses class/style fallthrough), `onClose` is the
 * `@close` emit.
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

import { useTagDocStrings } from './tag-doc/useStrings'

import BasicTag from './tag/Basic.demo.vue'
import BasicSource from './tag/Basic.demo.vue?raw'
import PresetsTag from './tag/Presets.demo.vue'
import PresetsSource from './tag/Presets.demo.vue?raw'
import CustomColorTag from './tag/CustomColor.demo.vue'
import CustomColorSource from './tag/CustomColor.demo.vue?raw'
import BorderlessTag from './tag/Borderless.demo.vue'
import BorderlessSource from './tag/Borderless.demo.vue?raw'
import ClosableTag from './tag/Closable.demo.vue'
import ClosableSource from './tag/Closable.demo.vue?raw'
import WithIconTag from './tag/WithIcon.demo.vue'
import WithIconSource from './tag/WithIcon.demo.vue?raw'
import TokensOverrideTag from './tag/TokensOverride.demo.vue'
import TokensOverrideSource from './tag/TokensOverride.demo.vue?raw'
import UnstyledTag from './tag/Unstyled.demo.vue'
import UnstyledSource from './tag/Unstyled.demo.vue?raw'

const t = useTagDocStrings()

const tagProps = computed<PropDef[]>(() => [
  {
    name: 'color',
    description: t.value.propColor,
    type: "'default' | 'success' | 'error' | 'warning' | 'processing' | string",
    default: "'default'",
  },
  { name: 'closable', description: t.value.propClosable, type: 'boolean', default: 'false' },
  { name: '@close', description: t.value.propOnClose, type: '() => void' },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean', default: 'true' },
  { name: '#default', description: t.value.propChildren, type: 'slot' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const tagCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-bg-secondary',
    default: 'rgba(0, 0, 0, 0.02)',
    description: t.value.cssSgColorBgSecondary,
  },
  {
    name: 'sg-color-border',
    default: 'rgba(5, 5, 5, 0.06)',
    description: t.value.cssSgColorBorder,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  { name: 'sg-color-success', default: '#52c41a', description: t.value.cssSgColorSuccess },
  { name: 'sg-color-success-bg', default: '#f6ffed', description: t.value.cssSgColorSuccessBg },
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssSgColorError },
  { name: 'sg-color-error-bg', default: '#fff2f0', description: t.value.cssSgColorErrorBg },
  { name: 'sg-color-warning', default: '#faad14', description: t.value.cssSgColorWarning },
  { name: 'sg-color-warning-bg', default: '#fffbe6', description: t.value.cssSgColorWarningBg },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-bg',
    default: 'rgba(22, 119, 255, 0.1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  {
    name: 'sg-border-radius-sm',
    default: '4px',
    description: t.value.cssSgBorderRadiusSm,
  },
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
    :crumbs="[t.crumbDataDisplay, t.crumbTag]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTag />
    </DemoBox>

    <DemoBox :title="t.demoPresetsTitle" :description="t.demoPresetsDesc" :code="PresetsSource">
      <PresetsTag />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomColorTitle"
      :description="t.demoCustomColorDesc"
      :code="CustomColorSource"
    >
      <CustomColorTag />
    </DemoBox>

    <DemoBox
      :title="t.demoBorderlessTitle"
      :description="t.demoBorderlessDesc"
      :code="BorderlessSource"
    >
      <BorderlessTag />
    </DemoBox>

    <DemoBox :title="t.demoClosableTitle" :description="t.demoClosableDesc" :code="ClosableSource">
      <ClosableTag />
    </DemoBox>

    <DemoBox :title="t.demoWithIconTitle" :description="t.demoWithIconDesc" :code="WithIconSource">
      <WithIconTag />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTag />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledTag />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTagApi" :data="tagProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="tagCssVars" />
    </template>
  </ComponentDoc>
</template>
