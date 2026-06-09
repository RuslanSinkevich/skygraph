<script setup lang="ts">
/**
 * `DropdownDemo` — aggregator for the Dropdown component page.
 *
 * 1:1 with React `examples/demo/src/demos/DropdownDemo.tsx` — 8 demos.
 * Rich rows are rendered through the `#item` scoped slot.
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

import { useDropdownDocStrings } from './dropdown-doc/useStrings'

import BasicDropdown from './dropdown/Basic.demo.vue'
import BasicSource from './dropdown/Basic.demo.vue?raw'
import TriggerDropdown from './dropdown/Trigger.demo.vue'
import TriggerSource from './dropdown/Trigger.demo.vue?raw'
import PlacementDropdown from './dropdown/Placement.demo.vue'
import PlacementSource from './dropdown/Placement.demo.vue?raw'
import RichItemsDropdown from './dropdown/RichItems.demo.vue'
import RichItemsSource from './dropdown/RichItems.demo.vue?raw'
import DisabledDropdown from './dropdown/Disabled.demo.vue'
import DisabledSource from './dropdown/Disabled.demo.vue?raw'
import KeyboardDropdown from './dropdown/Keyboard.demo.vue'
import KeyboardSource from './dropdown/Keyboard.demo.vue?raw'
import TokensOverrideDropdown from './dropdown/TokensOverride.demo.vue'
import TokensOverrideSource from './dropdown/TokensOverride.demo.vue?raw'

const t = useDropdownDocStrings()

const dropdownProps = computed<PropDef[]>(() => [
  { name: 'items', description: t.value.propItems, type: 'DropdownItem[]', required: true },
  {
    name: 'trigger',
    description: t.value.propTrigger,
    type: "'click' | 'hover'",
    default: "'hover'",
  },
  {
    name: 'placement',
    description: t.value.propPlacement,
    type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'",
    default: "'bottomLeft'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@select', description: t.value.emitSelect, type: '(key: string) => void' },
  { name: 'default slot', description: t.value.slotDefault, type: 'VNode' },
])

const dropdownItemProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.itemKey, type: 'string', required: true },
  { name: 'label', description: t.value.itemLabel, type: 'string', required: true },
  { name: 'disabled', description: t.value.itemDisabled, type: 'boolean' },
  { name: 'danger', description: t.value.itemDanger, type: 'boolean' },
  { name: 'divider', description: t.value.itemDivider, type: 'boolean' },
])

const dropdownCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.value.cssBgElevated },
  {
    name: 'sg-color-border-secondary',
    default: 'rgba(5, 5, 5, 0.04)',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.value.cssBgHover },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssTextDisabled,
  },
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssError },
  { name: 'sg-color-error-bg', default: '#fff2f0', description: t.value.cssErrorBg },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-line-height', default: '1.5714', description: t.value.cssLineHeight },
  { name: 'sg-padding-xs', default: '4px', description: t.value.cssPaddingXs },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssPaddingMd },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssMarginXs },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssBorderRadiusLg },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: t.value.cssShadowLg,
  },
  { name: 'sg-z-dropdown', default: '1050', description: t.value.cssZDropdown },
  { name: 'sg-transition-duration', default: '180ms', description: t.value.cssTransitionDuration },
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
    :crumbs="[t.crumbCategory, t.crumbDropdown]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicDropdown />
    </DemoBox>
    <DemoBox :title="t.demoTriggerTitle" :description="t.demoTriggerDesc" :code="TriggerSource">
      <TriggerDropdown />
    </DemoBox>
    <DemoBox
      :title="t.demoPlacementTitle"
      :description="t.demoPlacementDesc"
      :code="PlacementSource"
    >
      <PlacementDropdown />
    </DemoBox>
    <DemoBox
      :title="t.demoRichItemsTitle"
      :description="t.demoRichItemsDesc"
      :code="RichItemsSource"
    >
      <RichItemsDropdown />
    </DemoBox>
    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledDropdown />
    </DemoBox>
    <DemoBox :title="t.demoKeyboardTitle" :description="t.demoKeyboardDesc" :code="KeyboardSource">
      <KeyboardDropdown />
    </DemoBox>
    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideDropdown />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableDropdownApi" :data="dropdownProps" />
      <PropsTable :title="t.tableDropdownItem" :data="dropdownItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="dropdownCssVars" />
    </template>
  </ComponentDoc>
</template>
