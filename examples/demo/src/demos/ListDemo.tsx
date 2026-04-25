import { List, Button, Tag, Avatar } from '@skygraph/react'
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
  { name: 'rowClassName', description: 'Custom class for item wrapper', type: 'string | (item, index) => string' },
  { name: 'classNames', description: 'Slot classes (root/header/footer/items/item/empty/pagination)', type: 'ListClassNames' },
  { name: 'styles', description: 'Slot inline styles (root/header/footer/items/item/empty/pagination)', type: 'ListStyles' },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
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

      <DemoBox
        title="Styling: classNames / styles (slots)"
        description="Target stable DOM slots without deep selectors."
        code={`<List
  dataSource={data}
  header="Header"
  footer="Footer"
  classNames={{
    root: 'demo-list-root',
    header: 'demo-list-header',
    item: 'demo-list-item',
  }}
  styles={{
    header: { fontWeight: 700 },
    item: { borderRadius: 10 },
  }}
  renderItem={(item, index) => <div style={{ padding: '8px 0' }}>{index + 1}. {item}</div>}
/>`}
      >
        <List
          dataSource={data}
          header="Header"
          footer="Footer"
          classNames={{
            root: 'demo-list-root',
            header: 'demo-list-header',
            item: 'demo-list-item',
          }}
          styles={{
            header: { fontWeight: 700 },
            item: { borderRadius: 10 },
          }}
          renderItem={(item, index) => <div style={{ padding: '8px 0' }}>{index + 1}. {item}</div>}
        />
      </DemoBox>

      <DemoBox
        title="Styling: tokens (per instance)"
        description="Override component tokens on a wrapper to restyle a single list."
        code={`<div style={{
  ['--sg-list-item-hover-bg' as any]: 'var(--sg-color-primary-bg)',
  ['--sg-list-border-color' as any]: 'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
}}>
  <List ... />
</div>`}
      >
        <div
          style={{
            width: '100%',
            ['--sg-list-item-hover-bg' as never]: 'var(--sg-color-primary-bg)',
            ['--sg-list-border-color' as never]:
              'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
          }}
        >
          <List
            bordered
            header="Token-styled List"
            dataSource={data}
            renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="Styling: unstyled (headless visual)"
        description="Strip SkyGraph styles and bring your own CSS."
        code={`<div className="demo-unstyled-card">
  <div className="demo-unstyled-card-title">Unstyled list wrapper</div>
  <List
    unstyled
    dataSource={data}
    renderItem={(item) => <div>{item}</div>}
  />
</div>`}
      >
        <div className="demo-unstyled-card" style={{ width: '100%' }}>
          <div className="demo-unstyled-card-title">Unstyled list wrapper</div>
          <div className="demo-unstyled-card-row">
            <button className="demo-unstyled-btn" type="button">Custom action</button>
            <Button type="primary">SkyGraph styled button</Button>
          </div>
          <List
            unstyled
            dataSource={data}
            renderItem={(item, index) => (
              <div
                style={{
                  padding: '10px 12px',
                  borderTop: index === 0 ? '1px solid var(--sg-color-border-secondary)' : undefined,
                  borderBottom: '1px solid var(--sg-color-border-secondary)',
                }}
              >
                {item}
              </div>
            )}
          />
        </div>
      </DemoBox>

      <DemoBox
        title="With List.Item + Meta"
        description="Structured item with avatar, title, description, actions and extra."
        code={`<List bordered dataSource={users} renderItem={(u) => (
  <List.Item
    actions={[<Button type="link" key="edit">Edit</Button>, <Button type="link" key="del">Delete</Button>]}
    extra={<Tag color={u.status}>{u.status}</Tag>}
  >
    <List.Item.Meta
      avatar={<Avatar>{u.name[0]}</Avatar>}
      title={u.name}
      description={u.role}
    />
  </List.Item>
)} />`}
      >
        <List
          bordered
          dataSource={[
            { id: 1, name: 'Alice', role: 'Frontend engineer', status: 'success' as const },
            { id: 2, name: 'Bob', role: 'Designer', status: 'warning' as const },
            { id: 3, name: 'Charlie', role: 'PM', status: 'default' as const },
          ]}
          renderItem={(u) => (
            <List.Item
              actions={[
                <Button key="edit" type="link">
                  Edit
                </Button>,
                <Button key="del" type="link">
                  Delete
                </Button>,
              ]}
              extra={<Tag color={u.status}>{u.status}</Tag>}
            >
              <List.Item.Meta
                avatar={<Avatar>{u.name[0]}</Avatar>}
                title={u.name}
                description={u.role}
              />
            </List.Item>
          )}
        />
      </DemoBox>

      <DemoBox
        title="Conditional rowClassName"
        description="Pick items by predicate — pinned, featured, unread — and style them."
        code={`<List
  dataSource={tasks}
  rowClassName={(t) => t.pinned ? 'demo-list-item-featured' : ''}
  renderItem={(t) => <List.Item extra={t.pinned ? <Tag>pinned</Tag> : null}>{t.title}</List.Item>}
/>`}
      >
        <List
          bordered
          dataSource={[
            { id: 1, title: 'Ship 0.4 release', pinned: true },
            { id: 2, title: 'Triage issues', pinned: false },
            { id: 3, title: 'Update docs', pinned: true },
            { id: 4, title: 'Rework benchmarks', pinned: false },
          ]}
          rowClassName={(t) => (t.pinned ? 'demo-list-item-featured' : '')}
          renderItem={(t) => (
            <List.Item extra={t.pinned ? <Tag color="primary">pinned</Tag> : null}>
              {t.title}
            </List.Item>
          )}
        />
      </DemoBox>

      <DemoBox
        title="Grid layout"
        description="Render items in a responsive grid."
        code={`<List
  grid={{ gutter: 16, column: 3 }}
  dataSource={cards}
  renderItem={(c) => <div className="card">{c}</div>}
/>`}
      >
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta']}
          renderItem={(card) => (
            <div
              style={{
                padding: 16,
                border: '1px solid var(--sg-color-border-secondary)',
                borderRadius: 8,
                textAlign: 'center',
                background: 'var(--sg-color-bg)',
              }}
            >
              {card}
            </div>
          )}
        />
      </DemoBox>

      <DemoBox
        title="Pagination"
        description="Built-in pagination. Set pagination={false} to disable."
        code={`<List
  dataSource={items}
  pagination={{ pageSize: 3 }}
  renderItem={(it) => <List.Item>{it}</List.Item>}
/>`}
      >
        <List
          bordered
          dataSource={Array.from({ length: 9 }, (_, i) => `Row ${i + 1}`)}
          pagination={{ pageSize: 3 }}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </DemoBox>

      <DemoBox
        title="Loading state"
        description="Show Spin overlay while waiting for data."
        code={`<List loading dataSource={[]} renderItem={() => null} />`}
      >
        <List
          bordered
          loading
          header="Loading…"
          dataSource={['Waiting']}
          renderItem={(it) => <List.Item>{it}</List.Item>}
        />
      </DemoBox>

      <PropsTable data={listProps} />
    </ComponentDoc>
  )
}
