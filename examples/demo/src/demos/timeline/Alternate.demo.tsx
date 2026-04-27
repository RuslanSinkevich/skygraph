import { Timeline } from '@skygraph/react'
import { releaseLabels } from './data'

/**
 * `mode="alternate"` places odd items on the left and even on
 * the right of a central axis — good for changelogs where
 * the label column needs to breathe on both sides.
 */
export function AlternateTimeline() {
  return <Timeline mode="alternate" items={releaseLabels} />
}
