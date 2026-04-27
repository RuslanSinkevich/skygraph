import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * `ghost` drops the outer border, panel backgrounds and body
 * separators. The headers still hover, so it works as a stealth
 * FAQ list on any surface colour.
 */
export function GhostCollapse() {
  return <Collapse items={sampleItems} ghost defaultActiveKey={['2']} />
}
