import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * Disable the whole control, or mark individual options via
 * `option.disabled` (see `Sichuan` in the data — it cannot be opened).
 */
export function DisabledCascader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340 }}>
      <Cascader options={regionOptions} disabled defaultValue={['zhejiang', 'hangzhou']} />
      <Cascader options={regionOptions} placeholder="Sichuan row is disabled" />
    </div>
  )
}
