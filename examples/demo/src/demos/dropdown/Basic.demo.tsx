import { useState } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * Hover the trigger to reveal the menu. `onSelect` fires with the
 * item's `key`. Items with `disabled` can't be clicked; `danger`
 * paints the row in the error palette; `divider` renders a line.
 */
export function BasicDropdown() {
  const [last, setLast] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Dropdown items={basicItems} onSelect={setLast}>
        <Button>Hover me</Button>
      </Dropdown>
      {last && (
        <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
          last action: <code>{last}</code>
        </span>
      )}
    </div>
  )
}
