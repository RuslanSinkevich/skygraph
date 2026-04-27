import { Input } from '@skygraph/react'

/**
 * Three sizes share the same paddings and radius as Select / DatePicker
 * so a row of mixed controls aligns perfectly.
 */
export function SizesInput() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Input size="small" placeholder="small" />
      <Input placeholder="middle (default)" />
      <Input size="large" placeholder="large" />
    </div>
  )
}
