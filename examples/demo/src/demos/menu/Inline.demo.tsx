import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'

/**
 * Inline mode — submenus expand in place with indentation. Ideal for
 * sidebar navigation in apps with deep trees.
 */
export function InlineMenu() {
  return (
    <div style={{ maxWidth: 256 }}>
      <Menu
        mode="inline"
        items={sidebarItems}
        defaultOpenKeys={['team']}
        defaultSelectedKeys={['members']}
        onSelect={(info) => console.log('[Menu] select', info.key)}
      />
    </div>
  )
}
