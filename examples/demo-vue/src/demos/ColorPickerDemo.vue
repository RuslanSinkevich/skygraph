<script setup lang="ts">
/**
 * `ColorPickerDemo` — aggregator for the ColorPicker component page.
 *
 * Mirrors `examples/demo/src/demos/ColorPickerDemo.tsx` (9 examples).
 * Vue delta: `show-text` is boolean only — see
 * `findings/T-Vue-Demo-Forms.md` →
 * `colorpicker-showtext-boolean-only-in-vue`.
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
import { useColorPickerDocStrings } from './colorpicker-doc/useStrings'

import BasicColorPickerDemo from './colorpicker/Basic.demo.vue'
import BasicSource from './colorpicker/Basic.demo.vue?raw'
import FormatsColorPickerDemo from './colorpicker/Formats.demo.vue'
import FormatsSource from './colorpicker/Formats.demo.vue?raw'
import PresetsColorPickerDemo from './colorpicker/Presets.demo.vue'
import PresetsSource from './colorpicker/Presets.demo.vue?raw'
import SizesColorPickerDemo from './colorpicker/Sizes.demo.vue'
import SizesSource from './colorpicker/Sizes.demo.vue?raw'
import TriggerColorPickerDemo from './colorpicker/Trigger.demo.vue'
import TriggerSource from './colorpicker/Trigger.demo.vue?raw'
import DisabledColorPickerDemo from './colorpicker/Disabled.demo.vue'
import DisabledSource from './colorpicker/Disabled.demo.vue?raw'
import ThemeSwapColorPickerDemo from './colorpicker/ThemeSwap.demo.vue'
import ThemeSwapSource from './colorpicker/ThemeSwap.demo.vue?raw'
import TokensOverrideColorPickerDemo from './colorpicker/TokensOverride.demo.vue'
import TokensOverrideSource from './colorpicker/TokensOverride.demo.vue?raw'
import UnstyledColorPickerDemo from './colorpicker/Unstyled.demo.vue'
import UnstyledSource from './colorpicker/Unstyled.demo.vue?raw'

const t = useColorPickerDocStrings()

const colorPickerProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'string' },
  { name: 'value', description: t.value.propValue, type: 'string' },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: 'string',
    default: "'#1677ff'",
  },
  {
    name: 'format',
    description: t.value.propFormat,
    type: "'hex' | 'rgb'",
    default: "'hex'",
  },
  {
    name: 'presets',
    description: t.value.propPresets,
    type: 'Array<{ label: string; colors: string[] }>',
  },
  { name: 'showText', description: t.value.propShowText, type: 'boolean', default: 'false' },
  {
    name: 'trigger',
    description: t.value.propTrigger,
    type: "'click' | 'hover'",
    default: "'click'",
  },
  { name: 'open', description: t.value.propOpen, type: 'boolean' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(value: string) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value: string) => void' },
  {
    name: '@openChange',
    description: t.value.emitOpenChange,
    type: '(open: boolean) => void',
  },
])

const colorPickerCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: 'rgba(5, 5, 5, 0.04)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssSgColorPrimary },
  {
    name: 'sg-color-primary-hover',
    default: '#4096ff',
    description: t.value.cssSgColorPrimaryHover,
  },
  {
    name: 'sg-color-primary-bg',
    default: 'rgba(22, 119, 255, 0.1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-bg-container',
    default: '#ffffff',
    description: t.value.cssSgColorBgContainer,
  },
  {
    name: 'sg-color-bg-elevated',
    default: '#ffffff',
    description: t.value.cssSgColorBgElevated,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssSgColorTextSecondary,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssSgBorderRadiusLg },
  { name: 'sg-height-sm', default: '24px', description: t.value.cssSgHeightSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssSgHeightMd },
  { name: 'sg-height-lg', default: '40px', description: t.value.cssSgHeightLg },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssSgPaddingMd },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: t.value.cssSgShadowLg,
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
  { name: 'sg-z-dropdown', default: '1050', description: t.value.cssSgZDropdown },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbColorPicker]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicColorPickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoFormatsTitle" :description="t.demoFormatsDesc" :code="FormatsSource">
      <FormatsColorPickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoPresetsTitle" :description="t.demoPresetsDesc" :code="PresetsSource">
      <PresetsColorPickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesColorPickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoTriggerTitle" :description="t.demoTriggerDesc" :code="TriggerSource">
      <TriggerColorPickerDemo />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledColorPickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoThemeSwapTitle"
      :description="t.demoThemeSwapDesc"
      :code="ThemeSwapSource"
    >
      <ThemeSwapColorPickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideColorPickerDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
    >
      <UnstyledColorPickerDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableColorPickerApi" :data="colorPickerProps" />
      <CssVarsTable
        :title="t.tableCssVars"
        :hint="t.cssHint"
        :data="colorPickerCssVars"
      />
    </template>
  </ComponentDoc>
</template>
