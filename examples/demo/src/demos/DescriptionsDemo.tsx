import { Descriptions } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const descriptionsProps: PropDef[] = [
  { name: 'title', description: 'Title of the description list', type: 'ReactNode' },
  { name: 'items', description: 'Description items', type: 'DescriptionsItem[]' },
  { name: 'bordered', description: 'Whether to show border', type: 'boolean', default: 'false' },
  { name: 'column', description: 'Number of columns per row', type: 'number', default: '3' },
  { name: 'layout', description: 'Layout direction', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
  { name: 'colon', description: 'Show colon after label', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Size of the list', type: "'small' | 'middle' | 'large'", default: "'middle'" },
]

const itemProps: PropDef[] = [
  { name: 'label', description: 'Description item label', type: 'ReactNode' },
  { name: 'children', description: 'Description item content', type: 'ReactNode' },
  { name: 'span', description: 'Number of columns the item spans', type: 'number', default: '1' },
]

const userItems = [
  { key: 'name', label: 'UserName', children: 'John Doe' },
  { key: 'phone', label: 'Telephone', children: '1810000000' },
  { key: 'live', label: 'Live', children: 'Hangzhou, Zhejiang' },
  { key: 'remark', label: 'Remark', children: 'Empty' },
  { key: 'address', label: 'Address', children: 'No. 18, Wantang Road, Xihu District, Hangzhou', span: 2 },
]

export function DescriptionsDemo() {
  return (
    <ComponentDoc
      title="Descriptions"
      description="Display multiple read-only fields in groups."
      whenToUse={[
        'When you need to display information in key-value pairs.',
        'Commonly used on detail pages.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Simplest usage."
        code={`import { Descriptions } from '@skygraph/react'

<Descriptions title="User Info" items={[
  { label: 'UserName', children: 'John Doe' },
  { label: 'Telephone', children: '1810000000' },
  { label: 'Live', children: 'Hangzhou, Zhejiang' },
  { label: 'Address', children: 'No. 18, Wantang Road', span: 2 },
]} />`}
      >
        <Descriptions title="User Info" items={userItems} />
      </DemoBox>

      <DemoBox
        title="Bordered"
        description="Bordered descriptions with background."
        code={`<Descriptions title="User Info" bordered items={items} />`}
      >
        <Descriptions title="User Info" bordered items={userItems} />
      </DemoBox>

      <DemoBox
        title="Vertical"
        description="Vertical layout."
        code={`<Descriptions layout="vertical" title="User Info" items={items} />`}
      >
        <Descriptions layout="vertical" title="User Info" items={userItems} />
      </DemoBox>

      <DemoBox
        title="Columns"
        description="Customize number of columns."
        code={`<Descriptions title="User Info" column={2} bordered items={items} />`}
      >
        <Descriptions title="User Info" column={2} bordered items={userItems} />
      </DemoBox>

      <PropsTable data={descriptionsProps} />
      <PropsTable title="DescriptionsItem" data={itemProps} />
    </ComponentDoc>
  )
}
