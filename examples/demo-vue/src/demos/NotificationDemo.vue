<script setup lang="ts">
/**
 * `NotificationDemo` — aggregator for the Notification component
 * page.
 *
 * Mirrors `examples/demo/src/demos/NotificationDemo.tsx` 1:1 with
 * Vue-specific deltas (already documented in the doc strings):
 *   - `message` and `description` are `string` only — the React
 *     `RichContent.demo` is replaced with a plain-text variant.
 *   - The container is `<SgNotificationContainer>` and is mounted
 *     inside this aggregator (the React `App.tsx` mounts them
 *     globally; the Vue `App.vue` does not).
 *   - The implementation does not use Teleport — it expects the
 *     consumer to mount the container in the correct tree
 *     position (parity with React, which also does not portal).
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
import { SgNotificationContainer } from '@skygraph/vue'

import { useNotificationDocStrings } from './notification-doc/useStrings'

import BasicNotification from './notification/Basic.demo.vue'
import BasicSource from './notification/Basic.demo.vue?raw'
import TypesNotification from './notification/Types.demo.vue'
import TypesSource from './notification/Types.demo.vue?raw'
import DurationNotification from './notification/Duration.demo.vue'
import DurationSource from './notification/Duration.demo.vue?raw'
import PlacementNotification from './notification/Placement.demo.vue'
import PlacementSource from './notification/Placement.demo.vue?raw'
import OnCloseNotification from './notification/OnClose.demo.vue'
import OnCloseSource from './notification/OnClose.demo.vue?raw'
import RichContentNotification from './notification/RichContent.demo.vue'
import RichContentSource from './notification/RichContent.demo.vue?raw'
import DestroyAllNotification from './notification/DestroyAll.demo.vue'
import DestroyAllSource from './notification/DestroyAll.demo.vue?raw'
import TokensOverrideNotification from './notification/TokensOverride.demo.vue'
import TokensOverrideSource from './notification/TokensOverride.demo.vue?raw'

const t = useNotificationDocStrings()

const configProps = computed<PropDef[]>(() => [
  {
    name: 'type',
    description: t.value.cfgType,
    type: "'success' | 'error' | 'warning' | 'info'",
    default: "'info'",
  },
  { name: 'message', description: t.value.cfgMessage, type: 'string', required: true },
  { name: 'description', description: t.value.cfgDescription, type: 'string' },
  { name: 'duration', description: t.value.cfgDuration, type: 'number', default: '4500' },
  {
    name: 'placement',
    description: t.value.cfgPlacement,
    type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'",
    default: "'topRight'",
  },
  { name: 'key', description: t.value.cfgKey, type: 'string' },
  { name: 'onClose', description: t.value.cfgOnClose, type: '() => void' },
])

const containerProps = computed<PropDef[]>(() => [
  {
    name: 'placement',
    description: t.value.containerPlacement,
    type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'",
    default: "'topRight'",
  },
  {
    name: 'unstyled',
    description: t.value.containerUnstyled,
    type: 'boolean',
    default: 'false',
  },
])

const utilityMethods = computed<PropDef[]>(() => [
  {
    name: 'notification.open(config)',
    description: t.value.utilOpen,
    type: '(config: NotificationConfig) => void',
  },
  {
    name: 'notification.success(message, description?)',
    description: t.value.utilSuccess,
    type: '(message: string, description?: string) => void',
  },
  {
    name: 'notification.error(message, description?)',
    description: t.value.utilError,
    type: '(message: string, description?: string) => void',
  },
  {
    name: 'notification.warning(message, description?)',
    description: t.value.utilWarning,
    type: '(message: string, description?: string) => void',
  },
  {
    name: 'notification.info(message, description?)',
    description: t.value.utilInfo,
    type: '(message: string, description?: string) => void',
  },
  { name: 'notification.destroy()', description: t.value.utilDestroy, type: '() => void' },
])

const notificationCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-z-notification', default: '1010', description: t.value.cssZ },
  { name: 'sg-padding-xl', default: '24px', description: t.value.cssPaddingXl },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssPaddingMd },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssPaddingLg },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-margin-sm', default: '8px', description: t.value.cssMarginSm },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssMarginXs },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.value.cssBgElevated },
  {
    name: 'sg-color-border-secondary',
    default: '#f0f0f0',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssRadiusLg },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: t.value.cssShadowLg,
  },
  {
    name: 'sg-transition-duration',
    default: '0.2s',
    description: t.value.cssTransitionDuration,
  },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    description: t.value.cssTransitionTiming,
  },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssFontSizeLg },
  { name: 'sg-color-text', default: '#000000d9', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: '#00000073',
    description: t.value.cssTextSecondary,
  },
  {
    name: 'sg-color-text-tertiary',
    default: '#00000040',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-color-success', default: '#52c41a', description: t.value.cssSuccess },
  { name: 'sg-color-success-bg', default: '#f6ffed', description: t.value.cssSuccessBg },
  { name: 'sg-color-error', default: '#ff4d4f', description: t.value.cssError },
  { name: 'sg-color-error-bg', default: '#fff2f0', description: t.value.cssErrorBg },
  { name: 'sg-color-warning', default: '#faad14', description: t.value.cssWarning },
  { name: 'sg-color-warning-bg', default: '#fffbe6', description: t.value.cssWarningBg },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
  { name: 'sg-color-primary-bg', default: '#e6f4ff', description: t.value.cssPrimaryBg },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbNotification]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicNotification />
    </DemoBox>

    <DemoBox :title="t.demoTypesTitle" :description="t.demoTypesDesc" :code="TypesSource">
      <TypesNotification />
    </DemoBox>

    <DemoBox :title="t.demoDurationTitle" :description="t.demoDurationDesc" :code="DurationSource">
      <DurationNotification />
    </DemoBox>

    <DemoBox
      :title="t.demoPlacementTitle"
      :description="t.demoPlacementDesc"
      :code="PlacementSource"
    >
      <PlacementNotification />
    </DemoBox>

    <DemoBox :title="t.demoOnCloseTitle" :description="t.demoOnCloseDesc" :code="OnCloseSource">
      <OnCloseNotification />
    </DemoBox>

    <DemoBox :title="t.demoRichTitle" :description="t.demoRichDesc" :code="RichContentSource">
      <RichContentNotification />
    </DemoBox>

    <DemoBox :title="t.demoDestroyTitle" :description="t.demoDestroyDesc" :code="DestroyAllSource">
      <DestroyAllNotification />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideNotification />
    </DemoBox>

    <SgNotificationContainer placement="topRight" />
    <SgNotificationContainer placement="topLeft" />
    <SgNotificationContainer placement="bottomRight" />

    <template #api>
      <PropsTable :title="t.tableConfig" :data="configProps" />
      <PropsTable :title="t.tableContainer" :data="containerProps" />
      <PropsTable :title="t.tableUtility" :data="utilityMethods" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="notificationCssVars" />
    </template>
  </ComponentDoc>
</template>
