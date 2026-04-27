import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * `unstyled` drops the sg-dropdown classes and leaves you with a
 * `<div>` + `<hr>` skeleton. The behaviour (open / close, hover
 * handling, `onSelect`) stays — you bring your own styling.
 */
export function UnstyledDropdown() {
  return (
    <Dropdown unstyled items={basicItems} trigger="click">
      <Button>Unstyled trigger</Button>
    </Dropdown>
  )
}
