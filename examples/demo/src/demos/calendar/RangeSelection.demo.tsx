import { useState } from 'react'
import { Calendar } from '@skygraph/react'

/**
 * `rangeSelection` switches the grid to range mode. Click once to pin the
 * start, a second click commits the end. Everything in-between gets a
 * highlight. Use `rangeValue`/`onRangeChange` to drive it from a store.
 */
export function RangeSelectionCalendar() {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {range[0] && range[1]
          ? `From ${range[0].toLocaleDateString()} to ${range[1].toLocaleDateString()}`
          : 'Pick a start and an end'}
      </div>
      <Calendar
        fullscreen={false}
        rangeSelection
        rangeValue={range}
        onRangeChange={setRange}
      />
    </div>
  )
}
