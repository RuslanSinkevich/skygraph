import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * `expandTrigger="hover"` opens the next column when the cursor moves over
 * a row — handy for fast drill-down without extra clicks.
 */
export function HoverTriggerCascader() {
  return (
    <div style={{ maxWidth: 340 }}>
      <Cascader options={regionOptions} expandTrigger="hover" placeholder="Hover to expand" />
    </div>
  )
}
