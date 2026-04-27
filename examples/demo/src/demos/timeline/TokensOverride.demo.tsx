import type { CSSProperties } from 'react'
import { Timeline } from '@skygraph/react'
import { releaseItems } from './data'

/**
 * The default ring reads `--sg-color-primary`, the connector
 * reads `--sg-color-border-secondary`, and the pending
 * content colour reads `--sg-color-text-tertiary`. Scope them
 * on a wrapper to rebrand a whole timeline.
 */
const scope: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  background: '#0f172a',
  color: '#e2e8f0',
  ['--sg-color-primary' as never]: '#38bdf8',
  ['--sg-color-text' as never]: '#e2e8f0',
  ['--sg-color-text-secondary' as never]: '#94a3b8',
  ['--sg-color-text-tertiary' as never]: '#64748b',
  ['--sg-color-border-secondary' as never]: '#334155',
  ['--sg-color-bg' as never]: '#0f172a',
}

export function TokensOverrideTimeline() {
  return (
    <div style={scope}>
      <Timeline items={releaseItems} pending="Awaiting approval…" />
    </div>
  )
}
