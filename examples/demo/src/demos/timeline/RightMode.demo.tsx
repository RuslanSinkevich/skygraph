import { Timeline } from '@skygraph/react'
import { releaseItems } from './data'

/**
 * `mode="right"` flips the axis to the opposite side — use it
 * when the timeline should hug the right edge of a panel
 * instead of the left.
 */
export function RightModeTimeline() {
  return <Timeline mode="right" items={releaseItems} />
}
