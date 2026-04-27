import { Timeline } from '@skygraph/react'
import { releaseLabels } from './data'

/**
 * `label` is a secondary column on the axis side — typically a
 * timestamp. It only renders in `alternate` mode.
 */
export function WithLabelTimeline() {
  return <Timeline mode="alternate" items={releaseLabels} />
}
