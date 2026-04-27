import { Select } from '@skygraph/react'
import { cityOptions } from './data'

/**
 * `unstyled` renders a native `<select>` with no SkyGraph styling. Useful
 * when you're embedding in a foreign design system and only need the
 * controlled-value wiring.
 */
export function UnstyledSelect() {
  return (
    <Select
      unstyled
      placeholder="Native select"
      options={cityOptions}
      defaultValue="berlin"
      style={{ padding: '6px 10px', borderRadius: 4 }}
    />
  )
}
