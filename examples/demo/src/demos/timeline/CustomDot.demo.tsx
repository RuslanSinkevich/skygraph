import { Timeline } from '@skygraph/react'

/**
 * `dot` replaces the ring with any node — emoji, icon, letter
 * badge. The connector still threads through its centre, so
 * aim for a ~16px glyph for a tidy line.
 */
export function CustomDotTimeline() {
  return (
    <Timeline
      items={[
        { children: 'Created account', dot: <span aria-hidden>🧑</span> },
        { children: 'Purchased plan', dot: <span aria-hidden>💳</span> },
        { children: 'Shipped project', dot: <span aria-hidden>🚀</span>, color: 'green' },
        { children: 'Investigating outage', dot: <span aria-hidden>⚠️</span>, color: '#dc2626' },
      ]}
    />
  )
}
