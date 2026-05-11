import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'

/**
 * `theme="dark"` flips the menu to a dark palette. Wrap it in a dark
 * surface to complete the look.
 */
export function DarkThemeMenu() {
  return (
    <div style={{ maxWidth: 256, background: '#141414', padding: 8, borderRadius: 8 }}>
      <Menu
        theme="dark"
        mode="inline"
        items={sidebarItems}
        defaultOpenKeys={['settings']}
        defaultSelectedKeys={['billing']}
      />
    </div>
  )
}
