import { TreeSelect } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const treeSelectProps: PropDef[] = [
  { name: 'treeData', description: 'Tree data', type: 'TreeSelectNode[]' },
  { name: 'value', description: 'Selected value(s)', type: 'string | string[]' },
  { name: 'defaultValue', description: 'Default selected value(s)', type: 'string | string[]' },
  { name: 'onChange', description: 'Callback when selection changes', type: '(value: string | string[]) => void' },
  { name: 'multiple', description: 'Support multiple selection', type: 'boolean', default: 'false' },
  { name: 'treeCheckable', description: 'Show checkbox in tree nodes', type: 'boolean', default: 'false' },
  { name: 'showSearch', description: 'Show search input', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Show clear button', type: 'boolean', default: 'false' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  { name: 'treeDefaultExpandAll', description: 'Expand all nodes by default', type: 'boolean', default: 'false' },
  { name: 'disabled', description: 'Disable the selector', type: 'boolean', default: 'false' },
]

const treeData = [
  {
    key: 'parent-1',
    title: 'Parent 1',
    children: [
      { key: 'child-1-1', title: 'Child 1-1' },
      { key: 'child-1-2', title: 'Child 1-2' },
    ],
  },
  {
    key: 'parent-2',
    title: 'Parent 2',
    children: [
      { key: 'child-2-1', title: 'Child 2-1' },
      { key: 'child-2-2', title: 'Child 2-2' },
    ],
  },
]

export function TreeSelectDemo() {
  const [value, setValue] = useState<string | string[]>('')

  return (
    <ComponentDoc
      title="TreeSelect"
      description="Tree selection control."
      whenToUse={[
        'When you need to select from a hierarchical data structure.',
        'Similar to Select, but uses a tree structure for the dropdown.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The most basic usage."
        code={`import { TreeSelect } from '@skygraph/react'

const treeData = [
  { key: 'parent-1', title: 'Parent 1', children: [
    { key: 'child-1-1', title: 'Child 1-1' },
    { key: 'child-1-2', title: 'Child 1-2' },
  ]},
]

<TreeSelect
  treeData={treeData}
  placeholder="Please select"
  treeDefaultExpandAll
/>`}
      >
        <div style={{ width: 300 }}>
          <TreeSelect
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            value={value}
            onChange={setValue}
            allowClear
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Multiple"
        description="Multiple selection mode."
        code={`<TreeSelect
  treeData={treeData}
  multiple
  treeDefaultExpandAll
  placeholder="Select multiple"
/>`}
      >
        <div style={{ width: 300 }}>
          <TreeSelect
            treeData={treeData}
            multiple
            treeDefaultExpandAll
            placeholder="Select multiple"
            allowClear
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Checkable"
        description="Tree checkable mode."
        code={`<TreeSelect
  treeData={treeData}
  treeCheckable
  treeDefaultExpandAll
  placeholder="Check nodes"
/>`}
      >
        <div style={{ width: 300 }}>
          <TreeSelect
            treeData={treeData}
            treeCheckable
            treeDefaultExpandAll
            placeholder="Check nodes"
            allowClear
          />
        </div>
      </DemoBox>

      <PropsTable data={treeSelectProps} />
    </ComponentDoc>
  )
}
