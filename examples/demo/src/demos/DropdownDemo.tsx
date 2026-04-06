import { Button, Dropdown, notification, NotificationContainer } from '@skygraph/react'

const items = [
  { key: 'edit', label: 'Edit' },
  { key: 'copy', label: 'Copy' },
  { key: 'move', label: 'Move to...' },
  { key: 'div1', label: '', divider: true },
  { key: 'delete', label: 'Delete', danger: true },
]

const disabledItems = [
  { key: 'a', label: 'Available' },
  { key: 'b', label: 'Disabled item', disabled: true },
  { key: 'c', label: 'Another item' },
]

export function DropdownDemo() {
  return (
    <section>
      <h2>Dropdown</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Menu dropdown with hover/click trigger, danger items, and dividers.
      </p>
      <NotificationContainer />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Dropdown items={items} onSelect={(key) => notification.info(`Selected: ${key}`)}>
          <Button>Hover me</Button>
        </Dropdown>

        <Dropdown items={items} trigger="click" onSelect={(key) => notification.info(`Selected: ${key}`)}>
          <Button type="primary">Click me</Button>
        </Dropdown>

        <Dropdown items={disabledItems} onSelect={(key) => notification.info(`Selected: ${key}`)}>
          <Button>With disabled item</Button>
        </Dropdown>

        <Dropdown items={items} placement="bottomRight" onSelect={(key) => notification.info(`Selected: ${key}`)}>
          <Button>Bottom Right</Button>
        </Dropdown>
      </div>
    </section>
  )
}
