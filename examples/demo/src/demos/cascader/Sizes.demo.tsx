import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * Matches Input/Select sizing. `small` and `large` simply override
 * `--sg-height-*` + `--sg-font-size-*` so the Cascader stays aligned with
 * the rest of the form row.
 */
export function SizesCascader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340 }}>
      <Cascader size="small" options={regionOptions} placeholder="Small" />
      <Cascader options={regionOptions} placeholder="Middle (default)" />
      <Cascader size="large" options={regionOptions} placeholder="Large" />
    </div>
  )
}
