import { Button } from '@skygraph/react'

/**
 * Three sizes scale height, padding and font size in one step.
 * Prefer `ConfigProvider` to broadcast the same size to a subtree
 * instead of threading `size` through every form control.
 */
export function SizesButton() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button type="primary" size="small">Small primary</Button>
      <Button>Middle</Button>
      <Button type="primary">Middle primary</Button>
      <Button size="large">Large</Button>
      <Button type="primary" size="large">Large primary</Button>
    </div>
  )
}
