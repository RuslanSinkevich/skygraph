import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * `expandIconPosition="end"` flips the chevron to the trailing
 * edge — the classic FAQ layout. The header text stays left-
 * aligned and grows to fill the row.
 */
export function IconPositionCollapse() {
  return (
    <Collapse items={sampleItems} expandIconPosition="end" defaultActiveKey={['1']} />
  )
}
