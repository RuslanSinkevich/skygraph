import { Input } from '@skygraph/react'

/**
 * `type` maps directly to native HTML input types — pick the right one
 * for keyboard, autofill and password managers to do their jobs.
 */
export function TypesInput() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Input type="text" placeholder="Plain text" />
      <Input type="email" placeholder="name@example.com" />
      <Input type="password" placeholder="••••••••" />
      <Input type="number" placeholder="42" />
    </div>
  )
}
