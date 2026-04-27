import { Menu } from '@skygraph/react'
import type { MenuItem } from '@skygraph/react'

const dot = (bg: string) => (
  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: bg }} />
)

const items: MenuItem[] = [
  { key: 'inbox', label: 'Inbox', icon: dot('var(--sg-color-primary)') },
  { key: 'starred', label: 'Starred', icon: dot('var(--sg-color-warning)') },
  { key: 'archive', label: 'Archive', icon: dot('var(--sg-color-text-tertiary)') },
  {
    key: 'labels',
    label: 'Labels',
    icon: dot('var(--sg-color-success)'),
    children: [
      { key: 'work', label: 'Work', icon: dot('var(--sg-blue-5)') },
      { key: 'personal', label: 'Personal', icon: dot('var(--sg-magenta-5)') },
    ],
  },
]

/**
 * Every MenuItem accepts an `icon` ReactNode — use your icon pack, a
 * colored dot, or an SVG. Icons align automatically with the label.
 */
export function WithIconsMenu() {
  return (
    <div style={{ maxWidth: 256 }}>
      <Menu mode="inline" items={items} defaultOpenKeys={['labels']} defaultSelectedKeys={['inbox']} />
    </div>
  )
}
