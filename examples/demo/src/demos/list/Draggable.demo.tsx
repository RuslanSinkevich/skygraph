import { useState } from 'react'
import { List } from '@skygraph/react'

/**
 * `draggable` adds a ⠿ handle and native HTML drag-and-drop.
 * React to the final drop via `onReorder(from, to)` — you own
 * the reorder logic (immutable, optimistic, or server-driven).
 */
export function DraggableList() {
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma', 'Delta'])
  return (
    <List
      bordered
      draggable
      dataSource={items}
      onReorder={(from, to) => {
        setItems((prev) => {
          const next = [...prev]
          const [moved] = next.splice(from, 1)
          next.splice(to, 0, moved)
          return next
        })
      }}
      renderItem={(it) => <List.Item>{it}</List.Item>}
    />
  )
}
