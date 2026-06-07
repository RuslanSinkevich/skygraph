import { ColorPicker } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * ColorPicker composes the global form tokens for the trigger and the surface
 * tokens for the dropdown. Three scoped recipes — branded green, dark field,
 * glass pick — reskin the trigger and panel.
 */
export function TokensOverrideColorPicker() {
  return <TokenScopeCards render={() => <ColorPicker defaultValue="#10b981" showText />} />
}
