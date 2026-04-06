import { useState } from 'react'
import { Button } from '../../../../packages/react/src/components/ui/Button'
import { Menu, type MenuItem } from '../../../../packages/react/src/components/ui/Menu'

const baseItems: MenuItem[] = [
  { key: '1', label: 'Dashboard' },
  { key: '2', label: 'Projects' },
  { key: '3', label: 'Team' },
]

const nestedItems: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Products',
    children: [
      { key: 'p1', label: 'Catalog' },
      { key: 'p2', label: 'Inventory' },
      {
        key: 'sub2',
        label: 'More',
        children: [
          { key: 'm1', label: 'Reports' },
          { key: 'm2', label: 'Exports' },
        ],
      },
    ],
  },
  { key: 'settings', label: 'Settings' },
]

export function MenuDemo() {
  const [inlineOpen, setInlineOpen] = useState<string[]>(['sub1'])
  const [collapsed, setCollapsed] = useState(false)

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2>Menu</h2>

      <section>
        <h3>Horizontal</h3>
        <Menu mode="horizontal" items={baseItems} defaultSelectedKeys={['2']} />
      </section>

      <section>
        <h3>Vertical with nested submenus</h3>
        <div style={{ maxWidth: 260 }}>
          <Menu mode="vertical" items={nestedItems} defaultOpenKeys={['sub1']} defaultSelectedKeys={['p1']} />
        </div>
      </section>

      <section>
        <h3>Inline (accordion-style open keys)</h3>
        <div style={{ maxWidth: 280, border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8 }}>
          <Menu
            mode="inline"
            items={nestedItems}
            openKeys={inlineOpen}
            onOpenChange={setInlineOpen}
            defaultSelectedKeys={['p1']}
          />
        </div>
      </section>

      <section>
        <h3>Inline collapsed (icon-only root)</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Button size="small" onClick={() => setCollapsed((c) => !c)}>
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
          <div style={{ width: collapsed ? 72 : 240, border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8 }}>
            <Menu
              mode="inline"
              inlineCollapsed={collapsed}
              items={nestedItems}
              defaultOpenKeys={['sub1']}
              defaultSelectedKeys={['p1']}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Dark theme</h3>
        <div style={{ padding: 12, background: '#141414', borderRadius: 8, maxWidth: 260 }}>
          <Menu theme="dark" mode="vertical" items={nestedItems} defaultOpenKeys={['sub1']} defaultSelectedKeys={['m1']} />
        </div>
      </section>
    </section>
  )
}
