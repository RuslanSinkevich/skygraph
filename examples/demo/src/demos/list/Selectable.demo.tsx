import { useState } from 'react'
import { List } from '@skygraph/react'
import { users } from './data'

/**
 * `selectable` turns rows into single-select buttons; combine
 * with `multiSelect` and `Ctrl/Cmd + click` for multi-pick.
 * Use `onSelectionChange` to react to changes.
 */
export function SelectableList() {
  const [picked, setPicked] = useState<string[]>([])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <List
        bordered
        selectable
        multiSelect
        dataSource={users}
        onSelectionChange={(_, items) => setPicked(items.map((u) => u.name))}
        renderItem={(u) => <List.Item>{u.name} — {u.role}</List.Item>}
      />
      <div style={{ color: 'var(--sg-color-text-secondary)', fontSize: 12 }}>
        Selected: {picked.length === 0 ? 'none' : picked.join(', ')} (hold Ctrl/Cmd for multi-pick)
      </div>
    </div>
  )
}
