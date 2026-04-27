import { Rate } from '@skygraph/react'

/**
 * `unstyled` drops every SkyGraph class. The ARIA semantics
 * (role="radiogroup", each star `role="radio"`) are preserved.
 */
export function UnstyledRate() {
  return (
    <Rate
      unstyled
      defaultValue={3}
      style={{ display: 'inline-flex', gap: 4, fontSize: 28, color: '#d1d5db' }}
    />
  )
}
