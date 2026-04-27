import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * Keyboard support is baked in: Tab to focus the trigger, Space /
 * Enter to open, ↑ / ↓ to move focus (skipping disabled + dividers),
 * Enter to activate, Esc to close.
 */
export function KeyboardDropdown() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Dropdown items={basicItems} trigger="click">
        <Button>Tab here, then Space</Button>
      </Dropdown>
      <p style={{ margin: 0, fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Try <kbd>Tab</kbd> → <kbd>Space</kbd> → <kbd>↓</kbd> → <kbd>Enter</kbd>
      </p>
    </div>
  )
}
