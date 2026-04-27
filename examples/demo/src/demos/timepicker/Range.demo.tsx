import { useState } from 'react'
import { TimeRangePicker } from '@skygraph/react'

/**
 * Start + end pair that share a format. Both panels open together in
 * one dropdown. Use it for "working hours", "shift window", etc.
 */
export function RangeTimePicker() {
  const [range, setRange] = useState<[string, string]>(['', ''])
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 380 }}>
      <TimeRangePicker
        value={range}
        onChange={setRange}
        format="HH:mm"
        showSecond={false}
        placeholder={['From', 'To']}
      />
      <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {range[0] || range[1] ? `[${range[0] || '—'}, ${range[1] || '—'}]` : 'Nothing picked yet.'}
      </span>
    </div>
  )
}
