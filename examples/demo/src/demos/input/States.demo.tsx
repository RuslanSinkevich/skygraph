import { Input } from '@skygraph/react'

/**
 * Disabled greys out the field and blocks input. Loading shows an
 * inline spinner on the right and also blocks edits — great for
 * async lookups (e.g. checking a coupon code).
 */
export function StatesInput() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Input disabled placeholder="Disabled" />
      <Input disabled defaultValue="Locked value" />
      <Input loading placeholder="Validating…" />
    </div>
  )
}
