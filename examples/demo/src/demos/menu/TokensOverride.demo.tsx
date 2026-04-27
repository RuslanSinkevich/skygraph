import type { CSSProperties } from 'react'
import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'

/**
 * Menu doesn't expose `--sg-menu-*` tokens — it leans on the global
 * palette. Scope the globals on a wrapper to re-skin a single menu.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: 'var(--sg-magenta-6)',
  ['--sg-color-primary-bg' as never]: 'var(--sg-magenta-1)',
  ['--sg-color-bg-hover' as never]: 'var(--sg-magenta-1)',
  ['--sg-border-radius-lg' as never]: '12px',
}

export function TokensOverrideMenu() {
  return (
    <div style={{ ...scoped, maxWidth: 256 }}>
      <Menu mode="inline" items={sidebarItems} defaultOpenKeys={['team']} defaultSelectedKeys={['members']} />
    </div>
  )
}
