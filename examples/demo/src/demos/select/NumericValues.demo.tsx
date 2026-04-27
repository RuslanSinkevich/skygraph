import { useState } from 'react'
import { Select } from '@skygraph/react'
import { numberOptions } from './data'

/**
 * `value` can be a string OR a number. SkyGraph keeps the original type,
 * which matters when wiring to APIs that expect numeric IDs.
 */
export function NumericValuesSelect() {
  const [value, setValue] = useState<string | number>(2)
  return (
    <>
      <Select value={value} onChange={setValue} options={numberOptions} />
      <span
        style={{
          fontSize: 13,
          color: 'var(--sg-color-text-secondary)',
          alignSelf: 'center',
        }}
      >
        value: <code>{JSON.stringify(value)}</code> (typeof{' '}
        <code>{typeof value}</code>)
      </span>
    </>
  )
}
