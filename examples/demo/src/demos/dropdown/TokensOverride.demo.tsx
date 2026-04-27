import type { CSSProperties } from 'react'
import { Dropdown, Button } from '@skygraph/react'
import { basicItems } from './data'

/**
 * Dropdown has no component-specific tokens — scope the surface and
 * hover globals to restyle without editing the theme. The `danger`
 * row follows `--sg-color-error` + `--sg-color-error-bg`.
 */
const scoped: CSSProperties = {
  ['--sg-color-bg-elevated' as never]: '#fef3c7',
  ['--sg-color-border-secondary' as never]: '#fcd34d',
  ['--sg-color-bg-hover' as never]: '#fde68a',
  ['--sg-border-radius-lg' as never]: '12px',
  ['--sg-shadow-lg' as never]: '0 12px 30px rgba(202, 138, 4, 0.25)',
  ['--sg-color-error' as never]: '#b91c1c',
  ['--sg-color-error-bg' as never]: '#fecaca',
}

export function TokensOverrideDropdown() {
  return (
    <div style={scoped}>
      <Dropdown items={basicItems} trigger="click">
        <Button>Warm theme ▾</Button>
      </Dropdown>
    </div>
  )
}
