import { InputNumber } from '@skygraph/react'

/**
 * Three sizes change height, stepper button width and input width.
 * Match Input/Select when mixing them on the same row.
 */
export function SizesInputNumber() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <InputNumber size="small" defaultValue={1} />
      <InputNumber defaultValue={2} />
      <InputNumber size="large" defaultValue={3} />
    </div>
  )
}
