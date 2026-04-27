import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * Click is the natural trigger for action menus — users press the
 * button intentionally, then pick a row. Hover is best for always-
 * visible chrome like breadcrumb pop-outs.
 */
export function TriggerDropdown() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Dropdown items={basicItems} trigger="click">
        <Button>Click trigger</Button>
      </Dropdown>
      <Dropdown items={basicItems} trigger="hover">
        <Button>Hover trigger</Button>
      </Dropdown>
    </div>
  )
}
