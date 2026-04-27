import { Progress } from '@skygraph/react'

/**
 * `type="circle"` swaps the bar for an SVG ring. `width` sets the
 * outer size, `strokeWidth` controls ring thickness. Use for status
 * dashboards where space is dear.
 */
export function CircleProgress() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <Progress type="circle" percent={30} />
      <Progress type="circle" percent={70} />
      <Progress type="circle" percent={100} />
      <Progress type="circle" percent={60} status="error" />
      <Progress type="circle" percent={80} width={64} strokeWidth={4} />
    </div>
  )
}
