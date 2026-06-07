import { TimePicker } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * TimePicker composes the global form tokens for the trigger and the surface
 * tokens for the dropdown. Three scoped recipes — branded green, dark field,
 * glass pick — reskin one instance.
 */
export function TokensOverrideTimePicker() {
  return (
    <TokenScopeCards
      render={() => <TimePicker defaultValue="09:30:00" placeholder="Select time" />}
    />
  )
}
