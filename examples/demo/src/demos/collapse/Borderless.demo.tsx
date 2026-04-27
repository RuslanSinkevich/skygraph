import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * `bordered={false}` removes the outer frame but keeps panel
 * separators and the header background. Best when Collapse sits
 * inside a card that already has its own border.
 */
export function BorderlessCollapse() {
  return <Collapse items={sampleItems} bordered={false} defaultActiveKey={['1']} />
}
