import { useState } from 'react'
import { DatePicker } from '@skygraph/react'

/**
 * Controlled single date. `onChange` delivers the parsed `Date` *and* the
 * formatted string — use whichever fits the server contract.
 */
export function BasicDatePicker() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <>
      <DatePicker
        value={value}
        onChange={(d) => setValue(d)}
        placeholder="Pick a date"
        allowClear
      />
      <span
        style={{
          fontSize: 13,
          color: 'var(--sg-color-text-secondary)',
          alignSelf: 'center',
        }}
      >
        ISO: <code>{value?.toISOString() ?? 'null'}</code>
      </span>
    </>
  )
}
