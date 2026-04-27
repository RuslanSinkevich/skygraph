import { useState } from 'react'
import { Select } from '@skygraph/react'
import { cityOptions } from './data'

/**
 * Controlled select. `value` / `onChange` is the canonical pattern — use
 * `defaultValue` to start uncontrolled.
 */
export function BasicSelect() {
  const [value, setValue] = useState<string | number>('')

  return (
    <Select
      placeholder="Choose a city"
      value={value}
      onChange={setValue}
      options={cityOptions}
    />
  )
}
