import { Descriptions } from '@skygraph/react'
import { invoiceItems } from './data'

/**
 * `layout="vertical"` stacks the label above the content in two
 * separate rows — ideal when the values are long enough that
 * side-by-side would wrap awkwardly.
 */
export function VerticalDescriptions() {
  return (
    <Descriptions
      layout="vertical"
      bordered
      title="Invoice"
      items={invoiceItems}
    />
  )
}
