import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.22)',
} as CSSProperties

export function TokensOverrideMenu() {
  return (
    <div style={dark}>
      <Menu
        mode="inline"
        items={sidebarItems}
        defaultOpenKeys={['team']}
        defaultSelectedKeys={['members']}
      />
    </div>
  )
}
