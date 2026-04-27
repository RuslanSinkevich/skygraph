import { Checkbox } from '@skygraph/react'

/**
 * `unstyled` removes SkyGraph classes — you get the native checkbox +
 * label wrapper. Use it inside a larger design-system wrapper.
 */
export function UnstyledCheckbox() {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <Checkbox unstyled defaultChecked>Unstyled checked</Checkbox>
      <Checkbox unstyled indeterminate>Unstyled indeterminate</Checkbox>
      <Checkbox unstyled disabled>Unstyled disabled</Checkbox>
    </div>
  )
}
