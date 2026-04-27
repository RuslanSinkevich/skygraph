import { useState } from 'react'
import { Timeline, Button } from '@skygraph/react'
import { releaseItems } from './data'

/**
 * `reverse` flips the visual order in-place — useful when the
 * source data is chronological but the screen should show the
 * latest event first.
 */
export function ReverseTimeline() {
  const [reverse, setReverse] = useState(false)
  return (
    <div>
      <Button onClick={() => setReverse((r) => !r)} size="small">
        {reverse ? 'Oldest first' : 'Newest first'}
      </Button>
      <div style={{ marginTop: 16 }}>
        <Timeline reverse={reverse} items={releaseItems} />
      </div>
    </div>
  )
}
