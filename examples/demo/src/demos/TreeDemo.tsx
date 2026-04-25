import { Tree } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const treeProps: PropDef[] = [
  { name: 'treeData', description: 'Tree data array', type: 'TreeNodeData[]' },
  { name: 'checkable', description: 'Add a Checkbox before tree nodes', type: 'boolean', default: 'false' },
  { name: 'selectable', description: 'Whether nodes can be selected', type: 'boolean', default: 'true' },
  { name: 'defaultExpandAll', description: 'Expand all tree nodes by default', type: 'boolean', default: 'false' },
  { name: 'showLine', description: 'Show connection lines', type: 'boolean', default: 'false' },
  { name: 'draggable', description: 'Enable drag and drop', type: 'boolean | ((node) => boolean)', default: 'false' },
  { name: 'checkedKeys', description: 'Controlled checked keys', type: 'TreeKey[]' },
  { name: 'selectedKeys', description: 'Controlled selected keys', type: 'TreeKey[]' },
  { name: 'expandedKeys', description: 'Controlled expanded keys', type: 'TreeKey[]' },
  { name: 'onCheck', description: 'Callback when a node is checked', type: '(checkedKeys, info) => void' },
  { name: 'onSelect', description: 'Callback when a node is selected', type: '(selectedKeys, info) => void' },
  { name: 'onExpand', description: 'Callback when a node is expanded', type: '(expandedKeys, info) => void' },
]

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      {
        key: '0-0-0',
        title: 'parent 1-0',
        children: [
          { key: '0-0-0-0', title: 'leaf' },
          { key: '0-0-0-1', title: 'leaf' },
        ],
      },
      {
        key: '0-0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-0-1-0', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: 'parent 2',
    children: [
      { key: '0-1-0', title: 'leaf' },
    ],
  },
]

export function TreeDemo() {
  const [checkedKeys, setCheckedKeys] = useState<(string | number)[]>([])

  return (
    <ComponentDoc
      title="Tree"
      description="A hierarchical list structure component."
      whenToUse={[
        'When displaying a folder structure, organizational chart, or nested list.',
        'When you need tree selection with checkboxes.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic usage, displaying a checkable Tree."
        code={`import { Tree } from '@skygraph/react'

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      { key: '0-0-0', title: 'child 1' },
      { key: '0-0-1', title: 'child 2' },
    ],
  },
]

<Tree treeData={treeData} defaultExpandAll />`}
      >
        <Tree treeData={treeData} defaultExpandAll />
      </DemoBox>

      <DemoBox
        title="Checkable"
        description="Tree with checkboxes."
        code={`const [checkedKeys, setCheckedKeys] = useState([])

<Tree
  treeData={treeData}
  checkable
  defaultExpandAll
  checkedKeys={checkedKeys}
  onCheck={(keys) => setCheckedKeys(keys)}
/>`}
      >
        <Tree
          treeData={treeData}
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={(keys) => setCheckedKeys(keys)}
        />
      </DemoBox>

      <DemoBox
        title="Show Line"
        description="Tree with connecting lines."
        code={`<Tree treeData={treeData} showLine defaultExpandAll />`}
      >
        <Tree treeData={treeData} showLine defaultExpandAll />
      </DemoBox>

      <DemoBox
        title="Component tokens"
        description="Override --sg-tree-* tokens on a scope to restyle only this tree."
        code={`<div style={{
  ['--sg-tree-indent' as any]: '28px',
  ['--sg-tree-node-hover-bg' as any]: 'var(--sg-color-primary-bg)',
}}>
  <Tree treeData={treeData} defaultExpandAll />
</div>`}
      >
        <div
          style={{
            ['--sg-tree-indent' as never]: '28px',
            ['--sg-tree-node-hover-bg' as never]: 'var(--sg-color-primary-bg)',
          }}
        >
          <Tree treeData={treeData} defaultExpandAll showLine />
        </div>
      </DemoBox>

      <DemoBox
        title="Scoped brand"
        description="Override --sg-color-primary on a scope — selection and focus follow automatically."
        code={`<div style={{ ['--sg-color-primary' as any]: '#e11d48' }}>
  <Tree treeData={treeData} defaultExpandAll />
</div>`}
      >
        <div style={{ ['--sg-color-primary' as never]: '#e11d48' }}>
          <Tree
            treeData={treeData}
            defaultExpandAll
            checkable
            checkedKeys={checkedKeys}
            onCheck={(keys) => setCheckedKeys(keys)}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Dark theme scope"
        description="Wrap in a node with data-sg-theme='dark' to render the tree in the dark palette without affecting the rest of the page."
        code={`<div data-sg-theme="dark" style={{ padding: 12, background: 'var(--sg-color-bg-container)' }}>
  <Tree treeData={treeData} defaultExpandAll showLine />
</div>`}
      >
        <div
          data-sg-theme="dark"
          style={{
            padding: 12,
            background: 'var(--sg-color-bg-container)',
            borderRadius: 'var(--sg-border-radius)',
          }}
        >
          <Tree treeData={treeData} defaultExpandAll showLine />
        </div>
      </DemoBox>

      <DemoBox
        title="Selectable vs checkable"
        description="Selection highlights a single active node; checkable toggles checkboxes instead."
        code={`<Tree treeData={treeData} selectable defaultExpandAll />
<Tree treeData={treeData} checkable defaultExpandAll />`}
      >
        <div
          style={{
            display: 'grid',
            gap: 24,
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          <div>
            <strong style={{ display: 'block', marginBottom: 8 }}>Selectable</strong>
            <Tree treeData={treeData} defaultExpandAll />
          </div>
          <div>
            <strong style={{ display: 'block', marginBottom: 8 }}>Checkable</strong>
            <Tree treeData={treeData} checkable defaultExpandAll />
          </div>
        </div>
      </DemoBox>

      <PropsTable data={treeProps} />
    </ComponentDoc>
  )
}
