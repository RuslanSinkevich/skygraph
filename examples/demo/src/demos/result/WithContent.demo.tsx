import { Result, Button } from '@skygraph/react'

/**
 * `children` render inside a soft panel below `extra`. Use it for
 * diagnostics, error logs, or next-step checklists — keep it
 * secondary so the primary outcome stays scannable.
 */
export function WithContentResult() {
  return (
    <Result
      status="error"
      title="Deploy failed"
      subTitle="Build #1242 crashed during the post-install step."
      extra={
        <>
          <Button type="primary">Retry build</Button>
          <Button>View logs</Button>
        </>
      }
    >
      <div style={{ textAlign: 'left', fontFamily: 'monospace', fontSize: 12 }}>
        <p style={{ margin: 0 }}>The following errors were reported:</p>
        <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
          <li>E_NOPERM: permission denied on <code>/opt/app</code></li>
          <li>E_NETWORK: failed to download asset <code>bundle.js</code></li>
        </ul>
      </div>
    </Result>
  )
}
