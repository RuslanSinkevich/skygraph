import { Spin } from '@skygraph/react'

/**
 * Inline spinner with no children — renders as a standalone
 * circular indicator with `role="status"` + `aria-label="Loading"`.
 */
export function BasicSpin() {
  return <Spin />
}
