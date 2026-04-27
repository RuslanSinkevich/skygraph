import { Rate } from '@skygraph/react'

/**
 * Disabled locks the rating and greys the control. Useful for
 * displaying reviews in a read-only table row.
 */
export function DisabledRate() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Rate disabled defaultValue={4} />
      <Rate disabled allowHalf defaultValue={3.5} />
    </div>
  )
}
