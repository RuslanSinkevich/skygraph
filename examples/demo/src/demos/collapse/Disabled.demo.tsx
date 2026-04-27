import { Collapse } from '@skygraph/react'
import type { CollapseItem } from '@skygraph/react'

/**
 * `disabled` on an item greys the header, blocks pointer/keyboard
 * toggling, and keeps the body closed. Useful for gated sections
 * behind a permission or a pending state.
 */
const items: CollapseItem[] = [
  { key: '1', label: 'Open me', children: 'Regular panel.' },
  { key: '2', label: 'Locked — needs admin', children: 'Never visible.', disabled: true },
  { key: '3', label: 'Also open', children: 'Another regular panel.' },
]

export function DisabledCollapse() {
  return <Collapse items={items} defaultActiveKey={['1']} />
}
