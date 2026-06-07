import { Steps } from '@skygraph/react'
import { basicSteps } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Finished / process steps pull `--sg-color-primary` for the fill and tail.
 * Three scoped recipes — branded green, dark field, glass pick — rebrand the
 * whole wizard.
 */
export function TokensOverrideSteps() {
  return <TokenScopeCards render={() => <Steps current={1} items={basicSteps} />} />
}
