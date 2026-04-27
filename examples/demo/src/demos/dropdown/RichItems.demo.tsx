import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'

/**
 * `label` is a full `ReactNode` — pair an icon with a description, or
 * render two lines with a shortcut on the right. Keep rows short; if
 * you need sections use dividers.
 */
const row = (icon: string, title: string, shortcut: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', minWidth: 180 }}>
    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <span aria-hidden="true">{icon}</span>
      <span>{title}</span>
    </span>
    <kbd style={{ fontSize: 11, opacity: 0.7 }}>{shortcut}</kbd>
  </div>
)

const items: DropdownItem[] = [
  { key: 'new', label: row('📄', 'New file', '⌘ N') },
  { key: 'open', label: row('📂', 'Open…', '⌘ O') },
  { key: 'd1', label: '', divider: true },
  { key: 'save', label: row('💾', 'Save', '⌘ S') },
  { key: 'save-as', label: row('💾', 'Save as…', '⇧ ⌘ S') },
  { key: 'd2', label: '', divider: true },
  { key: 'close', label: row('✕', 'Close window', '⌘ W'), danger: true },
]

export function RichItemsDropdown() {
  return (
    <Dropdown items={items} trigger="click">
      <Button>File ▾</Button>
    </Dropdown>
  )
}
