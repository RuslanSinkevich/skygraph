import { Calendar } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Calendar has no component-scoped tokens — it is driven by the global
 * palette. Three scoped recipes — branded green, dark field, glass pick —
 * reskin one instance.
 */
export function TokensOverrideCalendar() {
  return <TokenScopeCards render={() => <Calendar fullscreen={false} />} />
}
