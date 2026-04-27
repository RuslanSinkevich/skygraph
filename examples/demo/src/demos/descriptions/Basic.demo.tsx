import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * Defaults to 3 columns, horizontal layout, colon after each
 * label. Items flow across rows — use `span` to widen one.
 */
export function BasicDescriptions() {
  return <Descriptions title="User info" items={userItems} />
}
