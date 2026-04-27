import { Timeline } from '@skygraph/react'

/**
 * `color` applies only to the default ring — it sets both
 * `border-color` and `color` inline. Any CSS colour works,
 * including token references like `var(--sg-color-success)`.
 */
export function CustomColorTimeline() {
  return (
    <Timeline
      items={[
        { children: 'Primary (default ring)' },
        { children: 'Success ring', color: 'var(--sg-color-success)' },
        { children: 'Warning ring', color: '#d97706' },
        { children: 'Custom purple', color: '#7c3aed' },
      ]}
    />
  )
}
