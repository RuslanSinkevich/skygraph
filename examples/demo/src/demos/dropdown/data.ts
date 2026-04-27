import type { DropdownItem } from '@skygraph/react'

export const basicItems: DropdownItem[] = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { key: '3', label: 'Archive (soon)', disabled: true },
  { key: 'd1', label: '', divider: true },
  { key: '4', label: 'Delete…', danger: true },
]
