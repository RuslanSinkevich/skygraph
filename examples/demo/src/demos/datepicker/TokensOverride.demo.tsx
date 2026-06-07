import { DatePicker } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * DatePicker reads `--sg-color-primary` for selected days, the global form
 * tokens for the control shell and the surface tokens for the dropdown. Three
 * scoped recipes — branded green, dark field, glass pick — reskin one picker.
 */
export function TokensOverrideDatePicker() {
  return <TokenScopeCards render={() => <DatePicker placeholder="Pick a date" allowClear />} />
}
