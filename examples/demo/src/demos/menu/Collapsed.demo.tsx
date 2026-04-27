import { useState } from 'react'
import { Menu, Button } from '@skygraph/react'
import type { MenuItem } from '@skygraph/react'

const dot = (bg: string) => (
  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: bg }} />
)

const items: MenuItem[] = [
  { key: 'home', label: 'Home', icon: dot('var(--sg-color-primary)') },
  { key: 'mail', label: 'Mail', icon: dot('var(--sg-color-success)') },
  { key: 'calendar', label: 'Calendar', icon: dot('var(--sg-color-warning)') },
  {
    key: 'settings',
    label: 'Settings',
    icon: dot('var(--sg-color-text-tertiary)'),
    children: [
      { key: 'general', label: 'General' },
      { key: 'team', label: 'Team' },
    ],
  },
]

/**
 * `inlineCollapsed` shrinks the sidebar to icons only. Submenus open in a
 * hover popover — just like vertical mode. Combine with icons for the
 * classic mini-sidebar.
 */
export function CollapsedMenu() {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ width: collapsed ? 64 : 256, transition: 'width .2s' }}>
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          defaultSelectedKeys={['home']}
        />
      </div>
      <Button onClick={() => setCollapsed((v) => !v)}>
        {collapsed ? 'Expand' : 'Collapse'}
      </Button>
    </div>
  )
}
