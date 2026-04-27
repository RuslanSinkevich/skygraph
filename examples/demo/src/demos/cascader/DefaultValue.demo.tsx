import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * Uncontrolled — Cascader owns the state and starts with a preset path.
 */
export function DefaultValueCascader() {
  return (
    <div style={{ maxWidth: 340 }}>
      <Cascader options={regionOptions} defaultValue={['zhejiang', 'hangzhou', 'xihu']} />
    </div>
  )
}
