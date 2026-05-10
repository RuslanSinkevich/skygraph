<script setup lang="ts">
/**
 * `TreeSelectDemo` — aggregator for the TreeSelect component page.
 *
 * Mirrors `examples/demo/src/demos/TreeSelectDemo.tsx` (7 examples).
 * Vue deltas — see `findings/T-Vue-Demo-Forms.md` →
 * `treeselect-no-cascade-in-vue` and `treeselect-naming-difference`:
 *   - node fields are `value` / `label` (not `key` / `title`);
 *   - `tree-checkable` does **not** auto-cascade child selection;
 *   - `treeDefaultExpandAll` is replaced by `default-expanded-keys`.
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
import { useTreeSelectDocStrings } from './treeselect-doc/useStrings'

import BasicTreeSelectDemo from './treeselect/Basic.demo.vue'
import BasicSource from './treeselect/Basic.demo.vue?raw'
import MultipleTreeSelectDemo from './treeselect/Multiple.demo.vue'
import MultipleSource from './treeselect/Multiple.demo.vue?raw'
import CheckableTreeSelectDemo from './treeselect/Checkable.demo.vue'
import CheckableSource from './treeselect/Checkable.demo.vue?raw'
import SearchTreeSelectDemo from './treeselect/Search.demo.vue'
import SearchSource from './treeselect/Search.demo.vue?raw'
import DisabledNodesTreeSelectDemo from './treeselect/DisabledNodes.demo.vue'
import DisabledNodesSource from './treeselect/DisabledNodes.demo.vue?raw'
import SizesTreeSelectDemo from './treeselect/Sizes.demo.vue'
import SizesSource from './treeselect/Sizes.demo.vue?raw'
import TokensOverrideTreeSelectDemo from './treeselect/TokensOverride.demo.vue'
import TokensOverrideSource from './treeselect/TokensOverride.demo.vue?raw'

const t = useTreeSelectDocStrings()

const treeSelectProps = computed<PropDef[]>(() => [
  { name: 'treeData', description: t.value.propTreeData, type: 'TreeSelectNode[]' },
  {
    name: 'modelValue',
    description: t.value.propModelValue,
    type: '(string | number) | (string | number)[]',
  },
  {
    name: 'value',
    description: t.value.propValue,
    type: '(string | number) | (string | number)[]',
  },
  {
    name: 'defaultValue',
    description: t.value.propDefaultValue,
    type: '(string | number) | (string | number)[]',
  },
  { name: 'multiple', description: t.value.propMultiple, type: 'boolean', default: 'false' },
  {
    name: 'treeCheckable',
    description: t.value.propTreeCheckable,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'showSearch',
    description: t.value.propShowSearch,
    type: 'boolean',
    default: 'false',
  },
  { name: 'allowClear', description: t.value.propAllowClear, type: 'boolean', default: 'true' },
  {
    name: 'placeholder',
    description: t.value.propPlaceholder,
    type: 'string',
    default: "'Please select'",
  },
  {
    name: 'defaultExpandedKeys',
    description: t.value.propDefaultExpandedKeys,
    type: '(string | number)[]',
  },
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
    type: '(value) => void',
  },
  { name: '@change', description: t.value.emitChange, type: '(value) => void' },
  { name: '@search', description: t.value.emitSearch, type: '(text: string) => void' },
])

const nodeProps = computed<PropDef[]>(() => [
  { name: 'value', description: t.value.nodeValue, type: 'string | number' },
  { name: 'label', description: t.value.nodeLabel, type: 'string' },
  { name: 'children', description: t.value.nodeChildren, type: 'TreeSelectNode[]' },
  { name: 'disabled', description: t.value.nodeDisabled, type: 'boolean', default: 'false' },
  {
    name: 'selectable',
    description: t.value.nodeSelectable,
    type: 'boolean',
    default: 'true',
  },
])

const treeSelectCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: t.value.cssSgColorPrimary,
  },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: t.value.cssSgColorPrimaryHover,
  },
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: t.value.cssSgInputBg,
  },
  {
    name: 'sg-input-border',
    default: 'var(--sg-color-border)',
    description: t.value.cssSgInputBorder,
  },
  {
    name: 'sg-input-radius',
    default: 'var(--sg-border-radius)',
    description: t.value.cssSgInputRadius,
  },
  {
    name: 'sg-input-height',
    default: 'var(--sg-height-md)',
    description: t.value.cssSgInputHeight,
  },
  {
    name: 'sg-color-bg-elevated',
    default: 'var(--sg-gray-1)',
    description: t.value.cssSgColorBgElevated,
  },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: t.value.cssSgShadowLg,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'var(--sg-gray-3)',
    description: t.value.cssSgColorBgHover,
  },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  {
    name: 'sg-border-radius-sm',
    default: '4px',
    description: t.value.cssSgBorderRadiusSm,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbTreeSelect]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTreeSelectDemo />
    </DemoBox>

    <DemoBox :title="t.demoMultipleTitle" :description="t.demoMultipleDesc" :code="MultipleSource">
      <MultipleTreeSelectDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoCheckableTitle"
      :description="t.demoCheckableDesc"
      :code="CheckableSource"
    >
      <CheckableTreeSelectDemo />
    </DemoBox>

    <DemoBox :title="t.demoSearchTitle" :description="t.demoSearchDesc" :code="SearchSource">
      <SearchTreeSelectDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledNodesTitle"
      :description="t.demoDisabledNodesDesc"
      :code="DisabledNodesSource"
    >
      <DisabledNodesTreeSelectDemo />
    </DemoBox>

    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesTreeSelectDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTreeSelectDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTreeSelectApi" :data="treeSelectProps" />
      <PropsTable :title="t.tableTreeNodeData" :data="nodeProps" />
      <CssVarsTable
        :title="t.tableCssVars"
        :hint="t.cssHint"
        :data="treeSelectCssVars"
      />
    </template>
  </ComponentDoc>
</template>
