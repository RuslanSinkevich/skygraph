import { useState } from 'react'
import { Input } from '@skygraph/react'

/**
 * `aria-invalid` flips the visual error state *and* tells assistive
 * tech. No separate `status` prop is needed — the styling follows the
 * ARIA attribute.
 */
export function ValidationInput() {
  const [email, setEmail] = useState('not-an-email')
  const invalid = !email.includes('@')
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Input
        value={email}
        onChange={setEmail}
        aria-invalid={invalid}
        aria-required
        placeholder="email"
      />
      {invalid && (
        <span style={{ fontSize: 12, color: 'var(--sg-color-error)' }}>
          Please enter a valid email.
        </span>
      )}
    </div>
  )
}
