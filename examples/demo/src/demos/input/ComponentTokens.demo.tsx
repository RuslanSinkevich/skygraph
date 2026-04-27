import type { CSSProperties } from 'react'
import { Input } from '@skygraph/react'

/**
 * Input exposes component-specific tokens (`--sg-input-*`) in addition
 * to the globals. Scope them on a parent to reshape a group of inputs
 * without touching the rest of the form.
 */
const rounded: CSSProperties = {
  ['--sg-input-height' as never]: '44px',
  ['--sg-input-radius' as never]: '14px',
  ['--sg-input-font-size' as never]: '16px',
  ['--sg-input-padding' as never]: '10px 16px',
}

const brand: CSSProperties = {
  ['--sg-color-primary' as never]: '#7c3aed',
  ['--sg-color-primary-hover' as never]: '#8b5cf6',
  ['--sg-color-primary-bg' as never]: '#f3e8ff',
  ['--sg-input-border' as never]: '#c4b5fd',
}

export function ComponentTokensInput() {
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <div style={rounded}>
        <Input placeholder="Rounded soft input" />
      </div>
      <div style={brand}>
        <Input placeholder="Violet brand input" />
      </div>
    </div>
  )
}
