import { Tabs } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-border-secondary': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

const items = [
  {
    key: '1',
    label: 'Overview',
    children: <p style={{ margin: '8px 0 0' }}>Tab panel content.</p>,
  },
  {
    key: '2',
    label: 'Activity',
    children: <p style={{ margin: '8px 0 0' }}>Tab panel content.</p>,
  },
  {
    key: '3',
    label: 'Settings',
    children: <p style={{ margin: '8px 0 0' }}>Tab panel content.</p>,
  },
]

export function TokensOverrideTabs() {
  return (
    <div style={dark}>
      <Tabs type="line" items={items} />
    </div>
  )
}
