import type { CSSProperties } from 'react'
import { Checkbox } from '@skygraph/react'

/**
 * Checkbox has no component-specific tokens — the native `accent-color`
 * is pinned to `--sg-color-primary`, and label text inherits global text
 * tokens. Scope the globals to re-skin a single group.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: 'var(--sg-magenta-6)',
  ['--sg-color-text' as never]: 'var(--sg-magenta-9, #6b0e4a)',
  ['--sg-font-size' as never]: '13px',
}

export function TokensOverrideCheckbox() {
  return (
    <div style={{ ...scoped, display: 'grid', gap: 6 }}>
      <Checkbox defaultChecked>Magenta brand</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox>Small + magenta</Checkbox>
    </div>
  )
}
