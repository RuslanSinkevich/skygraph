import type { CSSProperties } from 'react'
import { Steps } from '@skygraph/react'
import { basicSteps } from './data'

/**
 * Finished / process steps pull from `--sg-color-primary` for the
 * fill and tail; errors use `--sg-color-error`. Scope either to
 * rebrand an entire wizard.
 */
const greenScope: CSSProperties = {
  ['--sg-color-primary' as never]: '#16a34a',
  ['--sg-color-error' as never]: '#dc2626',
}

export function TokensOverrideSteps() {
  return (
    <div style={greenScope}>
      <Steps current={1} items={basicSteps} />
    </div>
  )
}
