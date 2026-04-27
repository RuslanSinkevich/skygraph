import { Select } from '@skygraph/react'
import { priorityOptions } from './data'

/**
 * Uncontrolled — SkyGraph keeps the value internally, you just read it via
 * `onChange` when the user picks something.
 */
export function UncontrolledSelect() {
  return (
    <Select
      defaultValue="p2"
      options={priorityOptions}
      onChange={(v) => console.log('picked', v)}
    />
  )
}
