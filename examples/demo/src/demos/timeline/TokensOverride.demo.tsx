import { Timeline } from '@skygraph/react'
import { releaseItems } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * The default ring reads `--sg-color-primary`, the connector reads
 * `--sg-color-border-secondary`, the pending content reads
 * `--sg-color-text-tertiary`. Three scoped recipes — branded green, dark
 * field, glass pick — rebrand the whole timeline.
 */
export function TokensOverrideTimeline() {
  return <TokenScopeCards render={() => <Timeline items={releaseItems} pending="Awaiting…" />} />
}
