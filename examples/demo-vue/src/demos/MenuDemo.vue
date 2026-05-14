<script setup lang="ts">
/**
 * `MenuDemo` — aggregator for the Menu component page.
 * Mirrors `examples/demo/src/demos/MenuDemo.tsx` 1:1 (10/10).
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

import { useMenuDocStrings } from './menu-doc/useStrings'

import VerticalMenu from './menu/Vertical.demo.vue'
import VerticalSource from './menu/Vertical.demo.vue?raw'
import HorizontalMenu from './menu/Horizontal.demo.vue'
import HorizontalSource from './menu/Horizontal.demo.vue?raw'
import InlineMenu from './menu/Inline.demo.vue'
import InlineSource from './menu/Inline.demo.vue?raw'
import ControlledMenu from './menu/Controlled.demo.vue'
import ControlledSource from './menu/Controlled.demo.vue?raw'
import WithIconsMenu from './menu/WithIcons.demo.vue'
import WithIconsSource from './menu/WithIcons.demo.vue?raw'
import GroupsDividersMenu from './menu/GroupsDividers.demo.vue'
import GroupsDividersSource from './menu/GroupsDividers.demo.vue?raw'
import CollapsedMenu from './menu/Collapsed.demo.vue'
import CollapsedSource from './menu/Collapsed.demo.vue?raw'
import DarkThemeMenu from './menu/DarkTheme.demo.vue'
import DarkThemeSource from './menu/DarkTheme.demo.vue?raw'
import TokensOverrideMenu from './menu/TokensOverride.demo.vue'
import TokensOverrideSource from './menu/TokensOverride.demo.vue?raw'
import UnstyledMenu from './menu/Unstyled.demo.vue'
import UnstyledSource from './menu/Unstyled.demo.vue?raw'

const t = useMenuDocStrings()

const menuProps = computed<PropDef[]>(() => [
  { name: 'items', description: t.value.propItems, type: 'MenuItem[]', required: true },
  {
    name: 'mode',
    description: t.value.propMode,
    type: "'vertical' | 'horizontal' | 'inline'",
    default: "'vertical'",
  },
  { name: 'selectedKeys', description: t.value.propSelectedKeys, type: 'string[]' },
  {
    name: 'defaultSelectedKeys',
    description: t.value.propDefaultSelectedKeys,
    type: 'string[]',
    default: '[]',
  },
  { name: 'openKeys', description: t.value.propOpenKeys, type: 'string[]' },
  {
    name: 'defaultOpenKeys',
    description: t.value.propDefaultOpenKeys,
    type: 'string[]',
    default: '[]',
  },
  { name: 'theme', description: t.value.propTheme, type: "'light' | 'dark'", default: "'light'" },
  {
    name: 'inlineCollapsed',
    description: t.value.propInlineCollapsed,
    type: 'boolean',
    default: 'false',
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@select',
    description: t.value.emitSelect,
    type: '(info: { key: string; selectedKeys: string[] }) => void',
  },
  { name: '@openChange', description: t.value.emitOpenChange, type: '(keys: string[]) => void' },
])

const menuItemProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.itemKey, type: 'string', required: true },
  { name: 'label', description: t.value.itemLabel, type: 'string', required: true },
  { name: 'icon', description: t.value.itemIcon, type: 'VNodeChild' },
  { name: 'disabled', description: t.value.itemDisabled, type: 'boolean' },
  { name: 'danger', description: t.value.itemDanger, type: 'boolean' },
  { name: 'children', description: t.value.itemChildren, type: 'MenuItem[]' },
  { name: 'type', description: t.value.itemType, type: "'group' | 'divider'" },
])

const menuCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssPrimary },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: t.value.cssPrimaryBg },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: t.value.cssPrimaryHover,
  },
  { name: 'sg-color-bg-container', default: '#ffffff', description: t.value.cssBgContainer },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.value.cssBgElevated },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.value.cssBgHover },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssTextDisabled,
  },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.value.cssError },
  { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: t.value.cssErrorBg },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssBorderRadiusLg },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.08)',
    description: t.value.cssShadowLg,
  },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssFontSizeLg },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
  { name: 'sg-height-md', default: '32px', description: t.value.cssHeightMd },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssPaddingXs },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssPaddingSm },
  { name: 'sg-padding-md', default: '16px', description: t.value.cssPaddingMd },
  { name: 'sg-padding-lg', default: '24px', description: t.value.cssPaddingLg },
  { name: 'sg-margin-xs', default: '8px', description: t.value.cssMarginXs },
  { name: 'sg-z-dropdown', default: '1050', description: t.value.cssZDropdown },
  { name: 'sg-line-height', default: '1.5714', description: t.value.cssLineHeight },
  { name: 'sg-transition-duration', default: '0.2s', description: t.value.cssTransitionDuration },
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
    :crumbs="[t.crumbCategory, t.crumbMenu]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoVerticalTitle" :description="t.demoVerticalDesc" :code="VerticalSource">
      <VerticalMenu />
    </DemoBox>
    <DemoBox
      :title="t.demoHorizontalTitle"
      :description="t.demoHorizontalDesc"
      :code="HorizontalSource"
    >
      <HorizontalMenu />
    </DemoBox>
    <DemoBox :title="t.demoInlineTitle" :description="t.demoInlineDesc" :code="InlineSource">
      <InlineMenu />
    </DemoBox>
    <DemoBox
      :title="t.demoControlledTitle"
      :description="t.demoControlledDesc"
      :code="ControlledSource"
    >
      <ControlledMenu />
    </DemoBox>
    <DemoBox :title="t.demoIconsTitle" :description="t.demoIconsDesc" :code="WithIconsSource">
      <WithIconsMenu />
    </DemoBox>
    <DemoBox
      :title="t.demoGroupsTitle"
      :description="t.demoGroupsDesc"
      :code="GroupsDividersSource"
    >
      <GroupsDividersMenu />
    </DemoBox>
    <DemoBox
      :title="t.demoCollapsedTitle"
      :description="t.demoCollapsedDesc"
      :code="CollapsedSource"
    >
      <CollapsedMenu />
    </DemoBox>
    <DemoBox :title="t.demoDarkTitle" :description="t.demoDarkDesc" :code="DarkThemeSource">
      <DarkThemeMenu />
    </DemoBox>
    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideMenu />
    </DemoBox>
    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledMenu />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableMenuApi" :data="menuProps" />
      <PropsTable :title="t.tableMenuItem" :data="menuItemProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="menuCssVars" />
    </template>
  </ComponentDoc>
</template>
