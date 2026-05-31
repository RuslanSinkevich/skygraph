import { Progress } from '@skygraph/react'

/**
 * `status="active"` turns on a shimmering highlight that sweeps
 * across the filled region. Use it for indeterminate-feeling
 * uploads or long syncs where you still know the percentage.
 */
export function ActiveProgress() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}
    >
      <Progress percent={20} status="active" />
      <Progress percent={55} status="active" />
      <Progress percent={85} status="active" />
    </div>
  )
}
