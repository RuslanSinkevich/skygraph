<script setup lang="ts">
/**
 * Tree aggregator (Wave 3.2 / Tab D).
 * Vue `SgTree` is narrower than React's — see
 * `findings/T-Vue-Demo-Complex.md` → `tree-vue-narrower-than-react`.
 *
 * 12 examples scoped to the current Vue API (no `showLine`, `actions`,
 * `nodeStatus`, `editable`, `showIcon`). Vue adds `CheckStrictly`,
 * `Multiple`, `Loadable` and `Unstyled` to compensate.
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
import { useTreeDocStrings } from './tree-doc/useStrings'

import BasicTree from './tree/Basic.demo.vue'
import BasicSource from './tree/Basic.demo.vue?raw'
import CheckableTree from './tree/Checkable.demo.vue'
import CheckableSource from './tree/Checkable.demo.vue?raw'
import CheckStrictlyTree from './tree/CheckStrictly.demo.vue'
import CheckStrictlySource from './tree/CheckStrictly.demo.vue?raw'
import DirectoryTree from './tree/Directory.demo.vue'
import DirectorySource from './tree/Directory.demo.vue?raw'
import SearchTree from './tree/Search.demo.vue'
import SearchSource from './tree/Search.demo.vue?raw'
import ToolbarTree from './tree/Toolbar.demo.vue'
import ToolbarSource from './tree/Toolbar.demo.vue?raw'
import DraggableTree from './tree/Draggable.demo.vue'
import DraggableSource from './tree/Draggable.demo.vue?raw'
import BlockNodeTree from './tree/BlockNode.demo.vue'
import BlockNodeSource from './tree/BlockNode.demo.vue?raw'
import MultipleTree from './tree/Multiple.demo.vue'
import MultipleSource from './tree/Multiple.demo.vue?raw'
import LoadableTree from './tree/Loadable.demo.vue'
import LoadableSource from './tree/Loadable.demo.vue?raw'
import VirtualTree from './tree/Virtual.demo.vue'
import VirtualSource from './tree/Virtual.demo.vue?raw'
import TokensOverrideTree from './tree/TokensOverride.demo.vue'
import TokensOverrideSource from './tree/TokensOverride.demo.vue?raw'
import UnstyledTree from './tree/Unstyled.demo.vue'
import UnstyledSource from './tree/Unstyled.demo.vue?raw'

const t = useTreeDocStrings()

const treeProps = computed<PropDef[]>(() => [
  { name: 'treeData', description: t.value.propTreeData, type: 'TreeNodeData[]', required: true },
  { name: 'fieldNames', description: t.value.propFieldNames, type: 'TreeFieldNames' },
  { name: 'checkable', description: t.value.propCheckable, type: 'boolean', default: 'false' },
  { name: 'checkStrictly', description: t.value.propCheckStrictly, type: 'boolean', default: 'false' },
  { name: 'selectable', description: t.value.propSelectable, type: 'boolean', default: 'true' },
  { name: 'multiple', description: t.value.propMultiple, type: 'boolean', default: 'false' },
  { name: 'defaultExpandAll', description: t.value.propDefaultExpandAll, type: 'boolean', default: 'false' },
  { name: 'autoExpandParent', description: t.value.propAutoExpandParent, type: 'boolean', default: 'false' },
  { name: 'blockNode', description: t.value.propBlockNode, type: 'boolean', default: 'false' },
  { name: 'directory', description: t.value.propDirectory, type: 'boolean', default: 'false' },
  { name: 'draggable', description: t.value.propDraggable, type: 'boolean | (node) => boolean', default: 'false' },
  { name: 'loadData', description: t.value.propLoadData, type: '(node) => Promise<void>' },
  { name: 'showSearch', description: t.value.propShowSearch, type: 'boolean', default: 'false' },
  { name: 'highlightSearch', description: t.value.propHighlightSearch, type: 'boolean', default: 'true' },
  { name: 'showToolbar', description: t.value.propShowToolbar, type: 'boolean', default: 'false' },
  { name: 'indentSize', description: t.value.propIndentSize, type: 'number', default: '24' },
  { name: 'height', description: t.value.propHeight, type: 'number' },
  { name: 'virtual', description: t.value.propVirtual, type: 'boolean', default: 'true' },
  { name: 'keyboard', description: t.value.propKeyboard, type: 'boolean', default: 'true' },
  { name: 'locale', description: t.value.propLocale, type: 'TreeLocale' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@check', description: t.value.propEmitCheck, type: '(keys, info) => void' },
  { name: '@select', description: t.value.propEmitSelect, type: '(keys, info) => void' },
  { name: '@drop', description: t.value.propEmitDrop, type: '(info: DropInfo) => void' },
])

const nodeProps = computed<PropDef[]>(() => [
  { name: 'key', description: t.value.nodeKey, type: 'string | number', required: true },
  { name: 'title', description: t.value.nodeTitle, type: 'string | VNode', required: true },
  { name: 'children', description: t.value.nodeChildren, type: 'TreeNodeData[]' },
  { name: 'disabled', description: t.value.nodeDisabled, type: 'boolean' },
  { name: 'selectable', description: t.value.nodeSelectable, type: 'boolean' },
  { name: 'checkable', description: t.value.nodeCheckable, type: 'boolean' },
  { name: 'isLeaf', description: t.value.nodeIsLeaf, type: 'boolean' },
  { name: 'icon', description: t.value.nodeIcon, type: 'VNode' },
])

const treeCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: t.value.cssSgColorPrimaryBg },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.value.cssSgColorBgHover },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.value.cssSgColorTextSecondary },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.value.cssSgColorTextTertiary },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.value.cssSgColorTextDisabled },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbTree]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicTree />
    </DemoBox>

    <DemoBox :title="t.demoCheckableTitle" :description="t.demoCheckableDesc" :code="CheckableSource">
      <CheckableTree />
    </DemoBox>

    <DemoBox :title="t.demoCheckStrictlyTitle" :description="t.demoCheckStrictlyDesc" :code="CheckStrictlySource">
      <CheckStrictlyTree />
    </DemoBox>

    <DemoBox :title="t.demoDirectoryTitle" :description="t.demoDirectoryDesc" :code="DirectorySource">
      <DirectoryTree />
    </DemoBox>

    <DemoBox :title="t.demoSearchTitle" :description="t.demoSearchDesc" :code="SearchSource">
      <SearchTree />
    </DemoBox>

    <DemoBox :title="t.demoToolbarTitle" :description="t.demoToolbarDesc" :code="ToolbarSource">
      <ToolbarTree />
    </DemoBox>

    <DemoBox :title="t.demoDraggableTitle" :description="t.demoDraggableDesc" :code="DraggableSource">
      <DraggableTree />
    </DemoBox>

    <DemoBox :title="t.demoBlockNodeTitle" :description="t.demoBlockNodeDesc" :code="BlockNodeSource">
      <BlockNodeTree />
    </DemoBox>

    <DemoBox :title="t.demoMultipleTitle" :description="t.demoMultipleDesc" :code="MultipleSource">
      <MultipleTree />
    </DemoBox>

    <DemoBox :title="t.demoLoadableTitle" :description="t.demoLoadableDesc" :code="LoadableSource">
      <LoadableTree />
    </DemoBox>

    <DemoBox :title="t.demoVirtualTitle" :description="t.demoVirtualDesc" :code="VirtualSource">
      <VirtualTree />
    </DemoBox>

    <DemoBox :title="t.demoTokensTitle" :description="t.demoTokensDesc" :code="TokensOverrideSource">
      <TokensOverrideTree />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledTree />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTreeApi" :data="treeProps" />
      <PropsTable :title="t.tableTreeNodeData" :data="nodeProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="treeCssVars" />
    </template>
  </ComponentDoc>
</template>
