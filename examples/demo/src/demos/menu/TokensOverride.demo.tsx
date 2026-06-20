import { Menu } from '@skygraph/react'
import { sidebarItems } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-fill-secondary': 'rgba(255, 255, 255, 0.1)',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
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
