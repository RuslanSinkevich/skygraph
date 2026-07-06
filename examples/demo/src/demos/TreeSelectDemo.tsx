import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTreeSelectDocStrings } from './treeselect-doc/useTreeSelectDocStrings'

import { BasicTreeSelect } from './treeselect/Basic.demo'
import BasicSource from './treeselect/Basic.demo?raw'
import { MultipleTreeSelect } from './treeselect/Multiple.demo'
import MultipleSource from './treeselect/Multiple.demo?raw'
import { CheckableTreeSelect } from './treeselect/Checkable.demo'
import CheckableSource from './treeselect/Checkable.demo?raw'
import { SearchTreeSelect } from './treeselect/Search.demo'
import SearchSource from './treeselect/Search.demo?raw'
import { DisabledNodesTreeSelect } from './treeselect/DisabledNodes.demo'
import DisabledNodesSource from './treeselect/DisabledNodes.demo?raw'
import { SizesTreeSelect } from './treeselect/Sizes.demo'
import SizesSource from './treeselect/Sizes.demo?raw'
import { TokensOverrideTreeSelect } from './treeselect/TokensOverride.demo'
import TokensOverrideSource from './treeselect/TokensOverride.demo?raw'
import { FloatingLabelTreeSelect } from './treeselect/FloatingLabel.demo'
import FloatingLabelSource from './treeselect/FloatingLabel.demo?raw'

export function TreeSelectDemo() {
  const t = useTreeSelectDocStrings()

  const treeSelectProps = useMemo<PropDef[]>(
    () => [
      { name: 'treeData', description: t.propTreeData, type: 'TreeNodeData[]' },
      { name: 'value', description: t.propValue, type: 'TreeKey | TreeKey[]' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'TreeKey | TreeKey[]' },
      { name: 'onChange', description: t.propOnChange, type: '(value, labels, extra) => void' },
      { name: 'multiple', description: t.propMultiple, type: 'boolean', default: 'false' },
      {
        name: 'treeCheckable',
        description: t.propTreeCheckable,
        type: 'boolean',
        default: 'false',
      },
      { name: 'showSearch', description: t.propShowSearch, type: 'boolean', default: 'false' },
      { name: 'allowClear', description: t.propAllowClear, type: 'boolean', default: 'false' },
      {
        name: 'placeholder',
        description: t.propPlaceholder,
        type: 'string',
        default: "'Please select'",
      },
      {
        name: 'treeDefaultExpandAll',
        description: t.propTreeDefaultExpandAll,
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'treeDefaultExpandedKeys',
        description: t.propTreeDefaultExpandedKeys,
        type: 'TreeKey[]',
      },
      {
        name: 'treeCheckStrictly',
        description: t.propTreeCheckStrictly,
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'showCheckedStrategy',
        description: t.propShowCheckedStrategy,
        type: "'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD'",
        default: "'SHOW_ALL'",
      },
      { name: 'fieldNames', description: t.propFieldNames, type: 'TreeFieldNames' },
      {
        name: 'filterTreeNode',
        description: t.propFilterTreeNode,
        type: '(inputValue: string, treeNode: TreeNodeData) => boolean',
      },
      { name: 'onSearch', description: t.propOnSearch, type: '(value: string) => void' },
      { name: 'maxTagCount', description: t.propMaxTagCount, type: 'number' },
      { name: 'treeLine', description: t.propTreeLine, type: 'boolean', default: 'false' },
      { name: 'dropdownStyle', description: t.propDropdownStyle, type: 'CSSProperties' },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const nodeProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.nodeKey, type: 'TreeKey' },
      { name: 'title', description: t.nodeTitle, type: 'ReactNode' },
      { name: 'children', description: t.nodeChildren, type: 'TreeNodeData[]' },
      { name: 'disabled', description: t.nodeDisabled, type: 'boolean', default: 'false' },
      { name: 'selectable', description: t.nodeSelectable, type: 'boolean', default: 'true' },
      { name: 'checkable', description: t.nodeCheckable, type: 'boolean', default: 'true' },
    ],
    [t],
  )

  const treeSelectCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-bg',
        default: 'var(--sg-blue-1)',
        description: t.cssSgColorPrimaryBg,
      },
      {
        name: 'sg-color-primary-hover',
        default: 'var(--sg-blue-5)',
        description: t.cssSgColorPrimaryHover,
      },
      { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: t.cssSgInputBg },
      {
        name: 'sg-input-border',
        default: 'var(--sg-color-border)',
        description: t.cssSgInputBorder,
      },
      {
        name: 'sg-input-radius',
        default: 'var(--sg-border-radius)',
        description: t.cssSgInputRadius,
      },
      { name: 'sg-input-height', default: 'var(--sg-height-md)', description: t.cssSgInputHeight },
      {
        name: 'sg-color-bg-elevated',
        default: 'var(--sg-gray-1)',
        description: t.cssSgColorBgElevated,
      },
      {
        name: 'sg-shadow-lg',
        default: '0 6px 16px rgba(0, 0, 0, 0.12)',
        description: t.cssSgShadowLg,
      },
      { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.cssSgColorBgHover },
      {
        name: 'sg-color-border-secondary',
        default: 'var(--sg-gray-4)',
        description: t.cssSgColorBorderSecondary,
      },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicTreeSelect />
      </DemoBox>

      <DemoBox title={t.demoMultipleTitle} description={t.demoMultipleDesc} code={MultipleSource}>
        <MultipleTreeSelect />
      </DemoBox>

      <DemoBox
        title={t.demoCheckableTitle}
        description={t.demoCheckableDesc}
        code={CheckableSource}
      >
        <CheckableTreeSelect />
      </DemoBox>

      <DemoBox title={t.demoSearchTitle} description={t.demoSearchDesc} code={SearchSource}>
        <SearchTreeSelect />
      </DemoBox>

      <DemoBox
        title={t.demoDisabledNodesTitle}
        description={t.demoDisabledNodesDesc}
        code={DisabledNodesSource}
      >
        <DisabledNodesTreeSelect />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesTreeSelect />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideTreeSelect />
      </DemoBox>

      <DemoBox
        title={t.demoFloatingLabelTitle}
        description={t.demoFloatingLabelDesc}
        code={FloatingLabelSource}
      >
        <FloatingLabelTreeSelect />
      </DemoBox>

      <PropsTable title={t.tableTreeSelectApi} data={treeSelectProps} />
      <PropsTable title={t.tableTreeNodeData} data={nodeProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={treeSelectCssVars} />
    </ComponentDoc>
  )
}
