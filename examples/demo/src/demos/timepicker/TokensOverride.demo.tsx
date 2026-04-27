import type { CSSProperties } from 'react'
import { TimePicker } from '@skygraph/react'

/**
 * TimePicker has no component-specific tokens — it composes global
 * form tokens for the input and global surface tokens for the
 * dropdown. Scope those globals on a wrapper to rebrand.
 */
const scoped: CSSProperties = {
  ['--sg-color-primary' as never]: '#10b981',
  ['--sg-color-primary-hover' as never]: '#34d399',
  ['--sg-color-primary-bg' as never]: 'rgba(16, 185, 129, 0.15)',
  ['--sg-color-border' as never]: '#6ee7b7',
  ['--sg-border-radius' as never]: '10px',
}

export function TokensOverrideTimePicker() {
  return (
    <div style={scoped}>
      <TimePicker defaultValue="09:30:00" placeholder="Mint theme" />
    </div>
  )
}
