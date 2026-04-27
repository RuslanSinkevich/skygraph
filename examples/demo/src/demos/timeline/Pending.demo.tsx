import { Timeline } from '@skygraph/react'

/**
 * `pending` adds a muted tail below the real items — pass a
 * node for custom copy ("Recording...") or `true` for an empty
 * placeholder. Pair with `pendingDot` to swap the marker.
 */
export function PendingTimeline() {
  return (
    <Timeline
      pending="Deploying to production..."
      pendingDot={<span aria-hidden>⏳</span>}
      items={[
        { children: 'Built release 1.2.0' },
        { children: 'Ran smoke tests', color: 'green' },
        { children: 'Queued deploy' },
      ]}
    />
  )
}
