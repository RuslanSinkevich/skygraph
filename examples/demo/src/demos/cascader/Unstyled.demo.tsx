import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * `unstyled` drops every SkyGraph class — you get the bare semantics
 * (inputs, columns, items) so you can paint from scratch with your own
 * design system. Useful when embedding inside Tailwind / shadcn.
 */
export function UnstyledCascader() {
  return (
    <div style={{ maxWidth: 340 }}>
      <Cascader options={regionOptions} unstyled placeholder="Unstyled" />
    </div>
  )
}
