import type { CSSProperties } from 'react'
import { Button } from '@skygraph/react'

/**
 * Button exposes a full set of component-local tokens (`--sg-btn-
 * height / radius / padding / font-size / bg / color / border`).
 * Scope them on a wrapper to reshape without losing semantic
 * behaviour like hover / focus / disabled.
 */
const pillScope: CSSProperties = {
  ['--sg-btn-height' as never]: '42px',
  ['--sg-btn-radius' as never]: '999px',
  ['--sg-btn-font-size' as never]: '14px',
  ['--sg-btn-padding' as never]: '0 22px',
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
}

export function ComponentTokensButton() {
  return (
    <div style={pillScope}>
      <Button type="primary">Pill primary</Button>
      <Button>Pill default</Button>
      <Button type="dashed">Pill dashed</Button>
    </div>
  )
}
