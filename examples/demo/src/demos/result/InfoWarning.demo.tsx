import { Result } from '@skygraph/react'

/**
 * Milder outcomes — `info` for neutral confirmations, `warning` for
 * attention-needed states. Both share the Result layout with
 * different icons and colour tokens.
 */
export function InfoWarningResult() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Result status="info" title="Your operation has been executed" />
      <Result status="warning" title="There are some problems with your operation" />
    </div>
  )
}
