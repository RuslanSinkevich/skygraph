import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'

/**
 * `unstyled` renders only semantic `<ul>/<li>` with correct ARIA roles
 * and open/close mechanics. Bring your own CSS.
 */
export function UnstyledMenu() {
  return (
    <div style={{ maxWidth: 256 }}>
      <Menu unstyled items={sidebarItems} defaultSelectedKeys={['projects']} />
    </div>
  )
}
