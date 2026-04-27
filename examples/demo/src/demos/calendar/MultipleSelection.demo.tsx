import { useState } from 'react'
import { Calendar } from '@skygraph/react'

/**
 * `multipleSelection` toggles dates on click. Perfect for scheduling
 * availability ("pick every working day this month").
 */
export function MultipleSelectionCalendar() {
  const [dates, setDates] = useState<Date[]>([])

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Selected {dates.length} date{dates.length === 1 ? '' : 's'}
      </div>
      <Calendar
        fullscreen={false}
        multipleSelection
        multipleValue={dates}
        onMultipleChange={setDates}
      />
    </div>
  )
}
