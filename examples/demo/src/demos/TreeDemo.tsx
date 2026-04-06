import { useState } from 'react'
import { Tree } from '@skygraph/react'
import type { TreeNodeData, TreeKey } from '@skygraph/core'

const basicData: TreeNodeData[] = [
  {
    key: '0',
    title: 'Documents',
    children: [
      {
        key: '0-0',
        title: 'Work',
        children: [
          { key: '0-0-0', title: 'report.pdf' },
          { key: '0-0-1', title: 'presentation.pptx' },
        ],
      },
      {
        key: '0-1',
        title: 'Personal',
        children: [
          { key: '0-1-0', title: 'resume.docx' },
          { key: '0-1-1', title: 'photo.jpg' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'Music',
    children: [
      { key: '1-0', title: 'rock' },
      { key: '1-1', title: 'jazz' },
    ],
  },
  { key: '2', title: 'readme.txt' },
]

function BasicTree() {
  return (
    <div>
      <h3>Basic</h3>
      <Tree treeData={basicData} defaultExpandedKeys={['0', '0-0']} />
    </div>
  )
}

function CheckableTree() {
  const [checked, setChecked] = useState<TreeKey[]>([])
  return (
    <div>
      <h3>Checkable (cascade)</h3>
      <p style={{ fontSize: 12, color: '#888' }}>Checked: {checked.join(', ') || 'none'}</p>
      <Tree
        treeData={basicData}
        checkable
        checkedKeys={checked}
        onCheck={(keys) => setChecked(keys)}
        defaultExpandAll
      />
    </div>
  )
}

function CheckStrictlyTree() {
  const [checked, setChecked] = useState<TreeKey[]>([])
  return (
    <div>
      <h3>Checkable (strict, no cascade)</h3>
      <Tree
        treeData={basicData}
        checkable
        checkStrictly
        checkedKeys={checked}
        onCheck={(keys) => setChecked(keys)}
        defaultExpandAll
      />
    </div>
  )
}

function SelectableTree() {
  const [selected, setSelected] = useState<TreeKey[]>([])
  return (
    <div>
      <h3>Selectable (multiple)</h3>
      <p style={{ fontSize: 12, color: '#888' }}>Selected: {selected.join(', ') || 'none'}</p>
      <Tree
        treeData={basicData}
        multiple
        selectedKeys={selected}
        onSelect={(keys) => setSelected(keys)}
        defaultExpandAll
      />
    </div>
  )
}

function ShowLineTree() {
  return (
    <div>
      <h3>Show Line</h3>
      <Tree treeData={basicData} showLine defaultExpandAll />
    </div>
  )
}

function ShowIconTree() {
  return (
    <div>
      <h3>Custom Icons</h3>
      <Tree
        treeData={basicData}
        showIcon
        icon={({ expanded }) => (expanded ? '📂' : '📁')}
        defaultExpandAll
      />
    </div>
  )
}

function SwitcherIconTree() {
  return (
    <div>
      <h3>Custom Switcher Icon</h3>
      <Tree
        treeData={basicData}
        switcherIcon={({ expanded, isLeaf }) =>
          isLeaf ? '•' : expanded ? '−' : '+'
        }
        defaultExpandAll
      />
    </div>
  )
}

function DirectoryTree() {
  return (
    <div>
      <h3>Directory Mode</h3>
      <Tree
        treeData={basicData}
        directory
        defaultExpandedKeys={['0']}
      />
    </div>
  )
}

function BlockNodeTree() {
  return (
    <div>
      <h3>Block Node</h3>
      <Tree treeData={basicData} blockNode defaultExpandAll />
    </div>
  )
}

function DisabledTree() {
  const disabledData: TreeNodeData[] = [
    {
      key: '0',
      title: 'Parent',
      children: [
        { key: '0-0', title: 'Enabled child' },
        { key: '0-1', title: 'Disabled child', disabled: true },
        { key: '0-2', title: 'Disabled checkbox', disableCheckbox: true },
      ],
    },
  ]
  return (
    <div>
      <h3>Disabled Nodes</h3>
      <Tree treeData={disabledData} checkable defaultExpandAll />
    </div>
  )
}

function DraggableTree() {
  const [data, setData] = useState<TreeNodeData[]>([
    {
      key: 'team',
      title: 'Team',
      children: [
        { key: 'alice', title: 'Alice' },
        { key: 'bob', title: 'Bob' },
        { key: 'charlie', title: 'Charlie' },
      ],
    },
    {
      key: 'projects',
      title: 'Projects',
      children: [
        { key: 'alpha', title: 'Alpha' },
        { key: 'beta', title: 'Beta' },
      ],
    },
  ])

  return (
    <div>
      <h3>Draggable</h3>
      <Tree
        treeData={data}
        draggable
        defaultExpandAll
        onDrop={(info) => {
          console.log('Dropped', info.dragNode.key, 'onto', info.node.key, 'at', info.dropPosition)
        }}
      />
    </div>
  )
}

function AsyncLoadTree() {
  const [data, setData] = useState<TreeNodeData[]>([
    { key: 'root-1', title: 'Expand to load', isLeaf: false },
    { key: 'root-2', title: 'Another node', isLeaf: false },
    { key: 'root-3', title: 'Leaf node', isLeaf: true },
  ])

  const loadData = (node: TreeNodeData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const children: TreeNodeData[] = [
          { key: `${node.key}-0`, title: `${node.title} child 1`, isLeaf: true },
          { key: `${node.key}-1`, title: `${node.title} child 2`, isLeaf: true },
        ]
        setData((prev) => {
          const update = (nodes: TreeNodeData[]): TreeNodeData[] =>
            nodes.map((n) => {
              if (n.key === node.key) return { ...n, children }
              if (n.children) return { ...n, children: update(n.children) }
              return n
            })
          return update(prev)
        })
        resolve()
      }, 1000)
    })
  }

  return (
    <div>
      <h3>Async Loading</h3>
      <Tree treeData={data} loadData={loadData} />
    </div>
  )
}

function VirtualScrollTree() {
  const bigData: TreeNodeData[] = Array.from({ length: 20 }, (_, i) => ({
    key: `node-${i}`,
    title: `Node ${i}`,
    children: Array.from({ length: 50 }, (_, j) => ({
      key: `node-${i}-${j}`,
      title: `Child ${i}-${j}`,
    })),
  }))

  return (
    <div>
      <h3>Virtual Scroll (1000 nodes, height=300)</h3>
      <Tree treeData={bigData} height={300} defaultExpandAll />
    </div>
  )
}

function DeepNestingTree() {
  function buildDeep(prefix: string, depth: number, maxDepth: number): TreeNodeData[] {
    if (depth > maxDepth) return []
    return Array.from({ length: 3 }, (_, i) => ({
      key: `${prefix}-${i}`,
      title: `Level ${depth} Item ${i}`,
      children: buildDeep(`${prefix}-${i}`, depth + 1, maxDepth),
    }))
  }

  const deepData = buildDeep('root', 1, 6)

  return (
    <div>
      <h3>Deep Nesting (6 levels)</h3>
      <Tree treeData={deepData} defaultExpandedKeys={['root-0', 'root-0-0', 'root-0-0-0']} />
    </div>
  )
}

function FieldNamesTree() {
  const customData = [
    {
      id: 'a',
      name: 'Category A',
      items: [
        { id: 'a-1', name: 'Item A-1' },
        { id: 'a-2', name: 'Item A-2' },
      ],
    },
    { id: 'b', name: 'Category B' },
  ] as unknown as TreeNodeData[]

  return (
    <div>
      <h3>Custom Field Names</h3>
      <Tree
        treeData={customData}
        fieldNames={{ key: 'id', title: 'name', children: 'items' }}
        defaultExpandAll
      />
    </div>
  )
}

export function TreeDemo() {
  return (
    <section>
      <h2>Tree</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        <BasicTree />
        <CheckableTree />
        <CheckStrictlyTree />
        <SelectableTree />
        <ShowLineTree />
        <ShowIconTree />
        <SwitcherIconTree />
        <DirectoryTree />
        <BlockNodeTree />
        <DisabledTree />
        <DraggableTree />
        <AsyncLoadTree />
        <DeepNestingTree />
        <FieldNamesTree />
      </div>
      <div style={{ marginTop: 24 }}>
        <VirtualScrollTree />
      </div>
    </section>
  )
}
