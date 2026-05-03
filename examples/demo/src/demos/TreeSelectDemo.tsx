import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const treeSelectProps: PropDef[] = [
  { name: 'treeData', description: 'Hierarchical nodes', type: 'TreeNodeData[]' },
  { name: 'value', description: 'Selected key(s)', type: 'TreeKey | TreeKey[]' },
  { name: 'defaultValue', description: 'Initial selection (uncontrolled)', type: 'TreeKey | TreeKey[]' },
  { name: 'onChange', description: 'Selection change callback', type: '(value, labels, extra) => void' },
  { name: 'multiple', description: 'Enable multi-select (tag-style)', type: 'boolean', default: 'false' },
  { name: 'treeCheckable', description: 'Render checkboxes, cascade-select subtrees', type: 'boolean', default: 'false' },
  { name: 'showSearch', description: 'Show filter input in the dropdown', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Show clear button when there is a value', type: 'boolean', default: 'false' },
  { name: 'placeholder', description: 'Placeholder shown when empty', type: 'string', default: "'Please select'" },
  { name: 'treeDefaultExpandAll', description: 'Expand every parent on mount', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Control size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Disable the whole selector', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Render without SkyGraph styles', type: 'boolean', default: 'false' },
]

const nodeProps: PropDef[] = [
  { name: 'key', description: 'Unique identifier used in `value`', type: 'TreeKey' },
  { name: 'title', description: 'Display label', type: 'ReactNode' },
  { name: 'children', description: 'Nested child nodes', type: 'TreeNodeData[]' },
  { name: 'disabled', description: 'Block selection on this node', type: 'boolean', default: 'false' },
  { name: 'selectable', description: 'Per-node selection enable', type: 'boolean', default: 'true' },
  { name: 'checkable', description: 'Per-node checkbox enable', type: 'boolean', default: 'true' },
]

const treeSelectCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Focused/active node + selected pill fill' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Focus ring around the control' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Hover border of the control' },
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Control background (shared with Input)' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Control border color' },
  { name: 'sg-input-radius', default: 'var(--sg-border-radius)', description: 'Control radius' },
  { name: 'sg-input-height', default: 'var(--sg-height-md)', description: 'Control min-height' },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: 'Dropdown panel background' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: 'Dropdown panel shadow' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover background in the dropdown' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Tag border in multi-select mode' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Selected-tag radius' },
]

export function TreeSelectDemo() {
  return (
    <ComponentDoc
      title="TreeSelect"
      description="Dropdown selector backed by a tree. Pick one leaf, many leaves, or cascade whole subtrees."
      whenToUse={[
        'When options have a hierarchy (org charts, regions, taxonomies).',
        'When you want multi-select with parent/child cascading (`treeCheckable`).',
        'Inside forms — wrap with <Field> to capture validation.',
      ]}
    >
      <DemoBox title="Basic" description="Single-value picker." code={BasicSource}>
        <BasicTreeSelect />
      </DemoBox>

      <DemoBox title="Multiple" description="Pick multiple leaves — selections render as tags." code={MultipleSource}>
        <MultipleTreeSelect />
      </DemoBox>

      <DemoBox title="Checkable" description="Checkboxes with subtree cascade." code={CheckableSource}>
        <CheckableTreeSelect />
      </DemoBox>

      <DemoBox title="Search" description="Filter nodes by typing." code={SearchSource}>
        <SearchTreeSelect />
      </DemoBox>

      <DemoBox title="Disabled nodes" description="Per-node `disabled` greys out specific rows." code={DisabledNodesSource}>
        <DisabledNodesTreeSelect />
      </DemoBox>

      <DemoBox title="Sizes" description="Three sizes, same structure." code={SizesSource}>
        <SizesTreeSelect />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope tokens to theme one TreeSelect without touching the rest of the page."
        code={TokensOverrideSource}
      >
        <TokensOverrideTreeSelect />
      </DemoBox>

      <PropsTable title="TreeSelect API" data={treeSelectProps} />
      <PropsTable title="TreeNodeData" data={nodeProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="TreeSelect shares Input's control tokens; the dropdown reuses the same overlay + hover variables as Select."
        data={treeSelectCssVars}
      />
    </ComponentDoc>
  )
}
