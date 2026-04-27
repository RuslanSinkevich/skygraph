import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * `accordion` enforces the single-open rule. Clicking the active
 * panel again closes it (empty active set); clicking another
 * swaps which one is open.
 */
export function AccordionCollapse() {
  return <Collapse items={sampleItems} accordion defaultActiveKey="1" />
}
