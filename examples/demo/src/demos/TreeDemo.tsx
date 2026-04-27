import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const treeProps: PropDef[] = [
  { name: 'treeData', description: 'Hierarchical data', type: 'TreeNodeData[]' },
  { name: 'fieldNames', description: 'Rename title / key / children accessors', type: 'TreeFieldNames' },
  { name: 'checkable', description: 'Show checkboxes on nodes', type: 'boolean', default: 'false' },
  { name: 'checkStrictly', description: 'Parent and child checks are independent', type: 'boolean', default: 'false' },
  { name: 'selectable', description: 'Clicking a title selects the node', type: 'boolean', default: 'true' },
  { name: 'multiple', description: 'Allow multiple selected nodes', type: 'boolean', default: 'false' },
  { name: 'defaultExpandAll', description: 'Expand every parent on mount (uncontrolled)', type: 'boolean', default: 'false' },
  { name: 'autoExpandParent', description: 'Expand ancestors of focused / matched nodes', type: 'boolean', default: 'false' },
  { name: 'showLine', description: 'Render guide lines between levels', type: 'boolean | { showLeafIcon? }', default: 'false' },
  { name: 'showIcon', description: 'Reserve a leading icon slot', type: 'boolean', default: 'false' },
  { name: 'blockNode', description: 'Whole row is clickable for selection', type: 'boolean', default: 'false' },
  { name: 'directory', description: 'Filesystem-explorer look (filled selection)', type: 'boolean', default: 'false' },
  { name: 'draggable', description: 'Enable HTML5 DnD per node or predicate', type: 'boolean | (node) => boolean', default: 'false' },
  { name: 'loadData', description: 'Lazy-load children on expand', type: '(node) => Promise<void>' },
  { name: 'showSearch', description: 'Render the built-in filter bar', type: 'boolean', default: 'false' },
  { name: 'highlightSearch', description: 'Highlight matched text in titles', type: 'boolean', default: 'true' },
  { name: 'showToolbar', description: 'Expand / collapse / check-all controls', type: 'boolean', default: 'false' },
  { name: 'editable', description: 'Inline-edit titles (double-click)', type: 'boolean | (node) => boolean', default: 'false' },
  { name: 'actions', description: 'Per-row action buttons', type: 'TreeNodeAction[]' },
  { name: 'nodeStatus', description: 'Per-node status variant', type: '(node) => TreeNodeStatus' },
  { name: 'indentSize', description: 'Horizontal indent per level (px)', type: 'number', default: '24' },
  { name: 'height', description: 'Enable windowed virtual scroll at this viewport height', type: 'number' },
  { name: 'virtual', description: 'Use virtual scroll when height is set', type: 'boolean', default: 'true' },
  { name: 'keyboard', description: 'Built-in keyboard navigation', type: 'boolean', default: 'true' },
  { name: 'locale', description: 'Override built-in strings', type: 'TreeLocale' },
  { name: 'unstyled', description: 'Keep semantics, drop SkyGraph styles', type: 'boolean', default: 'false' },
]

const nodeProps: PropDef[] = [
  { name: 'key', description: 'Unique identifier', type: 'string | number' },
  { name: 'title', description: 'Display label (ReactNode)', type: 'ReactNode' },
  { name: 'children', description: 'Nested child nodes', type: 'TreeNodeData[]' },
  { name: 'disabled', description: 'Grey out, block selection/check', type: 'boolean' },
  { name: 'selectable', description: 'Per-node selection enable', type: 'boolean' },
  { name: 'checkable', description: 'Per-node checkbox enable', type: 'boolean' },
  { name: 'isLeaf', description: 'Force leaf rendering (no switcher)', type: 'boolean' },
  { name: 'icon', description: 'Custom leading icon', type: 'ReactNode' },
]

const treeCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Selected title color, switcher hover, focus outline, drop indicator' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Selected row background, drop-inside tint' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover background, toolbar button hover' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default node title color' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Switcher + action button color' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Empty state + leaf switcher' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled node title + disabled actions' },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: 'Toolbar divider, search input border, guide lines, virtual scrollbar' },
  { name: 'sg-color-success', default: 'var(--sg-green-6)', description: 'nodeStatus="success" dot + left border' },
  { name: 'sg-color-warning', default: 'var(--sg-orange-5)', description: 'nodeStatus="warning" dot + left border' },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'nodeStatus="error" dot + search match color' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Node row + title radius' },
  { name: 'sg-font-size', default: '14px', description: 'Title font size' },
]

export function TreeDemo() {
  return (
    <ComponentDoc
      title="Tree"
      description="Rich hierarchical list with checks, selection, drag & drop, search, inline editing, virtual scroll, and directory mode."
      whenToUse={[
        'For file explorers, org charts, nested taxonomies, build/deploy status views.',
        'When you need multi-select with parent/child cascading (`checkable`).',
        'For huge datasets (1000+ nodes) set `height` for virtual scrolling.',
      ]}
    >
      <DemoBox title="Basic" description="Default expand/collapse + click-to-select." code={BasicSource}>
        <BasicTree />
      </DemoBox>

      <DemoBox title="Checkable" description="Checkboxes cascade to descendants." code={CheckableSource}>
        <CheckableTree />
      </DemoBox>

      <DemoBox title="Show line" description="Guide lines between levels." code={ShowLineSource}>
        <ShowLineTree />
      </DemoBox>

      <DemoBox title="Directory" description="Filesystem-explorer styling." code={DirectorySource}>
        <DirectoryTree />
      </DemoBox>

      <DemoBox title="Search" description="Built-in filter with match highlighting." code={SearchSource}>
        <SearchTree />
      </DemoBox>

      <DemoBox title="Toolbar" description="Expand / collapse / check-all controls." code={ToolbarSource}>
        <ToolbarTree />
      </DemoBox>

      <DemoBox title="Row actions" description="Icon buttons that appear on hover." code={ActionsSource}>
        <ActionsTree />
      </DemoBox>

      <DemoBox title="Node status" description="Per-node status dot + left border." code={NodeStatusSource}>
        <NodeStatusTree />
      </DemoBox>

      <DemoBox title="Drag & drop" description="Rearrange nodes via native HTML5 DnD." code={DraggableSource}>
        <DraggableTree />
      </DemoBox>

      <DemoBox title="Inline edit" description="Double-click a title to rename." code={EditableSource}>
        <EditableTree />
      </DemoBox>

      <DemoBox title="Virtual scroll" description="1 000 nodes, only visible rows rendered." code={VirtualSource}>
        <VirtualTree />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope --sg-color-primary or data-sg-theme to skin one Tree."
        code={TokensOverrideSource}
      >
        <TokensOverrideTree />
      </DemoBox>

      <PropsTable title="Tree API" data={treeProps} />
      <PropsTable title="TreeNodeData" data={nodeProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Tree has no component-specific tokens — it is fully driven by global tokens. Override --sg-color-primary, --sg-color-bg-hover, and --sg-color-border to re-skin."
        data={treeCssVars}
      />
    </ComponentDoc>
  )
}
