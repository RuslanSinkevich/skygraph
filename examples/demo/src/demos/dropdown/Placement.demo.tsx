import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * Four corners are available. `bottomLeft` aligns the menu's left
 * edge with the trigger (default), `bottomRight` aligns the right
 * edge — pick the side that keeps the menu inside the viewport.
 */
export function PlacementDropdown() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 8, justifyContent: 'start' }}>
      <Dropdown items={basicItems} placement="bottomLeft">
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown items={basicItems} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
      <Dropdown items={basicItems} placement="topLeft">
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown items={basicItems} placement="topRight">
        <Button>topRight</Button>
      </Dropdown>
    </div>
  )
}
