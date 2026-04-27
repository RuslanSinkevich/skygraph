import { Select } from '@skygraph/react'
import { cityOptions } from './data'

/**
 * Disable the whole select via `disabled`, or a single option by flagging
 * it in `options`. Disabled options stay visible but cannot be picked.
 */
export function DisabledSelect() {
  const withDisabledRow = [
    ...cityOptions,
    { label: 'Unavailable', value: 'x', disabled: true },
  ]
  return (
    <>
      <Select disabled defaultValue="moscow" options={cityOptions} />
      <Select placeholder="One option disabled" options={withDisabledRow} />
    </>
  )
}
