import { Steps } from '@skygraph/react'
import { basicSteps } from './data'

/**
 * `current` is zero-based. Indices below it render as `finish`
 * (check icon), `current` itself is `process` (primary fill),
 * and anything above stays `wait` (muted).
 */
export function BasicSteps() {
  return <Steps current={1} items={basicSteps} />
}
