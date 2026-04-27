import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * `disabled` prevents the menu from opening and short-circuits
 * `onSelect`. The trigger's own click / hover state is untouched —
 * use it to handle the "try again later" hint.
 */
export function DisabledDropdown() {
  return (
    <Dropdown items={basicItems} disabled>
      <Button disabled>Disabled</Button>
    </Dropdown>
  )
}
