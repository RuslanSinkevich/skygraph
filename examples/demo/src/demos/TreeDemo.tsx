import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTreeDocStrings } from './tree-doc/useTreeDocStrings'

import { BasicTree } from './tree/Basic.demo'
import BasicSource from './tree/Basic.demo?raw'
import { CheckableTree } from './tree/Checkable.demo'
import CheckableSource from './tree/Checkable.demo?raw'
import { ShowLineTree } from './tree/ShowLine.demo'
import ShowLineSource from './tree/ShowLine.demo?raw'
import { DirectoryTree } from './tree/Directory.demo'
import DirectorySource from './tree/Directory.demo?raw'
import { SearchTree } from './tree/Search.demo'
import SearchSource from './tree/Search.demo?raw'
import { ToolbarTree } from './tree/Toolbar.demo'
import ToolbarSource from './tree/Toolbar.demo?raw'
import { ActionsTree } from './tree/Actions.demo'
import ActionsSource from './tree/Actions.demo?raw'
import { NodeStatusTree } from './tree/NodeStatus.demo'
import NodeStatusSource from './tree/NodeStatus.demo?raw'
import { DraggableTree } from './tree/Draggable.demo'
import DraggableSource from './tree/Draggable.demo?raw'
import { EditableTree } from './tree/Editable.demo'
import EditableSource from './tree/Editable.demo?raw'
import { VirtualTree } from './tree/Virtual.demo'
import VirtualSource from './tree/Virtual.demo?raw'
import { TokensOverrideTree } from './tree/TokensOverride.demo'
import TokensOverrideSource from './tree/TokensOverride.demo?raw'

export function TreeDemo() {
  const t = useTreeDocStrings()

  const treeProps = useMemo<PropDef[]>(
    () => [
      { name: 'treeData', description: t.propTreeData, type: 'TreeNodeData[]' },
      { name: 'fieldNames', description: t.propFieldNames, type: 'TreeFieldNames' },
      { name: 'checkable', description: t.propCheckable, type: 'boolean', default: 'false' },
      {
        name: 'checkStrictly',
        description: t.propCheckStrictly,
        type: 'boolean',
        default: 'false',
      },
      { name: 'checkedKeys', description: t.propCheckedKeys, type: 'TreeKey[]' },
      { name: 'defaultCheckedKeys', description: t.propDefaultCheckedKeys, type: 'TreeKey[]' },
      { name: 'onCheck', description: t.propOnCheck, type: '(keys, info) => void' },
      { name: 'selectable', description: t.propSelectable, type: 'boolean', default: 'true' },
      { name: 'multiple', description: t.propMultiple, type: 'boolean', default: 'false' },
      { name: 'selectedKeys', description: t.propSelectedKeys, type: 'TreeKey[]' },
      { name: 'defaultSelectedKeys', description: t.propDefaultSelectedKeys, type: 'TreeKey[]' },
      { name: 'onSelect', description: t.propOnSelect, type: '(keys, info) => void' },
      { name: 'expandedKeys', description: t.propExpandedKeys, type: 'TreeKey[]' },
      { name: 'defaultExpandedKeys', description: t.propDefaultExpandedKeys, type: 'TreeKey[]' },
      { name: 'onExpand', description: t.propOnExpand, type: '(keys, info) => void' },
      {
        name: 'defaultExpandAll',
        description: t.propDefaultExpandAll,
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'autoExpandParent',
        description: t.propAutoExpandParent,
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'showLine',
        description: t.propShowLine,
        type: 'boolean | { showLeafIcon? }',
        default: 'false',
      },
      { name: 'showIcon', description: t.propShowIcon, type: 'boolean', default: 'false' },
      { name: 'blockNode', description: t.propBlockNode, type: 'boolean', default: 'false' },
      { name: 'directory', description: t.propDirectory, type: 'boolean', default: 'false' },
      {
        name: 'draggable',
        description: t.propDraggable,
        type: 'boolean | (node) => boolean',
        default: 'false',
      },
      { name: 'allowDrop', description: t.propAllowDrop, type: '(info) => boolean' },
      { name: 'onDragStart', description: t.propOnDragStart, type: '(info: DragInfo) => void' },
      { name: 'onDragEnter', description: t.propOnDragEnter, type: '(info: DragInfo) => void' },
      { name: 'onDragOver', description: t.propOnDragOver, type: '(info: DragInfo) => void' },
      { name: 'onDragLeave', description: t.propOnDragLeave, type: '(info: DragInfo) => void' },
      { name: 'onDragEnd', description: t.propOnDragEnd, type: '(info: DragInfo) => void' },
      { name: 'onDrop', description: t.propOnDrop, type: '(info: DropInfo) => void' },
      { name: 'loadData', description: t.propLoadData, type: '(node) => Promise<void>' },
      { name: 'loadedKeys', description: t.propLoadedKeys, type: 'TreeKey[]' },
      {
        name: 'switcherIcon',
        description: t.propSwitcherIcon,
        type: 'ReactNode | (props) => ReactNode',
      },
      { name: 'icon', description: t.propIcon, type: 'ReactNode | (props) => ReactNode' },
      { name: 'showSearch', description: t.propShowSearch, type: 'boolean', default: 'false' },
      { name: 'searchValue', description: t.propSearchValue, type: 'string' },
      {
        name: 'defaultSearchValue',
        description: t.propDefaultSearchValue,
        type: 'string',
        default: "''",
      },
      { name: 'onSearch', description: t.propOnSearch, type: '(value: string) => void' },
      {
        name: 'filterTreeNode',
        description: t.propFilterTreeNode,
        type: '(node, searchValue) => boolean',
      },
      {
        name: 'highlightSearch',
        description: t.propHighlightSearch,
        type: 'boolean',
        default: 'true',
      },
      { name: 'showToolbar', description: t.propShowToolbar, type: 'boolean', default: 'false' },
      { name: 'toolbarExtra', description: t.propToolbarExtra, type: 'ReactNode' },
      {
        name: 'editable',
        description: t.propEditable,
        type: 'boolean | (node) => boolean',
        default: 'false',
      },
      { name: 'onEdit', description: t.propOnEdit, type: '(info: EditInfo) => void' },
      { name: 'onEditCancel', description: t.propOnEditCancel, type: '(key: TreeKey) => void' },
      { name: 'titleRender', description: t.propTitleRender, type: '(node, info) => ReactNode' },
      { name: 'actions', description: t.propActions, type: 'TreeNodeAction[]' },
      { name: 'nodeStatus', description: t.propNodeStatus, type: '(node) => TreeNodeStatus' },
      {
        name: 'onRightClick',
        description: t.propOnRightClick,
        type: '(info: { event, node }) => void',
      },
      { name: 'indentSize', description: t.propIndentSize, type: 'number', default: '24' },
      { name: 'height', description: t.propHeight, type: 'number' },
      { name: 'virtual', description: t.propVirtual, type: 'boolean', default: 'true' },
      { name: 'keyboard', description: t.propKeyboard, type: 'boolean', default: 'true' },
      { name: 'animated', description: t.propAnimated, type: 'boolean', default: 'true' },
      { name: 'autoFocus', description: t.propAutoFocus, type: 'boolean', default: 'false' },
      { name: 'focusedKey', description: t.propFocusedKey, type: 'TreeKey' },
      { name: 'onFocus', description: t.propOnFocus, type: '(key: TreeKey) => void' },
      { name: 'scrollToKey', description: t.propScrollToKey, type: 'TreeKey' },
      { name: 'locale', description: t.propLocale, type: 'TreeLocale' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const nodeProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.nodeKey, type: 'string | number' },
      { name: 'title', description: t.nodeTitle, type: 'ReactNode' },
      { name: 'children', description: t.nodeChildren, type: 'TreeNodeData[]' },
      { name: 'disabled', description: t.nodeDisabled, type: 'boolean' },
      { name: 'selectable', description: t.nodeSelectable, type: 'boolean' },
      { name: 'checkable', description: t.nodeCheckable, type: 'boolean' },
      { name: 'isLeaf', description: t.nodeIsLeaf, type: 'boolean' },
      { name: 'icon', description: t.nodeIcon, type: 'ReactNode' },
    ],
    [t],
  )

  const treeCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-bg',
        default: 'var(--sg-blue-1)',
        description: t.cssSgColorPrimaryBg,
      },
      { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.cssSgColorBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      {
        name: 'sg-color-text-secondary',
        default: 'rgba(0, 0, 0, 0.65)',
        description: t.cssSgColorTextSecondary,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextTertiary,
      },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.cssSgColorBorder },
      { name: 'sg-color-success', default: 'var(--sg-green-6)', description: t.cssSgColorSuccess },
      { name: 'sg-color-warning', default: 'var(--sg-orange-5)', description: t.cssSgColorWarning },
      { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.cssSgColorError },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbTree]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicTree />
      </DemoBox>

      <DemoBox
        title={t.demoCheckableTitle}
        description={t.demoCheckableDesc}
        code={CheckableSource}
      >
        <CheckableTree />
      </DemoBox>

      <DemoBox title={t.demoShowLineTitle} description={t.demoShowLineDesc} code={ShowLineSource}>
        <ShowLineTree />
      </DemoBox>

      <DemoBox
        title={t.demoDirectoryTitle}
        description={t.demoDirectoryDesc}
        code={DirectorySource}
      >
        <DirectoryTree />
      </DemoBox>

      <DemoBox title={t.demoSearchTitle} description={t.demoSearchDesc} code={SearchSource}>
        <SearchTree />
      </DemoBox>

      <DemoBox title={t.demoToolbarTitle} description={t.demoToolbarDesc} code={ToolbarSource}>
        <ToolbarTree />
      </DemoBox>

      <DemoBox title={t.demoActionsTitle} description={t.demoActionsDesc} code={ActionsSource}>
        <ActionsTree />
      </DemoBox>

      <DemoBox
        title={t.demoNodeStatusTitle}
        description={t.demoNodeStatusDesc}
        code={NodeStatusSource}
      >
        <NodeStatusTree />
      </DemoBox>

      <DemoBox
        title={t.demoDraggableTitle}
        description={t.demoDraggableDesc}
        code={DraggableSource}
      >
        <DraggableTree />
      </DemoBox>

      <DemoBox title={t.demoEditableTitle} description={t.demoEditableDesc} code={EditableSource}>
        <EditableTree />
      </DemoBox>

      <DemoBox title={t.demoVirtualTitle} description={t.demoVirtualDesc} code={VirtualSource}>
        <VirtualTree />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideTree />
      </DemoBox>

      <PropsTable title={t.tableTreeApi} data={treeProps} />
      <PropsTable title={t.tableTreeNodeData} data={nodeProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={treeCssVars} />
    </ComponentDoc>
  )
}
