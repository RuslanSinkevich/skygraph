import { Timeline } from '@skygraph/react'
import { releaseItems } from './data'

/**
 * Each item renders a dot + connector + content. Pass any CSS
 * colour string in `color` to tint the default ring — the
 * content stays in the standard body colour.
 */
export function BasicTimeline() {
  return <Timeline items={releaseItems} />
}
