import { List } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const listProps: PropDef[] = [
  { name: 'dataSource', description: 'Data array for the list', type: 'T[]' },
  { name: 'renderItem', description: 'Function to render each item', type: '(item: T, index: number) => ReactNode' },
  { name: 'header', description: 'Header content', type: 'ReactNode' },
  { name: 'footer', description: 'Footer content', type: 'ReactNode' },
  { name: 'loading', description: 'Show loading indicator', type: 'boolean', default: 'false' },
  { name: 'bordered', description: 'Show border around the list', type: 'boolean', default: 'false' },
  { name: 'split', description: 'Show separator between items', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Size of the list', type: "'small' | 'default' | 'large'", default: "'default'" },
  { name: 'pagination', description: 'Pagination config', type: 'false | { current?, pageSize?, total?, onChange? }' },
  { name: 'grid', description: 'Grid layout config', type: '{ gutter?, column? }' },
]

const data = [
  'Racing car sprance forward with a roaring engine.',
  'A gentle breeze sweeps over the peaceful countryside.',
  'The morning sun cast golden rays over the horizon.',
  'Quiet footsteps echo through the empty hallway.',
]

export function ListDemo() {
  return (
    <ComponentDoc
      title="List"
      description="Simple list component."
      whenToUse={[
        'When you need to display a collection of similar items.',
        'When you need a list with header, footer, and separators.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic list with header and footer."
        code={`import { List } from '@skygraph/react'

const data = ['Item 1', 'Item 2', 'Item 3']

<List
  header="Header"
  footer="Footer"
  bordered
  dataSource={data}
  renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
/>`}
      >
        <List
          header="Header"
          footer="Footer"
          bordered
          dataSource={data}
          renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
        />
      </DemoBox>

      <DemoBox
        title="Small Size"
        description="A small size list."
        code={`<List
  size="small"
  bordered
  dataSource={data}
  renderItem={(item) => <div style={{ padding: '4px 0' }}>{item}</div>}
/>`}
      >
        <List
          size="small"
          bordered
          header="Small List"
          dataSource={data}
          renderItem={(item) => <div style={{ padding: '4px 0' }}>{item}</div>}
        />
      </DemoBox>

      <DemoBox
        title="Large Size"
        description="A large size list."
        code={`<List
  size="large"
  bordered
  header="Large List"
  dataSource={data}
  renderItem={(item) => <div style={{ padding: '12px 0' }}>{item}</div>}
/>`}
      >
        <List
          size="large"
          bordered
          header="Large List"
          dataSource={data}
          renderItem={(item) => <div style={{ padding: '12px 0' }}>{item}</div>}
        />
      </DemoBox>

      <PropsTable data={listProps} />
    </ComponentDoc>
  )
}
