import { Spin } from '@skygraph/react'

/**
 * `unstyled` drops every SkyGraph class (ring + overlay + tip)
 * while keeping the `delay`, `spinning`, and child overlay logic.
 * Best paired with a custom `indicator`.
 */
export function UnstyledSpin() {
  return (
    <Spin
      unstyled
      indicator={<span style={{ fontSize: 22 }} aria-hidden>🌀</span>}
      tip="Bring your own style"
    />
  )
}
