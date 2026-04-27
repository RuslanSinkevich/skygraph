import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * `column` sets how many label/value pairs fit per row. The
 * built-in layout engine respects per-item `span` and wraps to
 * the next row when the total span would overflow.
 */
export function ColumnsDescriptions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Descriptions column={1} bordered title="1 column" items={userItems} />
      <Descriptions column={2} bordered title="2 columns" items={userItems} />
      <Descriptions column={4} bordered title="4 columns" items={userItems} />
    </div>
  )
}
