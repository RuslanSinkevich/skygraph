import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * `colon={false}` drops the trailing colon after every label —
 * handy when the design language prefers dashes, pipes or
 * nothing at all.
 */
export function NoColonDescriptions() {
  return <Descriptions colon={false} bordered title="User info" items={userItems} />
}
