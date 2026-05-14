<script setup lang="ts">
/**
 * Tree aggregator — 1:1 parity with React (12 examples).
 *
 * Covers all major capabilities: selection, checking, show-line, directory,
 * search, toolbar, per-row actions, node status, drag & drop, inline edit,
 * virtual rendering, and CSS token theming.
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
import ShowLineTree from './tree/ShowLine.demo.vue'
import ShowLineSource from './tree/ShowLine.demo.vue?raw'
import DirectoryTree from './tree/Directory.demo.vue'
import DirectorySource from './tree/Directory.demo.vue?raw'
import SearchTree from './tree/Search.demo.vue'
import SearchSource from './tree/Search.demo.vue?raw'
import ToolbarTree from './tree/Toolbar.demo.vue'
import ToolbarSource from './tree/Toolbar.demo.vue?raw'
import ActionsTree from './tree/Actions.demo.vue'
import ActionsSource from './tree/Actions.demo.vue?raw'
import NodeStatusTree from './tree/NodeStatus.demo.vue'
import NodeStatusSource from './tree/NodeStatus.demo.vue?raw'
import DraggableTree from './tree/Draggable.demo.vue'
import DraggableSource from './tree/Draggable.demo.vue?raw'
import EditableTree from './tree/Editable.demo.vue'
import EditableSource from './tree/Editable.demo.vue?raw'
import VirtualTree from './tree/Virtual.demo.vue'
import VirtualSource from './tree/Virtual.demo.vue?raw'
import TokensOverrideTree from './tree/TokensOverride.demo.vue'
import TokensOverrideSource from './tree/TokensOverride.demo.vue?raw'

const t = useTreeDocStrings()

const treeProps = computed<PropDef[]>(() => [
  { name: 'treeData', description: t.value.propTreeData, type: 'TreeNodeData[]', required: true },
  { name: 'fieldNames', description: t.value.propFieldNames, type: 'TreeFieldNames' },
  { name: 'checkable', description: t.value.propCheckable, type: 'boolean', default: 'false' },
  {
    name: 'checkStrictly',
    description: t.value.propCheckStrictly,
    type: 'boolean',
    default: 'false',
  },
  { name: 'selectable', description: t.value.propSelectable, type: 'boolean', default: 'true' },
  { name: 'multiple', description: t.value.propMultiple, type: 'boolean', default: 'false' },
  {
    name: 'defaultExpandAll',
    description: t.value.propDefaultExpandAll,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'autoExpandParent',
    description: t.value.propAutoExpandParent,
    type: 'boolean',
    default: 'false',
  },
  { name: 'showLine', description: t.value.propShowLine, type: 'boolean', default: 'false' },
  { name: 'blockNode', description: t.value.propBlockNode, type: 'boolean', default: 'false' },
  { name: 'directory', description: t.value.propDirectory, type: 'boolean', default: 'false' },
  {
    name: 'draggable',
    description: t.value.propDraggable,
    type: 'boolean | (node) => boolean',
    default: 'false',
  },
  { name: 'loadData', description: t.value.propLoadData, type: '(node) => Promise<void>' },
  { name: 'showSearch', description: t.value.propShowSearch, type: 'boolean', default: 'false' },
  {
    name: 'highlightSearch',
    description: t.value.propHighlightSearch,
    type: 'boolean',
    default: 'true',
  },
  { name: 'showToolbar', description: t.value.propShowToolbar, type: 'boolean', default: 'false' },
  {
    name: 'editable',
    description: t.value.propEditable,
    type: 'boolean | (node) => boolean',
    default: 'false',
  },
  { name: 'actions', description: t.value.propActions, type: 'TreeNodeAction[]' },
  { name: 'nodeStatus', description: t.value.propNodeStatus, type: '(node) => TreeNodeStatus' },
  { name: 'indentSize', description: t.value.propIndentSize, type: 'number', default: '24' },
  { name: 'height', description: t.value.propHeight, type: 'number' },
  { name: 'virtual', description: t.value.propVirtual, type: 'boolean', default: 'true' },
  { name: 'keyboard', description: t.value.propKeyboard, type: 'boolean', default: 'true' },
  { name: 'locale', description: t.value.propLocale, type: 'TreeLocale' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@check', description: t.value.propEmitCheck, type: '(keys, info) => void' },
  { name: '@select', description: t.value.propEmitSelect, type: '(keys, info) => void' },
  { name: '@drop', description: t.value.propEmitDrop, type: '(info: DropInfo) => void' },
  { name: '@edit', description: t.value.propEmitEdit, type: '(info: EditInfo) => void' },
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
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: t.value.cssSgColorPrimaryBg,
  },
  {
    name: 'sg-color-bg-hover',
    default: 'var(--sg-gray-3)',
    description: t.value.cssSgColorBgHover,
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
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssSgColorTextDisabled,
  },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-success',
    default: 'var(--sg-green-6)',
    description: t.value.cssSgColorSuccess,
  },
  {
    name: 'sg-color-warning',
    default: 'var(--sg-orange-5)',
    description: t.value.cssSgColorWarning,
  },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.value.cssSgColorError },
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

    <DemoBox
      :title="t.demoCheckableTitle"
      :description="t.demoCheckableDesc"
      :code="CheckableSource"
    >
      <CheckableTree />
    </DemoBox>

    <DemoBox :title="t.demoShowLineTitle" :description="t.demoShowLineDesc" :code="ShowLineSource">
      <ShowLineTree />
    </DemoBox>

    <DemoBox
      :title="t.demoDirectoryTitle"
      :description="t.demoDirectoryDesc"
      :code="DirectorySource"
    >
      <DirectoryTree />
    </DemoBox>

    <DemoBox :title="t.demoSearchTitle" :description="t.demoSearchDesc" :code="SearchSource">
      <SearchTree />
    </DemoBox>

    <DemoBox :title="t.demoToolbarTitle" :description="t.demoToolbarDesc" :code="ToolbarSource">
      <ToolbarTree />
    </DemoBox>

    <DemoBox :title="t.demoActionsTitle" :description="t.demoActionsDesc" :code="ActionsSource">
      <ActionsTree />
    </DemoBox>

    <DemoBox
      :title="t.demoNodeStatusTitle"
      :description="t.demoNodeStatusDesc"
      :code="NodeStatusSource"
    >
      <NodeStatusTree />
    </DemoBox>

    <DemoBox
      :title="t.demoDraggableTitle"
      :description="t.demoDraggableDesc"
      :code="DraggableSource"
    >
      <DraggableTree />
    </DemoBox>

    <DemoBox :title="t.demoEditableTitle" :description="t.demoEditableDesc" :code="EditableSource">
      <EditableTree />
    </DemoBox>

    <DemoBox :title="t.demoVirtualTitle" :description="t.demoVirtualDesc" :code="VirtualSource">
      <VirtualTree />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideTree />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableTreeApi" :data="treeProps" />
      <PropsTable :title="t.tableTreeNodeData" :data="nodeProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="treeCssVars" />
    </template>
  </ComponentDoc>
</template>
