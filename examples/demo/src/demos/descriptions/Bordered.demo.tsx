import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * `bordered` wraps the table in a rounded border, tints the
 * label column with `--sg-color-bg-secondary` and inserts
 * dividers between rows. Use it for settled, read-only
 * summaries (invoices, account details).
 */
export function BorderedDescriptions() {
  return <Descriptions bordered title="User info" items={userItems} />
}
