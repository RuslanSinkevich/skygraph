import { Spin } from '@skygraph/react'

/**
 * Three discrete sizes — 12px / 24px / 36px. The border width
 * scales with the size so the ring keeps the same visual weight.
 */
export function SizesSpin() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </div>
  )
}
