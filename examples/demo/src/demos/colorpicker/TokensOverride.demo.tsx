import type { CSSProperties } from 'react'
import { ColorPicker } from '@skygraph/react'

/**
 * ColorPicker has no component-specific tokens — it composes the
 * global form tokens for the trigger and the global surface tokens
 * for the dropdown. Scope those globals on a wrapper to rebrand.
 */
const scoped: CSSProperties = {
  ['--sg-color-border' as never]: '#c4b5fd',
  ['--sg-color-primary' as never]: '#7c3aed',
  ['--sg-color-primary-hover' as never]: '#a855f7',
  ['--sg-color-primary-bg' as never]: 'rgba(124, 58, 237, 0.15)',
  ['--sg-border-radius' as never]: '10px',
  ['--sg-border-radius-sm' as never]: '6px',
  ['--sg-color-bg-elevated' as never]: '#f5f3ff',
}

export function TokensOverrideColorPicker() {
  return (
    <div style={scoped}>
      <ColorPicker defaultValue="#7c3aed" showText />
    </div>
  )
}
