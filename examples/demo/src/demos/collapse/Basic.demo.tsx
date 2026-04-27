import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * Default behaviour — multiple panels may be open at once.
 * `defaultActiveKey` seeds the open set for the uncontrolled case.
 */
export function BasicCollapse() {
  return <Collapse items={sampleItems} defaultActiveKey={['1']} />
}
