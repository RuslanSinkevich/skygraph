import { useState } from 'react'
import { RangePicker } from '@skygraph/react'

/**
 * RangePicker returns a tuple `[start, end]` — either end can be `null`
 * until the range is committed.
 */
export function RangeDatePicker() {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])
  return (
    <>
      <RangePicker
        value={range}
        onChange={(r) => setRange(r)}
        placeholder={['Start', 'End']}
        allowClear
      />
      <span
        style={{
          fontSize: 13,
          color: 'var(--sg-color-text-secondary)',
          alignSelf: 'center',
        }}
      >
        {range[0] && range[1]
          ? `${range[0].toLocaleDateString()} → ${range[1].toLocaleDateString()}`
          : 'no range'}
      </span>
    </>
  )
}
