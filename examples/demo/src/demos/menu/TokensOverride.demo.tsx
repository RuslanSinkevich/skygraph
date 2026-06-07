import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Menu leans on the global palette — the selected item follows
 * `--sg-color-primary` / `--sg-color-primary-bg`, hover follows
 * `--sg-color-bg-hover`. Three scoped recipes — branded green, dark field,
 * glass pick — reskin one menu.
 */
export function TokensOverrideMenu() {
  return (
    <TokenScopeCards
      render={() => (
        <Menu
          mode="inline"
          items={sidebarItems}
          defaultOpenKeys={['team']}
          defaultSelectedKeys={['members']}
        />
      )}
    />
  )
}
