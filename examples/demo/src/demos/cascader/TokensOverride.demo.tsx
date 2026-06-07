import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Cascader composes the global form tokens for the trigger and the surface /
 * primary families for the panels. Three scoped recipes — branded green, dark
 * field, glass pick — reskin one instance.
 */
export function TokensOverrideCascader() {
  return (
    <TokenScopeCards
      render={() => <Cascader options={regionOptions} placeholder="Select region" />}
    />
  )
}
