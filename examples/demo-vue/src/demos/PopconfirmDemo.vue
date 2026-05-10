<script setup lang="ts">
/**
 * `PopconfirmDemo` — aggregator for the Popconfirm component page.
 *
 * Mirrors `examples/demo/src/demos/PopconfirmDemo.tsx` 1:1 with
 * Vue-specific deltas (already documented in the doc strings):
 *   - `title` / `description` are `string` (React: `ReactNode`).
 *   - Action callbacks are emits: `@confirm` / `@cancel`.
 *   - Trigger goes into the default slot (React: single child).
 *   - The bubble renders inline in both frameworks (no portal).
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

import { usePopconfirmDocStrings } from './popconfirm-doc/useStrings'

import BasicPopconfirm from './popconfirm/Basic.demo.vue'
import BasicSource from './popconfirm/Basic.demo.vue?raw'
import WithDescriptionPopconfirm from './popconfirm/WithDescription.demo.vue'
import WithDescriptionSource from './popconfirm/WithDescription.demo.vue?raw'
import PlacementPopconfirm from './popconfirm/Placement.demo.vue'
import PlacementSource from './popconfirm/Placement.demo.vue?raw'
import DisabledPopconfirm from './popconfirm/Disabled.demo.vue'
import DisabledSource from './popconfirm/Disabled.demo.vue?raw'
import InTablePopconfirm from './popconfirm/InTable.demo.vue'
import InTableSource from './popconfirm/InTable.demo.vue?raw'
import TokensOverridePopconfirm from './popconfirm/TokensOverride.demo.vue'
import TokensOverrideSource from './popconfirm/TokensOverride.demo.vue?raw'
import UnstyledPopconfirm from './popconfirm/Unstyled.demo.vue'
import UnstyledSource from './popconfirm/Unstyled.demo.vue?raw'

const t = usePopconfirmDocStrings()

const popconfirmProps = computed<PropDef[]>(() => [
  { name: 'title', description: t.value.propTitle, type: 'string', required: true },
  { name: 'description', description: t.value.propDescription, type: 'string' },
  { name: 'okText', description: t.value.propOkText, type: 'string', default: "'Yes'" },
  {
    name: 'cancelText',
    description: t.value.propCancelText,
    type: 'string',
    default: "'No'",
  },
  {
    name: 'placement',
    description: t.value.propPlacement,
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@confirm', description: t.value.emitConfirm, type: '() => void' },
  { name: '@cancel', description: t.value.emitCancel, type: '() => void' },
  { name: '#default', description: t.value.slotDefault, type: 'slot' },
])

const popconfirmCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.value.cssBgElevated },
  {
    name: 'sg-color-border-secondary',
    default: 'rgba(5, 5, 5, 0.04)',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  { name: 'sg-color-warning', default: '#faad14', description: t.value.cssWarning },
  { name: 'sg-color-primary', default: '#1677ff', description: t.value.cssPrimary },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssFontSizeLg },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssPaddingMd },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssMarginXs },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssRadiusLg },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: t.value.cssShadowLg,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbPopconfirm]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicPopconfirm />
    </DemoBox>

    <DemoBox
      :title="t.demoDescTitle"
      :description="t.demoDescDesc"
      :code="WithDescriptionSource"
    >
      <WithDescriptionPopconfirm />
    </DemoBox>

    <DemoBox
      :title="t.demoPlacementTitle"
      :description="t.demoPlacementDesc"
      :code="PlacementSource"
    >
      <PlacementPopconfirm />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="DisabledSource"
    >
      <DisabledPopconfirm />
    </DemoBox>

    <DemoBox :title="t.demoTableTitle" :description="t.demoTableDesc" :code="InTableSource">
      <InTablePopconfirm />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverridePopconfirm />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
    >
      <UnstyledPopconfirm />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tablePopconfirmApi" :data="popconfirmProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="popconfirmCssVars" />
    </template>
  </ComponentDoc>
</template>
