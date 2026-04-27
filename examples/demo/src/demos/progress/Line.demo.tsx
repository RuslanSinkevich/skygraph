import { Progress } from '@skygraph/react'

/**
 * A standard horizontal bar with a trailing percentage label. At
 * 100% the `status` defaults to `success` so the bar flips to green
 * without extra logic.
 */
export function LineProgress() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="error" />
      <Progress percent={100} />
    </div>
  )
}
