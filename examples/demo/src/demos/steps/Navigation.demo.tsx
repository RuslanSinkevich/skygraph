import { useState } from 'react'
import { Steps } from '@skygraph/react'
import { checkoutSteps } from './data'

/**
 * `type="navigation"` drops the icons and underlines the active
 * step — good for page-level section tabs where numbers would
 * feel too heavy.
 */
export function NavigationSteps() {
  const [current, setCurrent] = useState(1)
  return (
    <Steps
      type="navigation"
      current={current}
      onChange={setCurrent}
      items={checkoutSteps}
    />
  )
}
