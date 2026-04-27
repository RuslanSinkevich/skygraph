import { Menu } from '@skygraph/react'
import { groupedItems } from './data'

/**
 * `type: 'group'` adds a titled non-selectable section. `type: 'divider'`
 * draws a horizontal rule. `danger: true` styles an item with the error
 * palette — use for destructive actions.
 */
export function GroupsDividersMenu() {
  return (
    <div style={{ maxWidth: 256 }}>
      <Menu mode="inline" items={groupedItems} defaultSelectedKeys={['dashboard']} />
    </div>
  )
}
