import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'

/**
 * Default vertical layout. Submenus open in a popover on hover.
 * One item selected via `defaultSelectedKeys`.
 */
export function VerticalMenu() {
  return (
    <div style={{ maxWidth: 256 }}>
      <Menu items={sidebarItems} defaultSelectedKeys={['dashboard']} />
    </div>
  )
}
