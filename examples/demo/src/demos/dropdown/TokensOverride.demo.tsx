import { Dropdown, Button } from '@skygraph/react'
import type { DropdownItem } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-disabled': '#64748b',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-text': '#f8fafc',
  '--sg-color-error': '#f87171',
} as CSSProperties

const items: DropdownItem[] = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { key: 'd1', label: '', divider: true },
  { key: '3', label: 'Delete…', danger: true },
]

export function TokensOverrideDropdown() {
  return (
    <div style={dark}>
      <Dropdown items={items} trigger="click">
        <Button>Actions ▾</Button>
      </Dropdown>
    </div>
  )
}
